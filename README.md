# Portfolio — Alexandre PROUST

Portfolio de développeur fullstack TypeScript, en ligne sur <https://portfolio.alx-pst.tech>.

Stack : Next.js (App Router), React 19, Tailwind CSS 4, déployé en conteneur Docker (`output: "standalone"`).

## Développement

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev
```

Le site tourne sur <http://localhost:3000>.

## Structure

| Route | Contenu |
| --- | --- |
| `/` | L'accueil : une seule page (offres, méthode, projets, parcours, contact), rendue côté serveur. Les parties interactives (nom animé, conversation avec l'étincelle, formulaire) sont des îlots client dans `app/components/home/`. |

Les anciennes pages `/projects`, `/experiences` et `/contact` redirigent en 301 vers les sections de l'accueil (`next.config.ts`).

Le contenu (offres, projets, parcours, stack) vit dans `app/lib/content.ts` ; les réponses de l'étincelle dans `app/lib/chat/knowledge.ts`.

## Référencement

- Titre, description, Open Graph et canonique : `app/layout.tsx`, `app/page.tsx` et `app/lib/site.ts`.
- Données structurées (WebSite et Person) : `app/page.tsx`.
- Image de partage générée au build : `app/opengraph-image.tsx`. Icônes : `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`.
- `sitemap.xml` et `robots.txt` : `app/sitemap.ts` et `app/robots.ts`. Mettre à jour la date du sitemap quand le contenu change.

## Variables d'environnement

Le formulaire de contact (Server Action `app/actions/contact.ts`) envoie les messages via [Resend](https://resend.com).

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages |
| `CONTACT_FROM_EMAIL` | Expéditeur, sur un domaine vérifié dans Resend |

Sans `RESEND_API_KEY` ni `CONTACT_TO_EMAIL`, le formulaire affiche une erreur et renvoie vers l'adresse email directe : il ne prétend jamais avoir envoyé un message.

## Production

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.production portfolio
```
