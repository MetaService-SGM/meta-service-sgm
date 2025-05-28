import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import Sidebar, { SidebarBackground } from "../sidebar/Sidebar";
import { MainBackground } from "./MainBackGround";

type PageLayoutProps = {
  children: ReactNode;
  fixedHeight?: string;
};

export function PageLayout({ children, fixedHeight }: PageLayoutProps) {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex">
        <SidebarBackground>
          <Sidebar />
        </SidebarBackground>
        <MainBackground>{children}</MainBackground>
      </div>
    </div>
  );
}
