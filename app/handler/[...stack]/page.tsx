"use client";
import React, { use } from "react";
import { StackHandler } from "@stackframe/stack";
import BackHome from "@/components/ui/BackHome";
import Link from "next/link";
// 1. Importamos los iconos
import { Home, LayoutDashboard, CircleArrowLeft} from "lucide-react";

export default function Handler({ params }: { params: Promise<{ stack: string[] }> }) {
  const resolvedParams = use(params);
  const stack = resolvedParams.stack || [];
  const step = stack[0] || "";

  const isSettings = step.includes("settings") || step.includes("account");
  const isAuth = step === "sign-in" || step === "sign-up" || step === "";

  // Estilo compacto con Flexbox para alinear el icono y el texto
  const btnStyle = "btn btn-outline min-w-[220px] max-w-fit hover:bg-white hover:text-black transition-all duration-300 border-white text-white mx-auto flex items-center gap-2";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/imgs/fondo-home.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>

      <div className={`
        bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl
        flex flex-col transition-all duration-500 overflow-hidden
        ${isSettings ? "w-full max-w-5xl min-h-125" : "w-full max-w-md"}
      `}>

        <div className="p-6 md:p-10 grow">
          <StackHandler fullPage={false} />
        </div>

        <div className="w-full p-6 bg-black/20 border-t border-white/10 flex justify-center items-center">

          {isAuth && (
            <div className="flex justify-center w-full">
              {/* Si puedes editar BackHome, ponle un icono de Home dentro */}
              <BackHome />
            </div>
          )}

          {isSettings && (
            <Link href="/dashboard" className={btnStyle}>
              <CircleArrowLeft size={20} />
              <span>Go To Dashboard</span>
            </Link>
          )}

          {!isAuth && !isSettings && (
            <Link href="/dashboard" className={btnStyle}>
              <CircleArrowLeft size={20} />
              <span>Go back</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}