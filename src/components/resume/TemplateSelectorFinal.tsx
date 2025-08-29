import { ResumeData } from "@/types";

interface TemplateSelectorFinalProps {
    selected: string;
    onSelect: (template: string) => void;
}

const templates = [
    {
        id: "modern",
        name: "Moderne",
        description: "Design élégant avec dégradés bleus/violets",
        preview: "bg-gradient-to-r from-blue-600 to-purple-600",
    },
    {
        id: "classic",
        name: "Classique",
        description: "Style épuré et professionnel",
        preview: "bg-gray-800",
    },
    {
        id: "creative",
        name: "Créatif",
        description: "Design moderne avec éléments diagonaux",
        preview: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    },
    {
        id: "minimal",
        name: "Minimaliste",
        description: "Style épuré et épuré",
        preview: "bg-gray-300",
    },
];

export default function TemplateSelectorFinal({
    selected,
    onSelect,
    data,
}: TemplateSelectorFinalProps) {
    return (
        <div className="space-y-6">
            {/* Template Options */}
            <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${
                            selected === template.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => onSelect(template.id)}
                    >
                        {/* Template Preview */}
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className={`w-8 h-8 rounded-full ${template.preview} flex items-center justify-center`}
                                >
                                    <span className="text-white text-sm font-bold">
                                        {template.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {template.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {template.description}
                                    </p>
                                </div>
                            </div>

                            {/* Selection Indicator */}
                            {selected === template.id && (
                                <div className="absolute top-3 right-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Template Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                            Choisissez votre template final
                        </h4>
                        <p className="text-sm text-blue-700">
                            Vous pouvez changer de template à tout moment avant
                            l'export. Chaque template a son propre style et mise
                            en page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
