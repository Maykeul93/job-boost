"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

interface AuthCredentials {
    email: string;
    password: string;
    name?: string;
    isSignUp?: boolean;
}

export function useAuth() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: AuthCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                isSignUp: "false",
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
                return false;
            }

            return true;
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: AuthCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            // Appeler directement l'API d'inscription
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                    name: credentials.name,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Erreur lors de l'inscription");
                return false;
            }

            // Si l'inscription réussit, connecter automatiquement l'utilisateur
            const loginResult = await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });

            if (loginResult?.error) {
                setError("Inscription réussie mais connexion échouée");
                return false;
            }

            return true;
        } catch (err) {
            setError("Une erreur est survenue lors de l'inscription");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        signOut({ callbackUrl: "/" });
    };

    return {
        session,
        status,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!session,
    };
}
