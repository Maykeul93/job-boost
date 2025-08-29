import { ResumeData } from "@/types";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

interface ResumeTemplateRendererProps {
    data: ResumeData;
    selectedTemplate: string;
}

// Fonction de validation des données
function validateResumeData(data: any): ResumeData {
    // Si les données sont déjà valides, les retourner
    if (data && typeof data === "object" && data.basics) {
        return data;
    }

    // Sinon, retourner des données par défaut
    return {
        basics: {
            firstName: "Prénom",
            lastName: "Nom",
            title: "Titre du poste",
            summary: "Résumé professionnel",
            contacts: {
                email: "email@example.com",
                phone: "Téléphone",
                links: ["LinkedIn", "Portfolio"],
            },
            location: {
                city: "Ville",
                country: "Pays",
            },
        },
        experience: [],
        education: [],
        skills: [],
    };
}

export default function ResumeTemplateRenderer({
    data,
    selectedTemplate,
}: ResumeTemplateRendererProps) {
    // Valider les données avant de les passer aux templates
    const validatedData = validateResumeData(data);

    switch (selectedTemplate) {
        case "modern":
            return <ModernTemplate data={validatedData} />;
        case "classic":
            return <ClassicTemplate data={validatedData} />;
        case "creative":
            return <CreativeTemplate data={validatedData} />;
        case "minimal":
            return <MinimalTemplate data={validatedData} />;
        default:
            return <ModernTemplate data={validatedData} />;
    }
}
