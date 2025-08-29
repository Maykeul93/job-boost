import { ResumeData } from "@/types";

interface ModernTemplateProps {
    data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
    // Vérifications de sécurité
    const basics = data?.basics || {};
    const experience = data?.experience || [];
    const education = data?.education || [];
    const skills = data?.skills || [];

    return (
        <div className="min-h-[297mm] w-[210mm] mx-auto bg-white text-gray-900 font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <h1 className="text-4xl font-bold mb-2">
                    {basics.firstName || "Prénom"} {basics.lastName || "Nom"}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                    {basics.title || "Titre du poste"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-80">
                    <div>
                        <p className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {basics.contacts?.email || "email@example.com"}
                        </p>
                        {basics.contacts?.phone && (
                            <p className="flex items-center gap-2 mt-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {basics.contacts.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {basics.location?.city || "Ville"},{" "}
                            {basics.location?.country || "Pays"}
                        </p>
                        {basics.contacts?.links &&
                            basics.contacts.links.length > 0 && (
                                <p className="flex items-center gap-2 mt-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1h1.172l-3.586-3.586a2 2 0 00-2.828 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {basics.contacts.links.join(", ")}
                                </p>
                            )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
                {/* Summary */}
                {basics.summary && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                            Résumé
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                            Expérience Professionnelle
                        </h2>
                        <div className="space-y-4">
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-blue-500 pl-4"
                                >
                                    <h3 className="font-semibold text-gray-800">
                                        {exp.role || "Rôle"}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {exp.company || "Entreprise"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {exp.start || "Début"} -{" "}
                                        {exp.end || "Présent"}
                                    </p>
                                    {exp.achievements &&
                                        exp.achievements.length > 0 && (
                                            <p className="text-gray-600 mt-2">
                                                {exp.achievements.join(", ")}
                                            </p>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                            Formation
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-blue-500 pl-4"
                                >
                                    <h3 className="font-semibold text-gray-800">
                                        {edu.degree || "Diplôme"}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {edu.school || "École"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {edu.start || "Début"} -{" "}
                                        {edu.end || "Présent"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                            Compétences
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                    {skill.name || "Compétence"}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
