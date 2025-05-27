import { PageLayout } from "@/components/ui/layout/PageLayout";
import { formatDatePTBR } from "@/components/utils/formatDate";

export default function BemvindoPage() {
  const dataFormatada = formatDatePTBR();

  return (
    // <PageLayout fixedHeight="1300px">
    <PageLayout>

      <div className="h-full flex items-center justify-center">

        <div className="flex flex-col items-center text-center space-y-4">
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
      </div>
    </PageLayout>
  );
}