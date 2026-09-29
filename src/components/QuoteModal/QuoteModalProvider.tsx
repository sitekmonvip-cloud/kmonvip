"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";
import { gtmEvent } from "@/lib/tracking/gtm";

type Ctx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const QuoteModalContext = createContext<Ctx | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);

  // Stable identity: /cotacao auto-opens from an effect that depends on `open`,
  // so a new function per render would re-open (and re-track) the modal.
  const open = useCallback(() => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    setIsOpen(true);
    gtmEvent("quote_open");
  }, []);

  const close = useCallback(() => {
    isOpenRef.current = false;
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
