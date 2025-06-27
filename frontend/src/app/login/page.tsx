"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use isso apenas se estiver usando pasta 'app'
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input/inputField";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verificar se o usuário já está logado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const role = localStorage.getItem("role");

      if (token && client && uid && role) {
        toast.success("Você já está logado! Redirecionando...", {
          duration: 2000,
        });

        const timer = setTimeout(() => {
          console.log("Redirecionando para /bemVindo");
          router.replace("/bemVindo");
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await fetch(
        "https://meta-service-sgm.fly.dev/auth/sign_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errors?.[0].toLowerCase().includes("invalid") ||
          data.errors?.[0].toLowerCase().includes("credenciais")
            ? "E-mail ou senha incorretos"
            : data.errors?.[0] || "Erro ao fazer login";
        throw new Error(errorMessage);
      }

      const token = response.headers.get("access-token");
      const client = response.headers.get("client");
      const uid = response.headers.get("uid");
      const tokenType = response.headers.get("token-type");

      if (!token || !client || !uid || !tokenType) {
        throw new Error("Headers de autenticação ausentes");
      }

      // Salvar dados no localStorage
      localStorage.setItem("access-token", token);
      localStorage.setItem("client", client);
      localStorage.setItem("uid", uid);
      localStorage.setItem("token-type", tokenType);
      localStorage.setItem("userId", data.data.id);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("role", data.data.role);

      console.log("Login bem-sucedido, redirecionando para /bemVindo");
      router.replace("/bemVindo");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

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
      {/* Seção da esquerda - Logo */}
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

      {/* Seção da direita - Formulário */}
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

          <div className="text-left">
            <a
              href="#"
              className="text-sm font-normal text-[#384295] hover:underline transition"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {erro && (
            <div className="text-red-500 text-sm py-2" role="alert">
              {erro}
            </div>
          )}

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
