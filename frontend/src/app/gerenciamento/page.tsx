"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import FiltrosUsuarios from "@/components/ui/filters/UsersFilter";
import { TitlePage } from "@/components/ui/title/TitlePage";

interface Usuario {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  cpf?: string;
  contract_type?: string;
  active?: boolean;
}

interface FiltrosUsuario {
  name?: string;
  email?: string;
  role?: string;
  cpf?: string;
  contract_type?: string;
  active?: boolean | string;
}

export default function ListaUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosUsuario>({});

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!accessToken || !client || !uid) {
      throw new Error("Token de autenticação não encontrado");
    }

    return {
      "access-token": accessToken,
      client,
      uid,
      "Content-Type": "application/json",
    };
  };

  const carregarUsuarios = useCallback(
    async (filtrosAplicados: FiltrosUsuario = {}) => {
      setCarregando(true);
      setErro(null);
      try {
        const headers = getAuthHeaders();
        const params = new URLSearchParams();
        const filtrosParaAPI: Record<string, string | boolean> = {};

        Object.entries(filtrosAplicados).forEach(([key, value]) => {
          if (value !== "" && value !== undefined && value !== null) {
            if (value === "true") filtrosParaAPI[key] = true;
            else if (value === "false") filtrosParaAPI[key] = false;
            else filtrosParaAPI[key] = value as string;
          }
        });

        if (Object.keys(filtrosParaAPI).length > 0) {
          params.append("q", JSON.stringify(filtrosParaAPI));
        }

        const url = `https://meta-service-sgm.fly.dev/users?${params.toString()}`;
        const response = await fetch(url, { headers });

        if (!response.ok)
          throw new Error(`Erro ao buscar usuários: ${response.status}`);

        const data: Usuario[] = await response.json();
        setUsuarios(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro("Erro desconhecido");
        }
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      carregarUsuarios(filtros);
    }, 500);

    return () => clearTimeout(timer);
  }, [router, filtros, carregarUsuarios]);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      return (
        (!filtros.name ||
          usuario.name?.toLowerCase().includes(filtros.name.toLowerCase())) &&
        (!filtros.email ||
          usuario.email?.toLowerCase().includes(filtros.email.toLowerCase())) &&
        (!filtros.role ||
          usuario.role?.toLowerCase().includes(filtros.role.toLowerCase())) &&
        (!filtros.cpf || usuario.cpf?.includes(filtros.cpf)) &&
        (!filtros.contract_type ||
          usuario.contract_type === filtros.contract_type) &&
        (filtros.active === undefined ||
          filtros.active === "" ||
          (filtros.active === "true" && usuario.active === true) ||
          (filtros.active === "false" && usuario.active === false))
      );
    });
  }, [usuarios, filtros]);

  const formatarCPF = (cpf?: string) => {
    if (!cpf) return "—";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };


  return (
    <PageLayout>
      <main>
        <div className="flex justify-between items-center mb-4">
          <TitlePage>Lista de Usuários</TitlePage>
        </div>

        <FiltrosUsuarios filtros={filtros} setFiltros={setFiltros} />

        {carregando ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Carregando usuários...</p>
          </div>
        ) : erro ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-sm text-red-700">{erro}</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
            <p className="text-gray-500">
              {usuarios.length === 0
                ? "Nenhum usuário encontrado."
                : "Nenhum usuário corresponde aos filtros aplicados."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2b426e] text-white">
                <tr>
                  {[
                    "ID",
                    "Nome",
                    "Email",
                    "Cargo",
                    "CPF",
                    "Tipo Contrato",
                    "Status",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuariosFiltrados.map((usuario, idx) => {
                  const id = usuario._id ?? usuario.id ?? `usuario-${idx}`;
                  const ativo = usuario.active !== false;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {usuario.name ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {usuario.email ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {usuario.role ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {formatarCPF(usuario.cpf)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {usuario.contract_type ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            ativo
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}


      </main>
    </PageLayout>
  );
}
