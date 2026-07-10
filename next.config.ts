import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy URLs still ranking/receiving clicks in GSC — preserve SEO equity
      {
        source: "/aluguel-de-carro-executivo-blindado-em-brasilia-df",
        destination: "/servicos/transporte-blindado/brasilia",
        permanent: true,
      },
      {
        source: "/blindados",
        destination: "/servicos/transporte-blindado",
        permanent: true,
      },
      {
        source: "/lp",
        destination: "/",
        permanent: true,
      },
      {
        source: "/transporte-executivo",
        destination: "/servicos/transporte-executivo",
        permanent: true,
      },
      {
        source: "/transporte-executivo-em-veiculo-blindado-em-brasilia-df",
        destination: "/servicos/transporte-blindado/brasilia",
        permanent: true,
      },
      {
        source: "/transporte-corporativo",
        destination: "/servicos/transporte-executivo",
        permanent: true,
      },
      {
        source: "/transporte-diplomatico",
        destination: "/servicos/transporte-diplomatico",
        permanent: true,
      },
      {
        source: "/servico-receptivo-em-aeroportos",
        destination: "/servicos/transfers-executivos",
        permanent: true,
      },
      {
        source: "/transfers-em-geral",
        destination: "/servicos/transfers-executivos",
        permanent: true,
      },
      {
        source: "/onibus-e-vans",
        destination: "/servicos/vans-e-onibus",
        permanent: true,
      },
      {
        source: "/sedans",
        destination: "/frota",
        permanent: true,
      },
      {
        source: "/city-tour-privativo",
        destination: "/servicos",
        permanent: true,
      },
      {
        source: "/category/aluguel-de-carro-executivo-blindado",
        destination: "/servicos/transporte-blindado",
        permanent: true,
      },
      {
        source: "/blog-2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/termos-de-uso",
        destination: "/politica-de-privacidade",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
