import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validation des données
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, mot de passe et nom sont requis" },
                { status: 400 }
            );
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Un utilisateur avec cet email existe déjà" },
                { status: 409 }
            );
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                plan: "FREE",
            },
        });

        // Retourner l'utilisateur créé (sans le mot de passe)
        return NextResponse.json(
            {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan,
                createdAt: user.createdAt,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}
