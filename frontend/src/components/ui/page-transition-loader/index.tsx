"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ColorRing } from "react-loader-spinner";

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Tempo para simular o carregamento

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center h-full py-24 min-h-screen">
      <div className="flex flex-col justify-center items-center text-center text-lg font-semibold w-full">
        Carregando...
        <div className="mt-4">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#2B426E", "#14ADD6", "#F2F7FF", "#384295", "#E6EFFC"]}
          />
        </div>
      </div>
    </div>
  );
}
