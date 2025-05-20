import Link from 'next/link';
import Image from 'next/image';
import { FaRegEnvelope } from "react-icons/fa";

export const Header = () => {
  return (
    <nav className="bg-blue-950 text-sidebar-foreground px-4 sm:px-8 lg:px-20 py-6 sm:py-8 md:py-10 mb-10 border-b border-sidebar-border min-h-[60px]">
      <div className="flex items-center justify-between max-w-[1860px] mx-auto w-full">

        {/* Seção Esquerda: Logo */}
        <div className="flex items-center pl-8 mr-auto ml-4">
          <Link href="/" aria-label="Página inicial do SGM" className="flex items-center gap-8  ">
            <Image
              src="/images/logo/logo-sgm-sidebar.png"
              width={130}
              height={90}
              alt="Logo SGM"
            />
          </Link>
        </div>

        {/* Seção Direita: Ícones de alerta e perfil */}
        <ul className="flex items-center gap-4 md:gap-6 pr-4 sm:pr-8">
          <li>
            <Link href="/alertas" aria-label="Ver Alertas">
              <FaRegEnvelope className="text-2xl hover:opacity-80 transition" />
            </Link>
          </li>
          <li>
            <Link
              href="/configuracoes"
              className="flex items-center gap-3 p-4 rounded-md hover:bg-blue-900 transition-colors"
              aria-label="Acessar configurações do perfil"
            >
              <Image
                src="/images/icons/perfil.png"
                width={40}
                height={40}
                className="rounded-full border-2 border-sidebar-border"
                alt="Foto de Perfil"
              />
              <div className="flex flex-col pl-8">
                <span className="text-base font-semibold">Ricardo</span>
                <span className="text-xs text-muted-foreground">Administrador</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
