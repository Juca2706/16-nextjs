// archivo page.tsx
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/layout/SideBar";
import GamesInfo from "@/components/games/GamesInfo";

// 1. Agregamos searchParams a los argumentos de la función
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GamesPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; console?: string }>
}) {
    const params = await searchParams;

    return (
        <SideBar currentPath={"/games"}>
            <GamesInfo
                // Agregamos params.console a la key para que React sepa que debe re-renderizar
                key={`${params.query}-${params.console || 'all'}`}
                searchParams={searchParams}
            />
        </SideBar>
    );
}
