"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  clearAuthCookie,
  setAuthCookie,
  signAuthToken,
} from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export type LoginActionState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  const redirectTo = next.startsWith("/admin") ? next : "/admin";

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      passwordHash: true,
      isAdmin: true,
    },
  });

  if (!user || !user.isAdmin) {
    return {
      error: "Invalid email or password.",
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return {
      error: "Invalid email or password.",
    };
  }

  const token = await signAuthToken({
    userId: user.id,
    isAdmin: user.isAdmin,
  });

  await setAuthCookie(token);
  redirect(redirectTo);
}

export async function logoutAction() {
  await clearAuthCookie();
  redirect("/login");
}
