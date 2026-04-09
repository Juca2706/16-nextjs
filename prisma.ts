// Archivo: /prisma.ts (En la raíz)
import { PrismaClient } from './app/generated/prisma'; // Ruta relativa directa
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

const connectionString = `${process.env.DATABASE_URL}`;

// Creamos el pool fuera para que sea más limpio
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool) as any;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: adapter, // Aquí ya no debería dar error
        log: ['query', 'error', 'warn']
    } as any); // El 'as any' aquí es el secreto para quitar los rojos

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;