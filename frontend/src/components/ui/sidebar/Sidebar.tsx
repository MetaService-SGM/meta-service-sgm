"use client";

import { useRouter, usePathname } from "next/navigation"; // ⬅️ IMPORTANTE
import { FaHouse, FaGear } from "react-icons/fa6";
import { IoPersonSharp, IoCopy } from "react-icons/io5";
import { GoBellFill } from "react-icons/go";
import { AiFillPieChart } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../button";
import { SidebarButton } from "./SidebarButton";
import { Header } from "../header/Header";

const NAV_ITEMS = [
  {
    logo: <FaHouse />,
    src: "/bemVindo",
    alt: "Ícone de boas-vindas",
    label: "Bem-vindo",
  },
  {
    logo: <IoPersonSharp />,
    src: "/pessoal",
    alt: "Ícone de pessoal",
    label: "Gerenciamento de Pessoal",
  },
  {
    logo: <IoCopy />,
    src: "/empresa/cadastro",
    alt: "Ícone de empresas",
    label: "Empresas Contratadas",
  },
  {
    logo: <AiFillPieChart />,
    src: "/estoque",
    alt: "Ícone de materiais",
    label: "Gerenciamento de Materiais",
  },
  {
    logo: <GoBellFill />,
    src: "/alertas",
    alt: "Ícone de alertas",
    label: "Alertas",
  },
  {
    logo: <FaGear />,
    src: "/gerenciamento",
    alt: "Gerenciamento de Usuários",
    label: "Gerenciamento de Usuários",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // ⬅️ PEGAR A ROTA ATUAL

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <div className="bg-white min-h-svh w-[26%] max-w-[26%] shadow-[4px_0px_4px_0px_rgba(0,0,0,0.25)]">
        <Header />
      </div>

      <nav className="fixed sidebar w-[20%] flex flex-col min-h-svh">
        <div className="flex-1 overflow-y-auto py-2">
          <div className="space-y-4">
            {NAV_ITEMS.map((item, index) => {
              // compara se a rota atual começa com o caminho do item
              const isActive = pathname.startsWith(item.src);
              return (
                <div
                  key={`nav-item-${index}`}
                  className={index === 0 ? "mt-18" : ""}
                >
                  <SidebarButton {...item} active={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-center shrink-0">
          <Button onClick={handleLogout} className="w-[90%] h-8 mt-16">
            <IoIosLogOut />
            Sair
          </Button>
        </div>
      </nav>
    </>
  );
}
