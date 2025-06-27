"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    const tokenType = localStorage.getItem("token-type");

    const isLoggedIn = token && client && uid && tokenType;

    if (!isLoginPage && !isLoggedIn) {
      toast.error("Você precisa estar logado para acessar esta página.");
      router.replace("/");
    }

    setChecking(false);
  }, [router, isLoginPage]);

  if (checking) return null;

  return <>{children}</>;
}
