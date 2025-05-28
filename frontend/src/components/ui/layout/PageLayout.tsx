import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import { MainBackground } from "./MainBackGround";
import Sidebar from "../sidebar/Sidebar";

type PageLayoutProps = {
  children: ReactNode;
  fixedHeight?: string;
};

export function PageLayout({ children, fixedHeight }: PageLayoutProps) {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex">
        <Sidebar />
        <MainBackground>{children}</MainBackground>
      </div>
    </div>
  );
}
