"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const overflow = 1; // Ajustado para ser aún más compacto

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - overflow && i <= currentPage + overflow)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12 mb-10 px-4">
            {/* Anterior */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ${currentPage <= 1 ? 'pointer-events-none opacity-20' : ''}`}
            >
                <ChevronsLeft size={18} />
            </Link>

            <div className="flex gap-2">
                {getVisiblePages().map((page, index) => (
                    page === '...' ? (
                        <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                    ) : (
                        <Link
                            key={index}
                            href={createPageURL(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === page
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-110'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                }`}
                        >
                            {page}
                        </Link>
                    )
                ))}
            </div>

            {/* Siguiente */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ${currentPage >= totalPages ? 'pointer-events-none opacity-20' : ''}`}
            >
                <ChevronsRight size={18} />
            </Link>
        </div>
    );
}