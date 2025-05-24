'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/ui/layout/PageLayout";

export default function Staff() {
   const router = useRouter()

  const handleClick = () => {
    router.push('/pessoal/consulta') // caminho da página de destino
  }

  return (
    <PageLayout>
      <div className="flex min-h-screen justify-center gap-10 text-center">
        <Button onClick={handleClick} variant={"select"} >Consultar</Button>
        <Button variant={"secondary"}>Cadastrar</Button>
      </div>
    </PageLayout>
  );
}
