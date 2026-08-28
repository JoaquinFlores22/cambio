"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  SNAPSHOT,
  SNAPSHOT_AR,
  fetchLiveArRates,
  fetchLiveRates,
  type ArRates,
  type RateSet,
} from "./rates";

export type RatesStatus = "loading" | "live" | "snapshot";

export type LiveRates = {
  rates: RateSet;
  ar: ArRates | null;
  status: RatesStatus;
  /** epoch ms del último refresco exitoso (0 si todavía no hubo) */
  refreshedAt: number;
  /** true mientras corre un fetch del intervalo */
  refreshing: boolean;
};

const REFRESH_MS = 60_000;

const RatesContext = createContext<LiveRates | null>(null);

/**
 * Un único poller para toda la página:
 *  - primer render: snapshot horneado (sin parpadeo)
 *  - al montar: fetch en vivo
 *  - cada 60 s: re-fetch (se pausa con la pestaña oculta, refresca al volver)
 * Si la red falla se conserva el último valor bueno y `status` pasa a "snapshot".
 */
export function RatesProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LiveRates>({
    rates: SNAPSHOT,
    ar: SNAPSHOT_AR,
    status: "loading",
    refreshedAt: 0,
    refreshing: false,
  });
  const inFlight = useRef(false);

  const refresh = useCallback(async (silent: boolean) => {
    if (inFlight.current) return;
    inFlight.current = true;
    if (!silent) setState((s) => ({ ...s, refreshing: true }));

    const [globalRes, arRes] = await Promise.allSettled([fetchLiveRates(), fetchLiveArRates()]);

    inFlight.current = false;
    setState((prev) => {
      const rates = globalRes.status === "fulfilled" ? globalRes.value : prev.rates;
      const ar = arRes.status === "fulfilled" ? arRes.value : prev.ar;
      const anyLive = globalRes.status === "fulfilled" || arRes.status === "fulfilled";
      return {
        rates,
        ar,
        status: anyLive ? "live" : prev.status === "loading" ? "snapshot" : prev.status,
        refreshedAt: anyLive ? Date.now() : prev.refreshedAt,
        refreshing: false,
      };
    });
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      timer = setInterval(() => {
        if (document.visibilityState === "visible") refresh(false);
      }, REFRESH_MS);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        refresh(false);
        start();
      } else {
        stop();
      }
    };

    refresh(true);
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  return <RatesContext.Provider value={state}>{children}</RatesContext.Provider>;
}

export function useRates(): LiveRates {
  const ctx = useContext(RatesContext);
  if (!ctx) throw new Error("useRates debe usarse dentro de <RatesProvider>");
  return ctx;
}
