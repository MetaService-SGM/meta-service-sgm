"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setShouldRender(true), 200);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setShouldRender(false);
    }, 1200);

    setIsVisible(true);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {shouldRender && isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
