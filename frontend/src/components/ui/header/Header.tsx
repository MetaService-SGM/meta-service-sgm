import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-[#2B426E] text-white px-2 py-1 max-w-94.5">
      <div className="flex items-center justify-between  ">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Página inicial do SGM"
            className="flex items-center"
          >
            <Image
              src="/images/logo/logo-sgm-sidebar.png"
              width={110}
              height={80}
              alt="Logo SGM"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Perfil */}
        <div className="flex items-center gap-6">
          <Link
            href="/configuracoes"
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-900 transition-colors"
            aria-label="Acessar configurações do perfil"
          >
            
         
            
            <div className="flex flex-col">
              <span className="text-sm font-semibold ml-3">Ricardo</span>
              <span className="text-xs">
                Administrador
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
