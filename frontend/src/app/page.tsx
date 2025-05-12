import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

export default function Home() {
  return (
    <div
      style={{ fontFamily: "var(--font-nunito)" }}
      className="text-2xl text-black"
    >
      <Label>Nome</Label>
      <Input placeholder="Digite aqui"/>
      <Button className="cursor-pointer">Enviar</Button>
    </div>
  );
}
