import { Header } from "@/components/ui/header/Header";
import MainBackground from "@/components/ui/MainBackGround";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import { formatDatePTBR } from "@/components/utils/formatDate";

export default function BemvindoPage() {
  const dataFormatada = formatDatePTBR();

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <MainBackground className="space-y-2 text-center flex flex-col justify-center items-center">
          <div>
            <h1>
              Bem-Vindo(a) ao <b>SGM!</b>
            </h1>
          </div>
          <div>
            <p>
              Utilize a barra de menus para ter acesso às funcionalidades do
              sistema.
            </p>
          </div>
          <div>
            <span>{dataFormatada}</span>
          </div>
        </MainBackground>
      </div>
    </>
  );
}
