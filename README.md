# Template Next-JS

_<p style="text-align: center">Next-Js **14** · TypeScript · Prettier · Eslint · Vitest · Shadcn-ui</p>_

**_<p style="text-align: center;">
[![Static Badge](https://img.shields.io/badge/pnpm-v8.11.0-blue)](https://pnpm.io/fr/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Static Badge](https://img.shields.io/badge/code_quality-eslint-green)
![Static Badge](https://img.shields.io/badge/ui-shadcn-red)
![Static Badge](https://img.shields.io/badge/template-starter-violet)
![Static Badge](https://img.shields.io/badge/test-vitest-green)</p>_**

### Prettier

Basic configuration + plugin tailwind

### Eslint

- [Unicorn preset](https://github.com/sindresorhus/eslint-plugin-unicorn) recommended
- [Github preset](https://github.com/github/eslint-plugin-github) recommended
- [Json-format](https://github.com/kuceb/eslint-plugin-json-format) plugin
- [Promise](https://github.com/eslint-community/eslint-plugin-promise) default
- [Vitest](https://github.com/veritem/eslint-plugin-vitest) all + custom config

### Shadcn-UI

# Démarrer le projet

## installer les dépendances

`pnpm i`

### react email starter

`cd react-email-starter`
`pnpm i`

### .env

Renseigner le .env

- `DATABASE_URL=""`
- `AUTH_SECRET=""`
- `RESEND_API_KEY=""`
- `EMAIL_FROM=""`

### AUTH_SECRET

Générer le AUTH_SECRET
`openssl rand -base64 32`

### RESEND_API_KEY

Créer un compte sur https://resend.com
`RESEND_API_KEY=''`

### EMAIL_FROM

Mettre un email

### Base de données - (PostgreSql - Locale)

Installer une BDD locale (non recommandé)

- [Serveur](https://www.postgresql.org/download/)

Client (PgAdmin)

- [PgAdmin](https://www.pgadmin.org/)

`DATABASE_URL=""`

### Base de données - (PostgreSql - Vercel)

Aller sur [Vercel](https://vercel.com/)
Aller onglet `Storage` -> `Create Database`
Copier `POSTGRES_URL` de vercel dans `DATABASE_URL=""`

### Drizzle Script

## Générer la premiere fois

Générer le model
`pnpm db:generate`
`pnpm db:migrate`

## Mise à jour du shéma

`pnpm db:migrate`

# Regénérer toutes les données

1. drop all tables `pnpm db:clear`

2. supprimer drizzle meta `pnpm db:drop`

3. drizzle `pnpm db:generate` `pnpm db:migrate`

### React Email

- `cd react-email-starter`
- `pnpm i `
- `pnpm dev `

### Structure

```xml
src
├── app
│  ├── (pages)
│  ├── api
│  └── components
├── data
│  ├── db
│  ├── models
│  └── repositories
├── services
├── types
├── utils
├── validations
└── __tests__
```

### Test Runner

Vitest: setup + extends matcher from Jest
