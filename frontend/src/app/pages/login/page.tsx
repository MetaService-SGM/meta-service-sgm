"use client";

// Importações de bibliotecas e componentes
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

// Configuração dos campos do formulário
const INPUT_ITENS = [
  {
    id: "email",
    type: "email",
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    autoComplete: "email",
    showPasswordToggle: false,
  },
  {
    id: "password",
    type: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    autoComplete: "current-password",
    showPasswordToggle: true,
  },
] as const;

export default function Login() {
  // Estados do componente
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Controla visibilidade da senha
  const [erro, setErro] = useState(""); // Armazena mensagens de erro
  const [loading, setLoading] = useState(false); // Controla estado de carregamento
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    // Efeito que verifica autenticação ao carregar o componente
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Se usuário já estiver autenticado, redireciona para página inicial
    if (token && role) {
      router.push("/bemvindo");
    }
  }, [router]);

  // Manipulador de mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value, // Atualiza dinamicamente o campo correspondente
    }));
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples de campos obrigatórios
    if (!formData.email || !formData.password) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true); // Ativa estado de carregamento
    setErro(""); // Limpa erros anteriores

    try {
      // Requisição para API de autenticação
      const response = await fetch("sua_api_de_autenticacao", {
        // URL vazia - precisa ser preenchida
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(), // Remove espaços do email
          password: formData.password,
        }),
      });

      const data = await response.json();

      // Tratamento de erros da API
      if (!response.ok) {
        throw new Error(data.message || "Credenciais inválidas");
      }

      // Verifica se recebeu dados completos
      if (!data.token || !data.user) {
        throw new Error("Dados de autenticação incompletos");
      }

      // Armazena dados de autenticação no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("role", data.user.role);

      // Redireciona para página inicial após login
      router.push("/bemvindo");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        // Tratamento de erros genéricos
        setErro("Erro ao fazer login");
      }
    } finally {
      setLoading(false); // Desativa estado de carregamento
    }
  };

  // Renderização do componente
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Seção esquerda - Logo */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-[#14add6] to-[#384295] flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-xl flex items-center justify-center w-[250px] h-[200px]">
          <Image
            src="/images/logo/logo-sgm-principal.png"
            alt="Logo SGM"
            width={200}
            height={178}
            priority // Prioriza carregamento da imagem
            className="object-contain" // Mantém proporção da imagem
          />
        </div>
      </div>

      {/* Seção direita - Formulário de login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 gap-10">
        {/* Título da página */}
        <h1 className="text-3xl font-medium text-[#2b426e]">Bem-Vindo!</h1>
        <form
          onSubmit={handleSubmit}
          className="h-1/2 space-y-4 w-full max-w-md"
        >
          {/* Renderiza dinamicamente os campos do formulário */}
          {INPUT_ITENS.map((input) => (
            <div key={input.id} className="space-y-2">
              <label
                htmlFor={input.id}
                className="block text-sm font-medium text-gray-700"
              >
                {input.label}
              </label>
              <div className="relative">
                <Input
                  type={
                    input.showPasswordToggle && showPassword
                      ? "text"
                      : input.type
                  }
                  id={input.id}
                  placeholder={input.placeholder}
                  autoComplete={input.autoComplete}
                  value={formData[input.id as keyof typeof formData]}
                  onChange={handleChange}
                  disabled={loading}
                  showPasswordToggle={input.showPasswordToggle}
                />
                {input.showPasswordToggle && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {/* Link para recuperação de senha */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
            >
              Esqueceu sua senha?
            </a>
          </div>
          {erro && (
            <div className="text-red-500 text-sm py-2" role="alert">
              {erro}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
