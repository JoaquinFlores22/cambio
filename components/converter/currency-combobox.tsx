"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { CURRENCIES, getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { Flag } from "@/components/ui/flag";

type Props = {
  value: string;
  onChange: (code: string) => void;
  label: string;
  /** códigos a excluir de la lista (p. ej. la moneda ya elegida del otro lado) */
  exclude?: string[];
};

export function CurrencyCombobox({ value, onChange, label, exclude = [] }: Props) {
  const { t, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const current = getCurrency(value);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CURRENCIES.filter((c) => !exclude.includes(c.code)).filter((c) => {
      if (!q) return true;
      return (
        c.code.toLowerCase().includes(q) ||
        c.name.es.toLowerCase().includes(q) ||
        c.name.en.toLowerCase().includes(q)
      );
    });
  }, [query, exclude]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function choose(code: string) {
    onChange(code);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[active];
      if (opt) choose(opt.code);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${tr(current.name)}`}
        className="flex w-full items-center gap-2.5 rounded-[var(--radius-field)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-3 py-2.5 text-left transition-colors hover:border-[var(--color-ink)]"
      >
        <Flag code={current.code} size="lg" />
        <span className="flex min-w-0 flex-col">
          <span className="font-mono text-sm font-semibold">{current.code}</span>
          <span className="truncate text-xs text-[var(--color-muted)]">{tr(current.name)}</span>
        </span>
        <span className="ml-auto text-[var(--color-muted)]" aria-hidden>▾</span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-elevated)] shadow-[var(--shadow-pop)]">
          <div className="border-b border-[var(--color-line)] p-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t("conv.searchCurrency")}
              aria-label={t("conv.searchCurrency")}
              aria-controls={listId}
              className="field !py-2 text-sm"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="max-h-64 overflow-y-auto py-1"
          >
            {options.length === 0 && (
              <li className="px-3 py-3 text-sm text-[var(--color-muted)]">{t("conv.noResults")}</li>
            )}
            {options.map((c, i) => (
              <li
                key={c.code}
                role="option"
                aria-selected={c.code === value}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(c.code)}
                className={clsx(
                  "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm",
                  i === active && "bg-[var(--color-brand-tint)]",
                )}
              >
                <Flag code={c.code} />
                <span className="font-mono font-semibold">{c.code}</span>
                <span className="truncate text-[var(--color-muted)]">{tr(c.name)}</span>
                {c.code === value && <span className="ml-auto text-[var(--color-brand)]" aria-hidden>✓</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
