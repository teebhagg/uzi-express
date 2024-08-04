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
      <div className="flex-1 w-full">
        <div className="mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}