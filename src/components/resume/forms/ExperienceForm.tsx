"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ExperienceFormProps {
    data: Array<{
        company: string;
        role: string;
        start: string;
        end?: string;
        achievements: string[];
        keywords: string[];
    }>;
    onChange: (data: ExperienceFormProps["data"]) => void;
}

export default function ExperienceForm({
    data,
    onChange,
}: ExperienceFormProps) {
    const [newAchievement, setNewAchievement] = useState("");
    const [newKeyword, setNewKeyword] = useState("");

    const addExperience = () => {
        const newExperience = {
            company: "",
            role: "",
            start: "",
            end: "",
            achievements: [],
            keywords: [],
        };
        onChange([...data, newExperience]);
    };

    const updateExperience = (
        index: number,
        field: string,
        value: string | string[] | undefined
    ) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeExperience = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    const addAchievement = (expIndex: number) => {
        if (newAchievement.trim()) {
            const newData = [...data];
            newData[expIndex].achievements.push(newAchievement.trim());
            onChange(newData);
            setNewAchievement("");
        }
    };

    const removeAchievement = (expIndex: number, achievementIndex: number) => {
        const newData = [...data];
        newData[expIndex].achievements.splice(achievementIndex, 1);
        onChange(newData);
    };

    const addKeyword = (expIndex: number) => {
        if (newKeyword.trim()) {
            const newData = [...data];
            newData[expIndex].keywords.push(newKeyword.trim());
            onChange(newData);
            setNewKeyword("");
        }
    };

    const removeKeyword = (expIndex: number, keywordIndex: number) => {
        const newData = [...data];
        newData[expIndex].keywords.splice(keywordIndex, 1);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                    Expérience professionnelle
                </h3>
                <button
                    type="button"
                    onClick={addExperience}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Ajouter une expérience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Aucune expérience
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Commencez par ajouter votre première expérience
                        professionnelle
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={addExperience}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Ajouter une expérience
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {data.map((exp, expIndex) => (
                        <div
                            key={expIndex}
                            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h4 className="text-md font-medium text-gray-900">
                                    Expérience {expIndex + 1}
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => removeExperience(expIndex)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Poste *
                                    </label>
                                    <input
                                        type="text"
                                        value={exp.role}
                                        onChange={(e) =>
                                            updateExperience(
                                                expIndex,
                                                "role",
                                                e.target.value
                                            )
                                        }
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
                                        value={exp.company}
                                        onChange={(e) =>
                                            updateExperience(
                                                expIndex,
                                                "company",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="ex: TechCorp"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de début *
                                    </label>
                                    <input
                                        type="month"
                                        value={exp.start}
                                        onChange={(e) =>
                                            updateExperience(
                                                expIndex,
                                                "start",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de fin
                                    </label>
                                    <input
                                        type="month"
                                        value={exp.end || ""}
                                        onChange={(e) =>
                                            updateExperience(
                                                expIndex,
                                                "end",
                                                e.target.value || undefined
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <div className="mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={!exp.end}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        expIndex,
                                                        "end",
                                                        e.target.checked
                                                            ? undefined
                                                            : ""
                                                    )
                                                }
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Poste actuel
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Réalisations principales
                                </label>
                                <div className="space-y-2">
                                    {exp.achievements.map(
                                        (achievement, achievementIndex) => (
                                            <div
                                                key={achievementIndex}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    value={achievement}
                                                    onChange={(e) => {
                                                        const newData = [
                                                            ...data,
                                                        ];
                                                        newData[
                                                            expIndex
                                                        ].achievements[
                                                            achievementIndex
                                                        ] = e.target.value;
                                                        onChange(newData);
                                                    }}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="ex: Développé une application web responsive..."
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAchievement(
                                                            expIndex,
                                                            achievementIndex
                                                        )
                                                    }
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )
                                    )}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newAchievement}
                                            onChange={(e) =>
                                                setNewAchievement(
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ajouter une réalisation"
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addAchievement(expIndex)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAchievement(expIndex)
                                            }
                                            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Keywords */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mots-clés techniques
                                </label>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {exp.keywords.map(
                                            (keyword, keywordIndex) => (
                                                <span
                                                    key={keywordIndex}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                >
                                                    {keyword}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeKeyword(
                                                                expIndex,
                                                                keywordIndex
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <XMarkIcon className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newKeyword}
                                            onChange={(e) =>
                                                setNewKeyword(e.target.value)
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ajouter un mot-clé (React, Node.js...)"
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addKeyword(expIndex)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addKeyword(expIndex)}
                                            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                                Utilisez des verbes d'action forts (développé,
                                géré, optimisé...) et quantifiez vos
                                réalisations quand c'est possible. Ajoutez des
                                mots-clés techniques pertinents pour améliorer
                                votre score ATS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BriefcaseIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.815-9-2.145M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.815-9-2.145M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.815-9-2.145M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.815-9-2.145"
            />
        </svg>
    );
}
