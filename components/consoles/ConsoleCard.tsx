"use client";
import { Info, Calendar, Notebook, Building2 } from 'lucide-react';
import { resolveAssetUrl } from '@/lib/image-utils';

export default function ConsoleCard({ console }: { console: any }) {
    const openModal = () => {
        const modal = document.getElementById(`modal_con_${console.id}`) as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    return (
        <>
            {/* BOTÓN QUE ACTIVA EL MODAL */}
            <button
                onClick={openModal}
                className="flex-1 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-blue-500/20"
            >
                <Info size={18} />
                <span className="text-xs uppercase tracking-wider">Details</span>
            </button>

            {/* ESTRUCTURA DEL MODAL */}
            <dialog id={`modal_con_${console.id}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-[#1a1d23] border border-white/10 p-0 overflow-hidden max-w-xl shadow-2xl rounded-[2.5rem]">

                    {/* Banner */}
                    <div className="relative h-40 w-full">
                        <img src={resolveAssetUrl(console.image, "no-image.png")} className="w-full h-full object-cover opacity-30" alt="banner" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#1a1d23] to-transparent" />
                    </div>

                    {/* Contenido */}
                    <div className="px-8 pb-8 -mt-12 relative">
                        <h3 className="text-4xl font-black text-white mb-2">{console.name}</h3>

                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-lg uppercase tracking-widest inline-block mb-8">
                            {console.manufacturer}
                        </span>

                        <div className="space-y-4">
                            {/* Descripción */}
                            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                    <Notebook size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Description</p>
                                    <p className="text-sm text-gray-300 leading-relaxed">{console.description || "No description provided."}</p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-green-500/20 rounded-xl text-green-400 shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Release Date</p>
                                        <p className="text-sm text-white font-bold truncate">
                                            {new Date(console.releasedate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                        <Building2 size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Manufacturer</p>
                                        <p className="text-sm text-white font-bold truncate">{console.manufacturer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón de cierre */}
                        <div className="modal-action mt-8">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full bg-white text-black hover:bg-gray-200 border-none rounded-2xl font-black transition-all uppercase tracking-widest">
                                    Close Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/80"><button>close</button></form>
            </dialog>
        </>
    );
}
