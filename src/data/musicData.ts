/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Instructor, BlogPost, Badge, ForumPost } from '../types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Thomas Bergersen',
    role: 'Compositeur & Pianiste Concertiste',
    bio: 'Ancien élève du Conservatoire de Paris, Thomas a composé des musiques pour des dizaines de documentaires et de spectacles live. Sa spécialité est d\'allier la rigueur classique à l\'improvisation moderne.',
    specialties: ['Piano Classique', 'Improvisation', 'Composition Orchestrale'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    quote: "La musique commence là où s'arrête le pouvoir des mots."
  },
  {
    id: 'inst-2',
    name: 'Sarah Clavier',
    role: 'Vocaliste & Coach de Chant Professionnelle',
    bio: 'Sarah accompagne des artistes de variété et d\'opéra depuis plus de 15 ans. Elle est diplômée en orthophonie et physiologie de la voix, ce qui lui permet d\'enseigner le chant en toute sécurité.',
    specialties: ['Technique Vocale', 'Chant Pop/Jazz', 'Gestion du Stress Scénique'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    quote: "Chanter n'est pas seulement un art, c'est une connexion physique et émotionnelle."
  },
  {
    id: 'inst-3',
    name: 'Julien Ségur',
    role: 'Guitariste de Session & Arrangeur',
    bio: 'Julien a tourné avec de grands noms de la scène française et internationale. Du blues terreux au jazz fusion, sa technique de main droite en fingerstyle est reconnue par ses pairs.',
    specialties: ['Guitare Acoustique', 'Blues & Folk', 'Fingerstyle'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    quote: "Six cordes suffisent pour raconter toute une vie."
  },
  {
    id: 'inst-4',
    name: 'Maxime Pulse',
    role: 'Producteur & Concepteur Sonore',
    bio: 'Ingénieur du son passionné par les synthétiseurs modulaires et Ableton Live, Maxime produit des bandes-son électroniques et urbaines acclamées pour des labels indépendants.',
    specialties: ['Production sur Ableton', 'Synthèse Sonore', 'Mixage & Mastering'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    quote: "Le studio d'enregistrement est l'instrument le plus polyvalent jamais créé."
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Premier Accord',
    description: 'Compléter votre première leçon sur la plateforme.',
    icon: 'Music',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'badge-2',
    name: 'Théoricien Assidu',
    description: 'Réussir le quiz d\'un cours avec un score de 100%.',
    icon: 'Award',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'badge-3',
    name: 'Doigts d\'Or',
    description: 'Compléter toutes les leçons d\'un cours instrumental.',
    icon: 'Sparkles',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'badge-4',
    name: 'Maître du Rythme',
    description: 'Soumettre un enregistrement audio de devoir de rythme.',
    icon: 'Mic',
    color: 'from-pink-500 to-rose-600'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-piano-1',
    title: 'Piano Débutant : Les Fondations Magiques',
    instructorId: 'inst-1',
    instrument: 'Piano',
    level: 'Débutant',
    duration: '6 heures',
    price: 39,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=600',
    description: 'Apprenez à déchiffrer vos premières partitions, à placer vos mains correctement et à jouer des mélodies légendaires dès la première semaine.',
    longDescription: 'Ce cours est conçu spécialement pour ceux qui n\'ont jamais touché un clavier. Nous partons de zéro absolue. Vous apprendrez la géométrie du clavier, la posture idéale pour éviter les tensions, les notes de base et la coordination des deux mains à travers des exercices ludiques basés sur des mélodies universelles (Beethoven, mélodies folk, pop standards). En combinant la théorie moderne sans solfège obligatoire et la pratique immédiate, vous jouerez vos premiers morceaux dès les premières 30 minutes de cours.',
    syllabus: [
      'Présentation du clavier et repérage des notes',
      'La posture du pianiste et le jeu de la main droite',
      'Intégration de la main gauche et accompagnement simple',
      'Le rythme fondamental : noires, blanches et soupirs',
      'Votre premier morceau complet à deux mains'
    ],
    prerequisites: [
      'Un piano acoustique ou un clavier numérique (61 touches minimum recommandées)',
      'Aucune connaissance préalable en musique requise'
    ],
    lessons: [
      {
        id: 'cp1-l1',
        title: 'Introduction et géométrie du clavier',
        duration: '12:15',
        videoUrl: 'cp1_v1',
        pdfUrl: 'piano_fondations_l1_repères.pdf',
        description: 'Découvrez la disposition des touches noires et blanches et apprenez à repérer instantanément la note Do (C).'
      },
      {
        id: 'cp1-l2',
        title: 'La bonne posture et le jeu "poids du bras"',
        duration: '15:40',
        videoUrl: 'cp1_v2',
        pdfUrl: 'piano_posture_exercices.pdf',
        backingTrackUrl: 'tempo_lent_60bpm.mp3',
        description: 'Détendez vos épaules et vos poignets pour obtenir une sonorité riche et ronde sur votre instrument.'
      },
      {
        id: 'cp1-l3',
        title: 'Premières mélodies à la main droite',
        duration: '18:10',
        videoUrl: 'cp1_v3',
        pdfUrl: 'partition_premiere_melodie.pdf',
        backingTrackUrl: 'accompagnement_folk_C_G.mp3',
        description: 'Jouez vos premières phrases musicales et apprenez à chiffrer vos doigts (du pouce 1 à l\'auriculaire 5).'
      },
      {
        id: 'cp1-l4',
        title: 'La main gauche entre en scène !',
        duration: '22:05',
        videoUrl: 'cp1_v4',
        pdfUrl: 'partition_coordination_mains.pdf',
        backingTrackUrl: 'backing_track_valse.mp3',
        description: 'Débloquez la coordination en jouant des basses simples à la main gauche pendant que la main droite chante.'
      }
    ],
    quiz: {
      id: 'quiz-piano-1',
      title: 'Validation des Fondations du Piano',
      questions: [
        {
          id: 'q-p1',
          question: 'Comment repère-t-on facilement le "Do" sur un clavier ?',
          options: [
            'C\'est la touche blanche située juste à gauche du groupe de deux touches noires.',
            'C\'est la touche blanche située juste à droite du groupe de trois touches noires.',
            'C\'est la toute première touche à l\'extrême gauche du piano.',
            'C\'est toujours une touche noire.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Le Do se situe toujours immédiatement à gauche du groupe de deux touches noires.'
        },
        {
          id: 'q-p2',
          question: 'Quel chiffre correspond au pouce dans le doigté de piano standard ?',
          options: [
            'Le chiffre 5',
            'Le chiffre 1',
            'Le chiffre 3',
            'Le pouce n\'est pas numéroté'
          ],
          correctAnswerIndex: 1,
          explanation: 'En piano, le pouce est toujours le doigt numéro 1, et l\'auriculaire est le doigt numéro 5 pour les deux mains.'
        },
        {
          id: 'q-p3',
          question: 'Que faut-il faire pour éviter la fatigue et les douleurs aux poignets ?',
          options: [
            'Garder les poignets rigides et serrer les dents.',
            'Surélever exagérément les coudes.',
            'Conserver des poignets souples et un alignement naturel bras-main.',
            'Jouer uniquement avec le bout des ongles.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La souplesse du poignet agit comme un amortisseur naturel et prévient les tendinites.'
        }
      ]
    },
    rating: 4.8,
    reviewsCount: 142
  },
  {
    id: 'course-guitar-1',
    title: 'Guitare Folk & Accompagnement Pop',
    instructorId: 'inst-3',
    instrument: 'Guitare',
    level: 'Débutant',
    duration: '8 heures',
    price: 49,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=600',
    description: 'Maîtrisez les 8 accords magiques ou ouverts qui vous permettront de jouer plus de 500 morceaux de légende.',
    longDescription: 'Rien ne remplace le plaisir de s\'installer au coin d\'un feu ou dans son salon avec une guitare acoustique. Dans ce cours, Julien Ségur vous livre sa méthode accélérée d\'apprentissage. Pas besoin de passer des mois sur des gammes ennuyeuses : nous apprenons directement les accords ouverts indispensables (Sol, Do, Ré, Mi mineur, La mineur, etc.) et comment les enchaîner avec fluidité. Vous découvrirez également les rythmiques de base (feu de camp, pop-rock, ballade) et apprendrez à utiliser un médiator ou à jouer directement aux doigts (fingerstyle).',
    syllabus: [
      'Accorder son instrument et lire une grille d\'accords',
      'Le groupe magique : Sol, Do, Ré, Mim',
      'La rythmique de base "Feu de Camp" (Strutting)',
      'Comment passer d\'un accord à un autre sans s\'arrêter',
      'Introduction au jeu aux doigts (Fingerstyle)'
    ],
    prerequisites: [
      'Une guitare acoustique folk, classique ou électrique',
      'Un accordeur (application gratuite sur smartphone acceptée)'
    ],
    lessons: [
      {
        id: 'cg1-l1',
        title: 'Prendre sa guitare en main et l\'accorder',
        duration: '14:30',
        videoUrl: 'cg1_v1',
        pdfUrl: 'guitare_fondements_accorder.pdf',
        description: 'Découvrez la notation internationale des cordes (E A D G B E) et comment accorder parfaitement votre guitare.'
      },
      {
        id: 'cg1-l2',
        title: 'Vos deux premiers accords et la grille',
        duration: '19:15',
        videoUrl: 'cg1_v2',
        pdfUrl: 'accords_MiM_LaM.pdf',
        backingTrackUrl: 'rythme_lent_deux_accords.mp3',
        description: 'Apprenez à lire un diagramme d\'accord et jouez le Mi mineur et le La mineur.'
      },
      {
        id: 'cg1-l3',
        title: 'Le secret de la rythmique "Feu de Camp"',
        duration: '25:40',
        videoUrl: 'cg1_v3',
        pdfUrl: 'rythmique_feu_de_camp.pdf',
        backingTrackUrl: 'accompagnement_tempo_inter_80bpm.mp3',
        description: 'Maîtrisez la rythmique la plus célèbre du monde : Bas, Bas, Haut, Haut, Bas, Haut.'
      }
    ],
    quiz: {
      id: 'quiz-guitar-1',
      title: 'Validation Guitare Folk',
      questions: [
        {
          id: 'q-g1',
          question: 'Quelles sont les notes des cordes à vide de la guitare, de la plus grave à la plus aiguë (notation internationale) ?',
          options: [
            'E - A - D - G - B - E',
            'E - G - C - F - A - D',
            'A - D - G - C - E - A',
            'C - D - E - F - G - A'
          ],
          correctAnswerIndex: 0,
          explanation: 'L\'accordage standard de la guitare est EADGBE (Mi, La, Ré, Sol, Si, Mi).'
        },
        {
          id: 'q-g2',
          question: 'Que représente un chiffre dans une case d\'un diagramme d\'accord ?',
          options: [
            'Le numéro de la frette à pincer.',
            'Le doigt à utiliser (1 = index, 2 = majeur, etc.).',
            'Le nombre de fois qu\'il faut gratter la corde.',
            'La note de musique résultante.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Dans les diagrammes d\'accords, les cercles avec des chiffres indiquent le doigt de la main gauche à poser.'
        }
      ]
    },
    rating: 4.9,
    reviewsCount: 310
  },
  {
    id: 'course-chant-1',
    title: 'Trouver sa Voix : Technique Vocale & Respiration',
    instructorId: 'inst-2',
    instrument: 'Chant',
    level: 'Débutant',
    duration: '5 heures',
    price: 35,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&q=80&w=600',
    description: 'Libérez votre puissance vocale, chantez juste sans effort et apprenez la respiration diaphragmatique.',
    longDescription: 'Chaque personne possède une voix unique et magnifique, mais elle est souvent bloquée par des tensions physiques et des doutes psychologiques. Dans ce cours révolutionnaire, Sarah Clavier vous explique comment fonctionne votre "appareil vocal". Vous ferez l\'expérience d\'exercices d\'échauffement corporel, d\'assouplissement de la mâchoire et surtout, vous maîtriserez le soutien diaphragmatique. Ce soutien est la clé pour chanter avec puissance sans jamais vous fatiguer ni vous abîmer les cordes vocales.',
    syllabus: [
      'Le mécanisme du chant et la posture corporelle',
      'La respiration abdominale et le soutien du diaphragme',
      'Éveiller ses résonateurs naturels (poitrine, tête, masque)',
      'Développer la justesse et l\'oreille interne',
      'Interpréter un morceau avec émotion'
    ],
    prerequisites: [
      'Aucun matériel particulier, juste votre voix et un espace calme pour faire du bruit !'
    ],
    lessons: [
      {
        id: 'cc1-l1',
        title: 'Le corps est votre instrument',
        duration: '11:50',
        videoUrl: 'cc1_v1',
        pdfUrl: 'posture_et_detente_musculaire.pdf',
        description: 'Exercices d\'ancrage au sol et de libération du cou et de la mâchoire avant de chanter.'
      },
      {
        id: 'cc1-l2',
        title: 'Le secret du Diaphragme',
        duration: '16:30',
        videoUrl: 'cc1_v2',
        pdfUrl: 'exercices_respiration_chant.pdf',
        backingTrackUrl: 'pulsation_respiratoire.mp3',
        description: 'Sentez le muscle du diaphragme s\'abaisser à l\'inspiration et apprenez à contrôler le débit d\'air.'
      },
      {
        id: 'cc1-l3',
        title: 'Chanter juste et trouver sa tessiture',
        duration: '21:10',
        videoUrl: 'cc1_v3',
        pdfUrl: 'vocalises_de_base.pdf',
        backingTrackUrl: 'vocalises_piano_majeur.mp3',
        description: 'Pratiquez des vocalises simples sur cinq notes pour aligner vos cordes vocales sur la bonne fréquence.'
      }
    ],
    quiz: {
      id: 'quiz-singing-1',
      title: 'Validation Technique Vocale',
      questions: [
        {
          id: 'q-c1',
          question: 'Où doit se situer le mouvement respiratoire principal lors de l\'inspiration dans le chant ?',
          options: [
            'Dans les épaules et la poitrine (gonflement du haut).',
            'Dans le bas de l\'abdomen et les côtes inférieures (mouvement horizontal bas).',
            'Uniquement dans la gorge.',
            'Il ne faut pas respirer pendant qu\'on chante.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La respiration costo-diaphragmatique ou abdominale permet un contrôle optimal de l\'air sans créer de tensions au niveau du cou et des cordes vocales.'
        },
        {
          id: 'q-c2',
          question: 'Qu\'est-ce que le "vocal fry" ou la "voix de poitrine" ?',
          options: [
            'Un cri strident.',
            'Le registre le plus bas, résonnant principalement dans la cage thoracique.',
            'La voix que l\'on utilise pour imiter les oiseaux.',
            'Une technique exclusive aux chanteurs de heavy metal.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La voix de poitrine est le registre inférieur de notre voix parlée et chantée, qui résonne par sympathie dans la cage thoracique.'
        }
      ]
    },
    rating: 4.7,
    reviewsCount: 189
  },
  {
    id: 'course-production-1',
    title: 'Home-Studio : Produire sa Musique de A à Z',
    instructorId: 'inst-4',
    instrument: 'Production',
    level: 'Intermédiaire',
    duration: '10 heures',
    price: 79,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600',
    description: 'Configurez votre DAW, maîtrisez la compression, l\'égalisation et créez un mixage de niveau professionnel chez vous.',
    longDescription: 'Grâce à la technologie moderne, vous pouvez créer un hit mondial dans votre chambre. Cependant, le matériel ne fait pas tout : il faut comprendre comment sculpter le son. Maxime Pulse vous ouvre les portes de son processus créatif. Vous découvrirez comment structurer une session sur Ableton Live (ou tout autre DAW comme FL Studio ou Logic), enregistrer des instruments sans bruit parasite, programmer des rythmiques percutantes et équilibrer les fréquences avec l\'EQ et la compression pour faire sonner votre production sur n\'importe quel système audio.',
    syllabus: [
      'Choix et configuration de sa carte son et micro',
      'Organisation d\'une session de production et flux de signal',
      'L\'art de l\'égalisation (EQ) : nettoyer les fréquences',
      'La compression : contrôler la dynamique et donner du punch',
      'Initiation aux effets spatiaux : réverbération et delay'
    ],
    prerequisites: [
      'Un ordinateur avec un logiciel de MAO installé (Ableton Live Lite/Intro, Reaper, FL Studio, GarageBand, etc.)',
      'Un casque audio de qualité ou des enceintes de monitoring'
    ],
    lessons: [
      {
        id: 'cpd1-l1',
        title: 'Le matériel de base du Home-Studio',
        duration: '16:10',
        videoUrl: 'cpd1_v1',
        pdfUrl: 'guide_achat_homestudio.pdf',
        description: 'Quel micro acheter ? Comment placer ses enceintes ? Évitez les pièges marketing et investissez intelligemment.'
      },
      {
        id: 'cpd1-l2',
        title: 'Créer un beat solide en MIDI',
        duration: '24:50',
        videoUrl: 'cpd1_v2',
        pdfUrl: 'rythmes_midi_templates.pdf',
        backingTrackUrl: 'metronome_hiphop_90bpm.mp3',
        description: 'La méthode pour programmer des kicks et snares qui tapent fort, avec des variations naturelles de vélocité.'
      },
      {
        id: 'cpd1-l3',
        title: 'EQ et Compression : Les deux piliers',
        duration: '32:15',
        videoUrl: 'cpd1_v3',
        pdfUrl: 'frequences_instruments_cheat_sheet.pdf',
        description: 'Apprenez à couper les bas-médiums boueux d\'une voix et à compresser une basse pour lui donner de l\'assise.'
      }
    ],
    quiz: {
      id: 'quiz-production-1',
      title: 'Validation Production Musicale',
      questions: [
        {
          id: 'q-prod1',
          question: 'Quel outil sert principalement à resserrer les écarts de volume entre les parties calmes et les parties fortes d\'un signal ?',
          options: [
            'L\'Égaliseur (EQ)',
            'Le Compresseur',
            'La Réverbération',
            'Le Flanger'
          ],
          correctAnswerIndex: 1,
          explanation: 'Le compresseur réduit la plage dynamique du signal en atténuant les crêtes au-dessus d\'un certain seuil (threshold).'
        },
        {
          id: 'q-prod2',
          question: 'Qu\'est-ce que le taux d\'échantillonnage (sample rate) standard d\'un fichier CD ou streaming classique ?',
          options: [
            '44.1 kHz',
            '8 kHz',
            '192 kHz',
            '440 Hz'
          ],
          correctAnswerIndex: 0,
          explanation: 'La fréquence d\'échantillonnage standard établie par le théorème de Nyquist-Shannon pour la musique grand public est 44.1 kHz (permettant de capturer fidèlement les fréquences jusqu\'à 22 kHz).'
        }
      ]
    },
    rating: 4.9,
    reviewsCount: 95
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Comment pratiquer un instrument efficacement en 20 minutes par jour',
    excerpt: 'Vous pensez manquer de temps pour apprendre la musique ? Découvrez la méthode d\'apprentissage délibéré qui surpasse les sessions de 2 heures du week-end.',
    content: 'La régularité bat toujours la quantité en musique. Notre cerveau consolide les connexions neuronales durant la phase de sommeil profond. En pratiquant seulement 20 minutes tous les jours, vous offrez à votre cerveau 7 opportunités par semaine de se restructurer ! Pour maximiser ces 20 minutes, appliquez la méthode du "focus délibéré" : 1. Éliminez les distractions (téléphone hors de vue), 2. Échauffez-vous 3 minutes, 3. Travaillez UNIQUEMENT les 4 mesures qui vous posent problème (plutôt que de rejouer le morceau depuis le début), et 4. Enregistrez-vous à la fin pour vous écouter objectivement.',
    category: 'Astuce',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&q=80&w=400',
    author: 'Sarah Clavier',
    date: '15 Juin 2026'
  },
  {
    id: 'blog-2',
    title: 'Solfège classique vs Grille d\'accords : Par quoi commencer ?',
    excerpt: 'Faut-il absolument savoir lire des notes complexes pour prendre du plaisir à la guitare ou au piano ? Notre réponse tranchée.',
    content: 'Le solfège traditionnel est un outil d\'écriture formidable hérité d\'une époque sans enregistrement audio. C\'est le "code informatique" de la musique classique. Cependant, de nombreux génies de la musique contemporaine (comme Paul McCartney ou Jimi Hendrix) ne savaient pas lire une partition ! Pour commencer rapidement et ne pas vous décourager, préférez les grilles d\'accords et les tablatures. Elles se concentrent sur la structure géométrique de l\'instrument et vous font jouer de vrais morceaux en quelques heures. Une fois à l\'aise avec le son, vous pourrez naturellement aborder le solfège classique avec plus de sérénité.',
    category: 'Théorie',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=400',
    author: 'Thomas Bergersen',
    date: '10 Juin 2026',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // placeholder or custom design
  },
  {
    id: 'blog-3',
    title: 'Acheter son premier clavier numérique : Les critères essentiels',
    excerpt: 'Toucher lourd ou toucher léger ? 61 ou 88 touches ? Découvrez notre comparatif pour faire le bon choix sans vider votre compte bancaire.',
    content: 'Pour débuter le piano, le choix du premier clavier est crucial. Ne tombez pas dans le piège des claviers bon marché pour enfants sans résistance. Le critère numéro 1 est le "Toucher Lourd" ou "Hammer Action" : les touches doivent simuler la résistance d\'un vrai marteau de piano acoustique pour muscler vos doigts. Le deuxième critère est la sensibilité à la vélocité (le volume doit varier selon la force de votre appui). Enfin, privilégiez un clavier de 88 touches pour ne jamais vous sentir limité dans le registre aigu ou grave. Des marques comme Yamaha (P-45) ou Roland (FP-10) proposent d\'excellents modèles d\'entrée de gamme autour de 400€.',
    category: 'Matériel',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=400',
    author: 'Julien Ségur',
    date: '02 Juin 2026'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Comment débloquer l\'indépendance de la main gauche au piano ?',
    author: 'Lucas_Pia',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
    instrument: 'Piano',
    content: 'Salut la commu ! J\'en suis à la leçon 4 du cours de Thomas. Dès que ma main gauche commence à faire un accord, ma main droite s\'arrête de jouer le rythme ou fait exactement la même chose... Avez-vous des astuces magiques ou des exercices tout simples pour déconnecter les deux cerveaux ? Merci !',
    likes: 24,
    comments: [
      {
        id: 'c-1',
        author: 'Thomas Bergersen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        content: 'Salut Lucas ! C\'est tout à fait normal au début, rassure-toi. Mon conseil ultime : joue extrêmement lentement, au quart du tempo, jusqu\'à ce que ton cerveau puisse anticiper l\'impact de chaque doigt. Un autre exercice efficace est de taper la pulsation main gauche sur ta cuisse tout en récitant le rythme main droite à voix haute.',
        createdAt: 'Il y a 2 jours'
      },
      {
        id: 'c-2',
        author: 'MarieMusique',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
        content: 'Moi aussi j\'avais ce souci ! La méthode de taper sur la cuisse m\'a sauvée. Courage, un jour ça fait "clic" d\'un coup !',
        createdAt: 'Il y a 1 jour'
      }
    ],
    createdAt: 'Il y a 3 jours'
  },
  {
    id: 'post-2',
    title: 'J\'ai mal au bout des doigts à la guitare folk, est-ce normal ?',
    author: 'Antoine_Gtr',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100&h=100',
    instrument: 'Guitare',
    content: 'Bonjour à tous, je viens de commencer le cours de Julien. Après 15 minutes, j\'ai l\'impression que mes doigts brûlent sur les cordes en métal de ma folk. Faut-il insister ou est-ce que je pince trop fort ? Est-ce que la corne se forme rapidement ?',
    likes: 18,
    comments: [
      {
        id: 'c-3',
        author: 'Julien Ségur',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
        content: 'Salut Antoine ! Oui, c\'est le rite de passage de tout guitariste ! La corne commence à se former au bout de 2 à 3 semaines de pratique régulière (10 min par jour suffisent). Surtout, n\'appuie pas plus fort que nécessaire : appuie juste assez pour que la corde touche la frette et produise un son net.',
        createdAt: 'Il y a 1 jour'
      }
    ],
    createdAt: 'Il y a 2 jours'
  }
];

export const REVIEWS: Record<string, { author: string; rating: number; comment: string; date: string }[]> = {
  'course-piano-1': [
    { author: 'Pierre D.', rating: 5, comment: 'Pédagogie fantastique. Je n\'avais jamais touché un piano et après 4 jours je joue le thème de l\'Hymne à la Joie des deux mains !', date: '12 Juin 2026' },
    { author: 'Chloé M.', rating: 4, comment: 'Très bien structuré. Les vidéos sont courtes et droites au but. J\'aurais aimé encore plus d\'exercices main gauche.', date: '05 Juin 2026' }
  ],
  'course-guitar-1': [
    { author: 'Marc L.', rating: 5, comment: 'La rythmique feu de camp est expliquée d\'une manière tellement simple ! Julien est un prof formidable.', date: '14 Juin 2026' },
    { author: 'Sophie T.', rating: 5, comment: 'Génial ! Les partitions et PDF téléchargeables sont clairs et très utiles pour s\'entraîner hors écran.', date: '10 Juin 2026' }
  ],
  'course-chant-1': [
    { author: 'Karine A.', rating: 5, comment: 'Le travail de respiration m\'a non seulement aidée à chanter plus fort, mais aussi à réduire mon anxiété quotidienne. Merci !', date: '08 Juin 2026' }
  ],
  'course-production-1': [
    { author: 'Damien V.', rating: 4, comment: 'Excellent cours technique. La section sur la compression est une révélation, j\'ai enfin compris à quoi servent ces boutons.', date: '11 Juin 2026' }
  ]
};
