"use client";

import { useState } from "react";
import ResumeBuilder from "@/components/resume/ResumeBuilder";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeData } from "@/types";

const defaultResumeData: ResumeData = {
    basics: {
        firstName: "",
        lastName: "",
        title: "",
        summary: "",
        contacts: {
            email: "",
            phone: "",
            links: [],
        },
        location: {
            city: "",
            country: "",
        },
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
};

export default function ResumePage() {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Générateur de CV
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Créez un CV professionnel optimisé ATS en quelques
                        minutes
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <ResumeBuilder
                            data={resumeData}
                            onDataChange={setResumeData}
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={setSelectedTemplate}
                        />
                    </div>

                    <div className="sticky top-8">
                        <ResumePreview
                            data={resumeData}
                            selectedTemplate={selectedTemplate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
