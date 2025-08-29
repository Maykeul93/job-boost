"use client";

import { ResumeData } from "@/types";

interface ResumePreviewProps {
    data: ResumeData;
    selectedTemplate: string;
}

export default function ResumePreview({
    data,
    selectedTemplate,
}: ResumePreviewProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                    Aperçu de votre CV
                </h3>
                <p className="mt-2 text-gray-600">
                    Template :{" "}
                    <span className="font-semibold capitalize">
                        {selectedTemplate}
                    </span>
                </p>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                        <h1 className="text-3xl font-bold mb-2">
                            {data.basics.firstName} {data.basics.lastName}
                        </h1>
                        <p className="text-xl opacity-90">
                            {data.basics.title || "Titre du poste"}
                        </p>
                        <p className="opacity-80">
                            {data.basics.contacts.email || "email@example.com"}
                        </p>
                        {data.basics.contacts.phone && (
                            <p className="opacity-80">
                                {data.basics.contacts.phone}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        {/* Summary */}
                        {data.basics.summary && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                                    Résumé
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {data.basics.summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                                    Expérience Professionnelle
                                </h2>
                                <div className="space-y-4">
                                    {data.experience.map((exp, index) => (
                                        <div
                                            key={index}
                                            className="border-l-4 border-blue-500 pl-4"
                                        >
                                            <h3 className="font-semibold text-gray-800">
                                                {exp.role}
                                            </h3>
                                            <p className="text-blue-600 font-medium">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {exp.start} -{" "}
                                                {exp.end || "Présent"}
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                {exp.achievements.join(", ")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                                    Formation
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="border-l-4 border-blue-500 pl-4"
                                        >
                                            <h3 className="font-semibold text-gray-800">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-blue-600 font-medium">
                                                {edu.school}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {edu.start} -{" "}
                                                {edu.end || "Présent"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                                    Compétences
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-gray-500">
                <p>
                    💡 <strong>Conseil :</strong> Vérifiez que toutes les
                    informations sont correctes avant de continuer
                </p>
            </div>
        </div>
    );
}
