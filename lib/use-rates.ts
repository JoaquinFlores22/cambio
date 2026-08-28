"use client";

import { useEffect, useState } from "react";
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
};

/**
 * Devuelve los tipos de cambio: primero el snapshot horneado (render inmediato, sin parpadeo),
 * y cuando llega la respuesta de la red, los valores en vivo. Si la red falla, se queda en el
 * snapshot y marca `status: "snapshot"`.
 */
export function useRates(): LiveRates {
  const [state, setState] = useState<LiveRates>({
    rates: SNAPSHOT,
    ar: SNAPSHOT_AR,
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    Promise.allSettled([
      fetchLiveRates(controller.signal),
      fetchLiveArRates(controller.signal),
    ]).then(([globalRes, arRes]) => {
      if (cancelled) return;
      const rates = globalRes.status === "fulfilled" ? globalRes.value : SNAPSHOT;
      const ar = arRes.status === "fulfilled" ? arRes.value : SNAPSHOT_AR;
      const anyLive = globalRes.status === "fulfilled" || arRes.status === "fulfilled";
      setState({ rates, ar, status: anyLive ? "live" : "snapshot" });
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
