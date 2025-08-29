"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    BriefcaseIcon,
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "CV Builder", href: "/resume", icon: DocumentTextIcon },
    { name: "Lettres", href: "/cover-letters", icon: EnvelopeIcon },
    { name: "Candidatures", href: "/applications", icon: BriefcaseIcon },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { session, isAuthenticated, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">JobBoost</span>
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    J
                                </span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                JobBoost
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700">
                                Bonjour,{" "}
                                {session?.user?.name || session?.user?.email}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                            >
                                <UserCircleIcon className="h-6 w-6" />
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            <UserCircleIcon className="h-6 w-6" />
                            Connexion
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">JobBoost</span>
                                <div className="flex items-center">
                                    <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            J
                                        </span>
                                    </div>
                                    <span className="ml-2 text-xl font-bold text-gray-900">
                                        JobBoost
                                    </span>
                                </div>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-3 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {isAuthenticated ? (
                                        <div className="space-y-2">
                                            <div className="px-3 py-2 text-sm text-gray-700">
                                                Bonjour,{" "}
                                                {session?.user?.name ||
                                                    session?.user?.email}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="flex items-center gap-3 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left"
                                            >
                                                <UserCircleIcon className="h-6 w-6" />
                                                Déconnexion
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            href="/auth"
                                            className="flex items-center gap-3 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <UserCircleIcon className="h-6 w-6" />
                                            Connexion
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
