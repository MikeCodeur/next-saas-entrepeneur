# Mettre en place le projet

## variable environnment

### Postgre (DATABASE_URL)

- Créer un compte sur [Vercel](https://vercel.com)
- Il faut créer une base de donnée postgre sur vercel
- Récupérer la clé `pg` ave `show secret`

### Resend (RESEND_API_KEY)

- Créer un compte
- Récupérer la clé API

### AuthJs (AUTH_SECRET)

- Générer une clé secret avec `openssl rand -base64 32` dans un terminal bash ou WSL

## Préparation du projet

### Installation des dépendances

- avec `pnpm install`:
  - à la racine.
  - puis dans le dossier `react-email-starter`.

### Préparation de la base de donnée

- Généré la base de donnée avec `pnpm db:generate`.
- Lancer le script pour la base de donnée vers vercel: `pnpm db:migrate`.

## Les commandes du projet

- Pour l'application : `pnpm dev`.
- Pour voir la base de donnée: `pnpm db:studio`.
- Avoir les preview pour les emails dans `react-email-starter`: `pnpm dev` dans le dossier.
