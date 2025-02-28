import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

const ibmPLexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ]
});

const bebasNeue = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas-neue'
});

export const metadata: Metadata = {
  title: "My Store | E-commerce de Produtos Diversos",
  description: "Explore nossa variedade de produtos, incluindo eletrônicos, joias, roupas e mais. Encontre as melhores ofertas e compre com segurança!",
};

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${ibmPLexSans.className} ${bebasNeue.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;