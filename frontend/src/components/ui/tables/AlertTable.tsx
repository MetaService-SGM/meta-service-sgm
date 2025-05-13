import { GoChevronRight } from "react-icons/go";
import { GoX } from "react-icons/go";

export interface Alert {
    alertType: "Estoque" | "Documentação"
    alertData: string;
    alertDescription: string;
    idCollaborator: string;
    alertId: string;
    alertTitle: "Doc à exp" | "Bx Estoque";
}

interface AlertTableProps {
    data: Alert[];
}

export default function AlertTable(props: AlertTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Título</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID Colaborador</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((e) => (
            <tr key={e.alertId} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{e.alertId}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{e.alertTitle}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  e.alertType === 'Documentação' ? 'bg-red-100 text-red-800' :
                  e.alertType === 'Estoque' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {e.alertType}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{e.alertData}</td>
              <td className="px-6 py-5 text-sm text-gray-600 max-w-xs truncate">{e.alertDescription}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                {e.idCollaborator ? e.idCollaborator : "-"}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <GoChevronRight className="text-xl text-gray-500 hover:text-blue-600 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors" />
                  <GoX className="text-xl text-gray-500 hover:text-red-600 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
