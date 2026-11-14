"use client";

import { trackWhatsAppClick } from "@/lib/tracking/events";
import { gtmEvent } from "@/lib/tracking/gtm";

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
      onClick={(e) => {
        trackWhatsAppClick(e, { buttonId: "contato-page-whatsapp", buttonLocation: "contato-page" });
        gtmEvent("whatsapp_click", { button_location: "contato-page" });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
