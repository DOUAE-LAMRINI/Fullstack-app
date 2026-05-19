# 🌸 Fullstack App — Déploiement Full-Stack en Production

> **TP 8 · Développement d'Applications Web Avancé**  
> ENIAD IA1 · 2025/2026 · Prof. Redouane LHIADI

---

## ✨ Aperçu

Application full-stack déployée en production, combinant un frontend **React** moderne avec un backend **Node.js + Express**, une base de données **MongoDB Atlas**, et un déploiement continu via **Railway**.

🔗 **Application en ligne :** [fullstack-app-production-9c4e.up.railway.app](https://fullstack-app-production-9c4e.up.railway.app)  

---

## 🗂️ Structure du projet

```
fullstack-app/
├── 📁 backend/
│   ├── server.js          # Point d'entrée Express
│   ├── routes/            # Routes API
│   ├── models/            # Modèles Mongoose
│   └── .env               # Variables d'environnement (non publié)
│
├── 📁 frontend/
│   ├── src/               # Code source React
│   ├── public/            # Fichiers statiques
│   └── package.json
│
├── package.json           # Scripts racine pour Railway
└── README.md
```

---

## 🛠️ Technologies utilisées

| Couche | Technologie |
|--------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Base de données | MongoDB Atlas |
| Authentification | JWT |
| Déploiement | Railway |
| Versioning | GitHub |
| Tests API | Postman |

---

## 🚀 Installation locale

### Prérequis
- Node.js v18+
- npm
- MongoDB local ou URI Atlas

### 1. Cloner le projet
```bash
git clone https://github.com/DOUAE-LAMRINI/Fullstack-app.git
cd Fullstack-app
```

### 2. Configurer le backend
```bash
cd backend
npm install
```

Créer un fichier `.env` dans `backend/` :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/test
JWT_SECRET=monsecretjwt_tp8_2025
NODE_ENV=development
```

### 3. Configurer le frontend
```bash
cd ../frontend
npm install
```

Créer un fichier `.env` dans `frontend/` :
```env
VITE_API_URL=http://localhost:5000
```

### 4. Build et lancement
```bash
# Build du frontend
cd frontend
npm run build

# Lancer le serveur
cd ../backend
node server.js
```

Ouvrir [http://localhost:5000](http://localhost:5000) 🎉

---

## 🌐 Déploiement (Railway)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | URI de connexion MongoDB Atlas |
| `JWT_SECRET` | Clé secrète JWT |
| `PORT` | Port du serveur |

**Build command :**
```bash
cd frontend && npm install && npm run build && cd ../backend && npm install
```

**Start command :**
```bash
npm start
```

---

## 📡 Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/register` | Inscription utilisateur |
| `POST` | `/api/auth/login` | Connexion utilisateur |
| `GET` | `/api/users` | Liste des utilisateurs |
| `GET` | `/api/users/:id` | Profil utilisateur |
| `PUT` | `/api/users/:id` | Modifier un utilisateur |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur |

---

## 🔒 Bonnes pratiques appliquées

-  Variables d'environnement avec `dotenv`
-  Mots de passe hashés avec `bcrypt`
-  Authentification JWT sécurisée
-  Fichier `.env` exclu du dépôt (`.gitignore`)
-  Build React optimisé pour la production
-  HTTPS activé via Railway

---

<p align="center">
  Réalisé avec 🌸 dans le cadre du TP 8 · ENIAD 2025/2026
</p>
