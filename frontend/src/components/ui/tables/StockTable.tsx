
export interface Product {
    productId: string;
    productName: string;
    productSize: string;
    productQuantity: number;
    productCA: string;
    productColor: string;
    productCI: string;
    productData: string;
}

interface StockTableProps {
    data: Product[];
}

export default function StockTable(props: StockTableProps) {
 return (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6 font-sans">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Título</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tamanho</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Data</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantidade</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CA</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cor</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cód Int</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {props.data.map((e) => (
          <tr key={e.productId} className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.productId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.productName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                {e.productSize}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {new Date(e.productData).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                e.productQuantity > 50 ? 'bg-green-100 text-green-800' :
                e.productQuantity > 10 ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {e.productQuantity}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{e.productCA}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <span 
                  className="flex-shrink-0 h-4 w-4 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: e.productColor || '#ccc' }}
                />
                <span className="text-sm text-gray-600">{e.productColor || 'N/A'}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              {e.productCI}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}