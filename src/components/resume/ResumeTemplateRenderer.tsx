import { ResumeData } from "@/types";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

interface ResumeTemplateRendererProps {
    data: ResumeData;
    selectedTemplate: string;
}

export default function ResumeTemplateRenderer({
    data,
    selectedTemplate,
}: ResumeTemplateRendererProps) {
    switch (selectedTemplate) {
        case "modern":
            return <ModernTemplate data={data} />;
        case "classic":
            return <ClassicTemplate data={data} />;
        case "creative":
            return <CreativeTemplate data={data} />;
        case "minimal":
            return <MinimalTemplate data={data} />;
        default:
            return <ModernTemplate data={data} />;
    }
}
