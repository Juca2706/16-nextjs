// app/consoles/page.tsx
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/layout/SideBar";
import ConsolesInfo from "@/components/consoles/ConsolesInfo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ConsolesPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string }>
}) {
    const user = await stackServerApp.getUser();
    if (!user) redirect('/');

    const params = await searchParams; 

    return (
        <SideBar currentPath={"/consoles"}>
            <ConsolesInfo
                key={params.query || 'default'}
                searchParams={searchParams}
            />
        </SideBar>
    );
}
