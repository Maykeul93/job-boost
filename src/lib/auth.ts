import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma), // Temporairement commenté pour éviter les conflits de types
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
                name: { label: "Nom", type: "text" },
                isSignUp: { label: "Inscription", type: "boolean" },
            },
            async authorize(credentials) {
                if (!credentials?.email) {
                    throw new Error("Email requis");
                }

                // Mode inscription
                if (credentials.isSignUp === "true") {
                    if (!credentials.password || !credentials.name) {
                        throw new Error(
                            "Nom et mot de passe requis pour l'inscription"
                        );
                    }

                    // Vérifier si l'utilisateur existe déjà
                    const existingUser = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (existingUser) {
                        throw new Error(
                            "Un utilisateur avec cet email existe déjà"
                        );
                    }

                    // Créer le nouvel utilisateur
                    const hashedPassword = await bcrypt.hash(
                        credentials.password,
                        12
                    );
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            name: credentials.name,
                            password: hashedPassword,
                            plan: "FREE",
                        },
                    });

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        plan: user.plan,
                    };
                }

                // Mode connexion
                if (!credentials.password) {
                    throw new Error("Mot de passe requis");
                }

                // Rechercher l'utilisateur par email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Email ou mot de passe incorrect");
                }

                // Vérifier le mot de passe
                if (!user.password) {
                    throw new Error(
                        "Ce compte n'a pas de mot de passe configuré"
                    );
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isPasswordValid) {
                    throw new Error("Email ou mot de passe incorrect");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    plan: user.plan,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.plan = user.plan;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub!;
                session.user.plan = token.plan as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth",
        // signUp: "/auth", // Cette propriété n'existe pas dans PagesOptions
    },
    secret: process.env.NEXTAUTH_SECRET,
};
