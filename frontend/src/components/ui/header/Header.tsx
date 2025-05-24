import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-[#2B426E] text-white px-10 py-1.5">
      <div className="flex items-center justify-between max-w-[1860px] mx-auto w-full px-6 sm:px-10 lg:px-20 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Página inicial do SGM"
            className="flex items-center"
          >
            <Image
              src="/images/logo/logo-sgm-sidebar.png"
              width={120}
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
            <Image
              src="/images/icons/perfil.png"
              width={40}
              height={40}
              className="rounded-full border-2 border-sidebar-border"
              alt="Foto de Perfil"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Ricardo</span>
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
