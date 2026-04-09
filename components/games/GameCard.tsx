"use client";
import { Info, Calendar, Notebook, CodeXml } from 'lucide-react';
import { resolveAssetUrl } from '@/lib/image-utils';

export default function GameModal({ game }: { game: any }) {
    const openModal = () => {
        const modal = document.getElementById(`modal_${game.id}`) as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    return (
        <>
            {/* Solo el botón disparador */}
            <button
                onClick={openModal}
                title="Ver Detalles"
                className="p-2.5 bg-purple-600/60 backdrop-blur-md border border-purple-500/50 rounded-full text-white hover:bg-purple-500 transition-all duration-300 shadow-lg"
            >
                <Info size={18} />
            </button>

            {/* Estructura del Modal */}
            <dialog id={`modal_${game.id}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-[#1a1d23] border border-white/10 p-0 overflow-hidden max-w-xl shadow-2xl rounded-[2.5rem]">
                    <div className="relative h-40 w-full">
                        <img src={resolveAssetUrl(game.cover, "no-cover.png")} className="w-full h-full object-cover opacity-30" alt="banner" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#1a1d23] to-transparent" />
                    </div>

                    <div className="px-8 pb-8 -mt-12 relative text-left">
                        <h3 className="text-4xl font-black text-white mb-2">{game.title}</h3>
                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-black rounded-lg uppercase tracking-widest">
                            {game.console.name} • {game.genre}
                        </span>

                        <div className="grid grid-cols-1 gap-4 mt-8">
                            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                                    <Notebook size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Description</p>
                                    <p className="text-sm text-gray-300 leading-relaxed">{game.description || "No description provided."}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-green-500/20 rounded-xl text-green-400 shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Releasedate</p>
                                        <p className="text-sm text-white font-bold truncate">
                                            {new Date(game.releasedate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                        <CodeXml size={20} />
                                    </div>
                                    <div className="min-w-0 w-full">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Developer</p>
                                        <p className="text-sm text-white font-bold truncate block" title={game.developer}>
                                            {game.developer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action mt-8">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full bg-white text-black hover:bg-gray-200 border-none rounded-2xl font-black transition-all uppercase tracking-widest">Close Details</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/60">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
