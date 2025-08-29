# 🗄️ Base de Données JobBoost

Ce document décrit la configuration et la gestion de la base de données PostgreSQL pour le projet JobBoost.

## 📋 Prérequis

- Docker et Docker Compose installés
- Node.js 18+ et npm
- Prisma CLI

## 🚀 Démarrage Rapide

### 1. Configuration de l'environnement

Copiez le fichier d'environnement :
```bash
cp .env.example .env.local
```

Modifiez les variables dans `.env.local` selon vos besoins.

### 2. Démarrage de la base de données

```bash
# Utiliser le script de gestion
./scripts/db.sh start

# Ou utiliser npm
npm run db:start
```

### 3. Synchronisation du schéma

```bash
npm run prisma:push
```

### 4. Initialisation des données

```bash
npm run prisma:seed
```

## 🛠️ Script de Gestion

Le script `scripts/db.sh` fournit des commandes utiles pour gérer la base de données :

```bash
./scripts/db.sh [COMMAND]
```

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `start` | Démarrer la base de données |
| `stop` | Arrêter la base de données |
| `restart` | Redémarrer la base de données |
| `reset` | Réinitialiser complètement la base de données |
| `status` | Afficher le statut des conteneurs |
| `logs` | Afficher les logs de la base de données |
| `backup` | Créer une sauvegarde |
| `restore` | Restaurer une sauvegarde |
| `seed` | Exécuter le script de seed |
| `studio` | Ouvrir Prisma Studio |

### Exemples d'utilisation

```bash
# Vérifier le statut
./scripts/db.sh status

# Créer une sauvegarde
./scripts/db.sh backup

# Réinitialiser la base de données
./scripts/db.sh reset
```

## 🐳 Configuration Docker

### Services

- **PostgreSQL 15** : Base de données principale
- **Redis 7** : Cache et sessions

### Ports

- PostgreSQL : `5432`
- Redis : `6379`

### Variables d'environnement

```bash
POSTGRES_DB=jobboost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

### Volumes

- `postgres_data` : Données PostgreSQL persistantes

## 📊 Structure de la Base de Données

### Tables principales

- **users** : Utilisateurs et plans d'abonnement
- **resumes** : CV des utilisateurs
- **cover_letters** : Lettres de motivation
- **templates** : Modèles de CV et lettres
- **applications** : Suivi des candidatures
- **sessions** : Sessions d'authentification

### Relations

```
User (1) ←→ (N) Resume
User (1) ←→ (N) CoverLetter
User (1) ←→ (N) Application
Resume (1) ←→ (N) Application
CoverLetter (1) ←→ (N) Application
```

## 🔧 Commandes Prisma

### Génération du client

```bash
npm run prisma:generate
```

### Synchronisation du schéma

```bash
npm run prisma:push
```

### Migrations

```bash
npm run prisma:migrate
```

### Prisma Studio

```bash
npm run prisma:studio
```

## 📝 Données d'Exemple

Le script de seed crée automatiquement :

- 2 templates de CV (Moderne et Classique)
- 1 template de lettre de motivation
- 1 utilisateur de test
- 1 CV d'exemple avec données complètes

### Utilisateur de test

- **Email** : `test@jobboost.com`
- **Nom** : Utilisateur Test
- **Plan** : FREE

## 🔒 Sécurité

### Production

Pour la production, utilisez `docker-compose.prod.yml` qui :

- Bind les ports uniquement sur localhost
- Utilise des variables d'environnement sécurisées
- Isole le réseau des conteneurs

### Variables d'environnement sensibles

- Changez `NEXTAUTH_SECRET` en production
- Utilisez des mots de passe forts pour PostgreSQL
- Configurez les clés OAuth et Stripe

## 🚨 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Vérifier les ports utilisés
   sudo netstat -tulpn | grep :5432
   
   # Arrêter le service PostgreSQL local si nécessaire
   sudo systemctl stop postgresql
   ```

2. **Erreur de connexion**
   ```bash
   # Vérifier le statut des conteneurs
   ./scripts/db.sh status
   
   # Vérifier les logs
   ./scripts/db.sh logs
   ```

3. **Problème de permissions**
   ```bash
   # Redémarrer avec des permissions correctes
   ./scripts/db.sh restart
   ```

### Logs utiles

```bash
# Logs PostgreSQL
docker compose logs postgres

# Logs Redis
docker compose logs redis

# Logs en temps réel
docker compose logs -f
```

## 📚 Ressources

- [Documentation Prisma](https://www.prisma.io/docs/)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation Redis](https://redis.io/documentation)
- [Docker Compose](https://docs.docker.com/compose/)

## 🤝 Contribution

Pour modifier le schéma de la base de données :

1. Modifiez `prisma/schema.prisma`
2. Testez localement avec `npm run prisma:push`
3. Créez une migration avec `npm run prisma:migrate`
4. Mettez à jour le script de seed si nécessaire
5. Documentez les changements dans ce fichier
