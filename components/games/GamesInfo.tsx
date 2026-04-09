export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Suspense } from 'react';
import { prisma } from "@/prisma";
import { PlusCircleIcon, GamepadDirectional, Pencil, Trash2, Info } from 'lucide-react';
import GameModal from './GameCard';
import Search from '../ui/Search';
import Pagination from '../ui/Pagination';
import Link from 'next/link';
import DeleteGameButton from './DeleteGameButton';
import ConsoleFilter from '../ui/ConsoleFilter';
import { resolveAssetUrl } from '@/lib/image-utils';

export default async function GamesInfo({
    searchParams
}: {
    searchParams?: Promise<{ query?: string; page?: string; console?: string }>
}) {
    const params = await searchParams;
    const query = params?.query || '';
    const consoleFilter = params?.console || ''; // Capturamos el filtro
    const currentPage = Number(params?.page) || 1;
    const itemsPerPage = 12;

    // 1. OBTENER LAS CONSOLAS (Vienen de la DB con ID número)
    const consolesFromDB = await prisma.console.findMany({
        orderBy: { name: 'asc' }
    });

    // 2. CONVERTIR ID A STRING (Para que ConsoleFilter no dé error)
    const consoles = consolesFromDB.map(c => ({
        ...c,               // Mantenemos el nombre, imagen, etc.
        id: c.id.toString() // Convertimos el 1 en "1"
    }));

    // 2. CONSTRUIR LA CONDICIÓN (Búsqueda + Filtro)
    const whereCondition: any = {
        AND: [
            // Condición de búsqueda (Query)
            query ? {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { developer: { contains: query, mode: 'insensitive' } },
                    { genre: { contains: query, mode: 'insensitive' } },
                ]
            } : {},
            // Condición de Filtro de Consola
            consoleFilter ? {
                console: { name: consoleFilter }
            } : {}
        ]
    };

    const [games, totalGames] = await Promise.all([
        prisma.game.findMany({
            where: whereCondition,
            include: { console: true },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            orderBy: { id: 'desc' }
        }),
        prisma.game.count({ where: whereCondition })
    ]);

    const totalPages = Math.ceil(totalGames / itemsPerPage);

    return (
        <div className='w-full min-h-screen p-4 md:p-10'>
            <div className='w-full max-w-350 mx-auto'>

                {/* 1. CABECERA*/}
                <div className='flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-white/5 pb-10 gap-8'>

                    {/* TÍTULO Y LOGO */}
                    <div className='flex items-center gap-4 shrink-0'>
                        <div className='p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20'>
                            <GamepadDirectional size={32} className='text-purple-500' />
                        </div>
                        <div>
                            <h1 className='text-4xl md:text-5xl font-black text-white tracking-tighter italic'>GAMES</h1>
                            <p className='text-blue-500/60 text-[10px] font-black mt-1 uppercase tracking-[0.4em]'>STORE</p>
                        </div>
                    </div>

                    {/* BUSCADOR INTEGRADO (Centrado en la cabecera) */}
                    <div className='flex-1 max-w-2xl w-full px-0 lg:px-10 transition-all duration-500 focus-within:max-w-3xl'>
                        <div className='relative group'>
                            {/* El resplandor de fondo cuando el buscador está activo */}
                            <div className='absolute -inset-1 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500'></div>
                            <div className='relative'>
                                <Suspense fallback={<div className="h-14 w-full bg-white/5 animate-pulse rounded-2xl" />}>
                                    <Search key={query} placeholder="Search title, genre, developer..." />
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    {/* BOTÓN DE ACCIÓN */}
                    <div className='shrink-0 w-full lg:w-auto'>
                        <a href="/games/add" className='group flex items-center justify-center gap-2 bg-white text-black hover:bg-green-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 shadow-xl shadow-white/5 hover:shadow-purple-500/20 hover:-translate-y-1'>
                            <PlusCircleIcon size={20} className="transition-transform group-hover:rotate-90" />
                            <span>ADD NEW GAME</span>
                        </a>
                    </div>
                </div>

                {/* 2. NUEVA SECCIÓN DE FILTROS (FUERA DE LA CABECERA) */}
                <div className="mb-12 flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-700">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                            Select a console to filter the games or use the search bar to find specific titles, genres, or developers.
                        </p>
                    </div>
                    <ConsoleFilter consoles={consoles} />
                </div>


                {/* 2. CONTENIDO PRINCIPAL */}
                {games.length > 0 ? (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {games.map((game) => (
                                <div key={game.id} className="group relative w-full overflow-hidden rounded-4xl bg-[#1a1d23] shadow-2xl transition-all duration-500 hover:shadow-purple-500/20 border border-white/5">

                                    {/* BOTONES DE ACCIÓN */}
                                    <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                                        <Link
                                            href={`/games/edit/${game.id}`}
                                            title="Editar"
                                            className="p-2.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all"
                                        >
                                            <Pencil size={18} />
                                        </Link>

                                        <GameModal game={game} />

                                        {/* Para el botón de eliminar, lo ideal es que sea un componente que llame a tu server action directamente */}
                                        <DeleteGameButton id={game.id} title={game.title} />
                                    </div>

                                    {/* PRECIO */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-black/40 backdrop-blur-md border border-white/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-black shadow-xl">
                                            ${game.price}
                                        </span>
                                    </div>

                                    <figure className="aspect-3/2 w-full overflow-hidden">
                                        <img src={resolveAssetUrl(game.cover, "no-cover.png")} alt={game.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    </figure>

                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black via-black/60 to-transparent">
                                        <div className="flex flex-col gap-1.5">
                                            <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{game.title}</h2>
                                            <div className="flex items-center gap-x-3 text-xs font-bold text-gray-300">
                                                <span className="text-purple-400 uppercase tracking-widest text-[10px]">{game.console.name}</span>
                                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                <span className="opacity-80">{game.genre}</span>
                                            </div>

                                            <div className="h-0 opacity-0 translate-y-4 group-hover:h-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out overflow-hidden">
                                                <p className="text-[11px] text-gray-400 font-medium mt-1">
                                                    Developed by <span className="text-white font-bold">{game.developer}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINACIÓN: Solo si hay más de una página */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center border-t border-white/5">
                                <Pagination totalPages={totalPages} />
                            </div>
                        )}
                    </>
                ) : (
                    /* MENSAJE CUANDO NO HAY RESULTADOS */
                    <div className="flex flex-col items-center justify-center py-24 bg-white/2 rounded-[3rem] border border-dashed border-white/10 mt-10">
                        <div className="p-5 bg-white/5 rounded-full mb-6">
                            <Info size={48} className="text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">No matches found</h3>
                        <p className="text-gray-500 mt-2 max-w-xs text-center">
                            We couldn't find any games for "<span className="text-purple-400">{query}</span>". Try another term!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
