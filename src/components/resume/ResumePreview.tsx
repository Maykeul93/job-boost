"use client";

import { ResumeData } from "@/types";
import ResumeTemplateRenderer from "./ResumeTemplateRenderer";

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

            {/* Preview with real template */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ResumeTemplateRenderer
                        data={data}
                        selectedTemplate={selectedTemplate}
                    />
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
