import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import Sidebar from "../sidebar";
import { MainBackground } from "./MainBackGround";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex">
        <Sidebar />
        <MainBackground>
          {children}
        </MainBackground>
      </div>
    </div>
  );
}
