import { ResumeData } from "@/types";

interface ClassicTemplateProps {
    data: ResumeData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
    return (
        <div
            className="bg-white text-gray-900 max-w-[210mm] mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            {/* Header */}
            <div className="border-b-4 border-gray-800 p-8">
                <h1 className="text-5xl font-bold text-gray-900 mb-2 text-center">
                    {data.basics.firstName} {data.basics.lastName}
                </h1>
                <p className="text-2xl text-gray-600 mb-4 text-center">
                    {data.basics.title || "Titre du poste"}
                </p>
                <div className="flex justify-center items-center gap-8 text-gray-700">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5"
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
                                className="w-5 h-5"
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
                            className="w-5 h-5"
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
            <div className="p-8 space-y-8">
                {/* Summary */}
                {data.basics.summary && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-800 pb-2">
                            RÉSUMÉ PROFESSIONNEL
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {data.basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
                            EXPÉRIENCE PROFESSIONNELLE
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-gray-800 pl-6"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm text-gray-600 font-medium">
                                            {exp.start} - {exp.end || "Présent"}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 font-semibold text-lg mb-3">
                                        {exp.company}
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                        {exp.achievements.map(
                                            (achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-base"
                                                >
                                                    {achievement}
                                                </li>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
                            FORMATION
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-gray-800 pl-6"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-gray-700 font-semibold text-lg">
                                                {edu.school}
                                            </p>
                                        </div>
                                        <span className="text-sm text-gray-600 font-medium">
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
                            COMPÉTENCES
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {data.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-300 p-4 rounded"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-gray-900 text-lg">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">
                                            {skill.level}
                                        </span>
                                    </div>
                                    {skill.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {skill.keywords.map(
                                                (keyword, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
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
