"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Resume } from "@/types";
import ResumeTemplateRenderer from "./ResumeTemplateRenderer";
import PDFExporter from "./PDFExporter";

interface ResumeViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    resume: Resume | null;
}

export default function ResumeViewModal({
    isOpen,
    onClose,
    resume,
}: ResumeViewModalProps) {
    // Gérer la fermeture avec la touche Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Empêcher le scroll du body
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !resume) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {resume.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Template:{" "}
                                    <span className="font-medium capitalize">
                                        {resume.templateId}
                                    </span>{" "}
                                    • Langue:{" "}
                                    <span className="font-medium">
                                        {resume.lang}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Export Button */}
                                <PDFExporter
                                    data={resume.data}
                                    selectedTemplate={resume.templateId}
                                />
                                {/* Close Button */}
                                <button
                                    type="button"
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-2"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Fermer</span>
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <ResumeTemplateRenderer
                                    data={resume.data}
                                    selectedTemplate={resume.templateId}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={onClose}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
