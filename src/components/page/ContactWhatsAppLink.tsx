"use client";

import { trackEvent } from "@/lib/tracking/events";

export default function ContactWhatsAppLink({
  whatsappNumber,
  children,
  className,
}: {
  whatsappNumber: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent({ eventType: "whatsapp_click", buttonId: "contato-page-whatsapp", buttonLocation: "contato-page" })
      }
      className={className}
    >
      {children}
    </a>
  );
}
