--
-- PostgreSQL database dump
--

\restrict AjmOE5bX6oOTuU9t84W7Oc20p7xc8K3kNV7YOhWoxopSVHbcenvkMcd4NaqtTzX

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ApplicationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ApplicationStatus" AS ENUM (
    'APPLIED',
    'INTERVIEW',
    'OFFER',
    'REJECTED',
    'WITHDRAWN'
);


ALTER TYPE public."ApplicationStatus" OWNER TO postgres;

--
-- Name: Language; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Language" AS ENUM (
    'FR',
    'EN'
);


ALTER TYPE public."Language" OWNER TO postgres;

--
-- Name: Plan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Plan" AS ENUM (
    'FREE',
    'PRO'
);


ALTER TYPE public."Plan" OWNER TO postgres;

--
-- Name: TemplateType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TemplateType" AS ENUM (
    'RESUME',
    'LETTER'
);


ALTER TYPE public."TemplateType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applications (
    id text NOT NULL,
    "userId" text NOT NULL,
    company text NOT NULL,
    "position" text NOT NULL,
    "appliedAt" timestamp(3) without time zone NOT NULL,
    status public."ApplicationStatus" DEFAULT 'APPLIED'::public."ApplicationStatus" NOT NULL,
    "followUpAt" timestamp(3) without time zone,
    notes text,
    "resumeId" text,
    "coverLetterId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.applications OWNER TO postgres;

--
-- Name: cover_letters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cover_letters (
    id text NOT NULL,
    "userId" text NOT NULL,
    "templateId" text NOT NULL,
    "jobText" text,
    variables jsonb NOT NULL,
    "bodyHtml" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cover_letters OWNER TO postgres;

--
-- Name: resumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resumes (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    "templateId" text NOT NULL,
    lang public."Language" DEFAULT 'FR'::public."Language" NOT NULL,
    data jsonb NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.resumes OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.templates (
    id text NOT NULL,
    type public."TemplateType" NOT NULL,
    name text NOT NULL,
    html text NOT NULL,
    css text,
    "previewPng" text,
    "isPremium" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.templates OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    plan public."Plan" DEFAULT 'FREE'::public."Plan" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applications (id, "userId", company, "position", "appliedAt", status, "followUpAt", notes, "resumeId", "coverLetterId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: cover_letters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cover_letters (id, "userId", "templateId", "jobText", variables, "bodyHtml", "updatedAt") FROM stdin;
\.


--
-- Data for Name: resumes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resumes (id, "userId", title, "templateId", lang, data, "updatedAt") FROM stdin;
sample-resume-1	cmewkhi460000lofmcwdt5lee	Mon CV Principal	template-modern-fr	FR	{"basics": {"title": "Développeur Full Stack Senior", "summary": "Développeur passionné avec 5 ans d'expérience dans la création d'applications web modernes. Spécialisé en React, Node.js et PostgreSQL.", "contacts": {"email": "jean.dupont@email.com", "links": ["https://linkedin.com/in/jeandupont", "https://github.com/jeandupont"], "phone": "+33 6 12 34 56 78"}, "lastName": "Dupont", "location": {"city": "Paris", "country": "France"}, "firstName": "Jean"}, "skills": [{"name": "React", "level": 90}, {"name": "Node.js", "level": 85}, {"name": "PostgreSQL", "level": 80}, {"name": "TypeScript", "level": 85}, {"name": "AWS", "level": 70}], "education": [{"end": "2020", "start": "2018", "degree": "Master en Informatique", "school": "École Supérieure d'Informatique"}], "experience": [{"end": "Présent", "role": "Développeur Full Stack Senior", "start": "2022", "company": "TechCorp", "keywords": ["React", "Node.js", "PostgreSQL", "AWS"], "achievements": ["Développement d'une plateforme SaaS avec 10k+ utilisateurs", "Optimisation des performances de 40%", "Mentorat de 3 développeurs juniors"]}, {"end": "2022", "role": "Développeur Frontend", "start": "2020", "company": "StartupXYZ", "keywords": ["React", "TypeScript", "GraphQL", "Jest"], "achievements": ["Création d'une interface utilisateur moderne et responsive", "Intégration avec des APIs REST et GraphQL", "Tests automatisés avec Jest et Cypress"]}]}	2025-08-29 08:24:49.403
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, type, name, html, css, "previewPng", "isPremium") FROM stdin;
template-modern-fr	RESUME	Moderne Français	\n        <!DOCTYPE html>\n        <html lang="fr">\n        <head>\n          <meta charset="UTF-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1.0">\n          <title>CV - {{basics.firstName}} {{basics.lastName}}</title>\n          <script src="https://cdn.tailwindcss.com"></script>\n        </head>\n        <body class="bg-white text-gray-800 font-sans">\n          <!-- Header -->\n          <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">\n            <h1 class="text-4xl font-bold mb-2">{{basics.firstName}} {{basics.lastName}}</h1>\n            <p class="text-xl opacity-90">{{basics.title}}</p>\n            <div class="mt-4 space-y-1 text-sm">\n              <p>📧 {{basics.contacts.email}}</p>\n              <p>📱 {{basics.contacts.phone}}</p>\n              <p>📍 {{basics.location.city}}, {{basics.location.country}}</p>\n            </div>\n          </header>\n\n          <!-- Summary -->\n          <section class="p-8 border-b">\n            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Profil</h2>\n            <p class="text-gray-700 leading-relaxed">{{basics.summary}}</p>\n          </section>\n\n          <!-- Experience -->\n          <section class="p-8 border-b">\n            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Expérience Professionnelle</h2>\n            {{#each experience}}\n            <div class="mb-6">\n              <div class="flex justify-between items-start mb-2">\n                <h3 class="text-lg font-semibold">{{role}}</h3>\n                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>\n              </div>\n              <p class="text-blue-600 font-medium mb-2">{{company}}</p>\n              <ul class="list-disc list-inside space-y-1 text-gray-700">\n                {{#each achievements}}\n                <li>{{this}}</li>\n                {{/each}}\n              </ul>\n            </div>\n            {{/each}}\n          </section>\n\n          <!-- Education -->\n          <section class="p-8 border-b">\n            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Formation</h2>\n            {{#each education}}\n            <div class="mb-4">\n              <div class="flex justify-between items-start">\n                <div>\n                  <h3 class="text-lg font-semibold">{{degree}}</h3>\n                  <p class="text-blue-600">{{school}}</p>\n                </div>\n                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>\n              </div>\n            </div>\n            {{/each}}\n          </section>\n\n          <!-- Skills -->\n          <section class="p-8">\n            <h2 class="text-2xl font-semibold text-blue-600 mb-6">Compétences</h2>\n            <div class="grid grid-cols-2 gap-4">\n              {{#each skills}}\n              <div class="bg-gray-50 p-3 rounded">\n                <span class="font-medium">{{name}}</span>\n                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">\n                  <div class="bg-blue-600 h-2 rounded-full" style="width: {{level}}%"></div>\n                </div>\n              </div>\n              {{/each}}\n            </div>\n          </section>\n        </body>\n        </html>\n      	\N	\N	f
template-classic-fr	RESUME	Classique Français	\n        <!DOCTYPE html>\n        <html lang="fr">\n        <head>\n          <meta charset="UTF-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1.0">\n          <title>CV - {{basics.firstName}} {{basics.lastName}}</title>\n          <script src="https://cdn.tailwindcss.com"></script>\n        </head>\n        <body class="bg-white text-gray-800 font-serif">\n          <!-- Header -->\n          <header class="border-b-4 border-gray-800 p-8">\n            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{basics.firstName}} {{basics.lastName}}</h1>\n            <p class="text-xl text-gray-600 mb-4">{{basics.title}}</p>\n            <div class="grid grid-cols-2 gap-4 text-sm">\n              <div>\n                <p><strong>Email:</strong> {{basics.contacts.email}}</p>\n                <p><strong>Téléphone:</strong> {{basics.contacts.phone}}</p>\n              </div>\n              <div>\n                <p><strong>Localisation:</strong> {{basics.location.city}}, {{basics.location.country}}</p>\n              </div>\n            </div>\n          </header>\n\n          <!-- Summary -->\n          <section class="p-8">\n            <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Résumé</h2>\n            <p class="text-gray-700 leading-relaxed">{{basics.summary}}</p>\n          </section>\n\n          <!-- Experience -->\n          <section class="p-8">\n            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Expérience Professionnelle</h2>\n            {{#each experience}}\n            <div class="mb-6">\n              <div class="flex justify-between items-start mb-2">\n                <h3 class="text-lg font-semibold text-gray-800">{{role}}</h3>\n                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>\n              </div>\n              <p class="text-gray-600 font-medium mb-2">{{company}}</p>\n              <ul class="list-disc list-inside space-y-1 text-gray-700">\n                {{#each achievements}}\n                <li>{{this}}</li>\n                {{/each}}\n              </ul>\n            </div>\n            {{/each}}\n          </section>\n\n          <!-- Education -->\n          <section class="p-8">\n            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Formation</h2>\n            {{#each education}}\n            <div class="mb-4">\n              <div class="flex justify-between items-start">\n                <div>\n                  <h3 class="text-lg font-semibold text-gray-800">{{degree}}</h3>\n                  <p class="text-gray-600">{{school}}</p>\n                </div>\n                <span class="text-sm text-gray-500">{{start}} - {{end}}</span>\n              </div>\n            </div>\n            {{/each}}\n          </section>\n\n          <!-- Skills -->\n          <section class="p-8">\n            <h2 class="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Compétences</h2>\n            <div class="flex flex-wrap gap-2">\n              {{#each skills}}\n              <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{{name}}</span>\n              {{/each}}\n            </div>\n          </section>\n        </body>\n        </html>\n      	\N	\N	f
template-letter-classic-fr	LETTER	Lettre Classique Français	\n        <!DOCTYPE html>\n        <html lang="fr">\n        <head>\n          <meta charset="UTF-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1.0">\n          <title>Lettre de motivation</title>\n          <script src="https://cdn.tailwindcss.com"></script>\n        </head>\n        <body class="bg-white text-gray-800 font-serif p-8">\n          <div class="max-w-2xl mx-auto">\n            <!-- En-tête -->\n            <header class="mb-8">\n              <h1 class="text-2xl font-bold text-gray-800 mb-4">{{basics.firstName}} {{basics.lastName}}</h1>\n              <div class="text-sm text-gray-600 space-y-1">\n                <p>{{basics.contacts.email}}</p>\n                <p>{{basics.contacts.phone}}</p>\n                <p>{{basics.location.city}}, {{basics.location.country}}</p>\n              </div>\n            </header>\n\n            <!-- Date -->\n            <div class="mb-6">\n              <p>{{date}}</p>\n            </div>\n\n            <!-- Destinataire -->\n            <div class="mb-6">\n              <p>{{company}}</p>\n              <p>{{address}}</p>\n            </div>\n\n            <!-- Objet -->\n            <div class="mb-6">\n              <p><strong>Objet :</strong> Candidature au poste de {{position}}</p>\n            </div>\n\n            <!-- Corps de la lettre -->\n            <div class="space-y-4 leading-relaxed">\n              <p>Madame, Monsieur,</p>\n              \n              <p>{{intro}}</p>\n              \n              <p>{{body}}</p>\n              \n              <p>{{conclusion}}</p>\n              \n              <p>Je reste à votre disposition pour un entretien et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>\n            </div>\n\n            <!-- Signature -->\n            <div class="mt-8">\n              <p>{{basics.firstName}} {{basics.lastName}}</p>\n            </div>\n          </div>\n        </body>\n        </html>\n      	\N	\N	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, plan, "createdAt", "updatedAt") FROM stdin;
cmewkhi460000lofmcwdt5lee	test@jobboost.com	Utilisateur Test	FREE	2025-08-29 08:24:49.398	2025-08-29 08:24:49.398
\.


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: cover_letters cover_letters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cover_letters
    ADD CONSTRAINT cover_letters_pkey PRIMARY KEY (id);


--
-- Name: resumes resumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: sessions_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON public.sessions USING btree ("sessionToken");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: applications applications_coverLetterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT "applications_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES public.cover_letters(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: applications applications_resumeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT "applications_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES public.resumes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: applications applications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cover_letters cover_letters_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cover_letters
    ADD CONSTRAINT "cover_letters_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resumes resumes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict AjmOE5bX6oOTuU9t84W7Oc20p7xc8K3kNV7YOhWoxopSVHbcenvkMcd4NaqtTzX

