"use client";

import { useState } from "react";
import {
    PlusIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface Application {
    id: string;
    company: string;
    position: string;
    appliedAt: string;
    status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
    followUpAt?: string;
    notes?: string;
}

const mockApplications: Application[] = [
    {
        id: "1",
        company: "TechCorp",
        position: "Développeur Full Stack",
        appliedAt: "2024-01-15",
        status: "APPLIED",
        followUpAt: "2024-01-22",
        notes: "CV et lettre envoyés. Poste très intéressant.",
    },
    {
        id: "2",
        company: "StartupXYZ",
        position: "Lead Developer",
        appliedAt: "2024-01-10",
        status: "INTERVIEW",
        followUpAt: "2024-01-25",
        notes: "Premier entretien prévu le 25 janvier. Préparer présentation technique.",
    },
    {
        id: "3",
        company: "BigTech Inc",
        position: "Senior Software Engineer",
        appliedAt: "2024-01-05",
        status: "REJECTED",
        notes: "Refusé après entretien final. Feedback : manque d'expérience en architecture cloud.",
    },
];

const statusConfig = {
    APPLIED: {
        label: "Candidature envoyée",
        color: "bg-blue-100 text-blue-800",
        icon: ClockIcon,
    },
    INTERVIEW: {
        label: "En entretien",
        color: "bg-yellow-100 text-yellow-800",
        icon: CalendarIcon,
    },
    OFFER: {
        label: "Offre reçue",
        color: "bg-green-100 text-green-800",
        icon: CheckCircleIcon,
    },
    REJECTED: {
        label: "Refusé",
        color: "bg-red-100 text-red-800",
        icon: XCircleIcon,
    },
    WITHDRAWN: {
        label: "Retiré",
        color: "bg-gray-100 text-gray-800",
        icon: XCircleIcon,
    },
};

export default function ApplicationsPage() {
    const [applications, setApplications] =
        useState<Application[]>(mockApplications);
    const [showAddForm, setShowAddForm] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("ALL");

    const addApplication = (app: Omit<Application, "id">) => {
        const newApp: Application = {
            ...app,
            id: Date.now().toString(),
        };
        setApplications([newApp, ...applications]);
        setShowAddForm(false);
    };

    const updateStatus = (id: string, status: Application["status"]) => {
        setApplications((apps) =>
            apps.map((app) => (app.id === id ? { ...app, status } : app))
        );
    };

    const filteredApplications =
        filterStatus === "ALL"
            ? applications
            : applications.filter((app) => app.status === filterStatus);

    const stats = {
        total: applications.length,
        applied: applications.filter((app) => app.status === "APPLIED").length,
        interview: applications.filter((app) => app.status === "INTERVIEW")
            .length,
        offer: applications.filter((app) => app.status === "OFFER").length,
        rejected: applications.filter((app) => app.status === "REJECTED")
            .length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Suivi des candidatures
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Organisez et suivez toutes vos candidatures en
                                un seul endroit
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Nouvelle candidature
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.total}
                        </div>
                        <div className="text-sm text-gray-500">Total</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.applied}
                        </div>
                        <div className="text-sm text-gray-500">Envoyées</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {stats.interview}
                        </div>
                        <div className="text-sm text-gray-500">Entretiens</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {stats.offer}
                        </div>
                        <div className="text-sm text-gray-500">Offres</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {stats.rejected}
                        </div>
                        <div className="text-sm text-gray-500">Refusées</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            Filtrer par statut :
                        </span>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ALL">Tous les statuts</option>
                            <option value="APPLIED">Candidature envoyée</option>
                            <option value="INTERVIEW">En entretien</option>
                            <option value="OFFER">Offre reçue</option>
                            <option value="REJECTED">Refusé</option>
                            <option value="WITHDRAWN">Retiré</option>
                        </select>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                Aucune candidature
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Commencez par ajouter votre première candidature
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Ajouter une candidature
                                </button>
                            </div>
                        </div>
                    ) : (
                        filteredApplications.map((app) => {
                            const status = statusConfig[app.status];
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={app.id}
                                    className="bg-white rounded-lg border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {app.position}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-blue-600 font-medium mb-2">
                                                {app.company}
                                            </p>

                                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    Candidature envoyée le{" "}
                                                    {new Date(
                                                        app.appliedAt
                                                    ).toLocaleDateString(
                                                        "fr-FR"
                                                    )}
                                                </span>
                                                {app.followUpAt && (
                                                    <span className="flex items-center gap-1">
                                                        <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                                                        Relance prévue le{" "}
                                                        {new Date(
                                                            app.followUpAt
                                                        ).toLocaleDateString(
                                                            "fr-FR"
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            {app.notes && (
                                                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded border">
                                                    {app.notes}
                                                </p>
                                            )}
                                        </div>

                                        <div className="ml-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) =>
                                                    updateStatus(
                                                        app.id,
                                                        e.target
                                                            .value as Application["status"]
                                                    )
                                                }
                                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="APPLIED">
                                                    Candidature envoyée
                                                </option>
                                                <option value="INTERVIEW">
                                                    En entretien
                                                </option>
                                                <option value="OFFER">
                                                    Offre reçue
                                                </option>
                                                <option value="REJECTED">
                                                    Refusé
                                                </option>
                                                <option value="WITHDRAWN">
                                                    Retiré
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Add Application Form */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Nouvelle candidature
                                </h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(
                                            e.currentTarget
                                        );
                                        addApplication({
                                            company: formData.get(
                                                "company"
                                            ) as string,
                                            position: formData.get(
                                                "position"
                                            ) as string,
                                            appliedAt: formData.get(
                                                "appliedAt"
                                            ) as string,
                                            status: "APPLIED",
                                            followUpAt:
                                                (formData.get(
                                                    "followUpAt"
                                                ) as string) || undefined,
                                            notes:
                                                (formData.get(
                                                    "notes"
                                                ) as string) || undefined,
                                        });
                                    }}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Entreprise *
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Poste *
                                            </label>
                                            <input
                                                type="text"
                                                name="position"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date de candidature *
                                            </label>
                                            <input
                                                type="date"
                                                name="appliedAt"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date de relance
                                            </label>
                                            <input
                                                type="date"
                                                name="followUpAt"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Notes
                                            </label>
                                            <textarea
                                                name="notes"
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Ajouter
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAddForm(false)
                                            }
                                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
