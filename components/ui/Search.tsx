"use client";
// 1. CAMBIO AQUÍ: Importamos 'Search' y lo renombramos como 'SearchIcon'
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [inputValue, setInputValue] = useState(searchParams.get('query')?.toString() || "");

    useEffect(() => {
        setInputValue(searchParams.get('query')?.toString() || "");
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleClear = () => {
        setInputValue("");
        const params = new URLSearchParams(searchParams);
        params.delete('query');
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>

            <div className="relative flex items-center">
                {/* 2. Ahora SearchIcon sí tendrá contenido porque viene de 'Search' */}
                <SearchIcon className="absolute left-4 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-purple-400 pointer-events-none z-10" />

                <input
                    className="peer block w-full rounded-2xl border border-white/5 bg-[#1a1d23]/80 backdrop-blur-sm py-3.5 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-purple-500/40 focus:bg-[#1a1d23] shadow-inner"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />

                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all z-10"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}