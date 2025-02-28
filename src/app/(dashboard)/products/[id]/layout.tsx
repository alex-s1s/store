import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Store | E-commerce de Produtos Diversos",
  description: "Explore nossa variedade de produtos, incluindo eletrônicos, joias, roupas e mais. Encontre as melhores ofertas e compre com segurança!",
};

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      {children}
    </main>
  );
};

export default Layout;