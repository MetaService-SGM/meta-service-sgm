import { PageLayout } from "@/components/ui/layout/PageLayout";
import { formatDatePTBR } from "@/components/utils/formatDate";

export default function BemvindoPage() {
  const dataFormatada = formatDatePTBR();

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 px-4">
        <h1 className="text-2xl font-semibold">
          Bem-vindo(a) ao <b>SGM</b>!
        </h1>
        <p className="max-w-lg text-gray-700">
          Utilize a barra de menus para ter acesso às funcionalidades do
          sistema.
        </p>
        <span className="text-sm text-gray-600">{dataFormatada}</span>
      </div>
    </PageLayout>
  );
}
