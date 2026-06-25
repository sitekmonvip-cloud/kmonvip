"use client";

import { ReactNode, MouseEvent } from "react";
import { useQuoteModal } from "./QuoteModalProvider";

type Props = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export default function QuoteButton({ children, className, style, ariaLabel }: Props) {
  const { open } = useQuoteModal();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open();
  };

  return (
    <button type="button" onClick={onClick} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
