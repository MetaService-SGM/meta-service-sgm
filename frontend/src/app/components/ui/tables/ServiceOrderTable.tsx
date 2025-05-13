import { GoChevronRight, GoChecklist, GoX } from "react-icons/go";

export interface ServiceOrder {
    NOS: string;
    OpeningDate: string;
    Request: string;
    Responsible: string;
    Status: "Em análise" | "Aberta" | "Concluída" | "Cancelada";
    Priority: "Baixa" | "Média" | "Alta";
}

export interface ServiceOrderTableProps {
    data: ServiceOrder[];
}

export default function ServiceOrderTable(props: ServiceOrderTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md mt-6">
            <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-600">
                    <tr>
                        <th className="px-4 py-3 border-b">N° OS</th>
                        <th className="px-4 py-3 border-b">Data de abertura</th>
                        <th className="px-4 py-3 border-b">Solicitante</th>
                        <th className="px-4 py-3 border-b">Responsável</th>
                        <th className="px-4 py-3 border-b">Status</th>
                        <th className="px-4 py-3 border-b">Prioridade</th>
                        <th className="px-4 py-3 border-b text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((e) => (
                        <tr key={e.NOS} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2 border-b">{e.NOS}</td>
                            <td className="px-4 py-2 border-b">{e.OpeningDate}</td>
                            <td className="px-4 py-2 border-b">{e.Request}</td>
                            <td className="px-4 py-2 border-b">{e.Responsible}</td>
                            <td className="px-4 py-2 border-b">{e.Status}</td>
                            <td className="px-4 py-2 border-b">{e.Priority}</td>
                            <td className="px-4 py-2 border-b">
                                <div className="flex items-center justify-center gap-2">
                                    <GoChevronRight className="text-xl p-1 rounded hover:bg-gray-200 cursor-pointer" />
                                    <GoX className="text-xl p-1 rounded hover:bg-red-200 cursor-pointer" />
                                    <GoChecklist className="text-xl p-1 rounded hover:bg-green-200 cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
