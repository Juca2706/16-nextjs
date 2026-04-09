'use client'
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteConsole } from "@/app/actions/console-actions";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function DeleteConsoleButton({ id, name }: { id: number, name: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleExecuteDelete = async () => {
        modalRef.current?.close();
        setIsDeleting(true);

        const toastId = toast.loading("Eliminando hardware del sistema...");

        try {
            const res = await deleteConsole(id);
            if (res.success) {
                toast.success("Consola eliminada correctamente", { id: toastId });
            } else {
                toast.error(res.error || "Error al eliminar", { id: toastId });
            }
        } catch (error) {
            toast.error("Error crítico de conexión", { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* BOTÓN QUE DISPARA EL MODAL */}
            <button
                title="Eliminar"
                onClick={() => modalRef.current?.showModal()}
                disabled={isDeleting}
                className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/10 flex items-center justify-center hover:scale-105 active:scale-95"
            >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
            </button>

            {/* MODAL DE CONFIRMACIÓN */}
            <dialog
                ref={modalRef}
                className="
                    fixed inset-0 m-auto 
                    backdrop:bg-black/80 backdrop:backdrop-blur-sm 
                    bg-[#1a1d23] p-10 rounded-[2.5rem] 
                    border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                    text-white max-w-md w-[90%] 
                    outline-none animate-in fade-in zoom-in duration-300
                "
            >
                <div className="flex flex-col items-center text-center gap-8">
                    {/* Icono de Advertencia */}
                    <div className="p-5 bg-red-500/10 rounded-full ring-1 ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <AlertTriangle size={50} className="text-red-500" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase">¿Confirmar Eliminación?</h3>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Estás a punto de eliminar <span className="text-white font-bold">"{name}"</span>.
                            Esta acción es irreversible y afectará a los juegos asociados.
                        </p>
                    </div>

                    <div className="flex gap-4 w-full mt-4">
                        <button
                            type="button"
                            onClick={() => modalRef.current?.close()}
                            className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5 uppercase text-[10px] tracking-widest"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleExecuteDelete}
                            className="flex-1 px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-xl shadow-red-600/30 uppercase text-[10px] tracking-widest"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}