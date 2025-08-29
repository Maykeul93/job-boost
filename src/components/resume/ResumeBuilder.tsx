"use client";

import { useState } from "react";
import { ResumeData } from "@/types";
import {
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    WrenchScrewdriverIcon,
    DocumentTextIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import TemplateSelector from "./TemplateSelector";
import TemplateSelectorFinal from "./TemplateSelectorFinal";
import BasicsForm from "./forms/BasicsForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import PDFExporter from "./PDFExporter";
import ResumePreview from "./ResumePreview";

interface ResumeBuilderProps {
    data: ResumeData;
    onDataChange: (data: ResumeData) => void;
    selectedTemplate: string;
    onTemplateChange: (template: string) => void;
}

const steps = [
    { id: "template", name: "Template", icon: DocumentTextIcon },
    { id: "basics", name: "Informations", icon: UserIcon },
    { id: "experience", name: "Expérience", icon: BriefcaseIcon },
    { id: "education", name: "Formation", icon: AcademicCapIcon },
    { id: "skills", name: "Compétences", icon: WrenchScrewdriverIcon },
    { id: "preview", name: "Aperçu & Export", icon: DocumentTextIcon },
];

export default function ResumeBuilder({
    data,
    onDataChange,
    selectedTemplate,
    onTemplateChange,
}: ResumeBuilderProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const updateData = (section: keyof ResumeData, value: unknown) => {
        onDataChange({
            ...data,
            [section]: value,
        });
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <TemplateSelector
                        selected={selectedTemplate}
                        onSelect={onTemplateChange}
                    />
                );
            case 1:
                return (
                    <BasicsForm
                        data={data.basics}
                        onChange={(value) => updateData("basics", value)}
                    />
                );
            case 2:
                return (
                    <ExperienceForm
                        data={data.experience}
                        onChange={(value) => updateData("experience", value)}
                    />
                );
            case 3:
                return (
                    <EducationForm
                        data={data.education}
                        onChange={(value) => updateData("education", value)}
                    />
                );
            case 4:
                return (
                    <SkillsForm
                        data={data.skills}
                        onChange={(value) => updateData("skills", value)}
                    />
                );
            case 5:
                return (
                    <TemplateSelectorFinal
                        selected={selectedTemplate}
                        onSelect={onTemplateChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                                    index <= currentStep
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 text-gray-500"
                                }`}
                            >
                                {index < currentStep ? (
                                    <CheckIcon className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-16 h-0.5 mx-2 ${
                                        index < currentStep
                                            ? "bg-blue-600"
                                            : "bg-gray-300"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {steps[currentStep].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Étape {currentStep + 1} sur {steps.length}
                    </p>
                </div>
            </div>

            {/* Step content */}
            <div className="min-h-[400px]">{renderStep()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Précédent
                </button>

                <div className="flex gap-2">
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Suivant
                            <ChevronRightIcon className="w-4 h-4 ml-2 inline" />
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch(
                                            "/api/resume/save",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    title: `${data.basics.firstName} ${data.basics.lastName} - CV`,
                                                    templateId:
                                                        selectedTemplate,
                                                    lang: "FR",
                                                    data,
                                                }),
                                            }
                                        );

                                        if (response.ok) {
                                            const result =
                                                await response.json();
                                            alert(
                                                "CV sauvegardé avec succès !"
                                            );
                                            console.log(
                                                "Sauvegarde réussie:",
                                                result
                                            );
                                        } else {
                                            const error = await response.json();
                                            alert(
                                                `Erreur lors de la sauvegarde: ${error.error}`
                                            );
                                        }
                                    } catch (error) {
                                        console.error(
                                            "Erreur de sauvegarde:",
                                            error
                                        );
                                        alert("Erreur lors de la sauvegarde");
                                    }
                                }}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Sauvegarder
                            </button>

                            <PDFExporter
                                data={data}
                                selectedTemplate={selectedTemplate}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
