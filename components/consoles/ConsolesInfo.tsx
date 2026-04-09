export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Suspense } from 'react';
import { prisma } from "@/prisma";
import { PlusCircleIcon, Monitor, Pencil, Trash2, Info } from 'lucide-react'; // Añadido Info
import ConsoleModal from './ConsoleCard';
import Search from '../ui/Search';
import Pagination from '../ui/Pagination';
import Link from 'next/link';
import DeleteConsoleButton from './DeleteConsoleButton';
import { resolveAssetUrl } from '@/lib/image-utils';

export default async function ConsolesInfo({
    searchParams
}: {
    searchParams?: Promise<{ query?: string; page?: string }>
}) {
    const params = await searchParams;
    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const ITEMS_PER_PAGE = 12;

    const whereClause = {
        OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { manufacturer: { contains: query, mode: 'insensitive' as const } },
        ]
    };

    const [totalConsoles, consoles] = await Promise.all([
        prisma.console.count({ where: whereClause }),
        prisma.console.findMany({
            where: whereClause,
            take: ITEMS_PER_PAGE,
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            orderBy: { id: 'desc' }
        })
    ]);

    const totalPages = Math.ceil(totalConsoles / ITEMS_PER_PAGE);

    return (
        <div className='w-full min-h-screen p-4 md:p-10'>
            <div className='w-full max-w-350 mx-auto'>

                {/* 1. CABECERA CON ESTILO GAMES */}
                <div className='flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-white/5 pb-10 gap-8'>

                    {/* TÍTULO Y LOGO */}
                    <div className='flex items-center gap-4 shrink-0'>
                        <div className='p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20'>
                            <Monitor size={32} className='text-purple-500' />
                        </div>
                        <div>
                            <h1 className='text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase'>CONSOLES</h1>
                            <p className='text-blue-500/60 text-[10px] font-black mt-1 uppercase tracking-[0.4em]'>STORE</p>
                        </div>
                    </div>

                    {/* BUSCADOR INTEGRADO (Con resplandor y centrado) */}
                    <div className='flex-1 max-w-2xl w-full px-0 lg:px-10 transition-all duration-500 focus-within:max-w-3xl'>
                        <div className='relative group'>
                            {/* El resplandor de fondo */}
                            <div className='absolute -inset-1 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500'></div>
                            <div className='relative'>
                                <Suspense fallback={<div className="h-14 w-full bg-white/5 animate-pulse rounded-2xl" />}>
                                    <Search key={query} placeholder="Search name, manufacturer..." />
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    {/* BOTÓN DE ACCIÓN */}
                    <div className='shrink-0 w-full lg:w-auto'>
                        <a href="/consoles/add" className='group flex items-center justify-center gap-2 bg-white text-black hover:bg-green-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 shadow-xl shadow-white/5 hover:shadow-purple-500/20 hover:-translate-y-1'>
                            <PlusCircleIcon size={20} className="transition-transform group-hover:rotate-90" />
                            <span>ADD NEW CONSOLE</span>
                        </a>
                    </div>
                </div>

                {/* 2. CONTENIDO PRINCIPAL */}
                {consoles.length > 0 ? (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {consoles.map((item: any) => (
                                <div key={item.id} className="group relative flex flex-col h-full w-full overflow-hidden rounded-4xl bg-[#1a1d23] border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                                    <figure className="relative aspect-video w-full overflow-hidden bg-[#0f1115]">
                                        <img
                                            src={resolveAssetUrl(item.image, "no-image.png")}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#1a1d23] via-transparent to-transparent" />
                                    </figure>

                                    <div className="flex flex-col flex-1 p-6 md:p-8">
                                        <div className="mb-auto">
                                            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.manufacturer}</p>
                                            <h2 className="text-2xl font-black text-white leading-tight line-clamp-2">{item.name}</h2>
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            {/* Botón de Ver Detalles (Modal) */}
                                            <ConsoleModal console={item} />

                                            <div className="flex gap-2">
                                                {/* BOTÓN EDITAR: Ahora es un Link que redirige al formulario */}
                                                <Link
                                                    href={`/consoles/edit/${item.id}`}
                                                    title="Editar"
                                                    className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-xl transition-all border border-white/5 flex items-center justify-center"
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                {/* BOTÓN ELIMINAR: Usando tu componente especializado */}
                                                <DeleteConsoleButton id={item.id} name={item.name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINACIÓN */}
                        {totalPages > 1 && (
                            <div className='mt-16 flex justify-center border-t border-white/5'>
                                <Pagination totalPages={totalPages} />
                            </div>
                        )}
                    </>
                ) : (
                    /* MENSAJE CUANDO NO HAY RESULTADOS (Igual que en Games) */
                    <div className="flex flex-col items-center justify-center py-24 bg-white/2 rounded-[3rem] border border-dashed border-white/10 mt-10">
                        <div className="p-5 bg-white/5 rounded-full mb-6">
                            <Info size={48} className="text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">No matches found</h3>
                        <p className="text-gray-500 mt-2 max-w-xs text-center">
                            We couldn't find any consoles for "<span className="text-purple-400">{query}</span>". Try another term!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
