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
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6 font-sans">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              N° OS
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Data de abertura
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Solicitante
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Responsável
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Prioridade
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((e) => (
            <tr key={e.NOS} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {e.NOS}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {e.OpeningDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {e.Request}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {e.Responsible}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  e.Status === 'Aberta' ? 'bg-yellow-100 text-yellow-800' :
                  e.Status === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                  e.Status === 'Concluída' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {e.Status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  e.Priority === 'Alta' ? 'bg-red-100 text-red-800' :
                  e.Priority === 'Média' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {e.Priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-2">
                  <GoChevronRight className="text-xl text-gray-500 hover:text-blue-600 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors" />
                  <GoX className="text-xl text-gray-500 hover:text-red-600 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors" />
                  <GoChecklist className="text-xl text-gray-500 hover:text-green-600 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}