import { Header } from "@/components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full px-8 max-w-7xl">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;