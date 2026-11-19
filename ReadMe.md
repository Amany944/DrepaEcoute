# 🩺 DrepaEcoute

> **Plateforme web d'accompagnement, d'écoute et de suivi médical dédiée aux patients drépanocytaires et aux professionnels de santé.**

---

## 📋 À propos du projet

**DrepaEcoute** est une application web moderne pensée pour faciliter la communication et le suivi quotidien autour de la drépanocytose. Elle propose une double interface adaptée aux besoins spécifiques des patients et du corps médical : suivi de l'état de santé, historique des échanges et consultation des dossiers médicaux.

Le projet est actuellement une **application front-end** : les données proviennent de `src/data/mock.js` et l'état global est géré côté client. Aucun serveur ni base de données n'est requis pour lancer l'application.

---

## ✨ Fonctionnalités principales

### 👤 Espace Patient

- **Accueil personnalisé :** vue d'ensemble intuitive et accès rapide aux outils de suivi.
- **Espace d'écoute et de conversation :** interface dédiée aux échanges et au soutien.
- **Historique et bilans :** consultation des interactions passées et révision des synthèses.
- **Gestion du profil et confidentialité :** paramétrage des informations personnelles et contrôle des données de santé.

### 👨‍⚕️ Espace Professionnel de Santé

- **Tableau de bord médical :** vue globale de l'activité et des alertes patients.
- **Gestion de la patientèle :** liste et recherche rapide des patients suivis.
- **Dossier patient détaillé :** accès centralisé aux informations cliniques et aux bilans de suivi.

---

## 🛠️ Stack technique

| Domaine             | Technologie                                          |
| ------------------- | ---------------------------------------------------- |
| Frontend            | [React 19](https://react.dev) (JSX)                  |
| Build tool          | [Vite 7](https://vite.dev)                           |
| Routage             | [React Router 7](https://reactrouter.com)            |
| Gestion d'état      | [Zustand 5](https://zustand.docs.pmnd.rs)            |
| Animations          | [Framer Motion](https://motion.dev)                  |
| Styles              | [Tailwind CSS 4](https://tailwindcss.com) + CSS      |
| Données             | Données simulées (`src/data/mock.js`)                |

---

## 🗺️ Routes de l'application

| Route                 | Page                | Accès                        |
| --------------------- | ------------------- | ---------------------------- |
| `/`                   | Splash              | Public                       |
| `/connexion`          | Login               | Public                       |
| `/confidentialite`    | Privacy             | Public                       |
| `/accueil`            | Home                | Authentifié                  |
| `/conversation`       | Conversation        | Authentifié                  |
| `/resume`             | SummaryReview       | Authentifié                  |
| `/historique`         | History             | Authentifié                  |
| `/profil`             | Profile             | Authentifié                  |
| `/pro`                | Dashboard (pro)     | Espace professionnel         |
| `/pro/patients`       | Patients (pro)      | Espace professionnel         |
| `/pro/patients/:id`   | PatientFile (pro)   | Espace professionnel         |

Les routes protégées redirigent vers `/connexion` si l'utilisateur n'est pas authentifié.

---

## 📂 Architecture du projet

```text
DrepaEcoute/
├── src/
│   ├── components/
│   │   ├── layout/      # Coquilles d'interface (PatientShell, ProShell)
│   │   └── ui/          # Composants réutilisables (Button, Icon, Toast, PageTransition...)
│   ├── data/            # Données simulées (mock.js)
│   ├── lib/             # Fonctions utilitaires (utils.js)
│   ├── pages/
│   │   ├── pro/         # Espace professionnel (Dashboard, Patients, PatientFile)
│   │   └── ...          # Espace patient (Home, Conversation, History, Profile...)
│   ├── store/           # État global Zustand (useAppStore.js)
│   ├── App.jsx          # Routage et point d'entrée applicatif
│   ├── index.css        # Styles globaux et thème Tailwind
│   └── main.jsx         # Rendu React
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Installation et lancement en local

### Prérequis

- [Node.js](https://nodejs.org) **20+**
- npm (fourni avec Node.js)

### Étapes

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-depot>
   cd DrepaEcoute
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

   L'application est accessible à l'adresse indiquée dans le terminal (par défaut `http://localhost:5173`).

### Scripts disponibles

| Commande          | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement Vite       |
| `npm run build`   | Génère la version de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production          |

---

## 👨‍💻 Auteur

**Amany944**
