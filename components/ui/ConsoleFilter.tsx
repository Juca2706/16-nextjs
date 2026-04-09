"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MonitorSmartphone  } from "lucide-react";

export default function ConsoleFilter({ consoles }: { consoles: { id: string, name: string }[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentConsole = searchParams.get('console') || 'all';

    const handleFilter = (name: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (name === 'all') {
            params.delete('console');
        } else {
            params.set('console', name);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-6">
            <div className="relative w-full max-w-[320px] group">

                {/* Etiqueta superior minimalista con línea */}
                <div className="flex items-center gap-3 mb-2 opacity-80 group-hover:opacity-100 transition-all duration-500">
                    {/* Línea izquierda con gradiente azul neón */}
                    <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>

                    {/* Texto con brillo sutil y color cian */}
                    <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] whitespace-nowrap uppercase">
                        Select Console
                    </span>

                    {/* Línea derecha con gradiente azul neón */}
                    <div className="h-0.5 flex-1 bg-linear-to-l from-transparent via-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                </div>

                <div className="relative">
                    {/* Fondo con gradiente animado en el borde (solo visible en hover/focus) */}
                    <div className="absolute -inset-px bg-linear-to-r from-purple-600 via-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-100 blur-[2px] transition duration-500"></div>

                    <div className="relative flex items-center">
                        {/* Icono de entrada */}
                        <div className="absolute left-4 text-purple-500/80 group-hover:text-purple-400 transition-colors">
                            <MonitorSmartphone  size={20} strokeWidth={2.5} />
                        </div>

                        <select
                            value={currentConsole}
                            onChange={(e) => handleFilter(e.target.value)}
                            className="appearance-none w-full bg-[#12141a] text-white pl-12 pr-12 py-4 rounded-xl border border-white/10 cursor-pointer focus:outline-none transition-all duration-300 font-bold text-[13px] tracking-wide"
                        >
                            <option value="all">ALL CONSOLES</option>
                            {consoles.map((c) => (
                                <option key={c.id} value={c.name} className="bg-[#12141a]">
                                    {c.name.toUpperCase()}
                                </option>
                            ))}
                        </select>

                        {/* Flecha personalizada con separador */}
                        <div className="absolute right-0 h-full flex items-center pr-4 pointer-events-none">
                            <div className="w-px h-4 bg-white/10 mr-4"></div>
                            <ChevronDown size={18} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Resplandor inferior muy sutil */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-purple-500/10 blur-2xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        </div>
    );
}