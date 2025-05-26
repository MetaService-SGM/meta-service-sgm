"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { GoBellFill } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { AiFillPieChart } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../button";

interface SidebarButtonProps {
  logo?: string | React.ReactNode;
  alt?: string;
  width?: number;
  height?: number;
  active?: boolean;
  label?: string;
  onClick?: () => void;
  src?: string;
}

const SidebarButton = ({
  logo,
  alt = "Ícone",
  width = 20,
  height = 20,
  active = false,
  label,
  onClick,
  src,
}: SidebarButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (src) router.push(src);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center w-full p-3 transition-colors gap-1 ${
        active
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-[#F2F7FF] cursor-pointer hover:border-l-4 hover:border-l-[#2B426E]"
      }`}
    >
      {typeof logo === "string" ? (
        <div className="mr-4">
          <Image
            src={logo}
            alt={alt}
            width={width}
            height={height}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="mr-4 text-lg">{logo}</div>
      )}
      {label && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
};

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
    <nav className="sticky top-0 left-0 bottom-0 z-10 w-[20%] bg-white border-r border-gray-200 flex flex-col h-screen">
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
