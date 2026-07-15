import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  DEMO_MODE_MESSAGE,
} from "./constants";
import { prisma } from "@/lib/db/prisma";

export type AuthTokenPayload = {
  userId: string;
  isAdmin: boolean;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required for authentication.");
  }

  return new TextEncoder().encode(secret);
}

export async function signAuthToken(payload: AuthTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${AUTH_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifyAuthToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    if (
      typeof payload.userId !== "string" ||
      typeof payload.isAdmin !== "boolean"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      isAdmin: payload.isAdmin,
    } satisfies AuthTokenPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);

  if (!payload) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: payload.userId,
      isAdmin: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      isDemo: true,
    },
  });
});

export async function requireWritableAdmin() {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    redirect("/login");
  }

  if (user.isDemo) {
    throw new Error(DEMO_MODE_MESSAGE);
  }

  return user;
}
