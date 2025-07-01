"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { TitlePage } from "@/components/ui/title/TitlePage";

type AlertCategory = "certification" | "material";

interface Alert {
  id: number;
  category: AlertCategory;
  message: string;
  resolved: boolean;
  reference_type: string;
  reference_id: number;
  created_at: string;
  employee_name?: string;
}

type FiltroValue = "todos" | "mais_recente" | "mais_antigo" | AlertCategory;

interface FiltroOption {
  label: string;
  value: FiltroValue;
}

const FILTROS: FiltroOption[] = [
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
  const [filtro, setFiltro] = useState<FiltroValue>("todos");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) throw new Error("Token de acesso não encontrado");

        const response = await fetch(
          "https://meta-service-sgm.fly.dev/api/v1/alerts",
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": token,
              client: localStorage.getItem("client") || "",
              uid: localStorage.getItem("uid") || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data: Alert[] = await response.json();
        setAlerts(data);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Ocorreu um erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const applyFiltro = (): Alert[] => {
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

  const formatDate = (dateStr: string): string => {
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
      <main className="min-h-screen">
        <TitlePage>Alertas</TitlePage>

        {/* Filtros */}
        <div className="mb-4 flex flex-wrap gap-4">
          {FILTROS.map((f) => (
            <label key={f.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="filtro"
                value={f.value}
                checked={filtro === f.value}
                onChange={(e) => setFiltro(e.target.value as FiltroValue)}
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
                        {alert.category === "certification" &&
                        alert.employee_name
                          ? alert.employee_name
                          : "—"}
                      </td>
                      <td className="py-2 px-4">
                        {alert.resolved ? (
                          <span className="text-green-500">✅ Resolvido</span>
                        ) : (
                          <span className="text-red-500">🔴 Pendente</span>
                        )}
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
