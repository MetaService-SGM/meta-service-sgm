export interface Companies {
    companyId: string;
    companyCNPJ: string;
    companyName: string;
    companySegment: string;
    companyCity: string;
    companyCEP: string;
}

interface TableCompaniesProps {
    data: Companies[]
}


export default function TableCompanies(props: TableCompaniesProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6 font-sans">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Razão Social</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Segmento</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cidade</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CEP</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((e) => (
            <tr key={e.companyId} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.companyId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {e.companyCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.companyName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {e.companySegment}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{e.companyCity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {e.companyCEP.replace(/^(\d{5})(\d{3})$/, "$1-$2")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}