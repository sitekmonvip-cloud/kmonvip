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
    ];
  },
};

export default withNextIntl(nextConfig);
