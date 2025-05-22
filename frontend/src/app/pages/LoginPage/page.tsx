"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input/inputField";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verifica se já existe token salvo e redireciona o usuário logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      router.push("/bemvindo");
    }
  }, [router]);

  // Manipula alterações dos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Manipula envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples dos campos
    if (!formData.email || !formData.password) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      // Requisição para API de autenticação (substituir pela sua URL real)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciais inválidas");
      }

      if (!data.token || !data.user) {
        throw new Error("Dados de autenticação incompletos");
      }

      // Salvando dados no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("role", data.user.role);

      // Redireciona após login bem-sucedido
      router.push("/bemvindo");
    } catch (error) {
      // Tratamento de erros
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };
  // Lista de inputs utilizada no formulário
  const INPUT_ITEMS = [
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

  return (
    <main className="min-h-screen flex flex-row bg-gradient-to-b from-[#14add6] to-[#384295]">
      {/* Seção Esquerda - Logo */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="shadow-xl flex items-center justify-center">
          <Image
            src="/images/logo/logo-sgm-principal-com-fundo.png"
            alt="Logo SGM"
            width={335}
            height={303}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Seção Direita - Formulário */}
      <div className="md:w-1/2 rounded-bl-3xl flex flex-col justify-center items-center p-16 gap-10 bg-gray-50 mb-3">
        <h1
          style={{ fontFamily: "var(--font-nunito)" }}
          className="text-3xl font-semibold text-[#2b426e]"
        >
          Bem-vindo!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="h-1/2 space-y-4 w-full max-w-md"
        >
          {/* Renderização dos campos de input */}
          {INPUT_ITEMS.map((input) => (
            <InputField
              key={input.id}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              autoComplete={input.autoComplete}
              label={input.label}
              value={formData[input.id as keyof typeof formData]}
              onChange={handleChange}
              disabled={loading}
              showPasswordToggle={input.showPasswordToggle}
            />
          ))}

          {/* Link de recuperação de senha */}
          <div className="text-left">
            <a
              href="#"
              className="text-sm font-normal text-[#384295] hover:underline transition"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="text-red-500 text-sm py-2" role="alert">
              {erro}
            </div>
          )}

          {/* Botão de envio */}
          <Button
            variant="login"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
