"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FiltrosUsuario {
  name?: string;
  email?: string;
  role?: string;
  cpf?: string;
  contract_type?: string;
  active?: boolean | string;
}

interface FiltrosUsuariosProps {
  filtros: FiltrosUsuario;
  setFiltros: (filtros: FiltrosUsuario) => void;
}

export default function FiltrosUsuarios({
  filtros,
  setFiltros,
}: FiltrosUsuariosProps) {
  const [filtrosLocais, setFiltrosLocais] = useState<FiltrosUsuario>(filtros);
  const router = useRouter();

  useEffect(() => {
    setFiltrosLocais(filtros);
  }, [filtros]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltros(filtrosLocais);
    }, 300);

    return () => clearTimeout(timer);
  }, [filtrosLocais, setFiltros]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            type="text"
            value={filtrosLocais.name || ""}
            onChange={(e) =>
              setFiltrosLocais({ ...filtrosLocais, name: e.target.value })
            }
            placeholder="Filtrar por nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="text"
            value={filtrosLocais.email || ""}
            onChange={(e) =>
              setFiltrosLocais({ ...filtrosLocais, email: e.target.value })
            }
            placeholder="Filtrar por email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo
          </label>
          <Input
            type="text"
            value={filtrosLocais.role || ""}
            onChange={(e) =>
              setFiltrosLocais({ ...filtrosLocais, role: e.target.value })
            }
            placeholder="Filtrar por cargo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CPF
          </label>
          <Input
            type="text"
            value={filtrosLocais.cpf || ""}
            onChange={(e) =>
              setFiltrosLocais({ ...filtrosLocais, cpf: e.target.value })
            }
            placeholder="Filtrar por CPF"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Contrato
          </label>
          <select
            value={filtrosLocais.contract_type || ""}
            onChange={(e) =>
              setFiltrosLocais({
                ...filtrosLocais,
                contract_type: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={(filtrosLocais.active as string) || ""}
            onChange={(e) =>
              setFiltrosLocais({ ...filtrosLocais, active: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-s cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={() => {
              setFiltrosLocais({});
              setFiltros({});
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
          <button
            onClick={() => router.push("/gerenciamento/cadastro")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Adicionar Usuário
          </button>
        </div>
      </div>
    </div>
  );
}
