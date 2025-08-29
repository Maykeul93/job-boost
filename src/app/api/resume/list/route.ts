import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        // Récupérer tous les CV de l'utilisateur
        const resumes = await prisma.resume.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
            select: {
                id: true,
                title: true,
                templateId: true,
                lang: true,
                data: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({
            success: true,
            resumes,
            count: resumes.length,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des CV:", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}
