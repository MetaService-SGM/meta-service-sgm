"use client";

import { BreadcrumbResponsive } from "@/components/ui/breadcrumb";
import Sidebar from "@/components/ui/sidebar";

export default function Relatórios() {
  return (
    <main className="flex">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <section className="flex-1 h-screen bg-gray-200 flex flex-col justify-center items-center p-6">
        {/* Breadcrumb centralizado no topo */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-20">
          <BreadcrumbResponsive />
          <h1 className="text-2xl font-semibold text-gray-800">TELA DOCUMENTOS</h1>
          
        </div>
      </section>
    </main>
  );
}
