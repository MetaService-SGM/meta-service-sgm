
import { GoChevronRight, GoX } from 'react-icons/go';

export interface Alert {
    alertType: "Estoque" | "Documentação";
    alertData: string;
    alertDescription: string;
    idCollaborator: string | null;
    alertId: string;
    alertTitle: "Doc à exp" | "Bx Estoque";
}


interface AlertTableProps {
    data: Alert[];
}

export default function AlertTable(props: AlertTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6 font-sans">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Data</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID Colaborador</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((e) => (
            <tr key={e.alertId} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {e.alertId.substring(0, 8)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {e.alertTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  e.alertType === 'Documentação' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {e.alertType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {e.alertData}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {e.alertDescription}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {e.idCollaborator ? e.idCollaborator.substring(0, 8) + '...' : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
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