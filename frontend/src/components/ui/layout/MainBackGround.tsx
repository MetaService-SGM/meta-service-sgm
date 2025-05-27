import React, { ReactNode } from "react";
import { BreadcrumbResponsive } from "../breadcrumb";


export function MainBackground({
  children,
  className = "",
  fixedHeight,
}: MainBackgroundProps) {
  return (
    <div
      className={`flex flex-col shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-xl mt-4 ml-4 mr-4 w-full bg-white mx-auto overflow-hidden ${className}`}
      style={fixedHeight ? { height: fixedHeight } : undefined} 
    >
      {/* Breadcrumb fixo */}
      <div className="sticky top-0 z-10 bg-white">
        <BreadcrumbResponsive />
      </div>

      {/* Conteúdo rolável */}
      <div className="flex-1 overflow-y-auto px-4 py-2">{children}</div>
    </div>
  );
}
