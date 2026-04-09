'use client'
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateGame } from "@/app/actions/game-actions";
import Link from "next/link";
import { resolveAssetUrl } from "@/lib/image-utils";
import {
    Type, CodeXml, Calendar, DollarSign, Tag,
    Gamepad2, AlignLeft, Image as ImageIcon, PencilLine, UploadCloud, XCircle, Save
} from "lucide-react";

export default function GameEdit({ game, consoles }: { game: any, consoles: any[] }) {
    const [state, formAction, isPending] = useActionState(updateGame, null);
    const [preview, setPreview] = useState<string | null>(
        game.cover ? resolveAssetUrl(game.cover, "no-cover.png") : null
    );

    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            toast.success("Juego actualizado", {
                description: "Los cambios se guardaron correctamente.",
            });
            router.push("/games");
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="max-w-5xl mx-auto pt-4 pb-12 px-4 md:px-6">
            <form action={formAction} className="bg-base-300 p-6 md:p-10 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden">
                <input type="hidden" name="id" value={game.id} />

                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                        <PencilLine size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Edit Video Game</h2>
                        <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase opacity-70 italic">ID: {game.id} • Games Next JS</p>
                    </div>
                </div>

                {state?.error && (
                    <div className="alert alert-error shadow-lg rounded-2xl font-bold mb-6">
                        <span>{state.error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-5">
                        <div className="form-control">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <Type size={14} /> Title
                            </label>
                            <input name="title" defaultValue={game.title} className="input input-bordered bg-base-100/50 rounded-2xl focus:border-primary border-white/10 transition-all w-full" required />
                        </div>

                        <div className="form-control">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <CodeXml size={14} /> Developer
                            </label>
                            <input name="developer" defaultValue={game.developer} className="input input-bordered bg-base-100/50 rounded-2xl border-white/10 w-full" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                    <Calendar size={14} /> Release Date
                                </label>
                                <input
                                    name="releasedate"
                                    type="date"
                                    defaultValue={game.releasedate ? new Date(game.releasedate).toISOString().substring(0, 10) : ""}
                                    className="input input-bordered bg-base-100/50 rounded-2xl border-white/10 w-full"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                    <DollarSign size={14} /> Price
                                </label>
                                <input name="price" type="number" step="0.01" defaultValue={game.price} className="input input-bordered bg-base-100/50 rounded-2xl border-white/10 w-full" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <Tag size={14} /> Genre
                            </label>
                            <input name="genre" defaultValue={game.genre} className="input input-bordered bg-base-100/50 rounded-2xl border-white/10 w-full" required />
                        </div>

                        <div className="form-control">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <Gamepad2 size={14} /> Platform
                            </label>
                            <select name="console_id" defaultValue={game.console_id} className="select select-bordered bg-base-100/50 rounded-2xl border-white/10 w-full" required>
                                {consoles.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="form-control flex-1">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <AlignLeft size={14} /> Description
                            </label>
                            <textarea
                                name="description"
                                defaultValue={game.description}
                                className="textarea textarea-bordered bg-base-100/50 rounded-3xl border-white/10 w-full h-full min-h-37.5 resize-none p-5 text-sm leading-relaxed"
                                required
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label gap-2 justify-start text-primary font-bold uppercase text-[10px] tracking-widest">
                                <ImageIcon size={14} /> Visual Cover
                            </label>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-base-100/30 rounded-4xl border-2 border-dashed border-white/10 group-hover:border-primary/50 transition-colors">
                                    <div className="w-32 h-44 bg-base-300 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl shrink-0 relative">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center opacity-20">
                                                <UploadCloud size={32} className="mx-auto mb-2" />
                                                <span className="text-[8px] uppercase font-black">No Cover</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-3 w-full">
                                        <input
                                            type="file"
                                            name="cover"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="file-input file-input-bordered file-input-primary w-full file-input-sm rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-center items-center gap-4 w-full px-4 md:px-0">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn btn-primary w-full md:w-auto px-10 py-3 h-auto min-h-0 rounded-full text-sm font-black italic tracking-tight shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 border-none flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <span className="loading loading-spinner loading-xs"></span>
                                <span className="text-xs uppercase">Updating...</span>
                            </div>
                        ) : (
                            <>
                                <Save size={18} />
                                UPDATE GAME
                            </>
                        )}
                    </button>

                    <Link
                        href="/games"
                        className="btn btn-outline btn-accent w-full md:w-auto px-8 py-3 h-auto min-h-0 rounded-full text-sm font-bold opacity-60 hover:opacity-100 border border-white hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <XCircle size={18} />
                        CANCEL
                    </Link>
                </div>
            </form>
        </div>
    );
}
