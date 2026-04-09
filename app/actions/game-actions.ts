'use server'
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import sharp from "sharp";
import { z } from "zod";
import { persistImage, removeStoredImage } from "@/lib/image-storage";

const GameSchema = z.object({
    title: z.string().min(3, "Titulo muy corto"),
    developer: z.string().min(2, "Nombre de desarrollador requerido"),
    genre: z.string().min(2, "Genero requerido"),
    description: z.string().min(10, "Descripcion mas detallada, por favor"),
    price: z.coerce.number().gt(0, "El precio debe ser mayor a 0"),
    console_id: z.coerce.number(),
    releasedate: z.string(),
});

export async function getConsoles() {
    return await prisma.console.findMany({ orderBy: { name: 'asc' } });
}

export async function getGameById(id: string) {
    const numericId = parseInt(id);

    if (isNaN(numericId)) return null;

    return await prisma.game.findUnique({
        where: { id: numericId },
        include: { console: true }
    });
}

export async function createGame(prevState: any, formData: FormData) {
    const validatedFields = GameSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: "Revisa los campos", fields: validatedFields.error.flatten().fieldErrors };
    }

    const existingGame = await prisma.game.findFirst({
        where: { title: { equals: validatedFields.data.title, mode: 'insensitive' } }
    });

    if (existingGame) {
        return { error: "Este juego ya se encuentra registrado en el sistema." };
    }

    let cover = "no-cover.png";
    const file = formData.get("cover") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        const fileName = `${Date.now()}-${nameWithoutExt}.jpg`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const processedBuffer = await sharp(buffer)
            .resize(600, 800, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        cover = await persistImage(processedBuffer, fileName, "image/jpeg");
    }

    await prisma.game.create({
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            cover
        }
    });

    revalidatePath("/games");
    return { success: true };
}

export async function updateGame(prevState: any, formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const validatedFields = GameSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) return { error: "Error de validacion" };

    const game = await prisma.game.findUnique({ where: { id } });
    let cover = game?.cover || "no-cover.png";

    const file = formData.get("cover") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        const fileName = `${Date.now()}-${nameWithoutExt}.jpg`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const processedBuffer = await sharp(buffer)
            .resize(600, 800, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        const storedImage = await persistImage(processedBuffer, fileName, "image/jpeg");

        if (game?.cover && game.cover !== "no-cover.png") {
            try {
                await removeStoredImage(game.cover, "no-cover.png");
            } catch (err) {
                console.error("No se pudo borrar el archivo viejo:", err);
            }
        }

        cover = storedImage;
    }

    await prisma.game.update({
        where: { id },
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            cover
        }
    });

    revalidatePath("/games");
    return { success: true };
}

export async function deleteGame(id: number) {
    try {
        const game = await prisma.game.findUnique({
            where: { id },
            select: { cover: true }
        });

        if (!game) {
            return { error: "El juego no existe." };
        }

        if (game.cover && game.cover !== "no-cover.png") {
            try {
                await removeStoredImage(game.cover, "no-cover.png");
            } catch (err) {
                console.error("No se pudo borrar el archivo fisico:", err);
            }
        }

        await prisma.game.delete({ where: { id } });
        revalidatePath("/games");

        return { success: true };
    } catch (error) {
        console.error("Delete Error:", error);
        return { error: "Error en el servidor al intentar eliminar el juego." };
    }
}
