# 2 mains boundaries |

3 mains Layers (Presentation | Service | Peristance)

- Le service ne veux pas se préocuper de la presentation
- Le service ne veux pas se préocuper de la persistance

- La persistance s'adapte aux besoins du service (non l'inverse) - ex : CreatefinanceByUid
- La presentation depends du service (non l'inverse) - ex : server action call service

- La persistance n'a pas de depandance aux services/presentation
- La presentation n'a pas de depandance à la persistance
- Le service n'a pas de depandance à la presentation

# typage domains

Avoir cette structure qui vient du model ORM

```typescript
export type Finance = FinanceModel
export type CreateFinance = CreateEditFinanceModel
export type UpdateFinance = Finance
export type DeleteFinance = Pick<Finance, "id">

//ensuite les spécifiques
```

# Règles de nommage

## Nommage fonctions CRUD generiques (service)

- createFinance (on pourrait createFinanceService mais c'est long)
- updateFinance
- deleteFinance
- getFinance

## Nommage fonctions spécifiques

- createFinanceByUser
- createFinanceAdmin
- createFinanceHealthByUser
- getUserById

## Nommage fonctions spécifiques DAO

- createFinanceDao (generique)
- createFinanceByUidDao (specifique)

# Authorization Service

- can|Action|Object (UID, Object)
- Question à repondre : Cet Utilisateur PEUT il Faire Action sur Tel OBJECT
- exemple : canCreateFinance(uid, finance)

- Check RBAC generics rules
- Check specifics rules
- Return type : boolean + message

# Service Validation

Service validation is different than FORM validation

# Form Validation

Service validation is different than FORM validation

# Next 15 Cache

Trop de skeleton maintenant
Tester en mode production, comportement differenet

# Linter disabled Rules

# production

auth : trustHost

# TODO

form/action : suppression uid?
