export type EventType = "whatsapp_click" | "form_submission" | "phone_click";

export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "qualificado"
  | "proposta_enviada"
  | "fechado"
  | "perdido";

export const LEAD_STATUSES: LeadStatus[] = [
  "novo",
  "em_atendimento",
  "qualificado",
  "proposta_enviada",
  "fechado",
  "perdido",
];

export type TrackingEventInput = {
  eventType: EventType;
  pageUrl?: string | null;
  pageTitle?: string | null;
  buttonId?: string | null;
  buttonText?: string | null;
  buttonLocation?: string | null;
  service?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer?: string | null;
  deviceType?: string | null;
  ipHash?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type TrackingEventRow = {
  id: number;
  event_type: EventType;
  page_url: string | null;
  page_title: string | null;
  button_id: string | null;
  button_text: string | null;
  button_location: string | null;
  service: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  device_type: string | null;
  created_at: string;
};

export type LeadInput = {
  name: string;
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  serviceInterest?: string | null;
  serviceCity?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  conversionPage?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  notes?: string | null;
};

/** Statuses the SDR is allowed to set. Later stages (proposta_enviada, fechado, perdido) belong to humans. */
export type SdrLeadStatus = "novo" | "em_atendimento" | "qualificado";

export type SdrLeadInput = {
  /** Any format — only the digits are used (country code included, e.g. 5561998630303). */
  phone: string;
  name?: string | null;
  companyName?: string | null;
  email?: string | null;
  serviceInterest?: string | null;
  serviceCity?: string | null;
  status?: SdrLeadStatus | null;
  /** Conversation summary. Stored inside a delimited SDR block of `notes`, replaced on every sync. */
  notes?: string | null;
  /** First-touch fields: only used when the lead is created, never on later syncs. */
  source?: string | null;
  campaign?: string | null;
  conversionPage?: string | null;
};

export type SupplierInput = {
  /** Any format — only the digits are used (country code included). */
  phone: string;
  name?: string | null;
  companyName?: string | null;
  email?: string | null;
  /** What the supplier is offering. */
  offering?: string | null;
  /** Conversation summary. */
  notes?: string | null;
};

export type SupplierRow = {
  id: number;
  name: string;
  company_name: string | null;
  phone: string;
  phone_normalized: string;
  email: string | null;
  offering: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: number;
  name: string;
  company_name: string | null;
  phone: string | null;
  phone_normalized: string | null;
  email: string | null;
  service_interest: string | null;
  service_city: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  conversion_page: string | null;
  gclid: string | null;
  fbclid: string | null;
  utm_term: string | null;
  utm_content: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadFilters = {
  search?: string;
  status?: LeadStatus;
  source?: string;
  from?: string; // ISO date
  to?: string; // ISO date
  limit?: number;
  offset?: number;
};
