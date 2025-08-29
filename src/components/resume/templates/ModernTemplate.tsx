import { ResumeData } from "@/types";

interface ModernTemplateProps {
    data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
    return (
        <div
            className="bg-white text-gray-900 max-w-[210mm] mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <h1 className="text-4xl font-bold mb-2">
                    {data.basics.firstName} {data.basics.lastName}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                    {data.basics.title || "Titre du poste"}
                </p>
                <div className="flex flex-wrap gap-4 text-sm opacity-80">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {data.basics.contacts.email}
                    </div>
                    {data.basics.contacts.phone && (
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {data.basics.contacts.phone}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
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
                        {data.basics.location.city},{" "}
                        {data.basics.location.country}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
                {/* Summary */}
                {data.basics.summary && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2">
                            Profil
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {data.basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                            Expérience Professionnelle
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-blue-500 pl-6"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {exp.start} - {exp.end || "Présent"}
                                        </span>
                                    </div>
                                    <p className="text-blue-600 font-semibold text-lg mb-2">
                                        {exp.company}
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {exp.achievements.map(
                                            (achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                            Formation
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-green-500 pl-6"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-green-600 font-semibold text-lg">
                                                {edu.school}
                                            </p>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {edu.start} - {edu.end || "Présent"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                            Compétences
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded-lg"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-800">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm text-blue-600 font-medium">
                                            {skill.level}
                                        </span>
                                    </div>
                                    {skill.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {skill.keywords.map(
                                                (keyword, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                                    >
                                                        {keyword}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
