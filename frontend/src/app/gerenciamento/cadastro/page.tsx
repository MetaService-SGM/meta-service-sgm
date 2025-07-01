"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { TitlePage } from "@/components/ui/title/TitlePage";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface UsuarioForm {
  name: string;
  email: string;
  role: string;
  cpf: string;
  contract_type: string;
  active: boolean;
  password: string;
  confirmPassword?: string;
}

export default function CadastroUsuario() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<UsuarioForm>({
    name: "",
    email: "",
    role: "",
    cpf: "",
    contract_type: "CLT",
    active: true,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      router.push("/login");
      throw new Error("Token de autenticação não encontrado");
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !usuario.name.trim() ||
      !usuario.email.trim() ||
      !usuario.role.trim() ||
      !usuario.cpf.trim() ||
      !usuario.contract_type.trim() ||
      !usuario.password.trim()
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (usuario.password !== usuario.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const toastId = toast.loading("Cadastrando usuário...");
    setLoading(true);

    try {
      const headers = getAuthHeaders();
      const body = {
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
        cpf: usuario.cpf,
        contract_type: usuario.contract_type,
        active: usuario.active,
        password: usuario.password,
      };

      console.log("Body enviado:", body);

      const response = await fetch(`https://meta-service-sgm.fly.dev/users`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      toast.success("Usuário cadastrado com sucesso!", { id: toastId });
      router.push("/gerenciamento/usuarios");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário", { id: toastId });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setUsuario({
      ...usuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <PageLayout>
      <main className="p-6">
        <TitlePage>Cadastrar Usuário</TitlePage>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <Input
                type="text"
                name="name"
                value={usuario.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo *
              </label>
              <select
                name="role"
                value={usuario.role}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-2 border border-gray-300 rounded-md text-sm shadow-sm"
              >
                <option value="">Selecione o cargo</option>
                <option value="admin">Admin</option>
                <option value="gerente">Gerente</option>
                <option value="contratado">Contratado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <Input
                type="text"
                name="cpf"
                value={usuario.cpf}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Contrato *
              </label>
              <select
                name="contract_type"
                value={usuario.contract_type}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-2 border border-gray-300 rounded-md text-sm shadow-sm"
              >
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Freelancer">Freelancer</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={usuario.active}
                onChange={handleChange}
                disabled={loading}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                Ativo
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <Input
                type="password"
                name="password"
                value={usuario.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha *
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={usuario.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Cadastrando..." : "Cadastrar Usuário"}
            </button>
          </div>
        </form>
      </main>
    </PageLayout>
  );
}
