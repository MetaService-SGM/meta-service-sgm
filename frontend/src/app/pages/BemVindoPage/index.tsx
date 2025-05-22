import { PageLayout } from "@/components/ui/layout/PageLayout";
import { formatDatePTBR } from "@/components/utils/formatDate";

export default function BemvindoPage() {
  const dataFormatada = formatDatePTBR();

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col justify-center items-center space-y-2 text-center">
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
      </div>
    </PageLayout>
  );
}
