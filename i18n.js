/* Music — traduction de l'interface (FR / EN / AR) et mode jour / nuit.
   Le texte source de la page est en français : chaque entrée ci-dessous est [français, anglais, arabe].
   Le DOM est traduit à l'affichage et à chaque modification (MutationObserver). */
(function () {
  'use strict';
  const norm = s => String(s).replace(/\s+/g, ' ').trim();

  const D = [
    /* ---------- en-tête, navigation, accueil ---------- */
    ["Libre de droits · 36 genres · 3 sources", "Royalty-free · 36 genres · 3 sources", "بدون حقوق · 36 نوعًا · 3 مصادر"],
    ["Écoutes", "Plays", "الاستماعات"],
    ["Chaîne", "Channel", "قناة"],
    ["Chaînes", "Channels", "القنوات"],
    ["Accueil", "Home", "الرئيسية"],
    ["Découvrir", "Discover", "اكتشف"],
    ["Tendances", "Trending", "الرائج"],
    ["Bibliothèque", "Library", "المكتبة"],
    ["Chaînes & Réglages", "Channels & Settings", "القنوات والإعدادات"],
    ["Stats", "Stats", "الإحصاءات"],
    ["Votre studio musical", "Your music studio", "استوديو الموسيقى الخاص بك"],
    ["Toute la musique libre,", "All the free music,", "كل الموسيقى الحرة،"],
    ["à portée d'un clic", "one click away", "على بُعد نقرة واحدة"],
    ["Cherchez dans des centaines de milliers de morceaux Creative Commons, filtrez par genre, ambiance et licence, ajoutez-les à vos chaînes et générez les crédits prêts pour YouTube.",
     "Search hundreds of thousands of Creative Commons tracks, filter by genre, mood and license, add them to your channels and generate YouTube-ready credits.",
     "ابحث في مئات الآلاف من مقاطع Creative Commons، وصفِّها حسب النوع والأجواء والترخيص، وأضفها إلى قنواتك وأنشئ بيانات النسب الجاهزة ليوتيوب."],
    ["Découvrir de la musique", "Discover music", "اكتشف الموسيقى"],
    ["Surprends-moi", "Surprise me", "فاجئني"],
    ["Pistes :", "Tracks:", "المقاطع :"],
    ["Explorer ce genre en ligne", "Explore this genre online", "استكشف هذا النوع عبر الإنترنت"],
    ["Bibliothèque vide : choisissez une musique dans Découvrir, elle sera ajoutée automatiquement à la chaîne.",
     "Library empty: pick a track in Discover, it will be added to the channel automatically.",
     "المكتبة فارغة: اختر مقطعًا من «اكتشف» وسيُضاف تلقائيًا إلى القناة."],

    /* ---------- découvrir ---------- */
    ["Recherche multi-sources en direct", "Live multi-source search", "بحث مباشر متعدد المصادر"],
    ["Les résultats viennent en direct des catalogues ouverts. Vérifiez toujours la licence avant publication.",
     "Results come live from open catalogs. Always check the license before publishing.",
     "تأتي النتائج مباشرةً من فهارس مفتوحة. تحقق دائمًا من الترخيص قبل النشر."],
    ["Ouvrir dans YouTube Music", "Open in YouTube Music", "افتح في YouTube Music"],
    ["Importer une URL", "Import a URL", "استيراد رابط"],
    ["Rechercher", "Search", "بحث"],
    ["Langue des chansons", "Song language", "لغة الأغاني"],
    ["Genres", "Genres", "الأنواع"],
    ["Ambiances", "Moods", "الأجواء"],
    ["Licence", "License", "الترخيص"],
    ["Toutes (CC)", "All (CC)", "الكل (CC)"],
    ["CC0 / Domaine public", "CC0 / Public domain", "CC0 / ملك عام"],
    ["Durée min.", "Min. length", "أقل مدة"],
    ["Toutes", "All", "الكل"],
    ["> 1 min", "> 1 min", "> 1 د"],
    ["> 3 min", "> 3 min", "> 3 د"],
    ["> 10 min", "> 10 min", "> 10 د"],
    ["> 30 min", "> 30 min", "> 30 د"],
    ["Tri", "Sort", "الترتيب"],
    ["Pertinence (mixte)", "Relevance (mixed)", "الصلة (مختلط)"],
    ["Plus longs", "Longest", "الأطول"],
    ["Plus courts", "Shortest", "الأقصر"],
    ["Titre A→Z", "Title A→Z", "العنوان أ←ي"],
    ["Usage commercial uniquement", "Commercial use only", "للاستخدام التجاري فقط"],
    ["(décochez pour inclure l'écoute seule sur YouTube)", "(uncheck to include listen-only tracks from YouTube)", "(ألغِ التحديد لتضمين مقاطع الاستماع فقط من يوتيوب)"],
    ["Réglages des sources (clé Jamendo optionnelle)", "Source settings (optional Jamendo key)", "إعدادات المصادر (مفتاح Jamendo اختياري)"],
    ["Jamendo client_id (gratuit sur developer.jamendo.com)", "Jamendo client_id (free at developer.jamendo.com)", "معرّف عميل Jamendo (مجاني على developer.jamendo.com)"],
    ["Openverse et Internet Archive marchent sans clé. Jamendo ajoute des milliers de morceaux d'artistes indépendants, mais exige une clé, et son usage commercial (chaîne monétisée) demande une licence Jamendo : source désactivée par défaut. Le quota anonyme d'Openverse est limité : en cas d'erreur 429, patientez une minute.",
     "Openverse and Internet Archive work without a key. Jamendo adds thousands of tracks by independent artists but requires a key, and commercial use (monetized channel) requires a Jamendo license: source disabled by default. Openverse's anonymous quota is limited: on a 429 error, wait a minute.",
     "يعمل Openverse وInternet Archive بدون مفتاح. يضيف Jamendo آلاف المقاطع لفنانين مستقلين لكنه يتطلب مفتاحًا، كما أن استخدامه التجاري (قناة مربحة) يتطلب ترخيص Jamendo: المصدر معطّل افتراضيًا. حصة Openverse المجهولة محدودة: عند ظهور الخطأ 429 انتظر دقيقة."],
    ["Lancez une recherche ou choisissez un genre.", "Start a search or pick a genre.", "ابدأ البحث أو اختر نوعًا."],
    ["Charger plus de résultats", "Load more results", "تحميل المزيد من النتائج"],
    ["Recherche en cours…", "Searching…", "جارٍ البحث…"],
    ["Aucune source active.", "No active source.", "لا يوجد مصدر نشط."],
    ["Aucun résultat avec ces filtres.", "No results with these filters.", "لا توجد نتائج بهذه المرشحات."],
    ["Aucun résultat pour cette recherche : essayez d'autres mots ou d'autres sources.",
     "No results for this search: try other words or other sources.",
     "لا توجد نتائج لهذا البحث: جرّب كلمات أخرى أو مصادر أخرى."],

    /* ---------- tendances ---------- */
    ["Écoute et visionnage uniquement", "Listen and watch only", "للاستماع والمشاهدة فقط"],
    ["Musiques tendance", "Trending music", "الموسيقى الرائجة"],
    ["Les titres les plus écoutés du moment sur YouTube, par langue. Ils sont lus dans le lecteur officiel YouTube : ils ne sont jamais ajoutés à vos chaînes ni à votre bibliothèque, et ne peuvent pas être réutilisés dans vos vidéos.",
     "The most-played tracks right now on YouTube, by language. They play in the official YouTube player: they are never added to your channels or library, and cannot be reused in your videos.",
     "أكثر المقاطع استماعًا حاليًا على يوتيوب، حسب اللغة. تُشغَّل في مشغّل يوتيوب الرسمي: لا تُضاف أبدًا إلى قنواتك أو مكتبتك، ولا يمكن إعادة استخدامها في فيديوهاتك."],
    ["Charger plus", "Load more", "تحميل المزيد"],
    ["Connexion Google requise pour afficher les tendances.", "Google sign-in required to show trends.", "يلزم تسجيل الدخول بحساب Google لعرض الرائج."],
    ["Chargement des tendances…", "Loading trends…", "جارٍ تحميل الرائج…"],
    ["Aucune tendance disponible pour cette langue.", "No trends available for this language.", "لا توجد مقاطع رائجة لهذه اللغة."],

    /* ---------- bibliothèque ---------- */
    ["Ma Bibliothèque", "My Library", "مكتبتي"],
    ["Favoris, pistes placées dans vos chaînes, crédits et sauvegarde.", "Favorites, tracks placed in your channels, credits and backup.", "المفضلة والمقاطع المضافة إلى قنواتك والنسب والنسخ الاحتياطي."],
    ["Crédits YouTube", "YouTube credits", "نسب يوتيوب"],
    ["Sauvegarde JSON", "JSON backup", "نسخة JSON"],
    ["Restaurer", "Restore", "استعادة"],
    ["Pas encore de favoris : cliquez sur le cœur d'une piste.", "No favorites yet: click the heart on a track.", "لا توجد مفضلة بعد: انقر على القلب في أي مقطع."],
    ["Bibliothèque vide : ajoutez des pistes depuis Découvrir.", "Library empty: add tracks from Discover.", "المكتبة فارغة: أضف مقاطع من «اكتشف»."],

    /* ---------- chaînes & réglages ---------- */
    ["Mes Chaînes YouTube", "My YouTube Channels", "قنواتي على يوتيوب"],
    ["Le paramètre", "The parameter", "يُضاف المعامل"],
    ["est ajouté automatiquement aux liens.", "is automatically added to links.", "تلقائيًا إلى الروابط."],
    ["Ajouter une chaîne", "Add a channel", "إضافة قناة"],
    ["Vidéos lancées", "Videos launched", "الفيديوهات المشغّلة"],
    ["Audience estimée", "Estimated audience", "الجمهور التقديري"],
    ["Réglages du réseau (administrateur)", "Network settings (administrator)", "إعدادات الشبكة (المسؤول)"],
    ["Ces réglages sont enregistrés dans ce navigateur. Pour qu'ils s'appliquent à vos visiteurs, cliquez sur « Exporter la configuration » et déposez",
     "These settings are saved in this browser. To apply them to your visitors, click “Export configuration” and place",
     "تُحفظ هذه الإعدادات في هذا المتصفح. لتطبيقها على زوّارك، انقر «تصدير الإعدادات» وضع الملف"],
    ["à côté de la page.", "next to the page.", "بجوار الصفحة."],
    ["Client ID Google OAuth", "Google OAuth Client ID", "معرّف عميل Google OAuth"],
    ["E-mails administrateurs (séparés par des virgules)", "Administrator emails (comma-separated)", "عناوين بريد المسؤولين (مفصولة بفواصل)"],
    ["Chaîne cible : celle où s'intègrent les musiques choisies", "Target channel: where chosen tracks are added", "القناة المستهدفة: التي تُضاف إليها الموسيقى المختارة"],
    ["Vidéo de la chaîne proposée à chaque choix (URL ou ID)", "Channel video suggested at each choice (URL or ID)", "فيديو القناة المقترح عند كل اختيار (رابط أو معرّف)"],
    ["Clé API YouTube (facultatif, restreinte à votre domaine)", "YouTube API key (optional, restricted to your domain)", "مفتاح YouTube API (اختياري، مقيّد بنطاقك)"],
    ["AdSense : ID éditeur (ca-pub-…)", "AdSense: publisher ID (ca-pub-…)", "AdSense: معرّف الناشر (ca-pub-…)"],
    ["AdSense : ID du bloc d'annonce (slot)", "AdSense: ad unit ID (slot)", "AdSense: معرّف الوحدة الإعلانية (slot)"],
    ["Connexion Google obligatoire", "Google sign-in required", "تسجيل الدخول بـ Google إلزامي"],
    ["(déconseillé : AdSense ne verrait que la porte d'accès)", "(not recommended: AdSense would only see the sign-in wall)", "(غير مستحسن: سيرى AdSense بوابة الدخول فقط)"],
    ["Abonnement au réseau obligatoire", "Network subscription required", "الاشتراك في الشبكة إلزامي"],
    ["(déconseillé : interdit par les règles de l'API YouTube)", "(not recommended: forbidden by YouTube API rules)", "(غير مستحسن: ممنوع بموجب قواعد YouTube API)"],
    ["Enregistrer", "Save", "حفظ"],
    ["Exporter la configuration", "Export configuration", "تصدير الإعدادات"],
    ["Comment obtenir le Client ID Google ?", "How to get the Google Client ID?", "كيف أحصل على معرّف عميل Google؟"],
    ["Console Google Cloud → créer un projet → « API et services » → activer", "Google Cloud Console → create a project → “APIs & Services” → enable", "وحدة تحكم Google Cloud ← أنشئ مشروعًا ← «واجهات API والخدمات» ← فعِّل"],
    ["Écran de consentement OAuth → ajouter le champ d'application", "OAuth consent screen → add the scope", "شاشة موافقة OAuth ← أضف النطاق"],
    ["(sensible).", "(sensitive).", "(حسّاس)."],
    ["Identifiants → créer un « ID client OAuth » de type", "Credentials → create an “OAuth client ID” of type", "بيانات الاعتماد ← أنشئ «معرّف عميل OAuth» من النوع"],
    ["Application Web", "Web application", "تطبيق ويب"],
    [", avec pour origine JavaScript autorisée l'adresse exacte de votre site (https://… ou http://localhost). Le fichier ouvert directement (file://) ne fonctionne pas.",
     ", with the exact address of your site (https://… or http://localhost) as the authorized JavaScript origin. A file opened directly (file://) does not work.",
     "، مع العنوان الدقيق لموقعك (https://… أو http://localhost) كأصل JavaScript مصرّح به. لا يعمل الملف المفتوح مباشرة (file://)."],
    ["Collez l'ID ci-dessus, ajoutez votre e-mail administrateur, enregistrez, puis exportez la configuration.",
     "Paste the ID above, add your administrator email, save, then export the configuration.",
     "الصق المعرّف أعلاه، وأضف بريد المسؤول، واحفظ، ثم صدِّر الإعدادات."],
    ["Verrouillé dehors ? Ajoutez", "Locked out? Add", "هل أُغلق الباب في وجهك؟ أضف"],
    ["à l'adresse pour effacer les réglages de ce navigateur, ou", "to the address to clear this browser's settings, or", "إلى العنوان لمسح إعدادات هذا المتصفح، أو"],
    ["tant qu'aucune configuration complète n'existe.", "as long as no complete configuration exists.", "ما دامت لا توجد إعدادات كاملة."],
    ["Base YouTube", "YouTube base", "قاعدة يوتيوب"],
    ["Pistes", "Tracks", "المقاطع"],
    ["Inclure dans la vérification d'abonnement (si activée)", "Include in subscription check (if enabled)", "تضمين في التحقق من الاشتراك (إن كان مفعّلًا)"],
    ["Identifiant de chaîne invalide (24 caractères attendus) : l'abonnement ne pourra pas être vérifié. Utilisez l'URL @handle ou le bon identifiant.",
     "Invalid channel ID (24 characters expected): the subscription cannot be verified. Use the @handle URL or the correct ID.",
     "معرّف القناة غير صالح (يلزم 24 حرفًا): لا يمكن التحقق من الاشتراك. استخدم رابط @handle أو المعرّف الصحيح."],
    ["Automatique (selon le genre)", "Automatic (by genre)", "تلقائي (حسب النوع)"],
    ["Réglages enregistrés dans ce navigateur. Exportez la configuration pour vos visiteurs.", "Settings saved in this browser. Export the configuration for your visitors.", "حُفظت الإعدادات في هذا المتصفح. صدِّر الإعدادات لزوّارك."],
    ["Modifier la chaîne", "Edit channel", "تعديل القناة"],
    ["Supprimer la chaîne", "Delete channel", "حذف القناة"],
    ["Chaîne supprimée.", "Channel deleted.", "تم حذف القناة."],
    ["Ajouter une chaîne YouTube", "Add a YouTube channel", "إضافة قناة يوتيوب"],
    ["Ouvrir la chaîne", "Open channel", "افتح القناة"],
    ["Ajoutée à la chaîne", "Added to channel", "أُضيف إلى القناة"],
    /* chaînes de démonstration */
    ["Jazz & Late Night Piano", "Jazz & Late Night Piano", "جاز وبيانو الليل"],
    ["Sessions feutrées de smooth jazz, saxophones en sourdine et piano vintage.", "Hushed smooth-jazz sessions, muted saxophones and vintage piano.", "جلسات سموث جاز هادئة وساكسفونات خافتة وبيانو كلاسيكي."],
    ["Soul & Motown Revival", "Soul & Motown Revival", "إحياء السول وموتاون"],
    ["Le meilleur de la soul vintage, groove chaleureux et neo-soul libre de droits.", "The best of vintage soul, warm groove and royalty-free neo-soul.", "أفضل السول الكلاسيكي وإيقاع دافئ ونيو سول بدون حقوق."],
    ["Lo-Fi Study & Chillhop", "Lo-Fi Study & Chillhop", "لو-فاي للدراسة وتشيل هوب"],
    ["Rythmes Lo-Fi chill pour travailler ou étudier sous la pluie.", "Chill Lo-Fi beats for working or studying in the rain.", "إيقاعات لو-فاي هادئة للعمل أو الدراسة تحت المطر."],
    ["ASMR Industriel & CNC", "Industrial ASMR & CNC", "ASMR صناعي وCNC"],
    ["Précision mécanique, usinage CNC grande vitesse et sons métalliques purs.", "Mechanical precision, high-speed CNC machining and pure metallic sounds.", "دقة ميكانيكية وتشغيل CNC عالي السرعة وأصوات معدنية نقية."],
    ["Relaxation & Nature", "Relaxation & Nature", "استرخاء وطبيعة"],
    ["Voyages visuels apaisants, horizons crépusculaires et relaxation profonde.", "Soothing visual journeys, twilight horizons and deep relaxation.", "رحلات بصرية مهدّئة وآفاق الغروب واسترخاء عميق."],

    /* ---------- stats ---------- */
    ["Vidéos chaîne lancées", "Channel videos launched", "فيديوهات القناة المشغّلة"],
    ["Pistes en bibliothèque", "Tracks in library", "المقاطع في المكتبة"],
    ["Écoutes lancées", "Plays started", "مرات التشغيل"],
    ["Contacts e-mail", "Email contacts", "جهات اتصال البريد"],
    ["Pistes par chaîne", "Tracks per channel", "المقاطع لكل قناة"],
    ["Alertes nouvelles sorties", "New release alerts", "تنبيهات الإصدارات الجديدة"],
    ["Collectez les e-mails des auditeurs (stockés localement dans votre navigateur).", "Collect listeners' emails (stored locally in your browser).", "اجمع عناوين بريد المستمعين (تُحفظ محليًا في متصفحك)."],
    ["S'inscrire aux alertes", "Subscribe to alerts", "الاشتراك في التنبيهات"],
    ["Télécharger les e-mails (.CSV)", "Download emails (.CSV)", "تنزيل البريد (.CSV)"],
    ["E-mail enregistré.", "Email saved.", "تم حفظ البريد."],
    ["Aucun e-mail enregistré.", "No email saved.", "لا يوجد بريد محفوظ."],

    /* ---------- à propos, pied de page ---------- */
    ["À propos de Music", "About Music", "عن Music"],
    ["Music est un moteur de recherche de musiques libres de droits. Il interroge en direct Openverse, Jamendo et Internet Archive, trois catalogues ouverts, et propose aussi la recherche sur YouTube pour l'écoute. Vous filtrez par genre (jazz, lo-fi, électro, classique, ambient, ASMR, cinématique…), par ambiance, par licence et par durée, puis vous écoutez, gardez vos favoris et copiez les crédits prêts à coller dans la description d'une vidéo.",
     "Music is a search engine for royalty-free music. It queries Openverse, Jamendo and Internet Archive live — three open catalogs — and also offers YouTube search for listening. You filter by genre (jazz, lo-fi, electro, classical, ambient, ASMR, cinematic…), mood, license and length, then listen, keep your favorites and copy ready-made credits to paste into a video description.",
     "Music محرك بحث عن الموسيقى الحرة من الحقوق. يستعلم مباشرةً من Openverse وJamendo وInternet Archive، وهي ثلاثة فهارس مفتوحة، ويتيح أيضًا البحث في يوتيوب للاستماع. تصفّي حسب النوع (جاز، لو-فاي، إلكترو، كلاسيكي، أمبينت، ASMR، سينمائي…) والأجواء والترخيص والمدة، ثم تستمع وتحتفظ بمفضلاتك وتنسخ النسب الجاهزة للصقها في وصف الفيديو."],
    ["Comprendre les licences Creative Commons", "Understanding Creative Commons licenses", "فهم تراخيص Creative Commons"],
    ["CC0 / domaine public", "CC0 / public domain", "CC0 / ملك عام"],
    [": aucune obligation, usage commercial permis.", ": no obligation, commercial use allowed.", ": بلا أي التزام، والاستخدام التجاري مسموح."],
    [": usage commercial permis à condition de citer l'auteur, le titre, la licence et la source.", ": commercial use allowed if you credit the author, title, license and source.", ": الاستخدام التجاري مسموح بشرط ذكر المؤلف والعنوان والترخيص والمصدر."],
    [": comme CC BY, mais votre création doit être partagée sous la même licence.", ": like CC BY, but your creation must be shared under the same license.", ": مثل CC BY، لكن عملك يجب أن يُشارك بالترخيص نفسه."],
    ["(non commercial) : interdit dans une vidéo monétisée.", "(non-commercial): not allowed in a monetized video.", "(غير تجاري): ممنوع في فيديو مربح."],
    ["(pas de modification) : le morceau ne peut être ni remixé ni coupé.", "(no derivatives): the track cannot be remixed or cut.", "(بلا تعديل): لا يجوز إعادة مزج المقطع أو اقتطاعه."],
    ["Conseils pour les créateurs YouTube", "Tips for YouTube creators", "نصائح لصنّاع محتوى يوتيوب"],
    ["Activez « Usage commercial uniquement » si votre chaîne est monétisée, copiez les crédits dès que vous utilisez un morceau et gardez la page source. Une licence peut changer : vérifiez-la chez l'auteur avant de publier. Les titres YouTube marqués « Écoute seule » ne sont pas réutilisables dans vos vidéos.",
     "Enable “Commercial use only” if your channel is monetized, copy the credits as soon as you use a track and keep the source page. A license can change: check it with the author before publishing. YouTube tracks marked “Listen only” cannot be reused in your videos.",
     "فعِّل «للاستخدام التجاري فقط» إذا كانت قناتك مربحة، وانسخ النسب فور استخدامك أي مقطع، واحتفظ بصفحة المصدر. قد يتغير الترخيص: تحقق منه لدى المؤلف قبل النشر. مقاطع يوتيوب الموسومة «للاستماع فقط» لا يمكن إعادة استخدامها في فيديوهاتك."],
    ["Questions fréquentes", "Frequently asked questions", "الأسئلة الشائعة"],
    ["Pourquoi une connexion Google ?", "Why a Google sign-in?", "لماذا تسجيل الدخول بحساب Google؟"],
    ["Elle est facultative : elle sert uniquement à la recherche YouTube et aux tendances. Rien n'est envoyé à un serveur : tout reste dans votre navigateur.",
     "It is optional: it is only used for YouTube search and trends. Nothing is sent to a server: everything stays in your browser.",
     "إنه اختياري: يُستخدم فقط للبحث في يوتيوب والرائج. لا يُرسل شيء إلى خادم: كل شيء يبقى في متصفحك."],
    ["Où sont mes favoris ?", "Where are my favorites?", "أين مفضلاتي؟"],
    ["Dans ce navigateur : utilisez la sauvegarde JSON de la bibliothèque pour les déplacer.", "In this browser: use the library's JSON backup to move them.", "في هذا المتصفح: استخدم النسخة الاحتياطية JSON للمكتبة لنقلها."],
    ["Une piste ne se lance pas ?", "A track won't play?", "مقطع لا يعمل؟"],
    ["Son fichier a peut-être été retiré : l'application passe à la suivante.", "Its file may have been removed: the app skips to the next one.", "ربما أُزيل ملفه: ينتقل التطبيق إلى التالي."],
    ["Music — musiques sous licences Creative Commons : respectez les crédits exigés par chaque licence. ·",
     "Music — tracks under Creative Commons licenses: respect the credits required by each license. ·",
     "Music — موسيقى بتراخيص Creative Commons: احترم النسب التي يشترطها كل ترخيص. ·"],
    ["Politique de confidentialité", "Privacy policy", "سياسة الخصوصية"],

    /* ---------- lecteur ---------- */
    ["Sélectionnez une musique", "Select a track", "اختر مقطعًا"],
    ["Minuteur", "Timer", "المؤقّت"],
    ["15 min", "15 min", "15 د"],
    ["30 min", "30 min", "30 د"],
    ["60 min", "60 min", "60 د"],
    ["2 h", "2 h", "ساعتان"],
    ["Minuteur de sommeil", "Sleep timer", "مؤقّت النوم"],
    ["Aléatoire", "Shuffle", "عشوائي"],
    ["Lecture aléatoire", "Shuffle playback", "تشغيل عشوائي"],
    ["Piste précédente", "Previous track", "المقطع السابق"],
    ["Lecture / pause", "Play / pause", "تشغيل / إيقاف مؤقت"],
    ["Piste suivante", "Next track", "المقطع التالي"],
    ["Répéter", "Repeat", "تكرار"],
    ["Position dans le morceau", "Position in track", "الموضع في المقطع"],
    ["Volume", "Volume", "مستوى الصوت"],
    ["Ajouter aux favoris", "Add to favorites", "إضافة إلى المفضلة"],
    ["Fermer", "Close", "إغلاق"],
    ["Chargement du fichier audio…", "Loading the audio file…", "جارٍ تحميل الملف الصوتي…"],
    ["Aucune piste lisible dans cette liste.", "No playable track in this list.", "لا يوجد مقطع قابل للتشغيل في هذه القائمة."],
    ["Lecture aléatoire activée", "Shuffle on", "تم تفعيل التشغيل العشوائي"],
    ["Lecture aléatoire désactivée", "Shuffle off", "تم إيقاف التشغيل العشوائي"],
    ["Répétition activée", "Repeat on", "تم تفعيل التكرار"],
    ["Répétition désactivée", "Repeat off", "تم إيقاف التكرار"],
    ["Minuteur écoulé : lecture arrêtée.", "Timer elapsed: playback stopped.", "انتهى المؤقّت: توقّف التشغيل."],
    ["lecteur YouTube bloqué", "YouTube player blocked", "مشغّل يوتيوب محظور"],
    ["lecteur YouTube indisponible", "YouTube player unavailable", "مشغّل يوتيوب غير متاح"],
    ["vidéo non lisible en intégré", "video cannot be played embedded", "لا يمكن تشغيل الفيديو مضمّنًا"],
    ["fichier indisponible", "file unavailable", "الملف غير متاح"],
    ["fichier audio inaccessible", "audio file inaccessible", "الملف الصوتي غير متاح"],
    ["aucun fichier MP3", "no MP3 file", "لا يوجد ملف MP3"],

    /* ---------- cartes de pistes ---------- */
    ["Commercial OK", "Commercial OK", "تجاري مسموح"],
    ["Non commercial", "Non-commercial", "غير تجاري"],
    ["Écoute seule", "Listen only", "للاستماع فقط"],
    ["Écoute seule (YouTube)", "Listen only (YouTube)", "للاستماع فقط (يوتيوب)"],
    ["Pas de modification (ND)", "No derivatives (ND)", "بلا تعديل (ND)"],
    ["Lecteur officiel YouTube : pas de réutilisation", "Official YouTube player: no reuse", "مشغّل يوتيوب الرسمي: لا إعادة استخدام"],
    ["Favori", "Favorite", "مفضّل"],
    ["Retirer", "Remove", "إزالة"],
    ["Copier le crédit", "Copy credit", "نسخ النسب"],
    ["Page source", "Source page", "صفحة المصدر"],
    ["Télécharger", "Download", "تنزيل"],
    ["Chaîne officielle", "Official channel", "القناة الرسمية"],
    ["Sans titre", "Untitled", "بدون عنوان"],
    ["Artiste inconnu", "Unknown artist", "فنان غير معروف"],
    ["Domaine public", "Public domain", "ملك عام"],
    ["Licence inconnue", "Unknown license", "ترخيص غير معروف"],
    ["CC BY (licence YouTube)", "CC BY (YouTube license)", "CC BY (ترخيص يوتيوب)"],
    ["Licence YouTube standard (écoute seule)", "Standard YouTube license (listen only)", "ترخيص يوتيوب القياسي (للاستماع فقط)"],
    ["Crédit copié !", "Credit copied!", "تم نسخ النسب!"],
    ["Les titres YouTube ne peuvent pas être gardés en favoris (règles de l'API YouTube).", "YouTube tracks cannot be kept as favorites (YouTube API rules).", "لا يمكن حفظ مقاطع يوتيوب في المفضلة (قواعد YouTube API)."],
    ["Piste retirée de la bibliothèque.", "Track removed from the library.", "أُزيل المقطع من المكتبة."],
    ["Aucun crédit à générer (les pistes en ligne ajoutées en contiennent un).", "No credit to generate (tracks added from online sources include one).", "لا توجد نسب لإنشائها (المقاطع المضافة من الإنترنت تتضمن نسبًا)."],
    ["Déjà dans la bibliothèque.", "Already in the library.", "موجود في المكتبة بالفعل."],

    /* ---------- genres ---------- */
    ["Tous", "All", "الكل"],
    ["Jazz & Lounge", "Jazz & Lounge", "جاز ولاونج"],
    ["Soul & Neo-Soul", "Soul & Neo-Soul", "سول ونيو سول"],
    ["Lo-Fi & Chillhop", "Lo-Fi & Chillhop", "لو-فاي وتشيل هوب"],
    ["Funk & Groove", "Funk & Groove", "فانك وغروف"],
    ["Blues", "Blues", "بلوز"],
    ["Ambient & ASMR", "Ambient & ASMR", "أمبينت وASMR"],
    ["Classique", "Classical", "كلاسيكي"],
    ["Piano solo", "Solo piano", "بيانو منفرد"],
    ["Électronique", "Electronic", "إلكتروني"],
    ["House & Deep", "House & Deep", "هاوس وديب"],
    ["Techno & Trance", "Techno & Trance", "تكنو وترانس"],
    ["Synthwave & Retro", "Synthwave & Retro", "سينثويف وريترو"],
    ["Hip-Hop & Beats", "Hip-Hop & Beats", "هيب هوب وإيقاعات"],
    ["R&B", "R&B", "آر أند بي"],
    ["Pop", "Pop", "بوب"],
    ["Rock", "Rock", "روك"],
    ["Indie & Alternatif", "Indie & Alternative", "إندي وبديل"],
    ["Metal & Hard", "Metal & Hard rock", "ميتال وهارد روك"],
    ["Folk", "Folk", "فولك"],
    ["Acoustique", "Acoustic", "أكوستيك"],
    ["Country", "Country", "كانتري"],
    ["Reggae & Dub", "Reggae & Dub", "ريغي ودَب"],
    ["Latin & Bossa", "Latin & Bossa", "لاتيني وبوسا"],
    ["Afro & Oriental", "Afro & Oriental", "أفريقي وشرقي"],
    ["Musiques du monde", "World music", "موسيقى العالم"],
    ["Cinématique & Épique", "Cinematic & Epic", "سينمائي وملحمي"],
    ["Méditation & Nature", "Meditation & Nature", "تأمل وطبيعة"],
    ["Chanson française", "French chanson", "أغنية فرنسية"],
    ["Rap français", "French rap", "راب فرنسي"],
    ["Pop arabe", "Arabic pop", "بوب عربي"],
    ["Oud & Tarab", "Oud & Tarab", "عود وطرب"],
    ["Raï & Chaâbi", "Raï & Chaabi", "راي وشعبي"],
    ["Maghreb & Malouf", "Maghreb & Malouf", "مغاربي ومالوف"],
    ["Rap arabe", "Arabic rap", "راب عربي"],
    ["Pop & Rock anglais", "English pop & rock", "بوب وروك إنجليزي"],
    ["Singer-songwriter", "Singer-songwriter", "مغنٍّ وكاتب أغانٍ"],
    /* langues des chansons */
    ["Français", "French", "الفرنسية"],
    ["العربية", "Arabic", "العربية"],
    ["English", "English", "الإنجليزية"],
    /* ambiances */
    ["Chill", "Chill", "هادئ"],
    ["Concentration", "Focus", "تركيز"],
    ["Énergique", "Energetic", "حيوي"],
    ["Joyeux", "Happy", "مبهج"],
    ["Mélancolique", "Melancholic", "حزين"],
    ["Sombre", "Dark", "قاتم"],
    ["Romantique", "Romantic", "رومانسي"],
    ["Épique", "Epic", "ملحمي"],
    ["Sommeil", "Sleep", "نوم"],
    ["Pluie & Nuit", "Rain & Night", "مطر وليل"],

    /* ---------- connexion, porte d'accès, modales ---------- */
    ["Connexion", "Sign in", "تسجيل الدخول"],
    ["Connexion Google (facultative) : recherche YouTube et tendances", "Google sign-in (optional): YouTube search and trends", "تسجيل الدخول بـ Google (اختياري): البحث في يوتيوب والرائج"],
    ["Se déconnecter", "Sign out", "تسجيل الخروج"],
    ["Administrateur", "Administrator", "مسؤول"],
    ["Abonné", "Subscriber", "مشترك"],
    ["Utilisateur", "User", "مستخدم"],
    ["Mode configuration", "Setup mode", "وضع الإعداد"],
    ["Connectez-vous avec Google pour accéder à la musique.", "Sign in with Google to access the music.", "سجّل الدخول بحساب Google للوصول إلى الموسيقى."],
    ["Se connecter avec Google", "Sign in with Google", "تسجيل الدخول بحساب Google"],
    ["S'abonner au réseau en 1 clic", "Subscribe to the network in 1 click", "اشترك في الشبكة بنقرة واحدة"],
    ["J'ai déjà fait : vérifier mon abonnement", "Already done: check my subscription", "فعلت ذلك: تحقق من اشتراكي"],
    ["Je suis l'administrateur : ouvrir et configurer", "I am the administrator: open and configure", "أنا المسؤول: افتح واضبط الإعدادات"],
    ["Music est un moteur de recherche de musiques libres de droits (Creative Commons) : jazz, lo-fi, électro, classique, ambient et plus de 20 genres, avec crédits prêts à copier pour vos vidéos.",
     "Music is a search engine for royalty-free (Creative Commons) music: jazz, lo-fi, electro, classical, ambient and over 20 genres, with ready-to-copy credits for your videos.",
     "Music محرك بحث عن الموسيقى الحرة (Creative Commons): جاز ولو-فاي وإلكترو وكلاسيكي وأمبينت وأكثر من 20 نوعًا، مع نسب جاهزة للنسخ لفيديوهاتك."],
    ["Google vous demande l'accès à votre profil et à la lecture de YouTube, uniquement pour la recherche et les tendances. Aucune donnée n'est envoyée à un serveur : tout reste dans votre navigateur.",
     "Google asks for access to your profile and to read YouTube, only for search and trends. No data is sent to a server: everything stays in your browser.",
     "تطلب Google الوصول إلى ملفك الشخصي وقراءة يوتيوب، فقط للبحث والرائج. لا تُرسل أي بيانات إلى خادم: كل شيء يبقى في متصفحك."],
    ["Changer de compte", "Switch account", "تبديل الحساب"],
    ["1. Connexion avec Google", "1. Sign in with Google", "1. تسجيل الدخول بحساب Google"],
    ["1. Connexion avec Google ·", "1. Sign in with Google ·", "1. تسجيل الدخول بحساب Google ·"],
    ["2. Abonnement au réseau YouTube", "2. Subscribe to the YouTube network", "2. الاشتراك في شبكة يوتيوب"],
    ["Connexion non configurée : l'administrateur doit renseigner le Client ID Google.", "Sign-in not configured: the administrator must enter the Google Client ID.", "تسجيل الدخول غير مهيّأ: يجب على المسؤول إدخال معرّف عميل Google."],
    ["Application non configurée : l'administrateur doit renseigner un Client ID Google (ouvrir la page avec #admin).", "App not configured: the administrator must enter a Google Client ID (open the page with #admin).", "التطبيق غير مهيّأ: يجب على المسؤول إدخال معرّف عميل Google (افتح الصفحة مع ‎#admin)."],
    ["Le service Google est en cours de chargement ou bloqué (bloqueur de publicités ?). Réessayez dans un instant.", "The Google service is loading or blocked (ad blocker?). Try again in a moment.", "خدمة Google قيد التحميل أو محجوبة (مانع إعلانات؟). أعد المحاولة بعد قليل."],
    ["Autorisez l'accès à votre compte YouTube (case à cocher sur l'écran Google) : il sert uniquement à vérifier et créer l'abonnement.", "Allow access to your YouTube account (checkbox on the Google screen): it is only used to check and create the subscription.", "اسمح بالوصول إلى حسابك على يوتيوب (خانة الاختيار في شاشة Google): يُستخدم فقط للتحقق من الاشتراك وإنشائه."],
    ["Vérification du compte…", "Checking the account…", "جارٍ التحقق من الحساب…"],
    ["Vérification…", "Checking…", "جارٍ التحقق…"],
    ["Abonnement en cours…", "Subscribing…", "جارٍ الاشتراك…"],
    ["Abonnement pas encore détecté : patientez quelques secondes puis réessayez.", "Subscription not detected yet: wait a few seconds and try again.", "لم يُكتشف الاشتراك بعد: انتظر بضع ثوانٍ ثم أعد المحاولة."],
    ["Session Google expirée : reconnectez-vous.", "Google session expired: sign in again.", "انتهت جلسة Google: سجّل الدخول من جديد."],
    ["Nom *", "Name *", "الاسم *"],
    ["URL, @handle ou identifiant UC… *", "URL, @handle or UC… ID *", "الرابط أو @handle أو معرّف UC… *"],
    ["Genre", "Genre", "النوع"],
    ["Badge *", "Badge *", "الشارة *"],
    ["Description *", "Description *", "الوصف *"],
    ["Annuler", "Cancel", "إلغاء"],
    ["Ajouter à la bibliothèque", "Add to library", "إضافة إلى المكتبة"],
    ["Placer dans la chaîne", "Place in channel", "ضع في القناة"],
    ["Ajouter", "Add", "إضافة"],
    ["Importer une vidéo YouTube", "Import a YouTube video", "استيراد فيديو يوتيوب"],
    ["Collez l'URL d'une vidéo dont vous avez vérifié la licence (CC-BY ou autorisation). Elle sera lue dans la fenêtre vidéo.", "Paste the URL of a video whose license you have verified (CC-BY or permission). It will play in the video window.", "الصق رابط فيديو تحققت من ترخيصه (CC-BY أو إذن). سيُشغَّل في نافذة الفيديو."],
    ["Importer", "Import", "استيراد"],
    ["Vérifiez la licence avant toute réutilisation.", "Check the license before any reuse.", "تحقق من الترخيص قبل أي إعادة استخدام."],
    ["URL YouTube non reconnue.", "YouTube URL not recognized.", "رابط يوتيوب غير معروف."],
    ["Vidéo importée", "Imported video", "فيديو مستورد"],
    ["Sauvegarde téléchargée.", "Backup downloaded.", "تم تنزيل النسخة الاحتياطية."],
    ["Sauvegarde restaurée.", "Backup restored.", "تمت استعادة النسخة الاحتياطية."],
    ["Fichier de sauvegarde invalide.", "Invalid backup file.", "ملف النسخة الاحتياطية غير صالح."],

    /* ---------- attributs (placeholder, aria-label, title) ---------- */
    ["Logo Music", "Music logo", "شعار Music"],
    ["Filtrer ma bibliothèque", "Filter my library", "تصفية مكتبتي"],
    ["Filtrer ma bibliothèque (titre, artiste)…", "Filter my library (title, artist)…", "تصفية مكتبتي (العنوان، الفنان)…"],
    ["Rechercher une musique", "Search for music", "ابحث عن موسيقى"],
    ["Instrument, ambiance, artiste, titre… (ex : piano rain, saxophone, 80s synth)", "Instrument, mood, artist, title… (e.g. piano rain, saxophone, 80s synth)", "آلة، أجواء، فنان، عنوان… (مثال: piano rain، saxophone، 80s synth)"],
    ["ex : 1a2b3c4d", "e.g. 1a2b3c4d", "مثال: 1a2b3c4d"],
    ["vous@gmail.com", "you@gmail.com", "you@gmail.com"],
    ["auditeur@exemple.com", "listener@example.com", "listener@example.com"],
    ["Titre (facultatif)", "Title (optional)", "العنوان (اختياري)"],
    ["Mode jour", "Light mode", "الوضع النهاري"],
    ["Mode nuit", "Dark mode", "الوضع الليلي"],
    ["Langue", "Language", "اللغة"],

    ["Musiques utilisées :", "Music used:", "الموسيقى المستخدمة:"],
    ["Source :", "Source:", "المصدر:"],
    /* ---------- titre et métadonnées ---------- */
    ["Music — Hub musical sans droits", "Music — Royalty-free music hub", "Music — مركز الموسيقى الحرة"],
    ["Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 27 genres, bibliothèque, crédits YouTube et gestion de chaînes.",
     "Music: pro search for royalty-free music (Openverse, Jamendo, Internet Archive), 36 genres, library, YouTube credits and channel management.",
     "Music: بحث احترافي عن الموسيقى الحرة من الحقوق (Openverse وJamendo وInternet Archive)، 36 نوعًا، مكتبة، نسب يوتيوب وإدارة القنوات."]
  ];

  /* ---------- messages d'erreur réseau (après « Source : ») ---------- */
  const E = [
    ["réseau indisponible ou accès bloqué par le navigateur", "network unavailable or blocked by the browser", "الشبكة غير متاحة أو محجوبة من المتصفح"],
    ["quota dépassé (429)", "quota exceeded (429)", "تم تجاوز الحصة (429)"],
    ["accès refusé ou quota du jour atteint (403)", "access denied or daily quota reached (403)", "الوصول مرفوض أو بلغت الحصة اليومية (403)"],
    ["session Google expirée : cliquez sur Connexion", "Google session expired: click Sign in", "انتهت جلسة Google: انقر «تسجيل الدخول»"],
    ["clé Jamendo manquante", "Jamendo key missing", "مفتاح Jamendo مفقود"],
    ["erreur Jamendo", "Jamendo error", "خطأ في Jamendo"],
    ["connexion Google (ou clé API YouTube) requise", "Google sign-in (or YouTube API key) required", "يلزم تسجيل الدخول بـ Google (أو مفتاح YouTube API)"],
    ["lecteur YouTube bloqué", "YouTube player blocked", "مشغّل يوتيوب محظور"]
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
    [/^(\d+) \/ (\d+) pistes$/, m => same(`${m[1]} / ${m[2]} tracks`, `${m[1]} / ${m[2]} مقطع`)],
    [/^Surprise : (.+) · (.+)$/, m => same(`Surprise: ${T(m[1], 'en')} · ${T(m[2], 'en')}`, `مفاجأة: ${T(m[1], 'ar')} · ${T(m[2], 'ar')}`)],
    [/^(\d+) titres tendance · (.+)$/, m => same(`${m[1]} trending tracks · ${T(m[2], 'en')}`, `${m[1]} مقطعًا رائجًا · ${T(m[2], 'ar')}`)],
    [/^Tendances indisponibles : (.+)$/, m => same(`Trends unavailable: ${T(m[1], 'en')}`, `الرائج غير متاح: ${T(m[1], 'ar')}`)],
    [/^(Toutes|Favoris) \((\d+)\)$/, m => m[1] === 'Toutes' ? same(`All (${m[2]})`, `الكل (${m[2]})`) : same(`Favorites (${m[2]})`, `المفضلة (${m[2]})`)],
    [/^(\d+) crédit\(s\) copié\(s\) : collez-les dans la description YouTube\.$/, m => same(`${m[1]} credit(s) copied: paste them into the YouTube description.`, `تم نسخ ${m[1]} من النسب: الصقها في وصف يوتيوب.`)],
    [/^Arrêt automatique dans (\d+) min\.$/, m => same(`Auto-stop in ${m[1]} min.`, `إيقاف تلقائي بعد ${m[1]} دقيقة.`)],
    [/^Chaîne : (.+)$/, m => same(`Channel: ${m[1]}`, `القناة: ${m[1]}`)],
    [/^Chaîne « (.+) » enregistrée\.$/, m => same(`Channel “${m[1]}” saved.`, `تم حفظ القناة «${m[1]}».`)],
    [/^« (.+) » ajoutée à (.+)\.$/, m => same(`“${m[1]}” added to ${m[2]}.`, `أُضيف «${m[1]}» إلى ${m[2]}.`)],
    [/^Lecture impossible \((.+)\)\.$/, m => same(`Playback failed (${T(m[1], 'en')}).`, `تعذّر التشغيل (${T(m[1], 'ar')}).`)],
    [/^(\d+) contact\(s\) exporté\(s\)\.$/, m => same(`${m[1]} contact(s) exported.`, `تم تصدير ${m[1]} من جهات الاتصال.`)],
    [/^Lire (.+)$/, m => same(`Play ${m[1]}`, `تشغيل ${m[1]}`)],
    [/^HTTP (\d+)$/, m => same(`HTTP ${m[1]}`, `HTTP ${m[1]}`)],
    [/^profil inaccessible \((\d+)\)$/, m => same(`profile unavailable (${m[1]})`, `الملف الشخصي غير متاح (${m[1]})`)],
    [/^Connexion annulée ou refusée \((.*)\)\.$/, m => same(`Sign-in cancelled or refused (${m[1]}).`, `أُلغي تسجيل الدخول أو رُفض (${m[1]}).`)],
    [/^Abonnement automatique impossible pour « (.+) » \((.+)\)\. Sa page s'ouvre : cliquez sur S'abonner, puis sur « Vérifier »\.$/, m => same(`Automatic subscription failed for “${m[1]}” (${T(m[2], 'en')}). Its page opens: click Subscribe, then “Verify”.`, `تعذّر الاشتراك التلقائي في «${m[1]}» (${T(m[2], 'ar')}). تُفتح صفحتها: انقر «اشتراك» ثم «تحقق».`)],
    [/^Erreur Google : (.+)$/, m => same(`Google error: ${m[1]}`, `خطأ Google: ${m[1]}`)],
    [/^Échec de la connexion : (.+)$/, m => same(`Sign-in failed: ${T(m[1], 'en')}`, `فشل تسجيل الدخول: ${T(m[1], 'ar')}`)],
    /* « Openverse : quota dépassé (429) · Jamendo : … » */
    [new RegExp('^' + SRC + ' : .+$'), m => {
      const parts = m[0].split(' · '), en = [], ar = [];
      for (const p of parts) {
        const pm = p.match(new RegExp('^(' + SRC + ') : (.+)$'));
        if (!pm) return null;
        en.push(pm[1] + ' : ' + T(pm[2], 'en')); ar.push(pm[1] + ' : ' + T(pm[2], 'ar'));
      }
      return same(en.join(' · '), ar.join(' · '));
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
    const ttl = tr('Music — Hub musical sans droits', l);
    document.title = ttl;
    const desc = tr('Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 27 genres, bibliothèque, crédits YouTube et gestion de chaînes.', l);
    setMeta('meta[name="description"]', 'content', l === 'fr' ? 'Music : recherche pro de musiques libres de droits (Openverse, Jamendo, Internet Archive), 36 genres, bibliothèque, crédits YouTube et gestion de chaînes.' : desc);
    setMeta('meta[property="og:title"]', 'content', ttl);
    setMeta('meta[property="og:locale"]', 'content', {fr: 'fr_FR', en: 'en_US', ar: 'ar_AR'}[l]);
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
    if (sel) sel.addEventListener('change', () => applyLang(sel.value, true));
    const tb = document.getElementById('theme-btn');
    if (tb) tb.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light', true));
    applyLang(detect(), false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
