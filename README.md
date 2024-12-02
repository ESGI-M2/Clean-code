# Clean-code Folder Structure

```plaintext
src/
├── application/            # Couche Application (Logique de l'application et cas d'utilisation)
│   ├── services/           # Services métiers
│   ├── command/            # Requêtes
│   ├── query/              # Demandes
│   └── dto/                # Data Transfer Objects (pour les échanges entre couches)
│
├── domain/                 # Couche Domain (Logique métier et règles de domaine)
│   ├── entities/           # Entités métiers
│   ├── repositories/       # Interfaces des repositories
│   └── valueObjects/       # Objets de valeurs et agrégats
│
├── infrastructure/         # Couche Infrastructure (Base de données, frameworks)
│   ├── databases/          # Gestion des bases de données (SQL, NoSQL, etc.)
│       ├── mongo/
│           ├── repositories/
│       ├── postgresql/
│           ├── repositories/
│   └── frameworks/         # Frameworks externes (Express, NestJS, etc.)
│   └── dto/                # Data Transfer Objects (pour les échanges entre couches)
│
└── interface/              # Couche Interface (API, Interface utilisateur)
    ├── controllers/        # Contrôleurs d'API
    └── routes/             # Gestion des routes API
    └── dto/                # Data Transfer Objects (pour les échanges entre couches)

frontend/                   # Code front-end (React, par exemple)
├── public/                 # Fichiers publics (index.html, favicon, etc.)
├── src/                    # Code source React
    ├── components/         # Composants UI
    ├── services/           # Services pour les appels API vers le back-end
    ├── pages/              # Pages principales de l'application
    ├── hooks/              # Custom hooks
    ├── context/            # Gestion des contextes (ex. user, auth)
    └── utils/              # Utilitaires communs
```
