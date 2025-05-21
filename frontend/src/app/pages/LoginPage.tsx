// Indica que este é um componente Client-Side (Next.js 13+)
"use client";

// Importações de bibliotecas e componentes
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/input/inputField";

// Configuração dos campos do formulário
const INPUT_ITENS = [
  {
    id: "email",
    type: "email",
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    autoComplete: "username", // Sugere preenchimento automático de nome de usuário
    showPasswordToggle: false, // Não mostra toggle de senha para campo de email
  },
  {
    id: "password",
    type: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    autoComplete: "current-password", // Sugere preenchimento automático de senha
    showPasswordToggle: true, // Mostra toggle para visualizar senha
  },
];

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

  // Efeito que verifica autenticação ao carregar o componente
  useEffect(() => {
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
      const response = await fetch("rota da autenticação", {
        // URL vazia - precisa ser preenchida
        method: "GET",
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
    } catch (error: any) {
      // Tratamento de erros genéricos
      setErro(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false); // Desativa estado de carregamento
    }
  };

  // Renderização do componente
  return (
    <main className="min-h-screen flex md:flex-row bg-gray-50">
      {/* Seção esquerda - Contém o logo */}
      <div className="flex w-1/2 relative bg-gradient-to-b from-[#14add6] to-[#384295] items-center justify-center p-8">
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
      <div className="w-1/2 flex flex-col justify-center">
        <div>
          {/* Título da página */}
          <h1 className="text-[#2b426e] mb-2 ">Bem-Vindo!</h1>
        </div>

        <div>
          <div className="">
            <div className="text-center"></div> {/* Espaço reservado */}
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="">
              {/* Renderiza dinamicamente os campos do formulário */}
              {INPUT_ITENS.map((input) => (
                <InputField
                  key={input.id}
                  type={input.type}
                  id={input.id}
                  label={input.label}
                  placeholder={input.placeholder}
                  autoComplete={input.autoComplete}
                  value={formData[input.id as keyof typeof formData]}
                  onChange={handleChange}
                  disabled={loading}
                  showPasswordToggle={input.showPasswordToggle}
                />
              ))}
            </form>
            {/* Link para recuperação de senha */}
            <div className="text-left text-sm text-gray-500">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
