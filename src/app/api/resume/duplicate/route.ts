import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { resumeId } = await request.json();

        if (!resumeId) {
            return NextResponse.json(
                { error: "ID du CV requis" },
                { status: 400 }
            );
        }

        // Récupérer le CV original
        const originalResume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: session.user.id,
            },
        });

        if (!originalResume) {
            return NextResponse.json(
                { error: "CV non trouvé ou non autorisé" },
                { status: 404 }
            );
        }

        // Créer une copie du CV
        const duplicatedResume = await prisma.resume.create({
            data: {
                userId: session.user.id,
                title: `${originalResume.title} (Copie)`,
                templateId: originalResume.templateId,
                lang: originalResume.lang,
                data: originalResume.data,
            },
        });

        return NextResponse.json({
            success: true,
            resume: duplicatedResume,
            message: "CV dupliqué avec succès",
        });
    } catch (error) {
        console.error("Erreur lors de la duplication du CV:", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}
