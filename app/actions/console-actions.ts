'use server'
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import sharp from "sharp";
import { z } from "zod";
import { persistImage, removeStoredImage } from "@/lib/image-storage";

const ConsoleSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    manufacturer: z.string().min(2, "El fabricante es requerido"),
    description: z.string().min(10, "La descripcion debe ser mas detallada"),
    releasedate: z.string().min(1, "La fecha de lanzamiento es requerida"),
});

export async function getConsoleById(id: string) {
    const numericId = parseInt(id);
    if (isNaN(numericId)) return null;

    return await prisma.console.findUnique({
        where: { id: numericId }
    });
}

export async function createConsole(prevState: any, formData: FormData) {
    const validatedFields = ConsoleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: "Revisa los campos", fields: validatedFields.error.flatten().fieldErrors };
    }

    const existingConsole = await prisma.console.findUnique({
        where: { name: validatedFields.data.name }
    });

    if (existingConsole) {
        return { error: "Esta consola ya existe en el sistema." };
    }

    let image = "no-image.png";
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        const fileName = `${Date.now()}-${nameWithoutExt}.jpg`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const processedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        image = await persistImage(processedBuffer, fileName, "image/jpeg");
    }

    await prisma.console.create({
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            image
        }
    });

    revalidatePath("/consoles");
    return { success: true };
}

export async function updateConsole(prevState: any, formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const validatedFields = ConsoleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) return { error: "Error de validacion" };

    const consoleData = await prisma.console.findUnique({ where: { id } });
    let image = consoleData?.image || "no-image.png";

    const file = formData.get("image") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        const fileName = `${Date.now()}-${nameWithoutExt}.jpg`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const processedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        const storedImage = await persistImage(processedBuffer, fileName, "image/jpeg");

        if (consoleData?.image && consoleData.image !== "no-image.png") {
            try {
                await removeStoredImage(consoleData.image, "no-image.png");
            } catch (err) {
                console.error(err);
            }
        }

        image = storedImage;
    }

    await prisma.console.update({
        where: { id },
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            image
        }
    });

    revalidatePath("/consoles");
    return { success: true };
}

export async function deleteConsole(id: number) {
    try {
        const consoleData = await prisma.console.findUnique({
            where: { id },
            include: { games: true }
        });

        if (!consoleData) return { error: "La consola no existe." };

        if (consoleData.games.length > 0) {
            return { error: `No puedes eliminar esta consola porque tiene ${consoleData.games.length} juegos asociados.` };
        }

        if (consoleData.image && consoleData.image !== "no-image.png") {
            try {
                await removeStoredImage(consoleData.image, "no-image.png");
            } catch (err) {
                console.error(err);
            }
        }

        await prisma.console.delete({ where: { id } });
        revalidatePath("/consoles");
        return { success: true };
    } catch (error) {
        return { error: "Error al eliminar la consola." };
    }
}
