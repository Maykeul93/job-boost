# 🚀 JobBoost - CV & Coaching de carrière

JobBoost est une application web moderne qui aide les chercheurs d'emploi et les personnes en reconversion à se démarquer rapidement grâce à un générateur de CV optimisé ATS et des outils de coaching intégrés.

## ✨ Fonctionnalités principales

### 🎯 Générateur de CV
- **Templates modernes** : 4 modèles professionnels (2 gratuits, 2 premium)
- **Optimisation ATS** : Score automatique et suggestions de mots-clés
- **Prévisualisation en temps réel** : Voir les changements instantanément
- **Export PDF** : Génération de PDF haute qualité

### 📝 Lettres de motivation
- **Génération automatique** : Basée sur l'offre d'emploi et votre CV
- **Templates personnalisables** : Adaptés à chaque type de poste
- **Variables dynamiques** : Remplissage automatique des informations

### 📊 Suivi de candidatures
- **Mini-ATS personnel** : Suivez toutes vos candidatures
- **Alertes intelligentes** : Rappels pour les relances
- **Statistiques** : Analyse de vos performances

### 🎓 Coaching intégré
- **Micro-formations** : Capsules de 5 minutes sur la recherche d'emploi
- **Conseils personnalisés** : Basés sur votre profil et objectifs
- **Notifications motivantes** : Restez motivé dans votre recherche

## 🛠️ Stack technique

- **Frontend** : Next.js 14 + React + TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : NextAuth.js
- **Génération PDF** : Puppeteer
- **Templates** : Handlebars
- **Déploiement** : Vercel (recommandé)

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/job-boost.git
cd job-boost
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jobboost"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe (pour plus tard)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Créer et migrer la base de données
npx prisma db push

# (Optionnel) Ouvrir Prisma Studio
npx prisma studio
```

### 5. Lancer l'application
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
src/
├── app/                    # App Router Next.js
│   ├── resume/            # Générateur de CV
│   ├── cover-letters/     # Générateur de lettres
│   ├── applications/      # Suivi des candidatures
│   └── auth/              # Authentification
├── components/            # Composants React
│   ├── layout/           # Composants de mise en page
│   ├── resume/           # Composants du générateur CV
│   └── ui/               # Composants UI réutilisables
├── lib/                  # Utilitaires et fonctions
├── types/                # Types TypeScript
└── styles/               # Styles globaux
```

## 🎨 Templates de CV disponibles

### Gratuits
1. **Moderne** : Design épuré et professionnel
2. **Classique** : Style traditionnel et élégant

### Premium
3. **Créatif** : Design original et impactant
4. **Minimaliste** : Simplicité et efficacité

## 💰 Modèle économique

### Plan Gratuit
- 1 modèle de CV basique
- 1 lettre de motivation
- Export PDF avec filigrane
- Suivi simple des candidatures

### Plan Premium (7,99€/mois)
- Tous les modèles premium
- Exports PDF illimités
- Score ATS avancé
- Sauvegardes multiples
- Analyses détaillées

## 🔧 Développement

### Scripts disponibles
```bash
npm run dev          # Développement local
npm run build        # Build de production
npm run start        # Démarrer en production
npm run lint         # Vérification du code
npm run type-check   # Vérification des types
```

### Conventions de code
- **TypeScript strict** : Configuration stricte activée
- **ESLint + Prettier** : Formatage automatique du code
- **Composants fonctionnels** : Utilisation des hooks React
- **Tailwind CSS** : Classes utilitaires pour le styling

## 🚀 Déploiement

### Vercel (recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement à chaque push

### Variables d'environnement de production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 📈 Roadmap

### Sprint 1 - MVP CV ✅
- [x] Modèle de données
- [x] Éditeur de CV
- [x] 3 templates
- [x] Export PDF
- [x] Interface utilisateur

### Sprint 2 - Lettres de motivation
- [ ] 2 templates de lettres
- [ ] Variables dynamiques
- [ ] Export et sauvegarde

### Sprint 3 - Analyse ATS
- [ ] Parsing des offres d'emploi
- [ ] Suggestions de mots-clés
- [ ] Score ATS
- [ ] Interface de comparaison

### Sprint 4 - Paiement et Premium
- [ ] Intégration Stripe
- [ ] Limites free/premium
- [ ] Analyses d'usage
- [ ] Micro-correctifs

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Email** : support@jobboost.com
- **Documentation** : [docs.jobboost.com](https://docs.jobboost.com)
- **Issues** : [GitHub Issues](https://github.com/votre-username/job-boost/issues)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Prisma](https://www.prisma.io/) pour l'ORM
- [Heroicons](https://heroicons.com/) pour les icônes

---

**JobBoost** - Transformez votre carrière en quelques clics ! 🚀
