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

## Variables d'environnement

Le formulaire de contact (`app/contact/actions.ts`) envoie les messages via [Resend](https://resend.com).

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
