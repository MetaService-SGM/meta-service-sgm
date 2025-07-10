"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import React, { useState, useEffect } from "react";
import { FormActionsButton } from "@/components/ui/button/FormActionsButton";

type Material = {
  id: number;
  ca: string;
  produto: string;
  data: string;
  quantidade: number;
  tamanho: string;
  cor: string;
  codigoInterno: string;
  descricao: string;
};

const LOCAL_STORAGE_KEY_RASCUNHO = "rascunho-material";
const LOCAL_STORAGE_KEY_MATERIAIS = "materiais";

const FORM_INICIAL: Material = {
  id: 0,
  ca: "",
  produto: "",
  data: "",
  quantidade: 0,
  tamanho: "",
  cor: "",
  codigoInterno: "",
  descricao: "",
};

export default function CadastroMateriais() {
  const router = useRouter();

  const [formData, setFormData] = useState<Material>(FORM_INICIAL);

  // Carrega o rascunho ao iniciar
  useEffect(() => {
    const rascunhoSalvo = localStorage.getItem(LOCAL_STORAGE_KEY_RASCUNHO);
    if (rascunhoSalvo) {
      const dadosSalvos = JSON.parse(rascunhoSalvo);
      setFormData({ ...FORM_INICIAL, ...dadosSalvos });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value,
    }));
  };

  const salvarRascunho = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RASCUNHO, JSON.stringify(formData));
    alert("Rascunho salvo com sucesso!");
  };

  const cancelar = () => {
    if (
      window.confirm(
        "Tem certeza que deseja cancelar? Todas as alterações serão perdidas."
      )
    ) {
      setFormData(FORM_INICIAL);
      localStorage.removeItem(LOCAL_STORAGE_KEY_RASCUNHO);
      router.push("/estoque");
    }
  };

  const enviarFormulario = () => {
    const caValido = /^\d{6}$/.test(formData.ca);
    const codigoInternoValido = /^\d{8}$/.test(formData.codigoInterno);

    const camposFaltando: string[] = [];

    if (!formData.ca) camposFaltando.push("C.A");
    if (!formData.produto) camposFaltando.push("Produto");
    if (!formData.data) camposFaltando.push("Data de Emissão");
    if (!formData.quantidade) camposFaltando.push("Quantidade");
    if (!formData.tamanho) camposFaltando.push("Tamanho");
    if (!formData.cor) camposFaltando.push("Cor");
    if (!formData.codigoInterno) camposFaltando.push("Código Interno");

    if (camposFaltando.length > 0) {
      alert(
        `Por favor, preencha os seguintes campos obrigatórios:\n- ${camposFaltando.join(
          "\n- "
        )}`
      );
      return;
    }

    if (!caValido || !codigoInternoValido) {
      alert(
        "Verifique os campos:\n- C.A deve conter 6 números\n- Código Interno deve conter 8 números"
      );
      return;
    }

    try {
      const jsonMateriais = localStorage.getItem(LOCAL_STORAGE_KEY_MATERIAIS);
      const listaMateriais: Material[] = jsonMateriais
        ? JSON.parse(jsonMateriais)
        : [];

      const maiorIdExistente = listaMateriais.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      const novoId = maiorIdExistente + 1;

      const novoMaterial: Material = {
        ...formData,
        id: novoId,
      };

      const novaLista = [...listaMateriais, novoMaterial];
      localStorage.setItem(
        LOCAL_STORAGE_KEY_MATERIAIS,
        JSON.stringify(novaLista)
      );
      localStorage.removeItem(LOCAL_STORAGE_KEY_RASCUNHO);
      setFormData(FORM_INICIAL);
      router.push("/estoque");
    } catch (error) {
      console.error("Erro ao salvar o material:", error);
      alert("Erro ao salvar o material. Por favor, tente novamente.");
    }
  };

  return (
    <PageLayout>
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Cadastro de Materiais</h1>

          <div className="bg-gray-50 rounded-lg p-6 shadow-inner space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  C.A
                </label>
                <input
                  name="ca"
                  value={formData.ca}
                  onChange={handleChange}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  minLength={6}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  placeholder="ex: 123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Produto
                </label>
                <input
                  name="produto"
                  value={formData.produto}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Data de Emissão
                </label>
                <input
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantidade
                </label>
                <input
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  type="number"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tamanho
                </label>
                <input
                  name="tamanho"
                  value={formData.tamanho}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cor
                </label>
                <input
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código Interno
                </label>
                <input
                  name="codigoInterno"
                  value={formData.codigoInterno}
                  onChange={handleChange}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{8}"
                  maxLength={8}
                  minLength={8}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  placeholder="ex: 12345678"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
                />
              </div>
            </div>
          </div>

          <FormActionsButton
            onCancel={cancelar}
            onSaveDraft={salvarRascunho}
            onClick={enviarFormulario}
          />
        </div>
      </div>
    </PageLayout>
  );
}
