export interface Company {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  segmento: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  created_at: string;
  updated_at: string;
}

interface TableCompaniesProps {
  data: Company[];
}

export default function TableCompanies({ data }: TableCompaniesProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg mt-8 font-sans">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">CNPJ</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Razão Social</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Nome Fantasia</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Segmento</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Inscrições</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Cadastro</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                {company.cnpj}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{company.razao_social}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {company.nome_fantasia || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {company.segmento}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">IE: {company.inscricao_estadual || 'Não informada'}</span>
                  <span className="font-medium">IM: {company.inscricao_municipal || 'Não informada'}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col">
                  <span>Criado em: {new Date(company.created_at).toLocaleDateString()}</span>
                  <span>Atualizado em: {new Date(company.updated_at).toLocaleDateString()}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}