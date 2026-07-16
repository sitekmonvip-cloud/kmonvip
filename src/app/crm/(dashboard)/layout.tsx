import CrmShell from "@/components/crm/CrmShell";

export default function CrmDashboardLayout({ children }: { children: React.ReactNode }) {
  return <CrmShell>{children}</CrmShell>;
}
