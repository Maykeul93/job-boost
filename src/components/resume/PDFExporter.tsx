import { ResumeData } from "@/types";
import ResumeTemplateRenderer from "./ResumeTemplateRenderer";

interface PDFExporterProps {
    data: ResumeData;
    selectedTemplate: string;
}

export default function PDFExporter({
    data,
    selectedTemplate,
}: PDFExporterProps) {
    const exportToPDF = () => {
        // Créer une nouvelle fenêtre avec le template
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        // Récupérer le HTML du template
        const templateElement = document.createElement("div");
        templateElement.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>CV - ${data.basics.firstName} ${
            data.basics.lastName
        }</title>
                <style>
                    @media print {
                        @page {
                            size: A4 portrait;
                            margin: 15mm;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                    
                    /* Styles de base pour l'impression */
                    * {
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background: white;
                    }
                    
                    /* Assurer que les couleurs s'impriment bien */
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div id="cv-content"></div>
                <script>
                    // Rendre le template React
                    const React = window.React;
                    const ReactDOM = window.ReactDOM;
                    
                    // Créer le composant template
                    const templateData = ${JSON.stringify(data)};
                    const selectedTemplate = '${selectedTemplate}';
                    
                    // Rendre le template
                    const cvContent = document.getElementById('cv-content');
                    // Ici on injecterait le composant React, mais pour l'instant on utilise une approche plus simple
                </script>
            </body>
            </html>
        `;

        // Ajouter le contenu du template
        const cvContent = templateElement.querySelector("#cv-content");
        if (cvContent) {
            // Créer un div temporaire pour le rendu
            const tempDiv = document.createElement("div");
            tempDiv.style.width = "210mm";
            tempDiv.style.minHeight = "297mm";
            tempDiv.style.margin = "0 auto";
            tempDiv.style.backgroundColor = "white";
            tempDiv.style.color = "#333";

            // Injecter le HTML du template (approche simplifiée)
            tempDiv.innerHTML = `
                <div style="padding: 20mm; font-family: Arial, sans-serif;">
                    ${generateTemplateHTML(data, selectedTemplate)}
                </div>
            `;

            cvContent.appendChild(tempDiv);
        }

        // Ouvrir la fenêtre d'impression
        printWindow.document.write(templateElement.innerHTML);
        printWindow.document.close();

        // Attendre que le contenu soit chargé puis imprimer
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            Exporter PDF
        </button>
    );
}

// Fonction pour générer le HTML du template (approche simplifiée)
function generateTemplateHTML(data: ResumeData, template: string): string {
    switch (template) {
        case "modern":
            return generateModernHTML(data);
        case "classic":
            return generateClassicHTML(data);
        case "creative":
            return generateCreativeHTML(data);
        case "minimal":
            return generateMinimalHTML(data);
        default:
            return generateModernHTML(data);
    }
}

function generateModernHTML(data: ResumeData): string {
    return `
        <div style="background: white; color: #333; max-width: 210mm; margin: 0 auto;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 32px; text-align: center;">
                <h1 style="font-size: 48px; font-weight: bold; margin: 0 0 16px 0;">
                    ${data.basics.firstName} ${data.basics.lastName}
                </h1>
                <p style="font-size: 24px; opacity: 0.9; margin: 0 0 24px 0;">
                    ${data.basics.title || "Titre du poste"}
                </p>
                <div style="display: flex; justify-content: center; gap: 32px; font-size: 14px; opacity: 0.8;">
                    <span>${data.basics.contacts.email}</span>
                    ${
                        data.basics.contacts.phone
                            ? `<span>${data.basics.contacts.phone}</span>`
                            : ""
                    }
                    <span>${data.basics.location.city}, ${
        data.basics.location.country
    }</span>
                </div>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">
                ${
                    data.basics.summary
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
                            Profil
                        </h2>
                        <p style="color: #374151; line-height: 1.6; font-size: 18px; margin: 0;">
                            ${data.basics.summary}
                        </p>
                    </div>
                `
                        : ""
                }

                ${
                    data.experience && data.experience.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
                            Expérience Professionnelle
                        </h2>
                        ${data.experience
                            .map(
                                (exp) => `
                            <div style="border-left: 4px solid #3b82f6; padding-left: 24px; margin-bottom: 24px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                        ${exp.role}
                                    </h3>
                                    <span style="font-size: 14px; color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 9999px;">
                                        ${exp.start} - ${exp.end || "Présent"}
                                    </span>
                                </div>
                                <p style="color: #2563eb; font-weight: 600; font-size: 18px; margin: 0 0 8px 0;">
                                    ${exp.company}
                                </p>
                                <ul style="margin: 0; padding-left: 20px;">
                                    ${exp.achievements
                                        .map(
                                            (achievement) => `
                                        <li style="color: #374151; margin-bottom: 4px;">${achievement}</li>
                                    `
                                        )
                                        .join("")}
                                </ul>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.education && data.education.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
                            Formation
                        </h2>
                        ${data.education
                            .map(
                                (edu) => `
                            <div style="border-left: 4px solid #10b981; padding-left: 24px; margin-bottom: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                            ${edu.degree}
                                        </h3>
                                        <p style="color: #059669; font-weight: 600; font-size: 18px; margin: 0;">
                                            ${edu.school}
                                        </p>
                                    </div>
                                    <span style="font-size: 14px; color: #059669; font-weight: 500; background: #d1fae5; padding: 4px 12px; border-radius: 9999px;">
                                        ${edu.start} - ${edu.end || "Présent"}
                                    </span>
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.skills && data.skills.length > 0
                        ? `
                    <div>
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
                            Compétences
                        </h2>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            ${data.skills
                                .map(
                                    (skill) => `
                                <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <span style="font-weight: 600; color: #1f2937; font-size: 18px;">
                                            ${skill.name}
                                        </span>
                                        <span style="font-size: 14px; color: #2563eb; font-weight: 500; background: #dbeafe; padding: 4px 12px; border-radius: 9999px;">
                                            ${skill.level}
                                        </span>
                                    </div>
                                    ${
                                        skill.keywords.length > 0
                                            ? `
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                            ${skill.keywords
                                                .map(
                                                    (keyword) => `
                                                <span style="padding: 4px 12px; background: #dbeafe; color: #1e40af; border-radius: 4px; font-size: 12px;">
                                                    ${keyword}
                                                </span>
                                            `
                                                )
                                                .join("")}
                                        </div>
                                    `
                                            : ""
                                    }
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
            </div>
        </div>
    `;
}

function generateClassicHTML(data: ResumeData): string {
    return `
        <div style="background: white; color: #333; max-width: 210mm; margin: 0 auto;">
            <!-- Header -->
            <div style="border-bottom: 4px solid #1f2937; padding: 32px; text-align: center;">
                <h1 style="font-size: 60px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0;">
                    ${data.basics.firstName} ${data.basics.lastName}
                </h1>
                <p style="font-size: 24px; color: #6b7280; margin: 0 0 24px 0;">
                    ${data.basics.title || "Titre du poste"}
                </p>
                <div style="display: flex; justify-content: center; align-items: center; gap: 32px; color: #6b7280;">
                    <span>${data.basics.contacts.email}</span>
                    ${
                        data.basics.contacts.phone
                            ? `<span>${data.basics.contacts.phone}</span>`
                            : ""
                    }
                    <span>${data.basics.location.city}, ${
        data.basics.location.country
    }</span>
                </div>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">
                ${
                    data.basics.summary
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 16px 0; border-bottom: 2px solid #1f2937; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                            RÉSUMÉ PROFESSIONNEL
                        </h2>
                        <p style="color: #374151; line-height: 1.6; font-size: 18px; margin: 0;">
                            ${data.basics.summary}
                        </p>
                    </div>
                `
                        : ""
                }

                ${
                    data.experience && data.experience.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #1f2937; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                            EXPÉRIENCE PROFESSIONNELLE
                        </h2>
                        ${data.experience
                            .map(
                                (exp) => `
                            <div style="border-left: 4px solid #1f2937; padding-left: 24px; margin-bottom: 24px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                        ${exp.role}
                                    </h3>
                                    <span style="font-size: 14px; color: #6b7280; font-weight: 500;">
                                        ${exp.start} - ${exp.end || "Présent"}
                                    </span>
                                </div>
                                <p style="color: #374151; font-weight: 600; font-size: 18px; margin: 0 0 12px 0;">
                                    ${exp.company}
                                </p>
                                <ul style="margin: 0; padding-left: 20px;">
                                    ${exp.achievements
                                        .map(
                                            (achievement) => `
                                        <li style="color: #374151; margin-bottom: 4px; font-size: 16px;">${achievement}</li>
                                    `
                                        )
                                        .join("")}
                                </ul>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.education && data.education.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #1f2937; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                            FORMATION
                        </h2>
                        ${data.education
                            .map(
                                (edu) => `
                            <div style="border-left: 4px solid #1f2937; padding-left: 24px; margin-bottom: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                            ${edu.degree}
                                        </h3>
                                        <p style="color: #374151; font-weight: 600; font-size: 18px; margin: 0;">
                                            ${edu.school}
                                        </p>
                                    </div>
                                    <span style="font-size: 14px; color: #6b7280; font-weight: 500;">
                                        ${edu.start} - ${edu.end || "Présent"}
                                    </span>
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.skills && data.skills.length > 0
                        ? `
                    <div>
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; border-bottom: 2px solid #1f2937; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                            COMPÉTENCES
                        </h2>
                        <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                            ${data.skills
                                .map(
                                    (skill) => `
                                <div style="border: 1px solid #d1d5db; padding: 16px; border-radius: 4px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <span style="font-weight: bold; color: #1f2937; font-size: 18px;">
                                            ${skill.name}
                                        </span>
                                        <span style="font-size: 14px; color: #6b7280; font-weight: 500; background: #f3f4f6; padding: 4px 12px; border-radius: 4px;">
                                            ${skill.level}
                                        </span>
                                    </div>
                                    ${
                                        skill.keywords.length > 0
                                            ? `
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                            ${skill.keywords
                                                .map(
                                                    (keyword) => `
                                                <span style="padding: 4px 12px; background: #e5e7eb; color: #1f2937; border-radius: 4px; font-size: 14px;">
                                                    ${keyword}
                                                </span>
                                            `
                                                )
                                                .join("")}
                                        </div>
                                    `
                                            : ""
                                    }
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
            </div>
        </div>
    `;
}

function generateCreativeHTML(data: ResumeData): string {
    return `
        <div style="background: white; color: #333; max-width: 210mm; margin: 0 auto;">
            <!-- Header with diagonal design -->
            <div style="position: relative; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899); padding: 32px;">
                    <div style="position: relative; z-index: 10;">
                        <h1 style="font-size: 60px; font-weight: bold; color: white; margin: 0 0 16px 0;">
                            ${data.basics.firstName}
                        </h1>
                        <h1 style="font-size: 60px; font-weight: bold; background: linear-gradient(135deg, #fbbf24, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 24px 0;">
                            ${data.basics.lastName}
                        </h1>
                        <p style="font-size: 24px; color: white; opacity: 0.9; margin: 0;">
                            ${data.basics.title || "Titre du poste"}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Contact info in a card -->
            <div style="padding: 0 32px; margin-top: -32px; position: relative; z-index: 20;">
                <div style="background: white; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 24px; border: 1px solid #e5e7eb;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; text-align: center;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 48px; height: 48px; background: #e0e7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                                📧
                            </div>
                            <span style="font-size: 12px; color: #6b7280; font-weight: 500;">Email</span>
                            <span style="color: #1f2937; font-weight: 600;">${
                                data.basics.contacts.email
                            }</span>
                        </div>
                        ${
                            data.basics.contacts.phone
                                ? `
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 48px; height: 48px; background: #f3e8ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                                    📱
                                </div>
                                <span style="font-size: 12px; color: #6b7280; font-weight: 500;">Téléphone</span>
                                <span style="color: #1f2937; font-weight: 600;">${data.basics.contacts.phone}</span>
                            </div>
                        `
                                : ""
                        }
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 48px; height: 48px; background: #fce7f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                                📍
                            </div>
                            <span style="font-size: 12px; color: #6b7280; font-weight: 500;">Localisation</span>
                            <span style="color: #1f2937; font-weight: 600;">${
                                data.basics.location.city
                            }, ${data.basics.location.country}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">
                ${
                    data.basics.summary
                        ? `
                    <div style="background: linear-gradient(135deg, #f9fafb, white); padding: 24px; border-radius: 12px; border-left: 4px solid #6366f1; margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0; display: flex; align-items: center; gap: 12px;">
                            <span style="width: 32px; height: 32px; background: #e0e7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">ℹ️</span>
                            À propos de moi
                        </h2>
                        <p style="color: #374151; line-height: 1.6; font-size: 18px; margin: 0;">
                            ${data.basics.summary}
                        </p>
                    </div>
                `
                        : ""
                }

                ${
                    data.experience && data.experience.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; display: flex; align-items: center; gap: 12px;">
                            <span style="width: 40px; height: 40px; background: #f3e8ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">💼</span>
                            Expérience Professionnelle
                        </h2>
                        ${data.experience
                            .map(
                                (exp) => `
                            <div style="position: relative; margin-bottom: 24px;">
                                <div style="position: absolute; left: 0; top: 0; width: 16px; height: 16px; background: #8b5cf6; border-radius: 50%; margin-left: -8px;"></div>
                                <div style="border-left: 2px solid #e9d5ff; padding-left: 32px; padding-bottom: 24px;">
                                    <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f3f4f6;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                            <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                                ${exp.role}
                                            </h3>
                                            <span style="font-size: 14px; color: #8b5cf6; font-weight: 500; background: #faf5ff; padding: 4px 12px; border-radius: 9999px;">
                                                ${exp.start} - ${
                                    exp.end || "Présent"
                                }
                                            </span>
                                        </div>
                                        <p style="color: #8b5cf6; font-weight: 600; font-size: 18px; margin: 0 0 12px 0;">
                                            ${exp.company}
                                        </p>
                                        <div style="margin: 0;">
                                            ${exp.achievements
                                                .map(
                                                    (achievement) => `
                                                <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                                                    <span style="width: 8px; height: 8px; background: #a78bfa; border-radius: 50%; margin-top: 8px; flex-shrink: 0;"></span>
                                                    <span style="color: #374151;">${achievement}</span>
                                                </div>
                                            `
                                                )
                                                .join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.education && data.education.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; display: flex; align-items: center; gap: 12px;">
                            <span style="width: 40px; height: 40px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🎓</span>
                            Formation
                        </h2>
                        <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                            ${data.education
                                .map(
                                    (edu) => `
                                <div style="background: linear-gradient(135deg, #f0fdf4, white); padding: 24px; border-radius: 12px; border: 1px solid #bbf7d0;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div>
                                            <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin: 0;">
                                                ${edu.degree}
                                            </h3>
                                            <p style="color: #059669; font-weight: 600; font-size: 18px; margin: 0;">
                                                ${edu.school}
                                            </p>
                                        </div>
                                        <span style="font-size: 14px; color: #059669; font-weight: 500; background: #d1fae5; padding: 4px 12px; border-radius: 9999px;">
                                            ${edu.start} - ${
                                        edu.end || "Présent"
                                    }
                                        </span>
                                    </div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }

                ${
                    data.skills && data.skills.length > 0
                        ? `
                    <div>
                        <h2 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 24px 0; display: flex; align-items: center; gap: 12px;">
                            <span style="width: 40px; height: 40px; background: #fce7f3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">⚡</span>
                            Compétences
                        </h2>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            ${data.skills
                                .map(
                                    (skill) => `
                                <div style="background: linear-gradient(135deg, #fdf2f8, white); padding: 24px; border-radius: 12px; border: 1px solid #f9a8d4;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                        <span style="font-weight: bold; color: #1f2937; font-size: 18px;">
                                            ${skill.name}
                                        </span>
                                        <span style="font-size: 14px; color: #ec4899; font-weight: 500; background: #fce7f3; padding: 4px 12px; border-radius: 9999px;">
                                            ${skill.level}
                                        </span>
                                    </div>
                                    ${
                                        skill.keywords.length > 0
                                            ? `
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                            ${skill.keywords
                                                .map(
                                                    (keyword) => `
                                                <span style="padding: 4px 12px; background: #f9a8d4; color: #be185d; border-radius: 9999px; font-size: 12px;">
                                                    ${keyword}
                                                </span>
                                            `
                                                )
                                                .join("")}
                                        </div>
                                    `
                                            : ""
                                    }
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
            </div>
        </div>
    `;
}

function generateMinimalHTML(data: ResumeData): string {
    return `
        <div style="background: white; color: #333; max-width: 210mm; margin: 0 auto;">
            <!-- Header -->
            <div style="border-bottom: 1px solid #d1d5db; padding: 32px;">
                <h1 style="font-size: 48px; font-weight: 300; color: #1f2937; margin: 0 0 16px 0;">
                    ${data.basics.firstName} ${data.basics.lastName}
                </h1>
                <p style="font-size: 18px; color: #6b7280; margin: 0 0 24px 0;">
                    ${data.basics.title || "Titre du poste"}
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #6b7280;">
                    <span>${data.basics.contacts.email}</span>
                    ${
                        data.basics.contacts.phone
                            ? `<span>${data.basics.contacts.phone}</span>`
                            : ""
                    }
                    <span>${data.basics.location.city}, ${
        data.basics.location.country
    }</span>
                </div>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">
                ${
                    data.basics.summary
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                            Résumé
                        </h2>
                        <p style="color: #374151; line-height: 1.6; margin: 0;">
                            ${data.basics.summary}
                        </p>
                    </div>
                `
                        : ""
                }

                ${
                    data.experience && data.experience.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                            Expérience
                        </h2>
                        ${data.experience
                            .map(
                                (exp) => `
                            <div style="margin-bottom: 24px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h3 style="font-weight: 500; color: #1f2937; margin: 0;">
                                        ${exp.role}
                                    </h3>
                                    <span style="font-size: 14px; color: #6b7280;">
                                        ${exp.start} - ${exp.end || "Présent"}
                                    </span>
                                </div>
                                <p style="color: #6b7280; margin: 0 0 8px 0;">
                                    ${exp.company}
                                </p>
                                <div style="margin: 0;">
                                    ${exp.achievements
                                        .map(
                                            (achievement) => `
                                        <div style="color: #374151; margin-bottom: 4px; font-size: 14px;">
                                            • ${achievement}
                                        </div>
                                    `
                                        )
                                        .join("")}
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.education && data.education.length > 0
                        ? `
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                            Formation
                        </h2>
                        ${data.education
                            .map(
                                (edu) => `
                            <div style="margin-bottom: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-weight: 500; color: #1f2937; margin: 0;">
                                            ${edu.degree}
                                        </h3>
                                        <p style="color: #6b7280; margin: 0;">
                                            ${edu.school}
                                        </p>
                                    </div>
                                    <span style="font-size: 14px; color: #6b7280;">
                                        ${edu.start} - ${edu.end || "Présent"}
                                    </span>
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }

                ${
                    data.skills && data.skills.length > 0
                        ? `
                    <div>
                        <h2 style="font-size: 18px; font-weight: 500; color: #1f2937; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                            Compétences
                        </h2>
                        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                            ${data.skills
                                .map(
                                    (skill) => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <span style="font-weight: 500; color: #1f2937; font-size: 18px;">
                                            ${skill.name}
                                        </span>
                                        <span style="font-size: 14px; color: #6b7280;">
                                            ${skill.level}
                                        </span>
                                    </div>
                                    ${
                                        skill.keywords.length > 0
                                            ? `
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                            ${skill.keywords
                                                .map(
                                                    (keyword) => `
                                                <span style="font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                                                    ${keyword}
                                                </span>
                                            `
                                                )
                                                .join("")}
                                        </div>
                                    `
                                            : ""
                                    }
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
            </div>
        </div>
    `;
}
