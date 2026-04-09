import { getGameById, getConsoles } from "@/app/actions/game-actions";
import GameEdit from "@/components/games/GameEdit";
import SideBar from "@/components/layout/SideBar";
import { notFound } from "next/navigation";

// Mantenemos la lógica de Promise para los params de Next.js 15+
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    // 1. Resolvemos los parámetros de la URL
    const { id } = await params;

    // 2. Obtenemos la data necesaria desde las Server Actions
    const game = await getGameById(id);
    const consoles = await getConsoles();

    // 3. Si el juego no existe, lanzamos el 404 de Next.js
    if (!game) {
        return notFound();
    }

    return (
        <SideBar currentPath="/games">
            {/* Usamos el mismo contenedor py-10 que en AddGamePage para consistencia visual */}
            <div className="py-10">
                <GameEdit game={game} consoles={consoles} />
            </div>
        </SideBar>
    );
}
