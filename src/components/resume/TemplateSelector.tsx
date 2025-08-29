"use client";

interface TemplateSelectorProps {
    selected: string;
    onSelect: (template: string) => void;
}

const templates = [
    {
        id: "modern",
        name: "Moderne",
        description: "Design épuré et professionnel",
        preview: "/templates/modern-preview.svg",
        isPremium: false,
    },
    {
        id: "classic",
        name: "Classique",
        description: "Style traditionnel et élégant",
        preview: "/templates/classic-preview.svg",
        isPremium: false,
    },
    {
        id: "creative",
        name: "Créatif",
        description: "Design original et impactant",
        preview: "/templates/creative-preview.svg",
        isPremium: true,
    },
    {
        id: "minimal",
        name: "Minimaliste",
        description: "Simplicité et efficacité",
        preview: "/templates/minimal-preview.svg",
        isPremium: true,
    },
];

export default function TemplateSelector({
    selected,
    onSelect,
}: TemplateSelectorProps) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                    Choisissez votre template
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Sélectionnez le style qui correspond le mieux à votre
                    personnalité et au poste visé
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                            selected === template.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => onSelect(template.id)}
                    >
                        {template.isPremium && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                Premium
                            </div>
                        )}

                        <div className="aspect-[3/4] bg-gray-100 rounded border mb-3 flex items-center justify-center">
                            {template.preview ? (
                                <img
                                    src={template.preview}
                                    alt={template.name}
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <div className="text-gray-400 text-sm text-center">
                                    <div className="w-16 h-20 bg-gray-200 rounded mb-2 mx-auto"></div>
                                    Aperçu
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <h4 className="font-medium text-gray-900">
                                {template.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {template.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center text-sm text-gray-500">
                <p>
                    💡 <strong>Conseil :</strong> Choisissez un template qui
                    correspond à votre secteur d'activité
                </p>
                <p className="mt-1">
                    Les templates Premium offrent plus d'options de
                    personnalisation
                </p>
            </div>
        </div>
    );
}
