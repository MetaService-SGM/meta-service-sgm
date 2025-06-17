import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

export default function ButtonMenu() {
  const router = useRouter();

  const handleClickConsultation = () => {
    router.push("/pessoal/consulta"); // caminho da página de destino
  };
  const handleClickRegister = () => {
    router.push("/pessoal/cadastro/dadosPessoais"); // caminho da página de destino
  };

  return (
    <div className="flex justify-center gap-10 text-center">
      <Button onClick={handleClickConsultation} variant={"select"}>
        Consultar
      </Button>
      <Button variant={"secondary"} onClick={handleClickRegister}>
        Cadastrar
      </Button>
    </div>
  );
}
