import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { MainBackground } from "./MainBackGround";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <MainBackground>{children}</MainBackground>
      </div>
    </>
  );
}
