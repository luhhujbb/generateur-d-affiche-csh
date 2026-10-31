# Générateur d'affiche — Conférences Saint Honoré

Application locale pour composer les affiches A4 des conférences du **Cercle Saint Honoré** : auteur, livre, titre, date et visuels, avec aperçu en direct et export PDF.

## À quoi ça sert

À partir d’un formulaire, l’outil assemble une affiche au format portrait A4 fidèle à la charte (navy / or, logo 2026-2027) :

- nom et photo de l’auteur (PNG avec transparence ou portrait circulaire)
- image de fond de la bande auteur
- titre (et sous-titre) de la conférence
- couverture du livre
- date, heure, lieu
- pied de page avec liens et contacts

L’aperçu se met à jour en direct. Le bouton **Exporter en PDF** ouvre l’impression du navigateur (format A4, sans marges).

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173/](http://localhost:5173/).

Sous WSL, si Windows n’atteint pas `localhost`, utiliser l’IP de la VM (ex. `http://172.x.x.x:5173/`).

## Scripts

| Commande                 | Rôle                                      |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Serveur de développement                  |
| `npm run build`          | Build à la racine (`/`)                   |
| `npm run build:generator`| Build pour le sous-dossier `/generator/`  |
| `npm run preview`        | Prévisualiser le build                    |

## Déploiement dans un sous-dossier

Si le site est servi sous un chemin (ex. `https://exemple.fr/generator/`), les assets doivent être préfixés. Deux options :

```bash
# Raccourci pour /generator/
npm run build:generator

# Autre chemin
BASE_PATH=/mon-chemin npm run build

# Ou via le flag Vite
npm run build -- --base=/mon-chemin/
```

Le contenu de `dist/` se déploie ensuite dans ce sous-dossier sur le serveur.

## Stack

React 19 · TypeScript · Vite
