"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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

export const SidebarButton = ({
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
          : "hover:bg-[#F2F7FF] cursor-pointer hover:border-l-6 rounded hover:border-l-[#2B426E]"
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
