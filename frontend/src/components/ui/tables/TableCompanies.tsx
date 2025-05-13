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
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CNPJ</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Razão social</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Segmento</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cidade</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CEP</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((e) => (
            <tr key={e.companyId} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{e.companyId}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{e.companyCNPJ}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{e.companyName}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{e.companySegment}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{e.companyCity}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{e.companyCEP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}