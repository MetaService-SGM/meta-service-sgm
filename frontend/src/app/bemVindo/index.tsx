import { PageLayout } from "@/components/ui/layout/PageLayout";
import { formatDatePTBR } from "@/components/utils/formatDate";

export default function BemvindoPage() {
  const dataFormatada = formatDatePTBR();

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
        <h1>
          Bem-Vindo(a) ao <b>SGM!</b>
        </h1>
        <div>
          <p className="max-w-lg">
            Utilize a barra de menus para ter acesso às funcionalidades do
            sistema.
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-600">{dataFormatada}</span>
        </div>
      </div>
    </PageLayout>
  );
}
