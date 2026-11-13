/* Music \u2014 traduction de l'interface (FR / EN / AR) et mode jour / nuit.
   Le texte source de la page est en fran\u00e7ais : chaque entr\u00e9e ci-dessous est [fran\u00e7ais, anglais, arabe].
   Le DOM est traduit \u00e0 l'affichage et \u00e0 chaque modification (MutationObserver). */
(function () {
  'use strict';
  const norm = s => String(s).replace(/\s+/g, ' ').trim();

  const D = [
    /* ---------- en-t\u00eate, navigation, accueil ---------- */
    ["Libre de droits \u00b7 36 genres \u00b7 3 sources", "Royalty-free \u00b7 36 genres \u00b7 3 sources", "\u0628\u062f\u0648\u0646 \u062d\u0642\u0648\u0642 \u00b7 36 \u0646\u0648\u0639\u064b\u0627 \u00b7 3 \u0645\u0635\u0627\u062f\u0631"],
    ["\u00c9coutes", "Plays", "\u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0639\u0627\u062a"],
    ["Cha\u00eene", "Channel", "\u0642\u0646\u0627\u0629"],
    ["Cha\u00eenes", "Channels", "\u0627\u0644\u0642\u0646\u0648\u0627\u062a"],
    ["Accueil", "Home", "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629"],
    ["D\u00e9couvrir", "Discover", "\u0627\u0643\u062a\u0634\u0641"],
    ["Tendances", "Trending", "\u0627\u0644\u0631\u0627\u0626\u062c"],
    ["Biblioth\u00e8que", "Library", "\u0627\u0644\u0645\u0643\u062a\u0628\u0629"],
    ["Cha\u00eenes & R\u00e9glages", "Channels & Settings", "\u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0648\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a"],
    ["Stats", "Stats", "\u0627\u0644\u0625\u062d\u0635\u0627\u0621\u0627\u062a"],
    ["Votre studio musical", "Your music studio", "\u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062e\u0627\u0635 \u0628\u0643"],
    ["Toute la musique libre,", "All the free music,", "\u0643\u0644 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062d\u0631\u0629\u060c"],
    ["\u00e0 port\u00e9e d'un clic", "one click away", "\u0639\u0644\u0649 \u0628\u064f\u0639\u062f \u0646\u0642\u0631\u0629 \u0648\u0627\u062d\u062f\u0629"],
    ["Cherchez dans des centaines de milliers de morceaux Creative Commons, filtrez par genre, ambiance et licence, ajoutez-les \u00e0 vos cha\u00eenes et g\u00e9n\u00e9rez les cr\u00e9dits pr\u00eats pour YouTube.",
     "Search hundreds of thousands of Creative Commons tracks, filter by genre, mood and license, add them to your channels and generate YouTube-ready credits.",
     "\u0627\u0628\u062d\u062b \u0641\u064a \u0645\u0626\u0627\u062a \u0627\u0644\u0622\u0644\u0627\u0641 \u0645\u0646 \u0645\u0642\u0627\u0637\u0639 Creative Commons\u060c \u0648\u0635\u0641\u0650\u0651\u0647\u0627 \u062d\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 \u0648\u0627\u0644\u0623\u062c\u0648\u0627\u0621 \u0648\u0627\u0644\u062a\u0631\u062e\u064a\u0635\u060c \u0648\u0623\u0636\u0641\u0647\u0627 \u0625\u0644\u0649 \u0642\u0646\u0648\u0627\u062a\u0643 \u0648\u0623\u0646\u0634\u0626 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u062c\u0627\u0647\u0632\u0629 \u0644\u064a\u0648\u062a\u064a\u0648\u0628."],
    ["D\u00e9couvrir de la musique", "Discover music", "\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649"],
    ["Surprends-moi", "Surprise me", "\u0641\u0627\u062c\u0626\u0646\u064a"],
    ["Pistes :", "Tracks:", "\u0627\u0644\u0645\u0642\u0627\u0637\u0639 :"],
    ["Explorer ce genre en ligne", "Explore this genre online", "\u0627\u0633\u062a\u0643\u0634\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a"],
    ["Biblioth\u00e8que vide : choisissez une musique dans D\u00e9couvrir, elle sera ajout\u00e9e automatiquement \u00e0 la cha\u00eene.",
     "Library empty: pick a track in Discover, it will be added to the channel automatically.",
     "\u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0641\u0627\u0631\u063a\u0629: \u0627\u062e\u062a\u0631 \u0645\u0642\u0637\u0639\u064b\u0627 \u0645\u0646 \u00ab\u0627\u0643\u062a\u0634\u0641\u00bb \u0648\u0633\u064a\u064f\u0636\u0627\u0641 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627 \u0625\u0644\u0649 \u0627\u0644\u0642\u0646\u0627\u0629."],

    /* ---------- d\u00e9couvrir ---------- */
    ["Recherche multi-sources en direct", "Live multi-source search", "\u0628\u062d\u062b \u0645\u0628\u0627\u0634\u0631 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0645\u0635\u0627\u062f\u0631"],
    ["Les r\u00e9sultats viennent en direct des catalogues ouverts. V\u00e9rifiez toujours la licence avant publication.",
     "Results come live from open catalogs. Always check the license before publishing.",
     "\u062a\u0623\u062a\u064a \u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0645\u0628\u0627\u0634\u0631\u0629\u064b \u0645\u0646 \u0641\u0647\u0627\u0631\u0633 \u0645\u0641\u062a\u0648\u062d\u0629. \u062a\u062d\u0642\u0642 \u062f\u0627\u0626\u0645\u064b\u0627 \u0645\u0646 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0642\u0628\u0644 \u0627\u0644\u0646\u0634\u0631."],
    ["Ouvrir dans YouTube Music", "Open in YouTube Music", "\u0627\u0641\u062a\u062d \u0641\u064a YouTube Music"],
    ["Importer une URL", "Import a URL", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0631\u0627\u0628\u0637"],
    ["Rechercher", "Search", "\u0628\u062d\u062b"],
    ["Langue des chansons", "Song language", "\u0644\u063a\u0629 \u0627\u0644\u0623\u063a\u0627\u0646\u064a"],
    ["Genres", "Genres", "\u0627\u0644\u0623\u0646\u0648\u0627\u0639"],
    ["Ambiances", "Moods", "\u0627\u0644\u0623\u062c\u0648\u0627\u0621"],
    ["Licence", "License", "\u0627\u0644\u062a\u0631\u062e\u064a\u0635"],
    ["Toutes (CC)", "All (CC)", "\u0627\u0644\u0643\u0644 (CC)"],
    ["CC0 / Domaine public", "CC0 / Public domain", "CC0 / \u0645\u0644\u0643 \u0639\u0627\u0645"],
    ["Dur\u00e9e min.", "Min. length", "\u0623\u0642\u0644 \u0645\u062f\u0629"],
    ["Toutes", "All", "\u0627\u0644\u0643\u0644"],
    ["> 1 min", "> 1 min", "> 1 \u062f"],
    ["> 3 min", "> 3 min", "> 3 \u062f"],
    ["> 10 min", "> 10 min", "> 10 \u062f"],
    ["> 30 min", "> 30 min", "> 30 \u062f"],
    ["Tri", "Sort", "\u0627\u0644\u062a\u0631\u062a\u064a\u0628"],
    ["Pertinence (mixte)", "Relevance (mixed)", "\u0627\u0644\u0635\u0644\u0629 (\u0645\u062e\u062a\u0644\u0637)"],
    ["Plus longs", "Longest", "\u0627\u0644\u0623\u0637\u0648\u0644"],
    ["Plus courts", "Shortest", "\u0627\u0644\u0623\u0642\u0635\u0631"],
    ["Titre A\u2192Z", "Title A\u2192Z", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u2190\u064a"],
    ["Usage commercial uniquement", "Commercial use only", "\u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0641\u0642\u0637"],
    ["(d\u00e9cochez pour inclure l'\u00e9coute seule sur YouTube)", "(uncheck to include listen-only tracks from YouTube)", "(\u0623\u0644\u063a\u0650 \u0627\u0644\u062a\u062d\u062f\u064a\u062f \u0644\u062a\u0636\u0645\u064a\u0646 \u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0641\u0642\u0637 \u0645\u0646 \u064a\u0648\u062a\u064a\u0648\u0628)"],
    ["R\u00e9glages des sources (cl\u00e9 Jamendo optionnelle)", "Source settings (optional Jamendo key)", "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0645\u0635\u0627\u062f\u0631 (\u0645\u0641\u062a\u0627\u062d Jamendo \u0627\u062e\u062a\u064a\u0627\u0631\u064a)"],
    ["Jamendo client_id (gratuit sur developer.jamendo.com)", "Jamendo client_id (free at developer.jamendo.com)", "\u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 Jamendo (\u0645\u062c\u0627\u0646\u064a \u0639\u0644\u0649 developer.jamendo.com)"],
    ["Openverse et Internet Archive marchent sans cl\u00e9. Jamendo ajoute des milliers de morceaux d'artistes ind\u00e9pendants, mais exige une cl\u00e9, et son usage commercial (cha\u00eene mon\u00e9tis\u00e9e) demande une licence Jamendo : source d\u00e9sactiv\u00e9e par d\u00e9faut. Le quota anonyme d'Openverse est limit\u00e9 : en cas d'erreur 429, patientez une minute.",
     "Openverse and Internet Archive work without a key. Jamendo adds thousands of tracks by independent artists but requires a key, and commercial use (monetized channel) requires a Jamendo license: source disabled by default. Openverse's anonymous quota is limited: on a 429 error, wait a minute.",
     "\u064a\u0639\u0645\u0644 Openverse \u0648Internet Archive \u0628\u062f\u0648\u0646 \u0645\u0641\u062a\u0627\u062d. \u064a\u0636\u064a\u0641 Jamendo \u0622\u0644\u0627\u0641 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0644\u0641\u0646\u0627\u0646\u064a\u0646 \u0645\u0633\u062a\u0642\u0644\u064a\u0646 \u0644\u0643\u0646\u0647 \u064a\u062a\u0637\u0644\u0628 \u0645\u0641\u062a\u0627\u062d\u064b\u0627\u060c \u0643\u0645\u0627 \u0623\u0646 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647 \u0627\u0644\u062a\u062c\u0627\u0631\u064a (\u0642\u0646\u0627\u0629 \u0645\u0631\u0628\u062d\u0629) \u064a\u062a\u0637\u0644\u0628 \u062a\u0631\u062e\u064a\u0635 Jamendo: \u0627\u0644\u0645\u0635\u062f\u0631 \u0645\u0639\u0637\u0651\u0644 \u0627\u0641\u062a\u0631\u0627\u0636\u064a\u064b\u0627. \u062d\u0635\u0629 Openverse \u0627\u0644\u0645\u062c\u0647\u0648\u0644\u0629 \u0645\u062d\u062f\u0648\u062f\u0629: \u0639\u0646\u062f \u0638\u0647\u0648\u0631 \u0627\u0644\u062e\u0637\u0623 429 \u0627\u0646\u062a\u0638\u0631 \u062f\u0642\u064a\u0642\u0629."],
    ["Lancez une recherche ou choisissez un genre.", "Start a search or pick a genre.", "\u0627\u0628\u062f\u0623 \u0627\u0644\u0628\u062d\u062b \u0623\u0648 \u0627\u062e\u062a\u0631 \u0646\u0648\u0639\u064b\u0627."],
    ["Charger plus de r\u00e9sultats", "Load more results", "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0646\u062a\u0627\u0626\u062c"],
    ["Recherche en cours\u2026", "Searching\u2026", "\u062c\u0627\u0631\u064d \u0627\u0644\u0628\u062d\u062b\u2026"],
    ["Aucune source active.", "No active source.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0635\u062f\u0631 \u0646\u0634\u0637."],
    ["Aucun r\u00e9sultat avec ces filtres.", "No results with these filters.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0628\u0647\u0630\u0647 \u0627\u0644\u0645\u0631\u0634\u062d\u0627\u062a."],
    ["Aucun r\u00e9sultat pour cette recherche : essayez d'autres mots ou d'autres sources.",
     "No results for this search: try other words or other sources.",
     "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0644\u0647\u0630\u0627 \u0627\u0644\u0628\u062d\u062b: \u062c\u0631\u0651\u0628 \u0643\u0644\u0645\u0627\u062a \u0623\u062e\u0631\u0649 \u0623\u0648 \u0645\u0635\u0627\u062f\u0631 \u0623\u062e\u0631\u0649."],

    /* ---------- tendances ---------- */
    ["\u00c9coute et visionnage uniquement", "Listen and watch only", "\u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0648\u0627\u0644\u0645\u0634\u0627\u0647\u062f\u0629 \u0641\u0642\u0637"],
    ["Musiques tendance", "Trending music", "\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u0631\u0627\u0626\u062c\u0629"],
    ["Les titres les plus \u00e9cout\u00e9s du moment sur YouTube, par langue. Ils sont lus dans le lecteur officiel YouTube : ils ne sont jamais ajout\u00e9s \u00e0 vos cha\u00eenes ni \u00e0 votre biblioth\u00e8que, et ne peuvent pas \u00eatre r\u00e9utilis\u00e9s dans vos vid\u00e9os.",
     "The most-played tracks right now on YouTube, by language. They play in the official YouTube player: they are never added to your channels or library, and cannot be reused in your videos.",
     "\u0623\u0643\u062b\u0631 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0633\u062a\u0645\u0627\u0639\u064b\u0627 \u062d\u0627\u0644\u064a\u064b\u0627 \u0639\u0644\u0649 \u064a\u0648\u062a\u064a\u0648\u0628\u060c \u062d\u0633\u0628 \u0627\u0644\u0644\u063a\u0629. \u062a\u064f\u0634\u063a\u064e\u0651\u0644 \u0641\u064a \u0645\u0634\u063a\u0651\u0644 \u064a\u0648\u062a\u064a\u0648\u0628 \u0627\u0644\u0631\u0633\u0645\u064a: \u0644\u0627 \u062a\u064f\u0636\u0627\u0641 \u0623\u0628\u062f\u064b\u0627 \u0625\u0644\u0649 \u0642\u0646\u0648\u0627\u062a\u0643 \u0623\u0648 \u0645\u0643\u062a\u0628\u062a\u0643\u060c \u0648\u0644\u0627 \u064a\u0645\u0643\u0646 \u0625\u0639\u0627\u062f\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0641\u064a \u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a\u0643."],
    ["Charger plus", "Load more", "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f"],
    ["Connexion Google requise pour afficher les tendances.", "Google sign-in required to show trends.", "\u064a\u0644\u0632\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google \u0644\u0639\u0631\u0636 \u0627\u0644\u0631\u0627\u0626\u062c."],
    ["Chargement des tendances\u2026", "Loading trends\u2026", "\u062c\u0627\u0631\u064d \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0631\u0627\u0626\u062c\u2026"],
    ["Aucune tendance disponible pour cette langue.", "No trends available for this language.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0642\u0627\u0637\u0639 \u0631\u0627\u0626\u062c\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0644\u063a\u0629."],

    /* ---------- biblioth\u00e8que ---------- */
    ["Ma Biblioth\u00e8que", "My Library", "\u0645\u0643\u062a\u0628\u062a\u064a"],
    ["Favoris, pistes plac\u00e9es dans vos cha\u00eenes, cr\u00e9dits et sauvegarde.", "Favorites, tracks placed in your channels, credits and backup.", "\u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0642\u0646\u0648\u0627\u062a\u0643 \u0648\u0627\u0644\u0646\u0633\u0628 \u0648\u0627\u0644\u0646\u0633\u062e \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a."],
    ["Cr\u00e9dits YouTube", "YouTube credits", "\u0646\u0633\u0628 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Sauvegarde JSON", "JSON backup", "\u0646\u0633\u062e\u0629 JSON"],
    ["Restaurer", "Restore", "\u0627\u0633\u062a\u0639\u0627\u062f\u0629"],
    ["Pas encore de favoris : cliquez sur le c\u0153ur d'une piste.", "No favorites yet: click the heart on a track.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0641\u0636\u0644\u0629 \u0628\u0639\u062f: \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0642\u0644\u0628 \u0641\u064a \u0623\u064a \u0645\u0642\u0637\u0639."],
    ["Biblioth\u00e8que vide : ajoutez des pistes depuis D\u00e9couvrir.", "Library empty: add tracks from Discover.", "\u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0641\u0627\u0631\u063a\u0629: \u0623\u0636\u0641 \u0645\u0642\u0627\u0637\u0639 \u0645\u0646 \u00ab\u0627\u0643\u062a\u0634\u0641\u00bb."],

    /* ---------- cha\u00eenes & r\u00e9glages ---------- */
    ["Mes Cha\u00eenes YouTube", "My YouTube Channels", "\u0642\u0646\u0648\u0627\u062a\u064a \u0639\u0644\u0649 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Le param\u00e8tre", "The parameter", "\u064a\u064f\u0636\u0627\u0641 \u0627\u0644\u0645\u0639\u0627\u0645\u0644"],
    ["est ajout\u00e9 automatiquement aux liens.", "is automatically added to links.", "\u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627 \u0625\u0644\u0649 \u0627\u0644\u0631\u0648\u0627\u0628\u0637."],
    ["Ajouter une cha\u00eene", "Add a channel", "\u0625\u0636\u0627\u0641\u0629 \u0642\u0646\u0627\u0629"],
    ["Vid\u00e9os lanc\u00e9es", "Videos launched", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u0627\u0644\u0645\u0634\u063a\u0651\u0644\u0629"],
    ["Audience estim\u00e9e", "Estimated audience", "\u0627\u0644\u062c\u0645\u0647\u0648\u0631 \u0627\u0644\u062a\u0642\u062f\u064a\u0631\u064a"],
    ["R\u00e9glages du r\u00e9seau (administrateur)", "Network settings (administrator)", "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0634\u0628\u0643\u0629 (\u0627\u0644\u0645\u0633\u0624\u0648\u0644)"],
    ["Ces r\u00e9glages sont enregistr\u00e9s dans ce navigateur. Pour qu'ils s'appliquent \u00e0 vos visiteurs, cliquez sur \u00ab Exporter la configuration \u00bb et d\u00e9posez",
     "These settings are saved in this browser. To apply them to your visitors, click \u201cExport configuration\u201d and place",
     "\u062a\u064f\u062d\u0641\u0638 \u0647\u0630\u0647 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d. \u0644\u062a\u0637\u0628\u064a\u0642\u0647\u0627 \u0639\u0644\u0649 \u0632\u0648\u0651\u0627\u0631\u0643\u060c \u0627\u0646\u0642\u0631 \u00ab\u062a\u0635\u062f\u064a\u0631 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a\u00bb \u0648\u0636\u0639 \u0627\u0644\u0645\u0644\u0641"],
    ["\u00e0 c\u00f4t\u00e9 de la page.", "next to the page.", "\u0628\u062c\u0648\u0627\u0631 \u0627\u0644\u0635\u0641\u062d\u0629."],
    ["Client ID Google OAuth", "Google OAuth Client ID", "\u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 Google OAuth"],
    ["E-mails administrateurs (s\u00e9par\u00e9s par des virgules)", "Administrator emails (comma-separated)", "\u0639\u0646\u0627\u0648\u064a\u0646 \u0628\u0631\u064a\u062f \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0646 (\u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0648\u0627\u0635\u0644)"],
    ["Cha\u00eene cible : celle o\u00f9 s'int\u00e8grent les musiques choisies", "Target channel: where chosen tracks are added", "\u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641\u0629: \u0627\u0644\u062a\u064a \u062a\u064f\u0636\u0627\u0641 \u0625\u0644\u064a\u0647\u0627 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629"],
    ["Vid\u00e9o de la cha\u00eene propos\u00e9e \u00e0 chaque choix (URL ou ID)", "Channel video suggested at each choice (URL or ID)", "\u0641\u064a\u062f\u064a\u0648 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0645\u0642\u062a\u0631\u062d \u0639\u0646\u062f \u0643\u0644 \u0627\u062e\u062a\u064a\u0627\u0631 (\u0631\u0627\u0628\u0637 \u0623\u0648 \u0645\u0639\u0631\u0651\u0641)"],
    ["Cl\u00e9 API YouTube (facultatif, restreinte \u00e0 votre domaine)", "YouTube API key (optional, restricted to your domain)", "\u0645\u0641\u062a\u0627\u062d YouTube API (\u0627\u062e\u062a\u064a\u0627\u0631\u064a\u060c \u0645\u0642\u064a\u0651\u062f \u0628\u0646\u0637\u0627\u0642\u0643)"],
    ["AdSense : ID \u00e9diteur (ca-pub-\u2026)", "AdSense: publisher ID (ca-pub-\u2026)", "AdSense: \u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0646\u0627\u0634\u0631 (ca-pub-\u2026)"],
    ["AdSense : ID du bloc d'annonce (slot)", "AdSense: ad unit ID (slot)", "AdSense: \u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0648\u062d\u062f\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u064a\u0629 (slot)"],
    ["Connexion Google obligatoire", "Google sign-in required", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0640 Google \u0625\u0644\u0632\u0627\u0645\u064a"],
    ["(d\u00e9conseill\u00e9 : AdSense ne verrait que la porte d'acc\u00e8s)", "(not recommended: AdSense would only see the sign-in wall)", "(\u063a\u064a\u0631 \u0645\u0633\u062a\u062d\u0633\u0646: \u0633\u064a\u0631\u0649 AdSense \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062f\u062e\u0648\u0644 \u0641\u0642\u0637)"],
    ["Abonnement au r\u00e9seau obligatoire", "Network subscription required", "\u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629 \u0625\u0644\u0632\u0627\u0645\u064a"],
    ["(d\u00e9conseill\u00e9 : interdit par les r\u00e8gles de l'API YouTube)", "(not recommended: forbidden by YouTube API rules)", "(\u063a\u064a\u0631 \u0645\u0633\u062a\u062d\u0633\u0646: \u0645\u0645\u0646\u0648\u0639 \u0628\u0645\u0648\u062c\u0628 \u0642\u0648\u0627\u0639\u062f YouTube API)"],
    ["Enregistrer", "Save", "\u062d\u0641\u0638"],
    ["Exporter la configuration", "Export configuration", "\u062a\u0635\u062f\u064a\u0631 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a"],
    ["Comment obtenir le Client ID Google ?", "How to get the Google Client ID?", "\u0643\u064a\u0641 \u0623\u062d\u0635\u0644 \u0639\u0644\u0649 \u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 Google\u061f"],
    ["Console Google Cloud \u2192 cr\u00e9er un projet \u2192 \u00ab API et services \u00bb \u2192 activer", "Google Cloud Console \u2192 create a project \u2192 \u201cAPIs & Services\u201d \u2192 enable", "\u0648\u062d\u062f\u0629 \u062a\u062d\u0643\u0645 Google Cloud \u2190 \u0623\u0646\u0634\u0626 \u0645\u0634\u0631\u0648\u0639\u064b\u0627 \u2190 \u00ab\u0648\u0627\u062c\u0647\u0627\u062a API \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a\u00bb \u2190 \u0641\u0639\u0650\u0651\u0644"],
    ["\u00c9cran de consentement OAuth \u2192 ajouter le champ d'application", "OAuth consent screen \u2192 add the scope", "\u0634\u0627\u0634\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 OAuth \u2190 \u0623\u0636\u0641 \u0627\u0644\u0646\u0637\u0627\u0642"],
    ["(sensible).", "(sensitive).", "(\u062d\u0633\u0651\u0627\u0633)."],
    ["Identifiants \u2192 cr\u00e9er un \u00ab ID client OAuth \u00bb de type", "Credentials \u2192 create an \u201cOAuth client ID\u201d of type", "\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0627\u0639\u062a\u0645\u0627\u062f \u2190 \u0623\u0646\u0634\u0626 \u00ab\u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 OAuth\u00bb \u0645\u0646 \u0627\u0644\u0646\u0648\u0639"],
    ["Application Web", "Web application", "\u062a\u0637\u0628\u064a\u0642 \u0648\u064a\u0628"],
    [", avec pour origine JavaScript autoris\u00e9e l'adresse exacte de votre site (https://\u2026 ou http://localhost). Le fichier ouvert directement (file://) ne fonctionne pas.",
     ", with the exact address of your site (https://\u2026 or http://localhost) as the authorized JavaScript origin. A file opened directly (file://) does not work.",
     "\u060c \u0645\u0639 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062f\u0642\u064a\u0642 \u0644\u0645\u0648\u0642\u0639\u0643 (https://\u2026 \u0623\u0648 http://localhost) \u0643\u0623\u0635\u0644 JavaScript \u0645\u0635\u0631\u0651\u062d \u0628\u0647. \u0644\u0627 \u064a\u0639\u0645\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u0641\u062a\u0648\u062d \u0645\u0628\u0627\u0634\u0631\u0629 (file://)."],
    ["Collez l'ID ci-dessus, ajoutez votre e-mail administrateur, enregistrez, puis exportez la configuration.",
     "Paste the ID above, add your administrator email, save, then export the configuration.",
     "\u0627\u0644\u0635\u0642 \u0627\u0644\u0645\u0639\u0631\u0651\u0641 \u0623\u0639\u0644\u0627\u0647\u060c \u0648\u0623\u0636\u0641 \u0628\u0631\u064a\u062f \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u060c \u0648\u0627\u062d\u0641\u0638\u060c \u062b\u0645 \u0635\u062f\u0650\u0651\u0631 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a."],
    ["Verrouill\u00e9 dehors ? Ajoutez", "Locked out? Add", "\u0647\u0644 \u0623\u064f\u063a\u0644\u0642 \u0627\u0644\u0628\u0627\u0628 \u0641\u064a \u0648\u062c\u0647\u0643\u061f \u0623\u0636\u0641"],
    ["\u00e0 l'adresse pour effacer les r\u00e9glages de ce navigateur, ou", "to the address to clear this browser's settings, or", "\u0625\u0644\u0649 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0644\u0645\u0633\u062d \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d\u060c \u0623\u0648"],
    ["tant qu'aucune configuration compl\u00e8te n'existe.", "as long as no complete configuration exists.", "\u0645\u0627 \u062f\u0627\u0645\u062a \u0644\u0627 \u062a\u0648\u062c\u062f \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0643\u0627\u0645\u0644\u0629."],
    ["Base YouTube", "YouTube base", "\u0642\u0627\u0639\u062f\u0629 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Pistes", "Tracks", "\u0627\u0644\u0645\u0642\u0627\u0637\u0639"],
    ["Inclure dans la v\u00e9rification d'abonnement (si activ\u00e9e)", "Include in subscription check (if enabled)", "\u062a\u0636\u0645\u064a\u0646 \u0641\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 (\u0625\u0646 \u0643\u0627\u0646 \u0645\u0641\u0639\u0651\u0644\u064b\u0627)"],
    ["Identifiant de cha\u00eene invalide (24 caract\u00e8res attendus) : l'abonnement ne pourra pas \u00eatre v\u00e9rifi\u00e9. Utilisez l'URL @handle ou le bon identifiant.",
     "Invalid channel ID (24 characters expected): the subscription cannot be verified. Use the @handle URL or the correct ID.",
     "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0642\u0646\u0627\u0629 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d (\u064a\u0644\u0632\u0645 24 \u062d\u0631\u0641\u064b\u0627): \u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643. \u0627\u0633\u062a\u062e\u062f\u0645 \u0631\u0627\u0628\u0637 @handle \u0623\u0648 \u0627\u0644\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0635\u062d\u064a\u062d."],
    ["Automatique (selon le genre)", "Automatic (by genre)", "\u062a\u0644\u0642\u0627\u0626\u064a (\u062d\u0633\u0628 \u0627\u0644\u0646\u0648\u0639)"],
    ["R\u00e9glages enregistr\u00e9s dans ce navigateur. Exportez la configuration pour vos visiteurs.", "Settings saved in this browser. Export the configuration for your visitors.", "\u062d\u064f\u0641\u0638\u062a \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d. \u0635\u062f\u0650\u0651\u0631 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0644\u0632\u0648\u0651\u0627\u0631\u0643."],
    ["Modifier la cha\u00eene", "Edit channel", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0642\u0646\u0627\u0629"],
    ["Supprimer la cha\u00eene", "Delete channel", "\u062d\u0630\u0641 \u0627\u0644\u0642\u0646\u0627\u0629"],
    ["Cha\u00eene supprim\u00e9e.", "Channel deleted.", "\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0642\u0646\u0627\u0629."],
    ["Ajouter une cha\u00eene YouTube", "Add a YouTube channel", "\u0625\u0636\u0627\u0641\u0629 \u0642\u0646\u0627\u0629 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Ouvrir la cha\u00eene", "Open channel", "\u0627\u0641\u062a\u062d \u0627\u0644\u0642\u0646\u0627\u0629"],
    ["Ajout\u00e9e \u00e0 la cha\u00eene", "Added to channel", "\u0623\u064f\u0636\u064a\u0641 \u0625\u0644\u0649 \u0627\u0644\u0642\u0646\u0627\u0629"],
    /* cha\u00eenes de d\u00e9monstration */
    ["Jazz & Late Night Piano", "Jazz & Late Night Piano", "\u062c\u0627\u0632 \u0648\u0628\u064a\u0627\u0646\u0648 \u0627\u0644\u0644\u064a\u0644"],
    ["Sessions feutr\u00e9es de smooth jazz, saxophones en sourdine et piano vintage.", "Hushed smooth-jazz sessions, muted saxophones and vintage piano.", "\u062c\u0644\u0633\u0627\u062a \u0633\u0645\u0648\u062b \u062c\u0627\u0632 \u0647\u0627\u062f\u0626\u0629 \u0648\u0633\u0627\u0643\u0633\u0641\u0648\u0646\u0627\u062a \u062e\u0627\u0641\u062a\u0629 \u0648\u0628\u064a\u0627\u0646\u0648 \u0643\u0644\u0627\u0633\u064a\u0643\u064a."],
    ["Soul & Motown Revival", "Soul & Motown Revival", "\u0625\u062d\u064a\u0627\u0621 \u0627\u0644\u0633\u0648\u0644 \u0648\u0645\u0648\u062a\u0627\u0648\u0646"],
    ["Le meilleur de la soul vintage, groove chaleureux et neo-soul libre de droits.", "The best of vintage soul, warm groove and royalty-free neo-soul.", "\u0623\u0641\u0636\u0644 \u0627\u0644\u0633\u0648\u0644 \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a \u0648\u0625\u064a\u0642\u0627\u0639 \u062f\u0627\u0641\u0626 \u0648\u0646\u064a\u0648 \u0633\u0648\u0644 \u0628\u062f\u0648\u0646 \u062d\u0642\u0648\u0642."],
    ["Lo-Fi Study & Chillhop", "Lo-Fi Study & Chillhop", "\u0644\u0648-\u0641\u0627\u064a \u0644\u0644\u062f\u0631\u0627\u0633\u0629 \u0648\u062a\u0634\u064a\u0644 \u0647\u0648\u0628"],
    ["Rythmes Lo-Fi chill pour travailler ou \u00e9tudier sous la pluie.", "Chill Lo-Fi beats for working or studying in the rain.", "\u0625\u064a\u0642\u0627\u0639\u0627\u062a \u0644\u0648-\u0641\u0627\u064a \u0647\u0627\u062f\u0626\u0629 \u0644\u0644\u0639\u0645\u0644 \u0623\u0648 \u0627\u0644\u062f\u0631\u0627\u0633\u0629 \u062a\u062d\u062a \u0627\u0644\u0645\u0637\u0631."],
    ["ASMR Industriel & CNC", "Industrial ASMR & CNC", "ASMR \u0635\u0646\u0627\u0639\u064a \u0648CNC"],
    ["Pr\u00e9cision m\u00e9canique, usinage CNC grande vitesse et sons m\u00e9talliques purs.", "Mechanical precision, high-speed CNC machining and pure metallic sounds.", "\u062f\u0642\u0629 \u0645\u064a\u0643\u0627\u0646\u064a\u0643\u064a\u0629 \u0648\u062a\u0634\u063a\u064a\u0644 CNC \u0639\u0627\u0644\u064a \u0627\u0644\u0633\u0631\u0639\u0629 \u0648\u0623\u0635\u0648\u0627\u062a \u0645\u0639\u062f\u0646\u064a\u0629 \u0646\u0642\u064a\u0629."],
    ["Relaxation & Nature", "Relaxation & Nature", "\u0627\u0633\u062a\u0631\u062e\u0627\u0621 \u0648\u0637\u0628\u064a\u0639\u0629"],
    ["Voyages visuels apaisants, horizons cr\u00e9pusculaires et relaxation profonde.", "Soothing visual journeys, twilight horizons and deep relaxation.", "\u0631\u062d\u0644\u0627\u062a \u0628\u0635\u0631\u064a\u0629 \u0645\u0647\u062f\u0651\u0626\u0629 \u0648\u0622\u0641\u0627\u0642 \u0627\u0644\u063a\u0631\u0648\u0628 \u0648\u0627\u0633\u062a\u0631\u062e\u0627\u0621 \u0639\u0645\u064a\u0642."],

    /* ---------- stats ---------- */
    ["Vid\u00e9os cha\u00eene lanc\u00e9es", "Channel videos launched", "\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0645\u0634\u063a\u0651\u0644\u0629"],
    ["Pistes en biblioth\u00e8que", "Tracks in library", "\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0641\u064a \u0627\u0644\u0645\u0643\u062a\u0628\u0629"],
    ["\u00c9coutes lanc\u00e9es", "Plays started", "\u0645\u0631\u0627\u062a \u0627\u0644\u062a\u0634\u063a\u064a\u0644"],
    ["Contacts e-mail", "Email contacts", "\u062c\u0647\u0627\u062a \u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u0628\u0631\u064a\u062f"],
    ["Pistes par cha\u00eene", "Tracks per channel", "\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0644\u0643\u0644 \u0642\u0646\u0627\u0629"],
    ["Alertes nouvelles sorties", "New release alerts", "\u062a\u0646\u0628\u064a\u0647\u0627\u062a \u0627\u0644\u0625\u0635\u062f\u0627\u0631\u0627\u062a \u0627\u0644\u062c\u062f\u064a\u062f\u0629"],
    ["Collectez les e-mails des auditeurs (stock\u00e9s localement dans votre navigateur).", "Collect listeners' emails (stored locally in your browser).", "\u0627\u062c\u0645\u0639 \u0639\u0646\u0627\u0648\u064a\u0646 \u0628\u0631\u064a\u062f \u0627\u0644\u0645\u0633\u062a\u0645\u0639\u064a\u0646 (\u062a\u064f\u062d\u0641\u0638 \u0645\u062d\u0644\u064a\u064b\u0627 \u0641\u064a \u0645\u062a\u0635\u0641\u062d\u0643)."],
    ["S'inscrire aux alertes", "Subscribe to alerts", "\u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u0627\u0644\u062a\u0646\u0628\u064a\u0647\u0627\u062a"],
    ["T\u00e9l\u00e9charger les e-mails (.CSV)", "Download emails (.CSV)", "\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0628\u0631\u064a\u062f (.CSV)"],
    ["E-mail enregistr\u00e9.", "Email saved.", "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0628\u0631\u064a\u062f."],
    ["Aucun e-mail enregistr\u00e9.", "No email saved.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0628\u0631\u064a\u062f \u0645\u062d\u0641\u0648\u0638."],

    /* ---------- \u00e0 propos, pied de page ---------- */
    ["\u00c0 propos de Music", "About Music", "\u0639\u0646 Music"],
    ["Music est un moteur de recherche de musiques libres de droits. Il interroge en direct Openverse, Jamendo et Internet Archive, trois catalogues ouverts, et propose aussi la recherche sur YouTube pour l'\u00e9coute. Vous filtrez par genre (jazz, lo-fi, \u00e9lectro, classique, ambient, ASMR, cin\u00e9matique\u2026), par ambiance, par licence et par dur\u00e9e, puis vous \u00e9coutez, gardez vos favoris et copiez les cr\u00e9dits pr\u00eats \u00e0 coller dans la description d'une vid\u00e9o.",
     "Music is a search engine for royalty-free music. It queries Openverse, Jamendo and Internet Archive live \u2014 three open catalogs \u2014 and also offers YouTube search for listening. You filter by genre (jazz, lo-fi, electro, classical, ambient, ASMR, cinematic\u2026), mood, license and length, then listen, keep your favorites and copy ready-made credits to paste into a video description.",
     "Music \u0645\u062d\u0631\u0643 \u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062d\u0631\u0629 \u0645\u0646 \u0627\u0644\u062d\u0642\u0648\u0642. \u064a\u0633\u062a\u0639\u0644\u0645 \u0645\u0628\u0627\u0634\u0631\u0629\u064b \u0645\u0646 Openverse \u0648Jamendo \u0648Internet Archive\u060c \u0648\u0647\u064a \u062b\u0644\u0627\u062b\u0629 \u0641\u0647\u0627\u0631\u0633 \u0645\u0641\u062a\u0648\u062d\u0629\u060c \u0648\u064a\u062a\u064a\u062d \u0623\u064a\u0636\u064b\u0627 \u0627\u0644\u0628\u062d\u062b \u0641\u064a \u064a\u0648\u062a\u064a\u0648\u0628 \u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639. \u062a\u0635\u0641\u0651\u064a \u062d\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 (\u062c\u0627\u0632\u060c \u0644\u0648-\u0641\u0627\u064a\u060c \u0625\u0644\u0643\u062a\u0631\u0648\u060c \u0643\u0644\u0627\u0633\u064a\u0643\u064a\u060c \u0623\u0645\u0628\u064a\u0646\u062a\u060c ASMR\u060c \u0633\u064a\u0646\u0645\u0627\u0626\u064a\u2026) \u0648\u0627\u0644\u0623\u062c\u0648\u0627\u0621 \u0648\u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0648\u0627\u0644\u0645\u062f\u0629\u060c \u062b\u0645 \u062a\u0633\u062a\u0645\u0639 \u0648\u062a\u062d\u062a\u0641\u0638 \u0628\u0645\u0641\u0636\u0644\u0627\u062a\u0643 \u0648\u062a\u0646\u0633\u062e \u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0635\u0642\u0647\u0627 \u0641\u064a \u0648\u0635\u0641 \u0627\u0644\u0641\u064a\u062f\u064a\u0648."],
    ["Comprendre les licences Creative Commons", "Understanding Creative Commons licenses", "\u0641\u0647\u0645 \u062a\u0631\u0627\u062e\u064a\u0635 Creative Commons"],
    ["CC0 / domaine public", "CC0 / public domain", "CC0 / \u0645\u0644\u0643 \u0639\u0627\u0645"],
    [": aucune obligation, usage commercial permis.", ": no obligation, commercial use allowed.", ": \u0628\u0644\u0627 \u0623\u064a \u0627\u0644\u062a\u0632\u0627\u0645\u060c \u0648\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0645\u0633\u0645\u0648\u062d."],
    [": usage commercial permis \u00e0 condition de citer l'auteur, le titre, la licence et la source.", ": commercial use allowed if you credit the author, title, license and source.", ": \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0645\u0633\u0645\u0648\u062d \u0628\u0634\u0631\u0637 \u0630\u0643\u0631 \u0627\u0644\u0645\u0624\u0644\u0641 \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0648\u0627\u0644\u0645\u0635\u062f\u0631."],
    [": comme CC BY, mais votre cr\u00e9ation doit \u00eatre partag\u00e9e sous la m\u00eame licence.", ": like CC BY, but your creation must be shared under the same license.", ": \u0645\u062b\u0644 CC BY\u060c \u0644\u0643\u0646 \u0639\u0645\u0644\u0643 \u064a\u062c\u0628 \u0623\u0646 \u064a\u064f\u0634\u0627\u0631\u0643 \u0628\u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0646\u0641\u0633\u0647."],
    ["(non commercial) : interdit dans une vid\u00e9o mon\u00e9tis\u00e9e.", "(non-commercial): not allowed in a monetized video.", "(\u063a\u064a\u0631 \u062a\u062c\u0627\u0631\u064a): \u0645\u0645\u0646\u0648\u0639 \u0641\u064a \u0641\u064a\u062f\u064a\u0648 \u0645\u0631\u0628\u062d."],
    ["(pas de modification) : le morceau ne peut \u00eatre ni remix\u00e9 ni coup\u00e9.", "(no derivatives): the track cannot be remixed or cut.", "(\u0628\u0644\u0627 \u062a\u0639\u062f\u064a\u0644): \u0644\u0627 \u064a\u062c\u0648\u0632 \u0625\u0639\u0627\u062f\u0629 \u0645\u0632\u062c \u0627\u0644\u0645\u0642\u0637\u0639 \u0623\u0648 \u0627\u0642\u062a\u0637\u0627\u0639\u0647."],
    ["Conseils pour les cr\u00e9ateurs YouTube", "Tips for YouTube creators", "\u0646\u0635\u0627\u0626\u062d \u0644\u0635\u0646\u0651\u0627\u0639 \u0645\u062d\u062a\u0648\u0649 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Activez \u00ab Usage commercial uniquement \u00bb si votre cha\u00eene est mon\u00e9tis\u00e9e, copiez les cr\u00e9dits d\u00e8s que vous utilisez un morceau et gardez la page source. Une licence peut changer : v\u00e9rifiez-la chez l'auteur avant de publier. Les titres YouTube marqu\u00e9s \u00ab \u00c9coute seule \u00bb ne sont pas r\u00e9utilisables dans vos vid\u00e9os.",
     "Enable \u201cCommercial use only\u201d if your channel is monetized, copy the credits as soon as you use a track and keep the source page. A license can change: check it with the author before publishing. YouTube tracks marked \u201cListen only\u201d cannot be reused in your videos.",
     "\u0641\u0639\u0650\u0651\u0644 \u00ab\u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0641\u0642\u0637\u00bb \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0642\u0646\u0627\u062a\u0643 \u0645\u0631\u0628\u062d\u0629\u060c \u0648\u0627\u0646\u0633\u062e \u0627\u0644\u0646\u0633\u0628 \u0641\u0648\u0631 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 \u0623\u064a \u0645\u0642\u0637\u0639\u060c \u0648\u0627\u062d\u062a\u0641\u0638 \u0628\u0635\u0641\u062d\u0629 \u0627\u0644\u0645\u0635\u062f\u0631. \u0642\u062f \u064a\u062a\u063a\u064a\u0631 \u0627\u0644\u062a\u0631\u062e\u064a\u0635: \u062a\u062d\u0642\u0642 \u0645\u0646\u0647 \u0644\u062f\u0649 \u0627\u0644\u0645\u0624\u0644\u0641 \u0642\u0628\u0644 \u0627\u0644\u0646\u0634\u0631. \u0645\u0642\u0627\u0637\u0639 \u064a\u0648\u062a\u064a\u0648\u0628 \u0627\u0644\u0645\u0648\u0633\u0648\u0645\u0629 \u00ab\u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0641\u0642\u0637\u00bb \u0644\u0627 \u064a\u0645\u0643\u0646 \u0625\u0639\u0627\u062f\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0641\u064a \u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a\u0643."],
    ["Questions fr\u00e9quentes", "Frequently asked questions", "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629"],
    ["Pourquoi une connexion Google ?", "Why a Google sign-in?", "\u0644\u0645\u0627\u0630\u0627 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google\u061f"],
    ["Elle est facultative : elle sert uniquement \u00e0 la recherche YouTube et aux tendances. Rien n'est envoy\u00e9 \u00e0 un serveur : tout reste dans votre navigateur.",
     "It is optional: it is only used for YouTube search and trends. Nothing is sent to a server: everything stays in your browser.",
     "\u0625\u0646\u0647 \u0627\u062e\u062a\u064a\u0627\u0631\u064a: \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0641\u0642\u0637 \u0644\u0644\u0628\u062d\u062b \u0641\u064a \u064a\u0648\u062a\u064a\u0648\u0628 \u0648\u0627\u0644\u0631\u0627\u0626\u062c. \u0644\u0627 \u064a\u064f\u0631\u0633\u0644 \u0634\u064a\u0621 \u0625\u0644\u0649 \u062e\u0627\u062f\u0645: \u0643\u0644 \u0634\u064a\u0621 \u064a\u0628\u0642\u0649 \u0641\u064a \u0645\u062a\u0635\u0641\u062d\u0643."],
    ["O\u00f9 sont mes favoris ?", "Where are my favorites?", "\u0623\u064a\u0646 \u0645\u0641\u0636\u0644\u0627\u062a\u064a\u061f"],
    ["Dans ce navigateur : utilisez la sauvegarde JSON de la biblioth\u00e8que pour les d\u00e9placer.", "In this browser: use the library's JSON backup to move them.", "\u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d: \u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0629 JSON \u0644\u0644\u0645\u0643\u062a\u0628\u0629 \u0644\u0646\u0642\u0644\u0647\u0627."],
    ["Une piste ne se lance pas ?", "A track won't play?", "\u0645\u0642\u0637\u0639 \u0644\u0627 \u064a\u0639\u0645\u0644\u061f"],
    ["Son fichier a peut-\u00eatre \u00e9t\u00e9 retir\u00e9 : l'application passe \u00e0 la suivante.", "Its file may have been removed: the app skips to the next one.", "\u0631\u0628\u0645\u0627 \u0623\u064f\u0632\u064a\u0644 \u0645\u0644\u0641\u0647: \u064a\u0646\u062a\u0642\u0644 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0625\u0644\u0649 \u0627\u0644\u062a\u0627\u0644\u064a."],
    ["Music \u2014 musiques sous licences Creative Commons : respectez les cr\u00e9dits exig\u00e9s par chaque licence. \u00b7",
     "Music \u2014 tracks under Creative Commons licenses: respect the credits required by each license. \u00b7",
     "Music \u2014 \u0645\u0648\u0633\u064a\u0642\u0649 \u0628\u062a\u0631\u0627\u062e\u064a\u0635 Creative Commons: \u0627\u062d\u062a\u0631\u0645 \u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u062a\u064a \u064a\u0634\u062a\u0631\u0637\u0647\u0627 \u0643\u0644 \u062a\u0631\u062e\u064a\u0635. \u00b7"],
    ["Politique de confidentialit\u00e9", "Privacy policy", "\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629"],

    /* ---------- lecteur ---------- */
    ["S\u00e9lectionnez une musique", "Select a track", "\u0627\u062e\u062a\u0631 \u0645\u0642\u0637\u0639\u064b\u0627"],
    ["Minuteur", "Timer", "\u0627\u0644\u0645\u0624\u0642\u0651\u062a"],
    ["15 min", "15 min", "15 \u062f"],
    ["30 min", "30 min", "30 \u062f"],
    ["60 min", "60 min", "60 \u062f"],
    ["2 h", "2 h", "\u0633\u0627\u0639\u062a\u0627\u0646"],
    ["Minuteur de sommeil", "Sleep timer", "\u0645\u0624\u0642\u0651\u062a \u0627\u0644\u0646\u0648\u0645"],
    ["Al\u00e9atoire", "Shuffle", "\u0639\u0634\u0648\u0627\u0626\u064a"],
    ["Lecture al\u00e9atoire", "Shuffle playback", "\u062a\u0634\u063a\u064a\u0644 \u0639\u0634\u0648\u0627\u0626\u064a"],
    ["Piste pr\u00e9c\u00e9dente", "Previous track", "\u0627\u0644\u0645\u0642\u0637\u0639 \u0627\u0644\u0633\u0627\u0628\u0642"],
    ["Lecture / pause", "Play / pause", "\u062a\u0634\u063a\u064a\u0644 / \u0625\u064a\u0642\u0627\u0641 \u0645\u0624\u0642\u062a"],
    ["Piste suivante", "Next track", "\u0627\u0644\u0645\u0642\u0637\u0639 \u0627\u0644\u062a\u0627\u0644\u064a"],
    ["R\u00e9p\u00e9ter", "Repeat", "\u062a\u0643\u0631\u0627\u0631"],
    ["Position dans le morceau", "Position in track", "\u0627\u0644\u0645\u0648\u0636\u0639 \u0641\u064a \u0627\u0644\u0645\u0642\u0637\u0639"],
    ["Volume", "Volume", "\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0635\u0648\u062a"],
    ["Ajouter aux favoris", "Add to favorites", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0641\u0636\u0644\u0629"],
    ["Fermer", "Close", "\u0625\u063a\u0644\u0627\u0642"],
    ["Chargement du fichier audio\u2026", "Loading the audio file\u2026", "\u062c\u0627\u0631\u064d \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0635\u0648\u062a\u064a\u2026"],
    ["Aucune piste lisible dans cette liste.", "No playable track in this list.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0642\u0637\u0639 \u0642\u0627\u0628\u0644 \u0644\u0644\u062a\u0634\u063a\u064a\u0644 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0642\u0627\u0626\u0645\u0629."],
    ["Lecture al\u00e9atoire activ\u00e9e", "Shuffle on", "\u062a\u0645 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0639\u0634\u0648\u0627\u0626\u064a"],
    ["Lecture al\u00e9atoire d\u00e9sactiv\u00e9e", "Shuffle off", "\u062a\u0645 \u0625\u064a\u0642\u0627\u0641 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0639\u0634\u0648\u0627\u0626\u064a"],
    ["R\u00e9p\u00e9tition activ\u00e9e", "Repeat on", "\u062a\u0645 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062a\u0643\u0631\u0627\u0631"],
    ["R\u00e9p\u00e9tition d\u00e9sactiv\u00e9e", "Repeat off", "\u062a\u0645 \u0625\u064a\u0642\u0627\u0641 \u0627\u0644\u062a\u0643\u0631\u0627\u0631"],
    ["Minuteur \u00e9coul\u00e9 : lecture arr\u00eat\u00e9e.", "Timer elapsed: playback stopped.", "\u0627\u0646\u062a\u0647\u0649 \u0627\u0644\u0645\u0624\u0642\u0651\u062a: \u062a\u0648\u0642\u0651\u0641 \u0627\u0644\u062a\u0634\u063a\u064a\u0644."],
    ["lecteur YouTube bloqu\u00e9", "YouTube player blocked", "\u0645\u0634\u063a\u0651\u0644 \u064a\u0648\u062a\u064a\u0648\u0628 \u0645\u062d\u0638\u0648\u0631"],
    ["lecteur YouTube indisponible", "YouTube player unavailable", "\u0645\u0634\u063a\u0651\u0644 \u064a\u0648\u062a\u064a\u0648\u0628 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d"],
    ["vid\u00e9o non lisible en int\u00e9gr\u00e9", "video cannot be played embedded", "\u0644\u0627 \u064a\u0645\u0643\u0646 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0645\u0636\u0645\u0651\u0646\u064b\u0627"],
    ["fichier indisponible", "file unavailable", "\u0627\u0644\u0645\u0644\u0641 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d"],
    ["fichier audio inaccessible", "audio file inaccessible", "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0635\u0648\u062a\u064a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d"],
    ["aucun fichier MP3", "no MP3 file", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0644\u0641 MP3"],

    /* ---------- cartes de pistes ---------- */
    ["Commercial OK", "Commercial OK", "\u062a\u062c\u0627\u0631\u064a \u0645\u0633\u0645\u0648\u062d"],
    ["Non commercial", "Non-commercial", "\u063a\u064a\u0631 \u062a\u062c\u0627\u0631\u064a"],
    ["\u00c9coute seule", "Listen only", "\u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0641\u0642\u0637"],
    ["\u00c9coute seule (YouTube)", "Listen only (YouTube)", "\u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0641\u0642\u0637 (\u064a\u0648\u062a\u064a\u0648\u0628)"],
    ["Pas de modification (ND)", "No derivatives (ND)", "\u0628\u0644\u0627 \u062a\u0639\u062f\u064a\u0644 (ND)"],
    ["Lecteur officiel YouTube : pas de r\u00e9utilisation", "Official YouTube player: no reuse", "\u0645\u0634\u063a\u0651\u0644 \u064a\u0648\u062a\u064a\u0648\u0628 \u0627\u0644\u0631\u0633\u0645\u064a: \u0644\u0627 \u0625\u0639\u0627\u062f\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645"],
    ["Favori", "Favorite", "\u0645\u0641\u0636\u0651\u0644"],
    ["Retirer", "Remove", "\u0625\u0632\u0627\u0644\u0629"],
    ["Copier le cr\u00e9dit", "Copy credit", "\u0646\u0633\u062e \u0627\u0644\u0646\u0633\u0628"],
    ["Page source", "Source page", "\u0635\u0641\u062d\u0629 \u0627\u0644\u0645\u0635\u062f\u0631"],
    ["T\u00e9l\u00e9charger", "Download", "\u062a\u0646\u0632\u064a\u0644"],
    ["Cha\u00eene officielle", "Official channel", "\u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629"],
    ["Sans titre", "Untitled", "\u0628\u062f\u0648\u0646 \u0639\u0646\u0648\u0627\u0646"],
    ["Artiste inconnu", "Unknown artist", "\u0641\u0646\u0627\u0646 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641"],
    ["Domaine public", "Public domain", "\u0645\u0644\u0643 \u0639\u0627\u0645"],
    ["Licence inconnue", "Unknown license", "\u062a\u0631\u062e\u064a\u0635 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641"],
    ["CC BY (licence YouTube)", "CC BY (YouTube license)", "CC BY (\u062a\u0631\u062e\u064a\u0635 \u064a\u0648\u062a\u064a\u0648\u0628)"],
    ["Licence YouTube standard (\u00e9coute seule)", "Standard YouTube license (listen only)", "\u062a\u0631\u062e\u064a\u0635 \u064a\u0648\u062a\u064a\u0648\u0628 \u0627\u0644\u0642\u064a\u0627\u0633\u064a (\u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0641\u0642\u0637)"],
    ["Cr\u00e9dit copi\u00e9 !", "Credit copied!", "\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0646\u0633\u0628!"],
    ["Les titres YouTube ne peuvent pas \u00eatre gard\u00e9s en favoris (r\u00e8gles de l'API YouTube).", "YouTube tracks cannot be kept as favorites (YouTube API rules).", "\u0644\u0627 \u064a\u0645\u0643\u0646 \u062d\u0641\u0638 \u0645\u0642\u0627\u0637\u0639 \u064a\u0648\u062a\u064a\u0648\u0628 \u0641\u064a \u0627\u0644\u0645\u0641\u0636\u0644\u0629 (\u0642\u0648\u0627\u0639\u062f YouTube API)."],
    ["Piste retir\u00e9e de la biblioth\u00e8que.", "Track removed from the library.", "\u0623\u064f\u0632\u064a\u0644 \u0627\u0644\u0645\u0642\u0637\u0639 \u0645\u0646 \u0627\u0644\u0645\u0643\u062a\u0628\u0629."],
    ["Aucun cr\u00e9dit \u00e0 g\u00e9n\u00e9rer (les pistes en ligne ajout\u00e9es en contiennent un).", "No credit to generate (tracks added from online sources include one).", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u0633\u0628 \u0644\u0625\u0646\u0634\u0627\u0626\u0647\u0627 (\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0645\u0646 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u062a\u062a\u0636\u0645\u0646 \u0646\u0633\u0628\u064b\u0627)."],
    ["D\u00e9j\u00e0 dans la biblioth\u00e8que.", "Already in the library.", "\u0645\u0648\u062c\u0648\u062f \u0641\u064a \u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0628\u0627\u0644\u0641\u0639\u0644."],

    /* ---------- genres ---------- */
    ["Tous", "All", "\u0627\u0644\u0643\u0644"],
    ["Jazz & Lounge", "Jazz & Lounge", "\u062c\u0627\u0632 \u0648\u0644\u0627\u0648\u0646\u062c"],
    ["Soul & Neo-Soul", "Soul & Neo-Soul", "\u0633\u0648\u0644 \u0648\u0646\u064a\u0648 \u0633\u0648\u0644"],
    ["Lo-Fi & Chillhop", "Lo-Fi & Chillhop", "\u0644\u0648-\u0641\u0627\u064a \u0648\u062a\u0634\u064a\u0644 \u0647\u0648\u0628"],
    ["Funk & Groove", "Funk & Groove", "\u0641\u0627\u0646\u0643 \u0648\u063a\u0631\u0648\u0641"],
    ["Blues", "Blues", "\u0628\u0644\u0648\u0632"],
    ["Ambient & ASMR", "Ambient & ASMR", "\u0623\u0645\u0628\u064a\u0646\u062a \u0648ASMR"],
    ["Classique", "Classical", "\u0643\u0644\u0627\u0633\u064a\u0643\u064a"],
    ["Piano solo", "Solo piano", "\u0628\u064a\u0627\u0646\u0648 \u0645\u0646\u0641\u0631\u062f"],
    ["\u00c9lectronique", "Electronic", "\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a"],
    ["House & Deep", "House & Deep", "\u0647\u0627\u0648\u0633 \u0648\u062f\u064a\u0628"],
    ["Techno & Trance", "Techno & Trance", "\u062a\u0643\u0646\u0648 \u0648\u062a\u0631\u0627\u0646\u0633"],
    ["Synthwave & Retro", "Synthwave & Retro", "\u0633\u064a\u0646\u062b\u0648\u064a\u0641 \u0648\u0631\u064a\u062a\u0631\u0648"],
    ["Hip-Hop & Beats", "Hip-Hop & Beats", "\u0647\u064a\u0628 \u0647\u0648\u0628 \u0648\u0625\u064a\u0642\u0627\u0639\u0627\u062a"],
    ["R&B", "R&B", "\u0622\u0631 \u0623\u0646\u062f \u0628\u064a"],
    ["Pop", "Pop", "\u0628\u0648\u0628"],
    ["Rock", "Rock", "\u0631\u0648\u0643"],
    ["Indie & Alternatif", "Indie & Alternative", "\u0625\u0646\u062f\u064a \u0648\u0628\u062f\u064a\u0644"],
    ["Metal & Hard", "Metal & Hard rock", "\u0645\u064a\u062a\u0627\u0644 \u0648\u0647\u0627\u0631\u062f \u0631\u0648\u0643"],
    ["Folk", "Folk", "\u0641\u0648\u0644\u0643"],
    ["Acoustique", "Acoustic", "\u0623\u0643\u0648\u0633\u062a\u064a\u0643"],
    ["Country", "Country", "\u0643\u0627\u0646\u062a\u0631\u064a"],
    ["Reggae & Dub", "Reggae & Dub", "\u0631\u064a\u063a\u064a \u0648\u062f\u064e\u0628"],
    ["Latin & Bossa", "Latin & Bossa", "\u0644\u0627\u062a\u064a\u0646\u064a \u0648\u0628\u0648\u0633\u0627"],
    ["Afro & Oriental", "Afro & Oriental", "\u0623\u0641\u0631\u064a\u0642\u064a \u0648\u0634\u0631\u0642\u064a"],
    ["Musiques du monde", "World music", "\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u0639\u0627\u0644\u0645"],
    ["Cin\u00e9matique & \u00c9pique", "Cinematic & Epic", "\u0633\u064a\u0646\u0645\u0627\u0626\u064a \u0648\u0645\u0644\u062d\u0645\u064a"],
    ["M\u00e9ditation & Nature", "Meditation & Nature", "\u062a\u0623\u0645\u0644 \u0648\u0637\u0628\u064a\u0639\u0629"],
    ["Chanson fran\u00e7aise", "French chanson", "\u0623\u063a\u0646\u064a\u0629 \u0641\u0631\u0646\u0633\u064a\u0629"],
    ["Rap fran\u00e7ais", "French rap", "\u0631\u0627\u0628 \u0641\u0631\u0646\u0633\u064a"],
    ["Pop arabe", "Arabic pop", "\u0628\u0648\u0628 \u0639\u0631\u0628\u064a"],
    ["Oud & Tarab", "Oud & Tarab", "\u0639\u0648\u062f \u0648\u0637\u0631\u0628"],
    ["Ra\u00ef & Cha\u00e2bi", "Ra\u00ef & Chaabi", "\u0631\u0627\u064a \u0648\u0634\u0639\u0628\u064a"],
    ["Maghreb & Malouf", "Maghreb & Malouf", "\u0645\u063a\u0627\u0631\u0628\u064a \u0648\u0645\u0627\u0644\u0648\u0641"],
    ["Rap arabe", "Arabic rap", "\u0631\u0627\u0628 \u0639\u0631\u0628\u064a"],
    ["Pop & Rock anglais", "English pop & rock", "\u0628\u0648\u0628 \u0648\u0631\u0648\u0643 \u0625\u0646\u062c\u0644\u064a\u0632\u064a"],
    ["Singer-songwriter", "Singer-songwriter", "\u0645\u063a\u0646\u064d\u0651 \u0648\u0643\u0627\u062a\u0628 \u0623\u063a\u0627\u0646\u064d"],
    /* langues des chansons */
    ["Fran\u00e7ais", "French", "\u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629"],
    ["\u0627\u0644\u0639\u0631\u0628\u064a\u0629", "Arabic", "\u0627\u0644\u0639\u0631\u0628\u064a\u0629"],
    ["English", "English", "\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629"],
    /* ambiances */
    ["Chill", "Chill", "\u0647\u0627\u062f\u0626"],
    ["Concentration", "Focus", "\u062a\u0631\u0643\u064a\u0632"],
    ["\u00c9nergique", "Energetic", "\u062d\u064a\u0648\u064a"],
    ["Joyeux", "Happy", "\u0645\u0628\u0647\u062c"],
    ["M\u00e9lancolique", "Melancholic", "\u062d\u0632\u064a\u0646"],
    ["Sombre", "Dark", "\u0642\u0627\u062a\u0645"],
    ["Romantique", "Romantic", "\u0631\u0648\u0645\u0627\u0646\u0633\u064a"],
    ["\u00c9pique", "Epic", "\u0645\u0644\u062d\u0645\u064a"],
    ["Sommeil", "Sleep", "\u0646\u0648\u0645"],
    ["Pluie & Nuit", "Rain & Night", "\u0645\u0637\u0631 \u0648\u0644\u064a\u0644"],

    /* ---------- connexion, porte d'acc\u00e8s, modales ---------- */
    ["Connexion", "Sign in", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644"],
    ["Connexion Google (facultative) : recherche YouTube et tendances", "Google sign-in (optional): YouTube search and trends", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0640 Google (\u0627\u062e\u062a\u064a\u0627\u0631\u064a): \u0627\u0644\u0628\u062d\u062b \u0641\u064a \u064a\u0648\u062a\u064a\u0648\u0628 \u0648\u0627\u0644\u0631\u0627\u0626\u062c"],
    ["Se d\u00e9connecter", "Sign out", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c"],
    ["Administrateur", "Administrator", "\u0645\u0633\u0624\u0648\u0644"],
    ["Abonn\u00e9", "Subscriber", "\u0645\u0634\u062a\u0631\u0643"],
    ["Utilisateur", "User", "\u0645\u0633\u062a\u062e\u062f\u0645"],
    ["Mode configuration", "Setup mode", "\u0648\u0636\u0639 \u0627\u0644\u0625\u0639\u062f\u0627\u062f"],
    ["Connectez-vous avec Google pour acc\u00e9der \u00e0 la musique.", "Sign in with Google to access the music.", "\u0633\u062c\u0651\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649."],
    ["Se connecter avec Google", "Sign in with Google", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google"],
    ["S'abonner au r\u00e9seau en 1 clic", "Subscribe to the network in 1 click", "\u0627\u0634\u062a\u0631\u0643 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062d\u062f\u0629"],
    ["J'ai d\u00e9j\u00e0 fait : v\u00e9rifier mon abonnement", "Already done: check my subscription", "\u0641\u0639\u0644\u062a \u0630\u0644\u0643: \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0634\u062a\u0631\u0627\u0643\u064a"],
    ["Je suis l'administrateur : ouvrir et configurer", "I am the administrator: open and configure", "\u0623\u0646\u0627 \u0627\u0644\u0645\u0633\u0624\u0648\u0644: \u0627\u0641\u062a\u062d \u0648\u0627\u0636\u0628\u0637 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a"],
    ["Music est un moteur de recherche de musiques libres de droits (Creative Commons) : jazz, lo-fi, \u00e9lectro, classique, ambient et plus de 20 genres, avec cr\u00e9dits pr\u00eats \u00e0 copier pour vos vid\u00e9os.",
     "Music is a search engine for royalty-free (Creative Commons) music: jazz, lo-fi, electro, classical, ambient and over 20 genres, with ready-to-copy credits for your videos.",
     "Music \u0645\u062d\u0631\u0643 \u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062d\u0631\u0629 (Creative Commons): \u062c\u0627\u0632 \u0648\u0644\u0648-\u0641\u0627\u064a \u0648\u0625\u0644\u0643\u062a\u0631\u0648 \u0648\u0643\u0644\u0627\u0633\u064a\u0643\u064a \u0648\u0623\u0645\u0628\u064a\u0646\u062a \u0648\u0623\u0643\u062b\u0631 \u0645\u0646 20 \u0646\u0648\u0639\u064b\u0627\u060c \u0645\u0639 \u0646\u0633\u0628 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0646\u0633\u062e \u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a\u0643."],
    ["Google vous demande l'acc\u00e8s \u00e0 votre profil et \u00e0 la lecture de YouTube, uniquement pour la recherche et les tendances. Aucune donn\u00e9e n'est envoy\u00e9e \u00e0 un serveur : tout reste dans votre navigateur.",
     "Google asks for access to your profile and to read YouTube, only for search and trends. No data is sent to a server: everything stays in your browser.",
     "\u062a\u0637\u0644\u0628 Google \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0644\u0641\u0643 \u0627\u0644\u0634\u062e\u0635\u064a \u0648\u0642\u0631\u0627\u0621\u0629 \u064a\u0648\u062a\u064a\u0648\u0628\u060c \u0641\u0642\u0637 \u0644\u0644\u0628\u062d\u062b \u0648\u0627\u0644\u0631\u0627\u0626\u062c. \u0644\u0627 \u062a\u064f\u0631\u0633\u0644 \u0623\u064a \u0628\u064a\u0627\u0646\u0627\u062a \u0625\u0644\u0649 \u062e\u0627\u062f\u0645: \u0643\u0644 \u0634\u064a\u0621 \u064a\u0628\u0642\u0649 \u0641\u064a \u0645\u062a\u0635\u0641\u062d\u0643."],
    ["Changer de compte", "Switch account", "\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u062d\u0633\u0627\u0628"],
    ["1. Connexion avec Google", "1. Sign in with Google", "1. \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google"],
    ["1. Connexion avec Google \u00b7", "1. Sign in with Google \u00b7", "1. \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628 Google \u00b7"],
    ["2. Abonnement au r\u00e9seau YouTube", "2. Subscribe to the YouTube network", "2. \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u0634\u0628\u0643\u0629 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Connexion non configur\u00e9e : l'administrateur doit renseigner le Client ID Google.", "Sign-in not configured: the administrator must enter the Google Client ID.", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u063a\u064a\u0631 \u0645\u0647\u064a\u0651\u0623: \u064a\u062c\u0628 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0625\u062f\u062e\u0627\u0644 \u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 Google."],
    ["Application non configur\u00e9e : l'administrateur doit renseigner un Client ID Google (ouvrir la page avec #admin).", "App not configured: the administrator must enter a Google Client ID (open the page with #admin).", "\u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u063a\u064a\u0631 \u0645\u0647\u064a\u0651\u0623: \u064a\u062c\u0628 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0625\u062f\u062e\u0627\u0644 \u0645\u0639\u0631\u0651\u0641 \u0639\u0645\u064a\u0644 Google (\u0627\u0641\u062a\u062d \u0627\u0644\u0635\u0641\u062d\u0629 \u0645\u0639 \u200e#admin)."],
    ["Le service Google est en cours de chargement ou bloqu\u00e9 (bloqueur de publicit\u00e9s ?). R\u00e9essayez dans un instant.", "The Google service is loading or blocked (ad blocker?). Try again in a moment.", "\u062e\u062f\u0645\u0629 Google \u0642\u064a\u062f \u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0623\u0648 \u0645\u062d\u062c\u0648\u0628\u0629 (\u0645\u0627\u0646\u0639 \u0625\u0639\u0644\u0627\u0646\u0627\u062a\u061f). \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0628\u0639\u062f \u0642\u0644\u064a\u0644."],
    ["Autorisez l'acc\u00e8s \u00e0 votre compte YouTube (case \u00e0 cocher sur l'\u00e9cran Google) : il sert uniquement \u00e0 v\u00e9rifier et cr\u00e9er l'abonnement.", "Allow access to your YouTube account (checkbox on the Google screen): it is only used to check and create the subscription.", "\u0627\u0633\u0645\u062d \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628\u0643 \u0639\u0644\u0649 \u064a\u0648\u062a\u064a\u0648\u0628 (\u062e\u0627\u0646\u0629 \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0641\u064a \u0634\u0627\u0634\u0629 Google): \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0641\u0642\u0637 \u0644\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0648\u0625\u0646\u0634\u0627\u0626\u0647."],
    ["V\u00e9rification du compte\u2026", "Checking the account\u2026", "\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0633\u0627\u0628\u2026"],
    ["V\u00e9rification\u2026", "Checking\u2026", "\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0642\u0642\u2026"],
    ["Abonnement en cours\u2026", "Subscribing\u2026", "\u062c\u0627\u0631\u064d \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643\u2026"],
    ["Abonnement pas encore d\u00e9tect\u00e9 : patientez quelques secondes puis r\u00e9essayez.", "Subscription not detected yet: wait a few seconds and try again.", "\u0644\u0645 \u064a\u064f\u0643\u062a\u0634\u0641 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0628\u0639\u062f: \u0627\u0646\u062a\u0638\u0631 \u0628\u0636\u0639 \u062b\u0648\u0627\u0646\u064d \u062b\u0645 \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629."],
    ["Session Google expir\u00e9e : reconnectez-vous.", "Google session expired: sign in again.", "\u0627\u0646\u062a\u0647\u062a \u062c\u0644\u0633\u0629 Google: \u0633\u062c\u0651\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0645\u0646 \u062c\u062f\u064a\u062f."],
    ["Nom *", "Name *", "\u0627\u0644\u0627\u0633\u0645 *"],
    ["URL, @handle ou identifiant UC\u2026 *", "URL, @handle or UC\u2026 ID *", "\u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u0648 @handle \u0623\u0648 \u0645\u0639\u0631\u0651\u0641 UC\u2026 *"],
    ["Genre", "Genre", "\u0627\u0644\u0646\u0648\u0639"],
    ["Badge *", "Badge *", "\u0627\u0644\u0634\u0627\u0631\u0629 *"],
    ["Description *", "Description *", "\u0627\u0644\u0648\u0635\u0641 *"],
    ["Annuler", "Cancel", "\u0625\u0644\u063a\u0627\u0621"],
    ["Ajouter \u00e0 la biblioth\u00e8que", "Add to library", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0643\u062a\u0628\u0629"],
    ["Placer dans la cha\u00eene", "Place in channel", "\u0636\u0639 \u0641\u064a \u0627\u0644\u0642\u0646\u0627\u0629"],
    ["Ajouter", "Add", "\u0625\u0636\u0627\u0641\u0629"],
    ["Importer une vid\u00e9o YouTube", "Import a YouTube video", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0641\u064a\u062f\u064a\u0648 \u064a\u0648\u062a\u064a\u0648\u0628"],
    ["Collez l'URL d'une vid\u00e9o dont vous avez v\u00e9rifi\u00e9 la licence (CC-BY ou autorisation). Elle sera lue dans la fen\u00eatre vid\u00e9o.", "Paste the URL of a video whose license you have verified (CC-BY or permission). It will play in the video window.", "\u0627\u0644\u0635\u0642 \u0631\u0627\u0628\u0637 \u0641\u064a\u062f\u064a\u0648 \u062a\u062d\u0642\u0642\u062a \u0645\u0646 \u062a\u0631\u062e\u064a\u0635\u0647 (CC-BY \u0623\u0648 \u0625\u0630\u0646). \u0633\u064a\u064f\u0634\u063a\u064e\u0651\u0644 \u0641\u064a \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0641\u064a\u062f\u064a\u0648."],
    ["Importer", "Import", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f"],
    ["V\u00e9rifiez la licence avant toute r\u00e9utilisation.", "Check the license before any reuse.", "\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0642\u0628\u0644 \u0623\u064a \u0625\u0639\u0627\u062f\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645."],
    ["URL YouTube non reconnue.", "YouTube URL not recognized.", "\u0631\u0627\u0628\u0637 \u064a\u0648\u062a\u064a\u0648\u0628 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641."],
    ["Vid\u00e9o import\u00e9e", "Imported video", "\u0641\u064a\u062f\u064a\u0648 \u0645\u0633\u062a\u0648\u0631\u062f"],
    ["Sauvegarde t\u00e9l\u00e9charg\u00e9e.", "Backup downloaded.", "\u062a\u0645 \u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0629."],
    ["Sauvegarde restaur\u00e9e.", "Backup restored.", "\u062a\u0645\u062a \u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0629."],
    ["Fichier de sauvegarde invalide.", "Invalid backup file.", "\u0645\u0644\u0641 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0629 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d."],

    /* ---------- attributs (placeholder, aria-label, title) ---------- */
    ["Logo Music", "Music logo", "\u0634\u0639\u0627\u0631 Music"],
    ["Filtrer ma biblioth\u00e8que", "Filter my library", "\u062a\u0635\u0641\u064a\u0629 \u0645\u0643\u062a\u0628\u062a\u064a"],
    ["Filtrer ma biblioth\u00e8que (titre, artiste)\u2026", "Filter my library (title, artist)\u2026", "\u062a\u0635\u0641\u064a\u0629 \u0645\u0643\u062a\u0628\u062a\u064a (\u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060c \u0627\u0644\u0641\u0646\u0627\u0646)\u2026"],
    ["Rechercher une musique", "Search for music", "\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0648\u0633\u064a\u0642\u0649"],
    ["Instrument, ambiance, artiste, titre\u2026 (ex : piano rain, saxophone, 80s synth)", "Instrument, mood, artist, title\u2026 (e.g. piano rain, saxophone, 80s synth)", "\u0622\u0644\u0629\u060c \u0623\u062c\u0648\u0627\u0621\u060c \u0641\u0646\u0627\u0646\u060c \u0639\u0646\u0648\u0627\u0646\u2026 (\u0645\u062b\u0627\u0644: piano rain\u060c saxophone\u060c 80s synth)"],
    ["ex : 1a2b3c4d", "e.g. 1a2b3c4d", "\u0645\u062b\u0627\u0644: 1a2b3c4d"],
    ["vous@gmail.com", "you@gmail.com", "you@gmail.com"],
    ["auditeur@exemple.com", "listener@example.com", "listener@example.com"],
    ["Titre (facultatif)", "Title (optional)", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)"],
    ["Mode jour", "Light mode", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631\u064a"],
    ["Mode nuit", "Dark mode", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064a\u0644\u064a"],
    ["Langue", "Language", "\u0627\u0644\u0644\u063a\u0629"],

    ["Musiques utilis\u00e9es :", "Music used:", "\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0629:"],
    ["Source :", "Source:", "\u0627\u0644\u0645\u0635\u062f\u0631:"],
    /* ---------- titre et m\u00e9tadonn\u00e9es ---------- */
    ["Music \u2014 Hub musical sans droits", "Music \u2014 Royalty-free music hub", "Music \u2014 \u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062d\u0631\u0629"],
    ["Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 27 genres, biblioth\u00e8que, cr\u00e9dits YouTube et gestion de cha\u00eenes.",
     "Music: pro search for royalty-free music (Openverse, Jamendo, Internet Archive), 36 genres, library, YouTube credits and channel management.",
     "Music: \u0628\u062d\u062b \u0627\u062d\u062a\u0631\u0627\u0641\u064a \u0639\u0646 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0627\u0644\u062d\u0631\u0629 \u0645\u0646 \u0627\u0644\u062d\u0642\u0648\u0642 (Openverse \u0648Jamendo \u0648Internet Archive)\u060c 36 \u0646\u0648\u0639\u064b\u0627\u060c \u0645\u0643\u062a\u0628\u0629\u060c \u0646\u0633\u0628 \u064a\u0648\u062a\u064a\u0648\u0628 \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0642\u0646\u0648\u0627\u062a."]
  ];

  /* ---------- messages d'erreur r\u00e9seau (apr\u00e8s \u00ab Source : \u00bb) ---------- */
  const E = [
    ["r\u00e9seau indisponible ou acc\u00e8s bloqu\u00e9 par le navigateur", "network unavailable or blocked by the browser", "\u0627\u0644\u0634\u0628\u0643\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u0623\u0648 \u0645\u062d\u062c\u0648\u0628\u0629 \u0645\u0646 \u0627\u0644\u0645\u062a\u0635\u0641\u062d"],
    ["quota d\u00e9pass\u00e9 (429)", "quota exceeded (429)", "\u062a\u0645 \u062a\u062c\u0627\u0648\u0632 \u0627\u0644\u062d\u0635\u0629 (429)"],
    ["acc\u00e8s refus\u00e9 ou quota du jour atteint (403)", "access denied or daily quota reached (403)", "\u0627\u0644\u0648\u0635\u0648\u0644 \u0645\u0631\u0641\u0648\u0636 \u0623\u0648 \u0628\u0644\u063a\u062a \u0627\u0644\u062d\u0635\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629 (403)"],
    ["session Google expir\u00e9e : cliquez sur Connexion", "Google session expired: click Sign in", "\u0627\u0646\u062a\u0647\u062a \u062c\u0644\u0633\u0629 Google: \u0627\u0646\u0642\u0631 \u00ab\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644\u00bb"],
    ["cl\u00e9 Jamendo manquante", "Jamendo key missing", "\u0645\u0641\u062a\u0627\u062d Jamendo \u0645\u0641\u0642\u0648\u062f"],
    ["erreur Jamendo", "Jamendo error", "\u062e\u0637\u0623 \u0641\u064a Jamendo"],
    ["connexion Google (ou cl\u00e9 API YouTube) requise", "Google sign-in (or YouTube API key) required", "\u064a\u0644\u0632\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0640 Google (\u0623\u0648 \u0645\u0641\u062a\u0627\u062d YouTube API)"],
    ["lecteur YouTube bloqu\u00e9", "YouTube player blocked", "\u0645\u0634\u063a\u0651\u0644 \u064a\u0648\u062a\u064a\u0648\u0628 \u0645\u062d\u0638\u0648\u0631"]
  ];

  const MAP = new Map();
  D.forEach(([fr, en, ar]) => MAP.set(norm(fr), {en, ar}));
  E.forEach(([fr, en, ar]) => { if (!MAP.has(norm(fr))) MAP.set(norm(fr), {en, ar}); });

  let lang = 'fr';
  const SRC = '(?:Openverse|Jamendo|Internet Archive|YouTube Music)';
  const T = (s, L) => tr(s, L);
  const same = (a, b) => ({en: a, ar: b});

  /* ---------- motifs avec valeurs variables ---------- */
  const PATS = [
    [/^(\d+) \/ (\d+) pistes$/, m => same(`${m[1]} / ${m[2]} tracks`, `${m[1]} / ${m[2]} \u0645\u0642\u0637\u0639`)],
    [/^Surprise : (.+) \u00b7 (.+)$/, m => same(`Surprise: ${T(m[1], 'en')} \u00b7 ${T(m[2], 'en')}`, `\u0645\u0641\u0627\u062c\u0623\u0629: ${T(m[1], 'ar')} \u00b7 ${T(m[2], 'ar')}`)],
    [/^(\d+) titres tendance \u00b7 (.+)$/, m => same(`${m[1]} trending tracks \u00b7 ${T(m[2], 'en')}`, `${m[1]} \u0645\u0642\u0637\u0639\u064b\u0627 \u0631\u0627\u0626\u062c\u064b\u0627 \u00b7 ${T(m[2], 'ar')}`)],
    [/^Tendances indisponibles : (.+)$/, m => same(`Trends unavailable: ${T(m[1], 'en')}`, `\u0627\u0644\u0631\u0627\u0626\u062c \u063a\u064a\u0631 \u0645\u062a\u0627\u062d: ${T(m[1], 'ar')}`)],
    [/^(Toutes|Favoris) \((\d+)\)$/, m => m[1] === 'Toutes' ? same(`All (${m[2]})`, `\u0627\u0644\u0643\u0644 (${m[2]})`) : same(`Favorites (${m[2]})`, `\u0627\u0644\u0645\u0641\u0636\u0644\u0629 (${m[2]})`)],
    [/^(\d+) cr\u00e9dit\(s\) copi\u00e9\(s\) : collez-les dans la description YouTube\.$/, m => same(`${m[1]} credit(s) copied: paste them into the YouTube description.`, `\u062a\u0645 \u0646\u0633\u062e ${m[1]} \u0645\u0646 \u0627\u0644\u0646\u0633\u0628: \u0627\u0644\u0635\u0642\u0647\u0627 \u0641\u064a \u0648\u0635\u0641 \u064a\u0648\u062a\u064a\u0648\u0628.`)],
    [/^Arr\u00eat automatique dans (\d+) min\.$/, m => same(`Auto-stop in ${m[1]} min.`, `\u0625\u064a\u0642\u0627\u0641 \u062a\u0644\u0642\u0627\u0626\u064a \u0628\u0639\u062f ${m[1]} \u062f\u0642\u064a\u0642\u0629.`)],
    [/^Cha\u00eene : (.+)$/, m => same(`Channel: ${m[1]}`, `\u0627\u0644\u0642\u0646\u0627\u0629: ${m[1]}`)],
    [/^Cha\u00eene \u00ab (.+) \u00bb enregistr\u00e9e\.$/, m => same(`Channel \u201c${m[1]}\u201d saved.`, `\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0642\u0646\u0627\u0629 \u00ab${m[1]}\u00bb.`)],
    [/^\u00ab (.+) \u00bb ajout\u00e9e \u00e0 (.+)\.$/, m => same(`\u201c${m[1]}\u201d added to ${m[2]}.`, `\u0623\u064f\u0636\u064a\u0641 \u00ab${m[1]}\u00bb \u0625\u0644\u0649 ${m[2]}.`)],
    [/^Lecture impossible \((.+)\)\.$/, m => same(`Playback failed (${T(m[1], 'en')}).`, `\u062a\u0639\u0630\u0651\u0631 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 (${T(m[1], 'ar')}).`)],
    [/^(\d+) contact\(s\) export\u00e9\(s\)\.$/, m => same(`${m[1]} contact(s) exported.`, `\u062a\u0645 \u062a\u0635\u062f\u064a\u0631 ${m[1]} \u0645\u0646 \u062c\u0647\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644.`)],
    [/^Lire (.+)$/, m => same(`Play ${m[1]}`, `\u062a\u0634\u063a\u064a\u0644 ${m[1]}`)],
    [/^HTTP (\d+)$/, m => same(`HTTP ${m[1]}`, `HTTP ${m[1]}`)],
    [/^profil inaccessible \((\d+)\)$/, m => same(`profile unavailable (${m[1]})`, `\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d (${m[1]})`)],
    [/^Connexion annul\u00e9e ou refus\u00e9e \((.*)\)\.$/, m => same(`Sign-in cancelled or refused (${m[1]}).`, `\u0623\u064f\u0644\u063a\u064a \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0623\u0648 \u0631\u064f\u0641\u0636 (${m[1]}).`)],
    [/^Abonnement automatique impossible pour \u00ab (.+) \u00bb \((.+)\)\. Sa page s'ouvre : cliquez sur S'abonner, puis sur \u00ab V\u00e9rifier \u00bb\.$/, m => same(`Automatic subscription failed for \u201c${m[1]}\u201d (${T(m[2], 'en')}). Its page opens: click Subscribe, then \u201cVerify\u201d.`, `\u062a\u0639\u0630\u0651\u0631 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a \u0641\u064a \u00ab${m[1]}\u00bb (${T(m[2], 'ar')}). \u062a\u064f\u0641\u062a\u062d \u0635\u0641\u062d\u062a\u0647\u0627: \u0627\u0646\u0642\u0631 \u00ab\u0627\u0634\u062a\u0631\u0627\u0643\u00bb \u062b\u0645 \u00ab\u062a\u062d\u0642\u0642\u00bb.`)],
    [/^Erreur Google : (.+)$/, m => same(`Google error: ${m[1]}`, `\u062e\u0637\u0623 Google: ${m[1]}`)],
    [/^\u00c9chec de la connexion : (.+)$/, m => same(`Sign-in failed: ${T(m[1], 'en')}`, `\u0641\u0634\u0644 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644: ${T(m[1], 'ar')}`)],
    /* \u00ab Openverse : quota d\u00e9pass\u00e9 (429) \u00b7 Jamendo : \u2026 \u00bb */
    [new RegExp('^' + SRC + ' : .+$'), m => {
      const parts = m[0].split(' \u00b7 '), en = [], ar = [];
      for (const p of parts) {
        const pm = p.match(new RegExp('^(' + SRC + ') : (.+)$'));
        if (!pm) return null;
        en.push(pm[1] + ' : ' + T(pm[2], 'en')); ar.push(pm[1] + ' : ' + T(pm[2], 'ar'));
      }
      return same(en.join(' \u00b7 '), ar.join(' \u00b7 '));
    }]
  ];

  function tr(s, L) {
    L = L || lang;
    if (L === 'fr' || s == null) return s;
    const k = norm(s);
    if (!k) return s;
    const e = MAP.get(k);
    if (e) return e[L];
    for (const [re, f] of PATS) {
      const m = k.match(re);
      if (m) { const o = f(m); if (o) return o[L]; }
    }
    return s;
  }

  /* ---------- traduction du DOM ---------- */
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  const SKIP = 'script,style,textarea,[translate="no"]';

  function xNode(n) {
    const p = n.parentNode;
    if (!p || p.nodeType !== 1 || (p.closest && p.closest(SKIP))) return;
    if (n.__fr === undefined) n.__fr = n.nodeValue;
    const src = n.__fr;
    if (!/\S/.test(src)) return;
    let out = src;
    if (lang !== 'fr') {
      const t = tr(src);
      if (t !== src) out = src.match(/^\s*/)[0] + t + src.match(/\s*$/)[0];
    }
    if (n.nodeValue !== out) n.nodeValue = out;
  }
  function xAttrs(el) {
    if (el.closest && el.closest('[translate="no"]')) return;
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      el.__frA = el.__frA || {};
      if (el.__frA[a] === undefined) el.__frA[a] = el.getAttribute(a);
      const src = el.__frA[a], out = lang === 'fr' ? src : tr(src);
      if (el.getAttribute(a) !== out) el.setAttribute(a, out);
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) return xNode(root);
    if (root.nodeType !== 1) return;
    xAttrs(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) n.nodeType === 3 ? xNode(n) : xAttrs(n);
  }
  const mo = new MutationObserver(ms => {
    if (lang === 'fr') return;
    for (const m of ms) m.addedNodes.forEach(walk);
  });
  mo.observe(document.documentElement, {childList: true, subtree: true});

  /* ---------- langue ---------- */
  const DIR = {fr: 'ltr', en: 'ltr', ar: 'rtl'};
  const LOCALE = {fr: 'fr-FR', en: 'en-US', ar: 'ar-u-nu-latn'};
  function detect() {
    const fixed = document.documentElement.getAttribute('data-ui');
    if (fixed && DIR[fixed]) return fixed;
    let v = null;
    try { v = localStorage.getItem('music_hub_ui'); } catch (e) {}
    if (v && DIR[v]) return v;
    const n = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return DIR[n] ? n : 'fr';
  }
  function setMeta(sel, attr, val) { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); }
  function applyLang(l, persist) {
    if (!DIR[l]) l = 'fr';
    lang = l;
    if (persist) { try { localStorage.setItem('music_hub_ui', l); } catch (e) {} }
    const h = document.documentElement;
    h.lang = l; h.dir = DIR[l];
    walk(document.body);
    const sel = document.getElementById('ui-lang'); if (sel) sel.value = l;
    const ttl = tr('Music \u2014 Hub musical sans droits', l);
    const fixedPage = h.hasAttribute('data-ui');
    if (!fixedPage) document.title = ttl;
    const desc = tr('Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 27 genres, biblioth\u00e8que, cr\u00e9dits YouTube et gestion de cha\u00eenes.', l);
    if (!fixedPage) setMeta('meta[name="description"]', 'content', l === 'fr' ? 'Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 36 genres, biblioth\u00e8que, cr\u00e9dits YouTube et gestion de cha\u00eenes.' : desc);
    if (!fixedPage) setMeta('meta[property="og:title"]', 'content', ttl);
    if (!fixedPage) setMeta('meta[property="og:locale"]', 'content', {fr: 'fr_FR', en: 'en_US', ar: 'ar_AR'}[l]);
    paintTheme();
    if (window.__appReady) { ['renderChips', 'renderHistory', 'renderAll'].forEach(f => { if (typeof window[f] === 'function') { try { window[f](); } catch (e) {} } }); }
    if (typeof window.syncPlayState === 'function') { try { window.syncPlayState(); } catch (e) {} }
    if (typeof window.updatePlayerUI === 'function') { try { window.updatePlayerUI(); } catch (e) {} }
  }

  /* ---------- mode jour / nuit ---------- */
  let theme = 'dark';
  function detectTheme() {
    let v = null;
    try { v = localStorage.getItem('music_hub_theme'); } catch (e) {}
    if (v === 'light' || v === 'dark') return v;
    return window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function paintTheme() {
    const h = document.documentElement;
    h.classList.toggle('light', theme === 'light'); h.classList.toggle('dark', theme !== 'light');
    setMeta('meta[name="theme-color"]', 'content', theme === 'light' ? '#F4F6FA' : '#07090E');
    const b = document.getElementById('theme-btn');
    if (b) {
      const label = tr(theme === 'light' ? 'Mode nuit' : 'Mode jour');
      b.title = label; b.setAttribute('aria-label', label);
      const i = b.querySelector('i'); if (i) i.className = 'fa-solid ' + (theme === 'light' ? 'fa-moon' : 'fa-sun');
    }
    const sel = document.getElementById('ui-lang'); if (sel) sel.setAttribute('aria-label', tr('Langue') + ' / Language');
  }
  function setTheme(t, persist) {
    theme = t === 'light' ? 'light' : 'dark';
    if (persist) { try { localStorage.setItem('music_hub_theme', theme); } catch (e) {} }
    paintTheme();
  }

  window.tr = tr;
  window.LOC = () => LOCALE[lang];
  window.uiLang = () => lang;

  function init() {
    theme = detectTheme();
    const sel = document.getElementById('ui-lang');
    if (sel) sel.addEventListener('change', () => {
      if (document.documentElement.hasAttribute('data-ui')) {
        try { localStorage.setItem('music_hub_ui', sel.value); } catch (e) {}
        location.href = '../' + sel.value + '/' + location.hash;
      } else applyLang(sel.value, true);
    });
    const tb = document.getElementById('theme-btn');
    if (tb) tb.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light', true));
    applyLang(detect(), false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
