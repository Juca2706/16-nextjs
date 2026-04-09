import { getConsoleById } from "@/app/actions/console-actions";
import ConsoleEdit from "@/components/consoles/ConsoleEdit";
import SideBar from "@/components/layout/SideBar";
import { notFound } from "next/navigation";

// Definimos el tipo para los params (Promise para Next.js 15+)
interface Props {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditConsolePage({ params }: Props) {
    // 1. Resolvemos el ID de la URL (importante el await en las nuevas versiones)
    const { id } = await params;

    // 2. Buscamos la consola específica usando el Server Action
    const consoleData = await getConsoleById(id);

    // 3. Si por alguna razón el ID no existe en la DB, mandamos al 404
    if (!consoleData) {
        return notFound();
    }

    return (
        <SideBar currentPath="/consoles">
            {/* Mantenemos el espaciado py-10 para que todo el dashboard se vea igual */}
            <div className="py-10">
                <ConsoleEdit consoleData={consoleData} />
            </div>
        </SideBar>
    );
}
