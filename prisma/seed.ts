import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // Créer des templates de CV
    const resumeTemplates = [
        {
            id: "template-modern-fr",
            type: "RESUME" as const,
            name: "Moderne Français",
            html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CV - {{basics.firstName}} {{basics.lastName}}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-white text-gray-800 font-sans">
          <!-- Header -->
          <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <h1 class="text-4xl font-bold mb-2">{{basics.firstName}} {{basics.lastName}}</h1>
            <p class="text-xl opacity-90">{{basics.title}}</p>
            <div class="mt-4 space-y-1 text-sm">
              <p>📧 {{basics.contacts.email}}</p>
              <p>📱 {{basics.contacts.phone}}</p>
              <p>📍 {{basics.location.city}}, {{basics.location.country}}</p>
            </div>
          </header>

          <!-- Summary -->
          <section class="p-8 border-b">
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Profil</h2>
            <p class="text-gray-700 leading-relaxed">{{basics.summary}}</p>
          </section>

          <!-- Experience -->
          <section class="p-8 border-b">
            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Expérience Professionnelle</h2>
            {{#each experience}}
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold">{{role}}</h3>
                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>
              </div>
              <p class="text-blue-600 font-medium mb-2">{{company}}</p>
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                {{#each achievements}}
                <li>{{this}}</li>
                {{/each}}
              </ul>
            </div>
            {{/each}}
          </section>

          <!-- Education -->
          <section class="p-8 border-b">
            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Formation</h2>
            {{#each education}}
            <div class="mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold">{{degree}}</h3>
                  <p class="text-blue-600">{{school}}</p>
                </div>
                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>
              </div>
            </div>
            {{/each}}
          </section>

          <!-- Skills -->
          <section class="p-8">
            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Compétences</h2>
            <div class="grid grid-cols-2 gap-4">
              {{#each skills}}
              <div class="bg-gray-50 p-3 rounded">
                <span class="font-medium">{{name}}</span>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: {{level}}%"></div>
                </div>
              </div>
              {{/each}}
            </div>
          </section>
        </body>
        </html>
      `,
            css: null,
            previewPng: null,
            isPremium: false,
        },
        {
            id: "template-classic-fr",
            type: "RESUME" as const,
            name: "Classique Français",
            html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CV - {{basics.firstName}} {{basics.lastName}}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-white text-gray-800 font-serif">
          <!-- Header -->
          <header class="border-b-4 border-gray-800 p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{basics.firstName}} {{basics.lastName}}</h1>
            <p class="text-xl text-gray-600 mb-4">{{basics.title}}</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Email:</strong> {{basics.contacts.email}}</p>
                <p><strong>Téléphone:</strong> {{basics.contacts.phone}}</p>
              </div>
              <div>
                <p><strong>Localisation:</strong> {{basics.location.city}}, {{basics.location.country}}</p>
              </div>
            </div>
          </header>

          <!-- Summary -->
          <section class="p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Résumé</h2>
            <p class="text-gray-700 leading-relaxed">{{basics.summary}}</p>
          </section>

          <!-- Experience -->
          <section class="p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Expérience Professionnelle</h2>
            {{#each experience}}
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800">{{role}}</h3>
                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>
              </div>
              <p class="text-gray-600 font-medium mb-2">{{company}}</p>
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                {{#each achievements}}
                <li>{{this}}</li>
                {{/each}}
              </ul>
            </div>
            {{/each}}
          </section>

          <!-- Education -->
          <section class="p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Formation</h2>
            {{#each education}}
            <div class="mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{degree}}</h3>
                  <p class="text-gray-600">{{school}}</p>
                </div>
                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>
              </div>
            </div>
            {{/each}}
          </section>

          <!-- Skills -->
          <section class="p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Compétences</h2>
            <div class="flex flex-wrap gap-2">
              {{#each skills}}
              <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{{name}}</span>
              {{/each}}
            </div>
          </section>
        </body>
        </html>
      `,
            css: null,
            previewPng: null,
            isPremium: false,
        },
    ];

    // Créer des templates de lettres de motivation
    const letterTemplates = [
        {
            id: "template-letter-classic-fr",
            type: "LETTER" as const,
            name: "Lettre Classique Français",
            html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lettre de motivation</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-white text-gray-800 font-serif p-8">
          <div class="max-w-2xl mx-auto">
            <!-- En-tête -->
            <header class="mb-8">
              <h1 class="text-2xl font-bold text-gray-800 mb-4">{{basics.firstName}} {{basics.lastName}}</h1>
              <div class="text-sm text-gray-600 space-y-1">
                <p>{{basics.contacts.email}}</p>
                <p>{{basics.contacts.phone}}</p>
                <p>{{basics.location.city}}, {{basics.location.country}}</p>
              </div>
            </header>

            <!-- Date -->
            <div class="mb-6">
              <p>{{date}}</p>
            </div>

            <!-- Destinataire -->
            <div class="mb-6">
              <p>{{company}}</p>
              <p>{{address}}</p>
            </div>

            <!-- Objet -->
            <div class="mb-6">
              <p><strong>Objet :</strong> Candidature au poste de {{position}}</p>
            </div>

            <!-- Corps de la lettre -->
            <div class="space-y-4 leading-relaxed">
              <p>Madame, Monsieur,</p>
              
              <p>{{intro}}</p>
              
              <p>{{body}}</p>
              
              <p>{{conclusion}}</p>
              
              <p>Je reste à votre disposition pour un entretien et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
            </div>

            <!-- Signature -->
            <div class="mt-8">
              <p>{{basics.firstName}} {{basics.lastName}}</p>
            </div>
          </div>
        </body>
        </html>
      `,
            css: null,
            previewPng: null,
            isPremium: false,
        },
    ];

    // Insérer les templates
    console.log("📝 Creating resume templates...");
    for (const template of resumeTemplates) {
        await prisma.template.upsert({
            where: { id: template.id },
            update: template,
            create: template,
        });
    }

    console.log("📝 Creating letter templates...");
    for (const template of letterTemplates) {
        await prisma.template.upsert({
            where: { id: template.id },
            update: template,
            create: template,
        });
    }

    // Créer un utilisateur de test
    console.log("👤 Creating test user...");
    const testUser = await prisma.user.upsert({
        where: { email: "test@jobboost.com" },
        update: {},
        create: {
            email: "test@jobboost.com",
            name: "Utilisateur Test",
            plan: "FREE",
        },
    });

    // Créer un CV d'exemple
    console.log("📄 Creating sample resume...");
    const sampleResume = await prisma.resume.upsert({
        where: { id: "sample-resume-1" },
        update: {},
        create: {
            id: "sample-resume-1",
            userId: testUser.id,
            title: "Mon CV Principal",
            templateId: "template-modern-fr",
            lang: "FR",
            data: {
                basics: {
                    firstName: "Jean",
                    lastName: "Dupont",
                    title: "Développeur Full Stack Senior",
                    summary:
                        "Développeur passionné avec 5 ans d'expérience dans la création d'applications web modernes. Spécialisé en React, Node.js et PostgreSQL.",
                    contacts: {
                        email: "jean.dupont@email.com",
                        phone: "+33 6 12 34 56 78",
                        links: [
                            "https://linkedin.com/in/jeandupont",
                            "https://github.com/jeandupont",
                        ],
                    },
                    location: {
                        city: "Paris",
                        country: "France",
                    },
                },
                experience: [
                    {
                        company: "TechCorp",
                        role: "Développeur Full Stack Senior",
                        start: "2022",
                        end: "Présent",
                        achievements: [
                            "Développement d'une plateforme SaaS avec 10k+ utilisateurs",
                            "Optimisation des performances de 40%",
                            "Mentorat de 3 développeurs juniors",
                        ],
                        keywords: ["React", "Node.js", "PostgreSQL", "AWS"],
                    },
                    {
                        company: "StartupXYZ",
                        role: "Développeur Frontend",
                        start: "2020",
                        end: "2022",
                        achievements: [
                            "Création d'une interface utilisateur moderne et responsive",
                            "Intégration avec des APIs REST et GraphQL",
                            "Tests automatisés avec Jest et Cypress",
                        ],
                        keywords: ["React", "TypeScript", "GraphQL", "Jest"],
                    },
                ],
                education: [
                    {
                        school: "École Supérieure d'Informatique",
                        degree: "Master en Informatique",
                        start: "2018",
                        end: "2020",
                    },
                ],
                skills: [
                    { name: "React", level: 90 },
                    { name: "Node.js", level: 85 },
                    { name: "PostgreSQL", level: 80 },
                    { name: "TypeScript", level: 85 },
                    { name: "AWS", level: 70 },
                ],
            },
        },
    });

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Created ${resumeTemplates.length} resume templates`);
    console.log(`📊 Created ${letterTemplates.length} letter templates`);
    console.log(`👤 Test user: ${testUser.email}`);
    console.log(`📄 Sample resume: ${sampleResume.title}`);
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
