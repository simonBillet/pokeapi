# Projet PokéApi 
Réalisée par Simon BILLET

## Fonctionnalités présentes, manquantes et incomplètes
La majorité des fonctionnalités qui ont été demandées sont présentes dans l'application. Les seuls
fonctionnalités manquantes sont :
- La possibilité de supprimer un pokémon des favoris
- La barre de recherche dans les pokémons favoris

Une fonctionnalité qui ne fonctionne pas complètement est le nombre qui permet de savoir à quel page nous 
sommes lorsqu'on la change (reste à 1).

## Logique d'organisation
L'ensemble des éléments qui permettent de gérer l'app et les évènements sont dans le dossier `src`.

### Dossier `Features`
Ce projet est composé d'un seul service qui se trouve dans le dossier `Service`. Même si il n'y 
a qu'un seul fichier je trouve cela plus logique dans un dossier pour s'organiser mais également
si l'on doit ajouter de nouveaux services.

Les composants utilisées dans plusieurs pages ou autres composants se trouvent dans le dossier `Composants`.

Les autres dossier qui sont `Accueil`, `Mes Favoris`, `PokeListe` et `PokemonParType` sont des dossiers qui correspondent à 
chaque pages de l'application. Ces dossiers sont constitués d'un fichiers qui compose le squelette de la page. Et peut également
contenir d'autres fichiers qui sont des composants propres à cette page.

### Autres fichiers
Le reste des fichiers utilisées sont le dossier `src` et les images des types de pokémon sont dans le dossier `public/types`.

## Commit et branches
Je n'ai réalisé aucun commit régulier du fait que projet Git ne fonctionnait pas au début. J'ai donc fait un seul gros commit
une fois que tous les fonctionnalités ont été faites. L'ensemble du travail a été fait sur la branche `develop` et les quelques
que commit qui a pu avoir sur la branche `master` sont ceux pour essayer de faire fonctionner les `.yml`.
