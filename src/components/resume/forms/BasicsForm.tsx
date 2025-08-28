"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface BasicsFormProps {
    data: {
        firstName: string;
        lastName: string;
        title: string;
        summary: string;
        contacts: {
            email: string;
            phone: string;
            links: string[];
        };
        location: {
            city: string;
            country: string;
        };
    };
    onChange: (data: BasicsFormProps["data"]) => void;
}

export default function BasicsForm({ data, onChange }: BasicsFormProps) {
    const [newLink, setNewLink] = useState("");

    const updateField = (field: string, value: string) => {
        onChange({
            ...data,
            [field]: value,
        });
    };

    const updateContacts = (field: string, value: string | string[]) => {
        onChange({
            ...data,
            contacts: {
                ...data.contacts,
                [field]: value,
            },
        });
    };

    const updateLocation = (field: string, value: string) => {
        onChange({
            ...data,
            location: {
                ...data.location,
                [field]: value,
            },
        });
    };

    const addLink = () => {
        if (newLink.trim() && !data.contacts.links.includes(newLink.trim())) {
            updateContacts("links", [...data.contacts.links, newLink.trim()]);
            setNewLink("");
        }
    };

    const removeLink = (index: number) => {
        const newLinks = data.contacts.links.filter((_, i) => i !== index);
        updateContacts("links", newLinks);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Informations personnelles
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Prénom *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={data.firstName}
                            onChange={(e) =>
                                updateField("firstName", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Votre prénom"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nom *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={data.lastName}
                            onChange={(e) =>
                                updateField("lastName", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Votre nom"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Titre du poste *
                </label>
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: Développeur Full Stack, Chef de projet..."
                />
            </div>

            <div>
                <label
                    htmlFor="summary"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Résumé professionnel
                </label>
                <textarea
                    id="summary"
                    value={data.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez brièvement votre profil professionnel, vos objectifs et vos points forts..."
                />
                <p className="mt-1 text-sm text-gray-500">
                    {data.summary.length}/500 caractères
                </p>
            </div>

            <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">
                    Coordonnées
                </h4>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.contacts.email}
                            onChange={(e) =>
                                updateContacts("email", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="votre.email@exemple.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={data.contacts.phone}
                            onChange={(e) =>
                                updateContacts("phone", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+33 6 12 34 56 78"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Liens professionnels
                        </label>
                        <div className="space-y-2">
                            {data.contacts.links.map((link, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => {
                                            const newLinks = [
                                                ...data.contacts.links,
                                            ];
                                            newLinks[index] = e.target.value;
                                            updateContacts("links", newLinks);
                                        }}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://linkedin.com/in/votre-profil"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ajouter un lien (LinkedIn, portfolio...)"
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && addLink()
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={addLink}
                                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">
                    Localisation
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Ville
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={data.location.city}
                            onChange={(e) =>
                                updateLocation("city", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Paris"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Pays
                        </label>
                        <input
                            type="text"
                            id="country"
                            value={data.location.country}
                            onChange={(e) =>
                                updateLocation("country", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="France"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-5 w-5 text-blue-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            Conseil
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <p>
                                Rédigez un résumé professionnel accrocheur qui
                                met en avant vos points forts et votre valeur
                                ajoutée. Évitez les phrases trop longues et
                                privilégiez les mots-clés de votre secteur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
