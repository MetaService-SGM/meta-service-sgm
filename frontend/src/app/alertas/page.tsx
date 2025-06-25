"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/ui/layout/PageLayout";

interface Alert {
  id: number;
  category: "certification" | "material";
  message: string;
  resolved: boolean;
  reference_type: string;
  reference_id: number;
  created_at: string;
}

const FILTROS = [
  { label: "Todos", value: "todos" },
  { label: "Mais recente", value: "mais_recente" },
  { label: "Mais antigo", value: "mais_antigo" },
  { label: "Documentação", value: "certification" },
  { label: "Estoque", value: "material" },
];

export default function AlertaPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("https://meta-service-sgm.fly.dev/api/v1/alerts", {
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("access-token") || "",
            client: localStorage.getItem("client") || "",
            uid: localStorage.getItem("uid") || "",
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar alertas");

        const data = await response.json();
        setAlerts(data);
      } catch (err: any) {
        console.error(err);
        setErro("Não foi possível carregar os alertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const applyFiltro = () => {
    let filtrado = [...alerts];

    if (filtro === "mais_recente") {
      filtrado.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (filtro === "mais_antigo") {
      filtrado.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (filtro === "certification" || filtro === "material") {
      filtrado = filtrado.filter((a) => a.category === filtro);
    }

    return filtrado;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const parseMensagem = (
    mensagem: string
  ): { nome: string; restante: string } => {
    const match = mensagem.match(/'(.+?)'\s(.*)/);
    let nome = "";
    let restante = mensagem;

    if (match) {
      nome = match[1];
      restante = match[2];

      // Reformatar mensagem de estoque mínimo
      const estoqueRegex =
        /está abaixo do mínimo \((\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\)/i;
      const estoqueMatch = restante.match(estoqueRegex);
      if (estoqueMatch) {
        const atual = estoqueMatch[1];
        const minimo = estoqueMatch[2];
        restante = `Estoque abaixo do mínimo: ${atual} disponíveis (mínimo: ${minimo})`;
      }
    }

    return { nome, restante };
  };

  const alertasFiltrados = applyFiltro();

  return (
    <PageLayout>
      <main className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-[#2b426e]">🔔 Alertas</h1>

        {/* Filtros */}
        <div className="mb-4 flex flex-wrap gap-4">
          {FILTROS.map((f) => (
            <label key={f.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="filtro"
                value={f.value}
                checked={filtro === f.value}
                onChange={(e) => setFiltro(e.target.value)}
              />
              {f.label}
            </label>
          ))}
        </div>

        {/* Mensagem de erro */}
        {erro && <div className="text-red-500 py-2">{erro}</div>}

        {/* Tabela */}
        {loading ? (
          <div>Carregando alertas...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#2b426e] text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Categoria</th>
                  <th className="py-2 px-4 text-left">Referência</th>
                  <th className="py-2 px-4 text-left">Mensagem</th>
                  <th className="py-2 px-4 text-left">Data</th>
                  <th className="py-2 px-4 text-left">Nome Colaborador</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {alertasFiltrados.map((alert) => {
                  const { nome, restante } = parseMensagem(alert.message);
                  return (
                    <tr key={alert.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        {alert.category === "certification"
                          ? "Documentação"
                          : "Estoque"}
                      </td>
                      <td className="py-2 px-4">{nome || "—"}</td>
                      <td className="py-2 px-4">{restante}</td>
                      <td className="py-2 px-4">
                        {formatDate(alert.created_at)}
                      </td>
                      <td className="py-2 px-4">
                        {alert.category === "certification"
                          ? alert.employee_name || "—"
                          : "—"}
                      </td>
                      <td className="py-2 px-4">
                        {alert.resolved ? "✅" : "🔴"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 text-sm text-gray-600">
              Total de registros: {alertasFiltrados.length}
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
