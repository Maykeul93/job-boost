import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const resumeId = params.id;

        // Vérifier que le CV appartient à l'utilisateur
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: session.user.id,
            },
        });

        if (!resume) {
            return NextResponse.json(
                { error: "CV non trouvé ou non autorisé" },
                { status: 404 }
            );
        }

        // Supprimer le CV
        await prisma.resume.delete({
            where: {
                id: resumeId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "CV supprimé avec succès",
        });
    } catch (error) {
        console.error("Erreur lors de la suppression du CV:", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}
