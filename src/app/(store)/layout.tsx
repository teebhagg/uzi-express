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
    <>
      <NavBar />
      <div className="px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
        {children}
      </div>
      <Footer />
    </>
  );
}
