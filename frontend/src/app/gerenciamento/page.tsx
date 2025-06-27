"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/ui/layout/PageLayout";

interface Usuario {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

export default function ListaUsuarios() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Função para pegar headers com token para autenticação
  function getAuthHeaders() {
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
  }

  useEffect(() => {
    async function carregarUsuarios() {
      setCarregando(true);
      setErro(null);
      try {
        const headers = getAuthHeaders();

        const response = await fetch("https://meta-service-sgm.fly.dev/users", {
          headers,
        });

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
    }

    const role = localStorage.getItem("role");
    if (!role || role.toLowerCase() !== "admin") {
      router.push("/naoautorizado");
      return;
    }

    carregarUsuarios();
  }, [router]);

  return (
    <PageLayout>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>

        {carregando ? (
          <p>Carregando usuários...</p>
        ) : erro ? (
          <p className="text-red-600">Erro: {erro}</p>
        ) : usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Cargo</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, idx) => {
                const id = usuario._id ?? usuario.id ?? `usuario-${idx}`;
                const ativo = usuario.active !== false;

                return (
                  <tr
                    key={id}
                    className={!ativo ? "bg-red-50 text-gray-500" : ""}
                  >
                    <td className="border border-gray-300 p-2">{id}</td>
                    <td className="border border-gray-300 p-2">
                      {usuario.name ?? "—"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.email ?? "—"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.role ?? "—"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {ativo ? "Ativo" : "Inativo"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </PageLayout>
  );
}
