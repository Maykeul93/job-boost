import { ResumeData } from "@/types";

interface MinimalTemplateProps {
    data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
    return (
        <div
            className="bg-white text-gray-900 max-w-[210mm] mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            {/* Header */}
            <div className="border-b border-gray-300 p-8">
                <h1 className="text-4xl font-light text-gray-900 mb-2">
                    {data.basics.firstName} {data.basics.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                    {data.basics.title || "Titre du poste"}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <span>{data.basics.contacts.email}</span>
                    {data.basics.contacts.phone && (
                        <span>{data.basics.contacts.phone}</span>
                    )}
                    <span>
                        {data.basics.location.city},{" "}
                        {data.basics.location.country}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                {/* Summary */}
                {data.basics.summary && (
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-3 uppercase tracking-wide">
                            Résumé
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {data.basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">
                            Expérience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {exp.start} - {exp.end || "Présent"}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">
                                        {exp.company}
                                    </p>
                                    <ul className="list-none space-y-1">
                                        {exp.achievements.map(
                                            (achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-gray-700 text-sm"
                                                >
                                                    • {achievement}
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
                        <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">
                            Formation
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-gray-600">
                                                {edu.school}
                                            </p>
                                        </div>
                                        <span className="text-sm text-gray-500">
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
                        <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">
                            Compétences
                        </h2>
                        <div className="space-y-3">
                            {data.skills.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-gray-900">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {skill.level}
                                        </span>
                                    </div>
                                    {skill.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {skill.keywords.map(
                                                (keyword, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
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
