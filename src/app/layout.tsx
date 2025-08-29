import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "JobBoost - CV & Coaching de carrière",
    description:
        "Démarquez-vous rapidement avec des CV et lettres de motivation optimisés ATS et un coaching intégré",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <AuthProvider>
                    <div className="min-h-screen bg-gray-50">
                        <Navbar />
                        <main>{children}</main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
