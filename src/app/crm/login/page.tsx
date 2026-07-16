import { providerIds } from "@/lib/auth/config";
import LoginForm from "./LoginForm";

export default function CrmLoginPage() {
  return <LoginForm hasGoogle={providerIds.hasGoogle} hasCredentials={providerIds.hasCredentials} />;
}
