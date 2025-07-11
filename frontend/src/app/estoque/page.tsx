'use client';

import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/layout/PageLayout';
import { TitlePage } from '@/components/ui/title/TitlePage';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

type Material = {
  id: number;
  produto: string;
  tamanho: string;
  data: string;
  quantidade: number;
  ca: string;
  cor: string;
  codigoInterno: string;
};

const opcoesCampos = [
  { label: 'Produto', value: 'produto' },
  { label: 'Tamanho', value: 'tamanho' },
  { label: 'Data', value: 'data' },
  { label: 'Quantidade', value: 'quantidade' },
  { label: 'Código Interno', value: 'codigoInterno' },
];

const LOCAL_STORAGE_KEY = 'materiais';

const BASE_MATERIAIS: Material[] = [
  { id: 20, produto: 'Camisa mang. curta', tamanho: 'P', data: '12/02/2017', quantidade: 4, ca: '323334', cor: 'Azul', codigoInterno: '00000020' },
  { id: 21, produto: 'Camisa mang. curta', tamanho: 'M', data: '12/02/2017', quantidade: 3, ca: '363738', cor: 'Branco', codigoInterno: '00000020' },
  { id: 22, produto: 'Capacete de segurança', tamanho: '56', data: '10/02/2017', quantidade: 7, ca: '353734', cor: 'Amarelo', codigoInterno: '00000022' },
  { id: 23, produto: 'Calça Jeans', tamanho: '52', data: '10/02/2017', quantidade: 1, ca: '353734', cor: 'Preto', codigoInterno: '00000023' },
  { id: 24, produto: 'Calça Jeans', tamanho: '54', data: '10/02/2017', quantidade: 2, ca: '323334', cor: 'Azul', codigoInterno: '00000023' },
  { id: 25, produto: 'Calça Jeans', tamanho: '58', data: '10/02/2017', quantidade: 4, ca: '323334', cor: 'Preto', codigoInterno: '00000023' },
];

export default function Estoque() {
  const router = useRouter();
  const [materiaisLocais, setMateriaisLocais] = useState<Material[]>([]);

  // Função para pegar headers com token para autenticação
  // function getAuthHeaders() {
  //   const accessToken = localStorage.getItem("access-token");
  //   const client = localStorage.getItem("client");
  //   const uid = localStorage.getItem("uid");

  //   if (!accessToken || !client || !uid) {
  //     throw new Error("Token de autenticação não encontrado");
  //   }

  //   return {
  //     "access-token": accessToken,
  //     client,
  //     uid,
  //     "Content-Type": "application/json",
  //   };
  // }

  // Ler materiais do localStorage quando montar
  useEffect(() => {
    try {
      const json = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (json) {
        const parsed: Material[] = JSON.parse(json);
        setMateriaisLocais(parsed || []);
      }
    } catch {
      setMateriaisLocais([]);
    }
  }, []);

  // Função para apagar um cadastro individual do localStorage
  const apagarCadastro = (id: number) => {
    if (window.confirm('Tem certeza que deseja apagar este cadastro?')) {
      const novaLista = materiaisLocais.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(novaLista));
      setMateriaisLocais(novaLista);
    }
  };

  // Combina base com materiais do localStorage e remove duplicados por id
   const dados = useMemo(() => {
    const map = new Map<number, Material>();
    BASE_MATERIAIS.forEach(item => map.set(item.id, item));
    materiaisLocais.forEach(item => map.set(item.id, item));
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
  }, [materiaisLocais]);

  const [filtro, setFiltro] = useState('');
  const [campo, setCampo] = useState('produto');

  const filtrados = dados.filter(item => {
    const campoSelecionado = campo as keyof Material;
    const valorCampo = item[campoSelecionado];
    return valorCampo?.toString().toLowerCase().includes(filtro.toLowerCase());
  });

  return (
    <PageLayout>
      <div className="min-h-screen bg-white flex flex-col items-center">
        <TitlePage>Consulta de Materiais</TitlePage>

        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-5xl mb-6">
          <div className="flex gap-2 mb-2 flex-wrap items-center justify-between">
            <input
              type="text"
              placeholder="Digite aqui..."
              className="border p-2 flex-grow min-w-[200px] rounded"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              aria-label="Campo de filtro"
            />

            <div className="flex space-x-4 items-center mt-2 md:mt-0">
              {opcoesCampos.map((opt) => (
                <label key={opt.value} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="campo"
                    value={opt.value}
                    checked={campo === opt.value}
                    onChange={() => setCampo(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}

              <Button
                onClick={() => router.push("/estoque/cadastro")}
                className="w-[15%] ml-70 py-2 px-4 "
              >
                Cadastrar Material
              </Button>
            </div>
          </div>
        </div>

        <table className="w-full max-w-5xl bg-white border-collapse border">
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
              <th className="border p-2 w-24">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((item) => {
              // Apenas habilita apagar se o item veio do localStorage
              const podeApagar = materiaisLocais.some((m) => m.id === item.id);
              return (
                <tr
                  key={item.id}
                  className="even:bg-white odd:bg-gray-50 divide-x divide-black"
                >
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.produto}</td>
                  <td className="border p-2">{item.tamanho}</td>
                  <td className="border p-2">{item.data}</td>
                  <td className="border p-2">{item.quantidade}</td>
                  <td className="border p-2">{item.ca}</td>
                  <td className="border p-2">{item.cor}</td>
                  <td className="border p-2">{item.codigoInterno}</td>
                  <td className="border p-2 text-center">
                    {podeApagar ? (
                      <button
                        onClick={() => apagarCadastro(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm"
                        aria-label={`Apagar cadastro ID ${item.id}`}
                      >
                        Apagar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Base</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="mt-4 text-sm w-full max-w-4xl text-left text-blue-600">
          Total de Registros: {filtrados.length}
        </p>
      </div>
    </PageLayout>
  );
}
