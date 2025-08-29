"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

interface SkillsFormProps {
    data: Array<{
        name: string;
        level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
        keywords: string[];
    }>;
    onChange: (data: SkillsFormProps["data"]) => void;
}

const skillLevels = [
    {
        value: "BEGINNER",
        label: "Débutant",
        color: "bg-gray-100 text-gray-800",
    },
    {
        value: "INTERMEDIATE",
        label: "Intermédiaire",
        color: "bg-blue-100 text-blue-800",
    },
    {
        value: "ADVANCED",
        label: "Avancé",
        color: "bg-green-100 text-green-800",
    },
    {
        value: "EXPERT",
        label: "Expert",
        color: "bg-purple-100 text-purple-800",
    },
];

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
    const [newKeyword, setNewKeyword] = useState("");

    const addSkill = () => {
        const newSkill = {
            name: "",
            level: "INTERMEDIATE" as const,
            keywords: [],
        };
        onChange([...data, newSkill]);
    };

    const updateSkill = (
        index: number,
        field: string,
        value: string | "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
    ) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeSkill = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    const addKeyword = (skillIndex: number) => {
        if (newKeyword.trim()) {
            const newData = [...data];
            newData[skillIndex].keywords.push(newKeyword.trim());
            onChange(newData);
            setNewKeyword("");
        }
    };

    const removeKeyword = (skillIndex: number, keywordIndex: number) => {
        const newData = [...data];
        newData[skillIndex].keywords.splice(keywordIndex, 1);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                    Compétences et skills
                </h3>
                <button
                    type="button"
                    onClick={addSkill}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Ajouter une compétence
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Aucune compétence
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Commencez par ajouter vos compétences principales
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={addSkill}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Ajouter ma première compétence
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom de la compétence
                                        </label>
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) =>
                                                updateSkill(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ex: JavaScript, Gestion de projet, Leadership"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Niveau
                                        </label>
                                        <select
                                            value={skill.level}
                                            onChange={(e) =>
                                                updateSkill(
                                                    index,
                                                    "level",
                                                    e.target.value as
                                                        | "BEGINNER"
                                                        | "INTERMEDIATE"
                                                        | "ADVANCED"
                                                        | "EXPERT"
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {skillLevels.map((level) => (
                                                <option
                                                    key={level.value}
                                                    value={level.value}
                                                >
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mots-clés associés
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={newKeyword}
                                                onChange={(e) =>
                                                    setNewKeyword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ajouter un mot-clé"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        addKeyword(index);
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addKeyword(index)
                                                }
                                                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {skill.keywords.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {skill.keywords.map(
                                                    (keyword, keywordIndex) => (
                                                        <span
                                                            key={keywordIndex}
                                                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                        >
                                                            {keyword}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeKeyword(
                                                                        index,
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
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills Summary */}
            {data.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                        Résumé des compétences
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {skillLevels.map((level) => {
                            const skillsInLevel = data.filter(
                                (skill) => skill.level === level.value
                            );
                            if (skillsInLevel.length === 0) return null;

                            return (
                                <div key={level.value} className="text-center">
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${level.color}`}
                                    >
                                        {level.label}
                                    </div>
                                    <p className="mt-2 text-2xl font-bold text-gray-900">
                                        {skillsInLevel.length}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        compétence
                                        {skillsInLevel.length > 1 ? "s" : ""}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
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
                                Organisez vos compétences par niveau et ajoutez
                                des mots-clés associés pour améliorer votre
                                visibilité ATS. Privilégiez les compétences
                                techniques et soft skills demandées dans votre
                                secteur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message de fin */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-green-800 mb-2">
                    🎉 Félicitations !
                </h3>
                <p className="text-sm text-green-700">
                    Vous avez terminé la création de votre CV. Utilisez les
                    boutons ci-dessous pour sauvegarder ou exporter votre
                    document.
                </p>
            </div>
        </div>
    );
}

function WrenchScrewdriverIcon({ className }: { className?: string }) {
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
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.725 5.653a2.548 2.548 0 11-3.586-3.586l6.87-5.653m-7.518 7.518l-1.008 1.007a2.548 2.548 0 11-3.586-3.586l1.007-1.008m9.213-9.213l-.471-.529a2.548 2.548 0 00-3.586 0l-.471.529M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}
