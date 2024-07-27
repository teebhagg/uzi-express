// Layout
// Layout component

import Footer from "@/components/common/footer";
import NavBar from "@/components/common/navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 mx-auto px-[1.4rem] max-w-7xl">
        <div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
