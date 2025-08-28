"use client";

import { useState } from "react";
import {
    EnvelopeIcon,
    DocumentTextIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

const coverLetterTemplates = [
    {
        id: "classic",
        name: "Classique",
        description: "Style professionnel et traditionnel",
        isPremium: false,
    },
    {
        id: "dynamic",
        name: "Dynamique",
        description: "Tonalité moderne et engageante",
        isPremium: false,
    },
    {
        id: "career-change",
        name: "Reconversion",
        description: "Spécialement conçu pour les changements de carrière",
        isPremium: true,
    },
];

export default function CoverLettersPage() {
    const [selectedTemplate, setSelectedTemplate] = useState("classic");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Générateur de lettres de motivation
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Créez des lettres de motivation personnalisées et
                        impactantes en quelques minutes
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Template Selection */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Choisissez votre template
                            </h2>

                            <div className="space-y-3">
                                {coverLetterTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                            selectedTemplate === template.id
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() =>
                                            setSelectedTemplate(template.id)
                                        }
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {template.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {template.description}
                                                </p>
                                            </div>
                                            {template.isPremium && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                                    Premium
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <SparklesIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-800">
                                            Conseil
                                        </h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Choisissez un template qui
                                            correspond à votre personnalité et
                                            au type d'entreprise visée.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Letter Builder */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Générateur de lettre
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Poste visé *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="ex: Développeur Full Stack"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Entreprise *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="ex: TechCorp"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Offre d'emploi
                                    </label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Collez ici le texte de l'offre d'emploi pour des suggestions personnalisées..."
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Optionnel : Collez l'offre d'emploi pour
                                        des suggestions de mots-clés
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre d'années d'expérience
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="5"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Domaine d'expertise
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="ex: Développement web"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Réalisation principale
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Décrivez votre plus grande réussite professionnelle..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Disponibilité
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="ex: Immédiate, 2 semaines de préavis..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                                        <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                                        Prévisualiser
                                    </button>
                                    <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
                                        <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                                        Exporter PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Pourquoi utiliser notre générateur ?
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Créez des lettres de motivation qui se démarquent et
                            augmentent vos chances d'être convoqué
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <SparklesIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Personnalisation intelligente
                            </h3>
                            <p className="text-gray-600">
                                Nos templates s'adaptent automatiquement à votre
                                profil et au poste visé
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <DocumentTextIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Optimisation ATS
                            </h3>
                            <p className="text-gray-600">
                                Intégration des mots-clés de l'offre pour
                                maximiser votre visibilité
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <EnvelopeIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Export professionnel
                            </h3>
                            <p className="text-gray-600">
                                PDF haute qualité prêt à envoyer aux recruteurs
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
