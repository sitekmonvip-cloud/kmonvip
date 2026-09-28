import { localizedMetadata } from "@/lib/seo/metadata";

export const generateMetadata = localizedMetadata({
  title: "Solicitar Cotação de Transporte Executivo",
  description:
    "Solicite cotação para transporte executivo, blindado, diplomático, eventos, transfers ou vans. Formulário guiado em 3 passos. Resposta em até 1 hora útil.",
  path: "/cotacao",
  keywords: [
    "cotação transporte executivo",
    "solicitar transporte executivo",
    "orçamento transporte executivo",
    "cotação transporte blindado",
    "cotação transfer aeroporto",
    "cotação van executiva",
    "orçamento KMON VIP",
    "formulário cotação executivo",
  ],
});

export default function CotacaoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
