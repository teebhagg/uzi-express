// Layout
// Layout component

import Footer from "@/components/common/footer";
import NavBar from "@/components/common/navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const revalidate = 0;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 w-full px-[1.4rem]">
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
