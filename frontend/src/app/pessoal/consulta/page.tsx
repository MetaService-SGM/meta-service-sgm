import { PageLayout } from "@/components/ui/layout/PageLayout";
import Image from "next/image";

export default function Home() {
  return (
    <PageLayout>
      <main className="bg-gray-100 min-h-screen p-4 ">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center mb-4">
            <h1 className="text-2xl  font-bold text-gray-800 mr-30">
              Consulta de Colaborador
            </h1>
          </div>

          <div className="flex flex-col items-center text-center md:col-span-2">
            <Image
              src="/images/icons/colaborador.png"
              alt="Foto de perfil"
              className="rounded-full border-2 border-blue-500"
              width={150}
              height={150}
            />
            <h1 className="text-xl font-semibold mt-2">
              Anderson Lima da Silva
            </h1>
            <span className="text-green-600 font-bold">Chamar</span>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm ">
            <h2 className="font-bold mb-4 text-center text-xl">
              Dados Pessoais
            </h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Nome Social:</strong> Anderson Lima 
              </li>
              <li>
                <strong>Apelido:</strong> Eminho
              </li>
              <li>
                <strong>Função:</strong> Soldador
              </li>
              <li>
                <strong>Gênero:</strong> Masculino
              </li>
              <li>
                <strong>Telefone:</strong> (81) 91234-5678
              </li>
              <li>
                <strong>Data de Nascimento:</strong> 03/03/1986 (39 anos)
              </li>
              <li>
                <strong>Raça/Cor:</strong> Branca
              </li>
              <li>
                <strong>Estado Civil:</strong> Solteiro
              </li>
              <li>
                <strong>Nacionalidade:</strong> Brasileiro
              </li>
              <li>
                <strong>Situação:</strong> Ativo
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">Endereço</h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Ponto de Encontro:</strong> Entrada do Parque
              </li>
              <li>
                <strong>Referência:</strong> Próximo à estação Vila Madalena
              </li>
              <li>
                <strong>CEP:</strong> 05435-000
              </li>
              <li>
                <strong>Cidade:</strong> São Paulo
              </li>
              <li>
                <strong>Bairro:</strong> Vila Madalena
              </li>
              <li>
                <strong>Rua:</strong> Rua Purpurina
              </li>
              <li>
                <strong>Número:</strong> 150
              </li>
              <li>
                <strong>Complemento:</strong> Em frente ao número 175
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">Educação</h2>
            <ul className="text-sm text-gray-700 ml-3  mb-4 space-y-1">
              <li>
                <strong>Escolaridade:</strong> Ensino Médio Completo
              </li>
              <li>
                <strong>Técnico:</strong> Ensino Médio
              </li>
              <li>
                <strong>Ensino Superior:</strong> Não
              </li>
              <li>
                <strong>Pós-graduação:</strong> -
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">Contatos</h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Celular 1:</strong> (11) 91234-5678 (Vivo)
              </li>
              <li>
                <strong>Celular 2:</strong> (11) 99876-5432 (Claro)
              </li>
              <li>
                <strong>Celular 3:</strong> (11) 33456-7890 (TIM)
              </li>
              <li>
                <strong>Contato de Emergência:</strong> Ana Beatriz Souza (Irmã)
              </li>
              <li>
                <strong>Telefone de Emergência:</strong> (11) 98765-4321
              </li>
              <li>
                <strong>Email:</strong> andersonlima88@gmail.com
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">
              Informações Profissionais
            </h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Certificado:</strong> NR-10, Empilhadeira
              </li>
              <li>
                <strong>Data Emissão NR10:</strong> 10/01/2024
              </li>
              <li>
                <strong>Validade NR10:</strong> 10/01/2026
              </li>
              <li>
                <strong>ASO:</strong> Apto para atividades em altura
              </li>
              <li>
                <strong>Data do ASO:</strong> 05/02/2025
              </li>
              <li>
                <strong>Validade ASO:</strong> 05/02/2026
              </li>
              <li>
                <strong>Capacete:</strong> Tam: único
              </li>
              <li>
                <strong>Luvas:</strong> Tam: P
              </li>
              <li>
                <strong>Calçado:</strong> Tam: 43
              </li>
              <li>
                <strong>Altura:</strong> 1.78 m
              </li>
              <li>
                <strong>Peso:</strong> 78 kg
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">
              Dados Contratuais
            </h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Empresa:</strong> SGM 
              </li>
              <li>
                <strong>Departamento:</strong> Manutenção / Soldagem
              </li>
              <li>
                <strong>Cargo:</strong> Soldador MIG/MAG Pleno
              </li>
              <li>
                <strong>Unidade:</strong> Belo Horizonte/MG
              </li>
              <li>
                <strong>Turno:</strong> 6x1 (6h às 18h)
              </li>
              <li>
                <strong>Salário:</strong> R$ 30,00/h
              </li>
              <li>
                <strong>Admissão:</strong> 10/02/2023
              </li>
              <li>
                <strong>Contrato:</strong> até 09/05/2025
              </li>
              <li>
                <strong>Faltas:</strong> 25 dias
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-4 text-center text-xl">Dependentes</h2>
            <ul className="text-sm text-gray-700 ml-3 mb-4 space-y-1">
              <li>
                <strong>Nome:</strong> Lucas Henrique da Silva
              </li>
              <li>
                <strong>Data de Nascimento:</strong> 15/03/2010
              </li>
              <li>
                <strong>Idade:</strong> 15 anos
              </li>
              <li>
                <strong>Documentos:</strong>
              </li>
              <ul className="ml-4 list-disc">
                <li>
                  <a href="#" className="text-blue-600 underline">
                    lucas_documento.frente.pdf
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    lucas_documento.verso.pdf
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
