"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Resume } from "@/types";
import Link from "next/link";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import ResumeViewModal from "@/components/resume/ResumeViewModal";

export default function MyResumesPage() {
    const { data: session } = useSession();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (session?.user?.id) {
            fetchResumes();
        }
    }, [session]);

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/resume/list");
            if (response.ok) {
                const data = await response.json();
                setResumes(data.resumes);
            } else {
                setError("Erreur lors du chargement des CV");
            }
        } catch (error) {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const deleteResume = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) return;

        try {
            const response = await fetch(`/api/resume/delete/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setResumes(resumes.filter((resume) => resume.id !== id));
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            alert("Erreur de connexion");
        }
    };

    const duplicateResume = async (resume: Resume) => {
        try {
            const response = await fetch("/api/resume/duplicate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resumeId: resume.id,
                }),
            });

            if (response.ok) {
                const newResume = await response.json();
                setResumes([...resumes, newResume.resume]);
                alert("CV dupliqué avec succès !");
            } else {
                alert("Erreur lors de la duplication");
            }
        } catch (error) {
            alert("Erreur de connexion");
        }
    };

    const openResumeModal = (resume: Resume) => {
        setSelectedResume(resume);
        setIsModalOpen(true);
    };

    const closeResumeModal = () => {
        setIsModalOpen(false);
        setSelectedResume(null);
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Connexion requise
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Connectez-vous pour accéder à vos CV
                    </p>
                    <Link
                        href="/auth"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de vos CV...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Mes CV
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Gérez et organisez tous vos CV sauvegardés
                            </p>
                        </div>
                        <Link
                            href="/resume"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Créer un nouveau CV
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <DocumentDuplicateIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total CV
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {resumes.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <EyeIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Dernière modification
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {resumes.length > 0
                                        ? new Date(
                                              resumes[0].updatedAt
                                          ).toLocaleDateString("fr-FR")
                                        : "Aucun CV"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <PencilIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Actions rapides
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    Modifier • Dupliquer • Supprimer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumes List */}
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchResumes}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Réessayer
                        </button>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <DocumentDuplicateIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucun CV sauvegardé
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Commencez par créer votre premier CV professionnel
                        </p>
                        <Link
                            href="/resume"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Créer mon premier CV
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => openResumeModal(resume)}
                            >
                                {/* Template Preview */}
                                <div className="h-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-2">
                                            <DocumentDuplicateIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 capitalize">
                                            {resume.templateId}
                                        </p>
                                    </div>
                                </div>

                                {/* Resume Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {resume.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {resume.lang}
                                        </span>
                                        <div className="flex flex-col text-xs">
                                            <span>
                                                Créé le{" "}
                                                {new Date(
                                                    resume.createdAt
                                                ).toLocaleDateString("fr-FR")}
                                            </span>
                                            <span>
                                                Modifié le{" "}
                                                {new Date(
                                                    resume.updatedAt
                                                ).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openResumeModal(resume);
                                            }}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                                        >
                                            <EyeIcon className="w-4 h-4 mr-1" />
                                            Voir
                                        </button>
                                        <Link
                                            href={`/resume/edit/${resume.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4 mr-1" />
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                duplicateResume(resume);
                                            }}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
                                        >
                                            <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                                            Dupliquer
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteResume(resume.id);
                                            }}
                                            className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-md hover:bg-red-200 transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de visualisation */}
            <ResumeViewModal
                isOpen={isModalOpen}
                onClose={closeResumeModal}
                resume={selectedResume}
            />
        </div>
    );
}
