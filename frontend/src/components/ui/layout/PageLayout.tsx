import React, { ReactNode } from "react";
import { MainBackground } from "./MainBackGround";
import Sidebar from "../sidebar/Sidebar";

type PageLayoutProps = {
  children: ReactNode;
  fixedHeight?: string;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
      <div className="flex">
        <Sidebar />
        <MainBackground>{children}</MainBackground>
      </div>
  );
}
