"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

interface EducationFormProps {
    data: Array<{
        school: string;
        degree: string;
        start: string;
        end?: string;
    }>;
    onChange: (data: EducationFormProps["data"]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
    const addEducation = () => {
        const newEducation = {
            school: "",
            degree: "",
            start: "",
            end: "",
        };
        onChange([...data, newEducation]);
    };

    const updateEducation = (
        index: number,
        field: string,
        value: string | undefined
    ) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeEducation = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                    Formation et éducation
                </h3>
                <button
                    type="button"
                    onClick={addEducation}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Ajouter une formation
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Aucune formation
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Commencez par ajouter votre première formation
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={addEducation}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Ajouter une formation
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {data.map((edu, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h4 className="text-md font-medium text-gray-900">
                                    Formation {index + 1}
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Diplôme / Formation *
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
                                                "degree",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="ex: Master en Informatique"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Établissement *
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.school}
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
                                                "school",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="ex: Université de Paris"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de début *
                                    </label>
                                    <input
                                        type="month"
                                        value={edu.start}
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
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
                                        value={edu.end || ""}
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
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
                                                checked={!edu.end}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        index,
                                                        "end",
                                                        e.target.checked
                                                            ? undefined
                                                            : ""
                                                    )
                                                }
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Formation en cours
                                            </span>
                                        </label>
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
                                Incluez vos formations les plus pertinentes pour
                                le poste visé. Mettez en avant les diplômes,
                                certifications et formations continues qui
                                renforcent votre profil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AcademicCapIcon({ className }: { className?: string }) {
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
                d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
        </svg>
    );
}
