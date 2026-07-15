"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { LockKeyhole, X } from "lucide-react";
import { DEMO_MODE_MESSAGE } from "@/lib/auth/constants";

type AdminDemoModeContextValue = {
  isDemo: boolean;
  showDemoNotice: () => void;
};

const AdminDemoModeContext = createContext<AdminDemoModeContextValue | null>(
  null,
);

export function AdminDemoModeProvider({
  isDemo,
  children,
}: {
  isDemo: boolean;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDemoNotice = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const value = useMemo(
    () => ({ isDemo, showDemoNotice }),
    [isDemo, showDemoNotice],
  );

  return (
    <AdminDemoModeContext.Provider value={value}>
      {children}

      {isDemo ? (
        <dialog
          ref={dialogRef}
          aria-labelledby="demo-notice-title"
          aria-describedby="demo-notice-description"
          className="fixed inset-0 m-auto w-[min(32rem,calc(100%-2rem))] border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/35"
        >
          <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <LockKeyhole size={20} aria-hidden="true" />
              <h2 id="demo-notice-title" className="text-xl font-semibold">
                Admin demo
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close demo notice"
              className="inline-flex size-9 shrink-0 items-center justify-center border border-border transition-colors hover:border-foreground hover:bg-background"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="px-6 py-6">
            <p
              id="demo-notice-description"
              className="text-base leading-7 text-muted"
            >
              {DEMO_MODE_MESSAGE}
            </p>
            <button
              type="button"
              className="mt-6 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
              onClick={() => dialogRef.current?.close()}
            >
              Continue exploring
            </button>
          </div>
        </dialog>
      ) : null}
    </AdminDemoModeContext.Provider>
  );
}

export function useAdminDemoMode() {
  const value = useContext(AdminDemoModeContext);

  if (!value) {
    throw new Error(
      "useAdminDemoMode must be used inside AdminDemoModeProvider.",
    );
  }

  return value;
}
