# Veille IA & Santé Mentale

Ce projet est un site statique qui archive une veille quotidienne sur le thème
"IA et santé mentale" (usages cliniques, chatbots thérapeutiques, recherche,
régulation, risques, etc.).

## Structure

- `index.html` — page web qui affiche les articles archivés (recherche par mot-clé incluse)
- `assets/style.css`, `assets/app.js` — front-end statique
- `data/articles.js` — base de données des articles, sous forme de variable JS
  `ARTICLES_DATA = { days: [ { date, summary, items: [ { title, url, source, summary } ] } ] }`

## Tâche quotidienne de mise à jour

Chaque matin, il faut :

1. Vérifier la date du jour et si une entrée pour cette date existe déjà dans
   `data/articles.js` (ne pas dupliquer si l'agent tourne deux fois).
2. Faire une recherche web (WebSearch) sur l'actualité récente (dernières 24-48h)
   autour de "IA et santé mentale" : nouveaux outils/chatbots thérapeutiques,
   études scientifiques, régulation, controverses, usages cliniques, santé
   mentale des ados et IA, etc.
   - Effectuer **plusieurs requêtes distinctes**, à la fois en français et en
     anglais, pour couvrir la presse française ET la presse internationale.
     Exemples de requêtes : "IA santé mentale actualité", "intelligence
     artificielle psychiatrie France", "AI mental health news", "AI chatbot
     therapy regulation".
   - Viser explicitement des résultats issus de médias français (ex : Le
     Monde, Le Figaro, Libération, France Info, Les Echos, Le Quotidien du
     Médecin, La Croix, etc.) ET de médias internationaux (ex : NYT, NBC,
     The Guardian, BBC, NPR, TechCrunch, STAT News, Reuters, Stanford HAI,
     etc.). Ne pas se limiter à une seule zone géographique : chercher un
     équilibre entre actualité française et internationale dans la sélection
     finale.
3. Sélectionner 4 à 8 articles pertinents et de qualité (sources fiables :
   presse généraliste, presse spécialisée tech/santé, revues scientifiques,
   communiqués officiels), en veillant à inclure si possible au moins un
   ou deux articles issus de la presse française. Éviter les doublons et le
   contenu publicitaire.
4. Pour chaque article, rédiger un résumé court (2-3 phrases, en français)
   expliquant l'info et son intérêt pour la veille.
5. Rédiger un résumé global de la journée (2-4 phrases) qui synthétise les
   tendances du jour.
6. Ajouter une nouvelle entrée en tête de `data/articles.js` (dans `days`,
   peu importe l'ordre car le front trie par date) avec la structure :

```js
{
  "date": "AAAA-MM-JJ",
  "summary": "Résumé global de la journée...",
  "items": [
    {
      "title": "Titre de l'article",
      "url": "https://...",
      "source": "Nom de la source",
      "summary": "Résumé court de l'article..."
    }
  ]
}
```

7. S'assurer que `data/articles.js` reste un fichier JS valide (la variable
   `ARTICLES_DATA` doit toujours être définie en haut du fichier).
8. Si aucun article pertinent n'est trouvé, ajouter quand même une entrée du
   jour avec `items: []` et un `summary` indiquant qu'il n'y a rien de notable.

Une fois `data/articles.js` mis à jour, commit les changements (message du
type "Veille du AAAA-MM-JJ") et push sur la branche `main`. Ne pas modifier
les autres fichiers du projet sauf si une correction de bug évidente est
nécessaire.
