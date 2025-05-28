import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
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
        <div className="bg-white min-h-svh w-[25%]"></div>
        <Sidebar />
        <MainBackground>
          {children}
        </MainBackground>
      </div>
    </div>
  );
}
