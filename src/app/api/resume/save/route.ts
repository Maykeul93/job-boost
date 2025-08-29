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

        const body = await request.json();
        const { title, templateId, lang, data } = body;

        // Validation des données
        if (!title || !templateId || !data) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        // Sauvegarder le CV
        const resume = await prisma.resume.create({
            data: {
                userId: session.user.id,
                title,
                templateId,
                lang: lang || "FR",
                data: data as any, // Prisma gère la sérialisation
            },
        });

        return NextResponse.json({
            success: true,
            resume,
            message: "CV sauvegardé avec succès",
        });
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du CV:", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}
