import ConsoleAdd from "@/components/consoles/ConsoleAdd";
import SideBar from "@/components/layout/SideBar";

export default async function AddConsolePage() {
    return (
        <SideBar currentPath="/consoles">
            <div className="py-10">
                <ConsoleAdd />
            </div>
        </SideBar>
    );
}