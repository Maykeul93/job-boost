import { ResumeData } from "@/types";

interface CreativeTemplateProps {
    data: ResumeData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
    return (
        <div
            className="bg-white text-gray-900 max-w-[210mm] mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            {/* Header with diagonal design */}
            <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8">
                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold text-white mb-3">
                            {data.basics.firstName}
                        </h1>
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mb-4">
                            {data.basics.lastName}
                        </h1>
                        <p className="text-2xl text-white opacity-90 mb-6">
                            {data.basics.title || "Titre du poste"}
                        </p>
                    </div>
                </div>

                {/* Diagonal cut */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white transform skew-y-1 origin-bottom-left"></div>
            </div>

            {/* Contact info in a card */}
            <div className="px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-indigo-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                                Email
                            </span>
                            <span className="text-gray-900 font-semibold">
                                {data.basics.contacts.email}
                            </span>
                        </div>
                        {data.basics.contacts.phone && (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-600 font-medium">
                                    Téléphone
                                </span>
                                <span className="text-gray-900 font-semibold">
                                    {data.basics.contacts.phone}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-pink-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                                Localisation
                            </span>
                            <span className="text-gray-900 font-semibold">
                                {data.basics.location.city},{" "}
                                {data.basics.location.country}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                {/* Summary */}
                {data.basics.summary && (
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-indigo-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-indigo-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            À propos de moi
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {data.basics.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-purple-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                            </span>
                            Expérience Professionnelle
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -ml-2"></div>
                                    <div className="border-l-2 border-purple-200 pl-8 pb-6">
                                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {exp.role}
                                                </h3>
                                                <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
                                                    {exp.start} -{" "}
                                                    {exp.end || "Présent"}
                                                </span>
                                            </div>
                                            <p className="text-purple-600 font-semibold text-lg mb-3">
                                                {exp.company}
                                            </p>
                                            <ul className="space-y-2">
                                                {exp.achievements.map(
                                                    (achievement, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                                            <span className="text-gray-700">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.457a1 1 0 11.788 1.838l-2.227.813a1 1 0 000 1.848l2.227.813a1 1 0 11-.788 1.838l-4-1.457a1 1 0 01-.356-.257l-7.144 2.5a1 1 0 000 1.84l7.144 2.5a1 1 0 00.788 0l7-3a1 1 0 000-1.84L14.75 7.051a.999.999 0 01-.356-.257l-4-1.457a1 1 0 11-.788-1.838l2.227-.813a1 1 0 000-1.848l-2.227-.813a1 1 0 11.788-1.838l4 1.457a1 1 0 01.356.257l7.144-2.5z" />
                                </svg>
                            </span>
                            Formation
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-green-600 font-semibold text-lg">
                                                {edu.school}
                                            </p>
                                        </div>
                                        <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-pink-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Compétences
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border border-pink-200"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-bold text-gray-900 text-lg">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm text-pink-600 font-medium bg-pink-100 px-3 py-1 rounded-full">
                                            {skill.level}
                                        </span>
                                    </div>
                                    {skill.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {skill.keywords.map(
                                                (keyword, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm"
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
