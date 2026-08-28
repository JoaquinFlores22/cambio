"use client";

import { LangProvider } from "@/lib/i18n";
import { RatesProvider } from "@/lib/rates-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <RatesProvider>{children}</RatesProvider>
    </LangProvider>
  );
}
