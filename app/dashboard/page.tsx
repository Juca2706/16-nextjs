import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/layout/SideBar";
import DashboardInfo from "@/components/dashboard/DashboardInfo";
import { prisma } from "@/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect('/');
    }

    const [totalGames, totalConsoles, gamesByConsoleRaw] = await Promise.all([
        prisma.game.count(),
        prisma.console.count(),
        prisma.console.findMany({
            select: {
                name: true,
                _count: { select: { games: true } }
            }
        })
    ]);

    const gamesByConsole = gamesByConsoleRaw.map(c => ({
        name: c.name,
        value: c._count.games
    })).filter(c => c.value > 0);

    // Los datos para la segunda gráfica (Juegos vs Consolas)
    const inventorySummary = [
        { name: 'Juegos', value: totalGames },
        { name: 'Consolas', value: totalConsoles }
    ];

    return (
        <SideBar currentPath={"/dashboard"}>
            <DashboardInfo
                totalGames={totalGames}
                totalConsoles={totalConsoles}
                gamesByConsole={gamesByConsole}
                inventorySummary={inventorySummary}
            />
        </SideBar>
    );
}
