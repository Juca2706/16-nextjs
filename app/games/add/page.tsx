import { prisma } from "../../../prisma";
import GameAdd from "@/components/games/GameAdd";
import SideBar from "@/components/layout/SideBar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AddGamePage() {
    // Traemos las consolas de Neon DB para el select
    const consoles = await prisma.console.findMany();

    return (
        <SideBar currentPath="/games">
            <div className="py-10">
                <GameAdd consoles={consoles} />
            </div>
        </SideBar>
    );
}
