export interface User {
    id: string;
    email: string;
    name?: string;
    plan: "FREE" | "PRO";
    createdAt: Date;
    updatedAt: Date;
}

export interface ResumeData {
    basics: {
        firstName: string;
        lastName: string;
        title: string;
        summary: string;
        contacts: {
            email: string;
            phone: string;
            links: string[];
        };
        location: {
            city: string;
            country: string;
        };
    };
    experience: Array<{
        company: string;
        role: string;
        start: string;
        end?: string;
        achievements: string[];
        keywords: string[];
    }>;
    education: Array<{
        school: string;
        degree: string;
        start: string;
        end?: string;
    }>;
    skills: Array<{
        name: string;
        level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
        keywords: string[];
    }>;
    projects?: Array<{
        name: string;
        description: string;
        technologies: string[];
        link?: string;
    }>;
}

export interface Resume {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    lang: "FR" | "EN";
    data: ResumeData;
    updatedAt: Date;
}

export interface CoverLetter {
    id: string;
    userId: string;
    templateId: string;
    jobText?: string;
    variables: {
        poste: string;
        entreprise: string;
        valeur: string;
        realisation1: string;
        realisation2: string;
        competences: string;
        motsCles: string;
        apport: string;
        disponibilite: string;
        prenom: string;
        nom: string;
        annees: number;
        domaine: string;
    };
    bodyHtml: string;
    updatedAt: Date;
}

export interface Template {
    id: string;
    type: "RESUME" | "LETTER";
    name: string;
    html: string;
    css?: string;
    previewPng?: string;
    isPremium: boolean;
}

export interface Application {
    id: string;
    userId: string;
    company: string;
    position: string;
    appliedAt: Date;
    status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
    followUpAt?: Date;
    notes?: string;
    resumeId?: string;
    coverLetterId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface KeywordAnalysis {
    score: number;
    present: string[];
    missing: string[];
}
