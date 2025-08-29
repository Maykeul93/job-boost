#!/bin/bash

# Script de gestion de la base de données JobBoost

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'aide
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     - Démarrer la base de données"
    echo "  stop      - Arrêter la base de données"
    echo "  restart   - Redémarrer la base de données"
    echo "  reset     - Réinitialiser complètement la base de données"
    echo "  status    - Afficher le statut des conteneurs"
    echo "  logs      - Afficher les logs de la base de données"
    echo "  backup    - Créer une sauvegarde de la base de données"
    echo "  restore   - Restaurer une sauvegarde"
    echo "  seed      - Exécuter le script de seed"
    echo "  studio    - Ouvrir Prisma Studio"
    echo "  help      - Afficher cette aide"
    echo ""
}

# Fonction pour démarrer la base de données
start_db() {
    echo -e "${BLUE}🚀 Démarrage de la base de données...${NC}"
    docker compose up -d
    echo -e "${GREEN}✅ Base de données démarrée avec succès!${NC}"
    
    # Attendre que PostgreSQL soit prêt
    echo -e "${YELLOW}⏳ Attente que PostgreSQL soit prêt...${NC}"
    sleep 5
    
    # Vérifier la santé
    if docker compose exec postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL est prêt!${NC}"
    else
        echo -e "${RED}❌ PostgreSQL n'est pas prêt${NC}"
        exit 1
    fi
}

# Fonction pour arrêter la base de données
stop_db() {
    echo -e "${BLUE}🛑 Arrêt de la base de données...${NC}"
    docker compose down
    echo -e "${GREEN}✅ Base de données arrêtée!${NC}"
}

# Fonction pour redémarrer la base de données
restart_db() {
    echo -e "${BLUE}🔄 Redémarrage de la base de données...${NC}"
    stop_db
    start_db
}

# Fonction pour réinitialiser la base de données
reset_db() {
    echo -e "${YELLOW}⚠️  ATTENTION: Cette action va supprimer toutes les données!${NC}"
    read -p "Êtes-vous sûr de vouloir continuer? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}🗑️  Suppression de la base de données...${NC}"
        docker compose down -v
        docker compose up -d
        echo -e "${GREEN}✅ Base de données réinitialisée!${NC}"
        
        # Recréer les tables et les données
        echo -e "${BLUE}🔧 Recréation des tables...${NC}"
        npm run prisma:push
        echo -e "${BLUE}🌱 Exécution du script de seed...${NC}"
        npx tsx prisma/seed.ts
        echo -e "${GREEN}✅ Base de données prête!${NC}"
    else
        echo -e "${YELLOW}❌ Opération annulée${NC}"
    fi
}

# Fonction pour afficher le statut
status_db() {
    echo -e "${BLUE}📊 Statut des conteneurs:${NC}"
    docker compose ps
    echo ""
    
    # Vérifier la connexion à PostgreSQL
    if docker compose exec postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL: Connecté${NC}"
    else
        echo -e "${RED}❌ PostgreSQL: Non connecté${NC}"
    fi
    
    # Vérifier la connexion à Redis
    if docker compose exec redis redis-cli ping > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Redis: Connecté${NC}"
    else
        echo -e "${RED}❌ Redis: Non connecté${NC}"
    fi
}

# Fonction pour afficher les logs
logs_db() {
    echo -e "${BLUE}📋 Logs de la base de données:${NC}"
    docker compose logs -f postgres
}

# Fonction pour créer une sauvegarde
backup_db() {
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="backup_jobboost_${timestamp}.sql"
    
    echo -e "${BLUE}💾 Création de la sauvegarde: ${backup_file}${NC}"
    docker compose exec postgres pg_dump -U postgres jobboost > "backups/${backup_file}"
    echo -e "${GREEN}✅ Sauvegarde créée: backups/${backup_file}${NC}"
}

# Fonction pour restaurer une sauvegarde
restore_db() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Veuillez spécifier le fichier de sauvegarde${NC}"
        echo "Usage: $0 restore <fichier_backup>"
        exit 1
    fi
    
    local backup_file="$1"
    if [ ! -f "$backup_file" ]; then
        echo -e "${RED}❌ Fichier de sauvegarde non trouvé: $backup_file${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}⚠️  ATTENTION: Cette action va écraser la base de données actuelle!${NC}"
    read -p "Êtes-vous sûr de vouloir continuer? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}🔄 Restauration de la sauvegarde...${NC}"
        docker compose exec -T postgres psql -U postgres jobboost < "$backup_file"
        echo -e "${GREEN}✅ Sauvegarde restaurée!${NC}"
    else
        echo -e "${YELLOW}❌ Opération annulée${NC}"
    fi
}

# Fonction pour exécuter le seed
seed_db() {
    echo -e "${BLUE}🌱 Exécution du script de seed...${NC}"
    npx tsx prisma/seed.ts
    echo -e "${GREEN}✅ Seed terminé!${NC}"
}

# Fonction pour ouvrir Prisma Studio
studio_db() {
    echo -e "${BLUE}🎨 Ouverture de Prisma Studio...${NC}"
    npx prisma studio
}

# Créer le dossier backups s'il n'existe pas
mkdir -p backups

# Gestion des commandes
case "${1:-help}" in
    start)
        start_db
        ;;
    stop)
        stop_db
        ;;
    restart)
        restart_db
        ;;
    reset)
        reset_db
        ;;
    status)
        status_db
        ;;
    logs)
        logs_db
        ;;
    backup)
        backup_db
        ;;
    restore)
        restore_db "$2"
        ;;
    seed)
        seed_db
        ;;
    studio)
        studio_db
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Commande inconnue: $1${NC}"
        show_help
        exit 1
        ;;
esac
