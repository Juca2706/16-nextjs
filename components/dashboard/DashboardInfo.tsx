'use client'
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    Tooltip, Legend
} from 'recharts';
import { LayoutDashboard, Gamepad2, Monitor, Database, Activity, Target } from 'lucide-react';
import CountUp from 'react-countup';

interface DashboardProps {
    totalGames: number;
    totalConsoles: number;
    gamesByConsole: { name: string; value: number }[];
    inventorySummary: { name: string; value: number }[];
}

export default function DashboardInfo({ totalGames, totalConsoles, gamesByConsole, inventorySummary }: DashboardProps) {

    const COLORS_CONSOLES = ['#818cf8', '#6366f1', '#4ade80', '#eab308', '#f87171', '#f472b6'];
    const COLORS_SUMMARY = ['#6d28d9', '#22d3ee'];

    return (
        <div className="p-4 md:p-10 space-y-10 text-white animate-in fade-in duration-1000">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
                <div className="flex items-center gap-5">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-purple-500/20 to-indigo-600/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative p-4 bg-white/3 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
                            <LayoutDashboard className="text-indigo-300" size={28} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase bg-clip-text text-transparent bg-linear-to-r from-white via-gray-100 to-gray-400">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase flex items-center gap-2 mt-1">
                            <Activity size={12} className="text-purple-300 animate-pulse" /> Games Next JS
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 bg-white/3 backdrop-blur-md border border-white/10 rounded-full shadow-inner group transition-all duration-500 hover:border-emerald-500/30">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                        Server Online
                    </span>
                </div>
            </div>

            {/* TARJETAS SUPERIORES (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                {/* CARD JUEGOS - DEGRADADO ÍNDIGO */}
                <div className="group relative overflow-hidden bg-linear-to-br from-[#0a0b10] to-[#1a1c2e] border border-white/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-indigo-400/20 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)]">
                    <div className="absolute inset-0 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent opacity-50"></div>

                    <div className="relative flex items-center justify-between z-10">
                        <div>
                            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2 transition-colors group-hover:text-indigo-300">
                                Securities
                            </p>
                            <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent transition-transform duration-500">
                                <CountUp end={totalGames} duration={2.5} />
                            </h2>
                        </div>
                        <div className="relative p-4 bg-indigo-500/10 rounded-3xl border border-indigo-400/20 group-hover:rotate-6 transition-all duration-500">
                            <Gamepad2 size={48} className="text-indigo-300" />
                        </div>
                    </div>
                </div>

                {/* CARD CONSOLAS - DEGRADADO CIAN */}
                <div className="group relative overflow-hidden bg-linear-to-br from-[#0a0b10] to-[#0e2229] border border-white/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-cyan-400/20 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.2)]">
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent opacity-50"></div>

                    <div className="relative flex items-center justify-between z-10">
                        <div>
                            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2 transition-colors group-hover:text-cyan-300">
                                Platforms
                            </p>
                            <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent transition-transform duration-500">
                                <CountUp end={totalConsoles} duration={2.5} />
                            </h2>
                        </div>
                        <div className="relative p-4 bg-cyan-500/10 rounded-3xl border border-cyan-400/20 group-hover:-rotate-6 transition-all duration-500">
                            <Monitor size={48} className="text-cyan-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE GRÁFICAS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* BALANCE GENERAL - DEGRADADO PÚRPURA */}
                <div className="group relative overflow-hidden bg-linear-to-br from-[#0a0b10] to-[#1e1435] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/30">
                    <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent opacity-50"></div>

                    <div className="relative flex items-center justify-between mb-10 z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-400/20">
                                <Database size={18} className="text-purple-300" />
                            </div>
                            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-300">Balance Sheet</h3>
                        </div>
                    </div>

                    <div className="h-87.5 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={inventorySummary}
                                    innerRadius="65%"
                                    outerRadius="85%"
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {inventorySummary.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_SUMMARY[index % COLORS_SUMMARY.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111319', border: 'none', borderRadius: '12px' }} />
                                <Legend verticalAlign="bottom" formatter={(value) => <span className="text-gray-400">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* POR PLATAFORMA - DEGRADADO AZUL NOCHE */}
                <div className="group relative overflow-hidden bg-linear-to-br from-[#0a0b10] to-[#0f172a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30">
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-50"></div>

                    <div className="relative flex items-center justify-between mb-10 z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-400/20">
                                <Target size={18} className="text-blue-300" />
                            </div>
                            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-300">By Platform</h3>
                        </div>
                    </div>

                    <div className="h-87.5 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gamesByConsole}
                                    innerRadius="55%"
                                    outerRadius="75%"
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {gamesByConsole.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_CONSOLES[index % COLORS_CONSOLES.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111319', border: 'none', borderRadius: '12px' }} />
                                <Legend verticalAlign="bottom" formatter={(value) => <span className="text-gray-400">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}