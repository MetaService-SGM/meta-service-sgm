"use client";

import { useRouter } from "next/navigation";
import { FaHouse, FaGear } from "react-icons/fa6";
import { MdSpaceDashboard, MdEditSquare } from "react-icons/md";
import { IoPersonSharp, IoCopy } from "react-icons/io5";
import { GoBellFill } from "react-icons/go";
import { AiFillPieChart } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../button";
import { SidebarButton } from "./SidebarButton";

const NAV_ITEMS = [
  {
    logo: <FaHouse />,
    src: "/",
    alt: "Ícone de boas-vindas",
    label: "Bem-vindo",
  },
  {
    logo: <MdSpaceDashboard />,
    src: "/dashboard",
    alt: "Ícone de dashboard",
    label: "Dashboard",
  },
  {
    logo: <IoPersonSharp />,
    src: "/pessoal",
    alt: "Ícone de pessoal",
    label: "Gerenciamento de Pessoal",
  },
  {
    logo: <IoCopy />,
    src: "/companies",
    alt: "Ícone de empresas",
    label: "Empresas Contratadas",
  },
  {
    logo: <AiFillPieChart />,
    src: "/materials",
    alt: "Ícone de materiais",
    label: "Gerenciamento de Materiais",
  },
  {
    logo: <MdEditSquare />,
    src: "/orders",
    alt: "Ícone de ordens",
    label: "Ordem de Serviço",
  },
  {
    logo: <GoBellFill />,
    src: "/alerts",
    alt: "Ícone de alertas",
    label: "Alertas",
  },
  {
    logo: <FaGear />,
    src: "/settings",
    alt: "Ícone de configurações",
    label: "Configurações",
  },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className="fixed sidebar w-[20%] bg-white border-r border-gray-200 flex flex-col min-h-svh">
      <div className="flex-1 overflow-y-auto px-6 py-2">
        <div className="space-y-4">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={`nav-item-${index}`}
              className={index === 0 ? "mt-6" : ""}
            >
              <SidebarButton {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-center shrink-0">
        <Button onClick={handleLogout} className="w-[90%] h-8 mt-16">
          <IoIosLogOut />
          Sair
        </Button>
      </div>
    </nav>
  );
}
