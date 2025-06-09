'use client';
import { PageLayout } from '@/components/ui/layout/PageLayout';
import { useState } from 'react'

type Material = {
  id: number
  produto: string
  tamanho: string
  data: string
  quantidade: number
  ca: string
  cor: string
  codigoInterno: string
}

const dados: Material[] = [
  { id: 20, produto: 'Camisa mang. curta', tamanho: 'P', data: '12/02/2017', quantidade: 4, ca: '323334', cor: 'Azul', codigoInterno: '00000020' },
  { id: 21, produto: 'Camisa mang. curta', tamanho: 'M', data: '12/02/2017', quantidade: 3, ca: '363738', cor: 'Branco', codigoInterno: '00000020' },
  { id: 22, produto: 'Capacete de segurança', tamanho: '56', data: '10/02/2017', quantidade: 7, ca: '353734', cor: 'Amarelo', codigoInterno: '00000022' },
  { id: 23, produto: 'Calça Jeans', tamanho: '52', data: '10/02/2017', quantidade: 1, ca: '353734', cor: 'Preto', codigoInterno: '00000023' },
  { id: 24, produto: 'Calça Jeans', tamanho: '54', data: '10/02/2017', quantidade: 2, ca: '323334', cor: 'Azul', codigoInterno: '00000023' },
  { id: 25, produto: 'Calça Jeans', tamanho: '58', data: '10/02/2017', quantidade: 4, ca: '323334', cor: 'Preto', codigoInterno: '00000023' },
]

export default function Home() {
  const [filtro, setFiltro] = useState('')
  const [campo, setCampo] = useState('Produto')

  const filtrados = dados.filter(item => {
    const campoSelecionado = campo.toLowerCase() as keyof Material
    return item[campoSelecionado]?.toString().toLowerCase().includes(filtro.toLowerCase())
  })

  return (
    <PageLayout>
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold items-start mb-4">Consulta de Materiais</h1>


    
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-4xl mb-6">

        <div className=" flex gap-2 mb-2  ">
          <input
            type="text"
            placeholder="Digite aqui..."
           className="border p-2 w-full mb-2 rounded"
           value={filtro}
           onChange={e => setFiltro(e.target.value)}
        />

          
            <button className="bg-blue-600 text-white px-8 py-2 gap-2 mb-3 rounded   hover:bg-blue-700">
            Filtrar
            </button>
          </div>

        <div className="flex space-x-4 mb-2">
          {['Produto', 'Tamanho', 'Data', 'Quantidade'].map(opt => (
            <label key={opt} className="flex items-center space-x-1">
              <input
                type="radio"
                name="campo"
                value={opt}
                checked={campo === opt}
                onChange={() => setCampo(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>

        
          
      </div>

      <table className="w-full max-w-4xl bg-white border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Produto</th>
            <th className="border p-2">Tamanho</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Quantidade</th>
            <th className="border p-2">CA</th>
            <th className="border p-2">Cor</th>
            <th className="border p-2">Código Interno</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.produto}</td>
              <td className="border p-2">{item.tamanho}</td>
              <td className="border p-2">{item.data}</td>
              <td className="border p-2">{item.quantidade}</td>
              <td className="border p-2">{item.ca}</td>
              <td className="border p-2">{item.cor}</td>
              <td className="border p-2">{item.codigoInterno}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm w-full max-w-3xl mr-15 text-left">Total de Registros: {filtrados.length}</p>
    </div>
    </PageLayout>
  );
};
