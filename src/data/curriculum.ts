import { Exercise } from '../types';

export const CURRICULUM_EXERCISES: Exercise[] = [
  {
    id: 'ex-ser-estar',
    title: 'Ser vs. Estar: Master the Two Spanish "To Be" Verbs',
    description: 'Practice differentiating permanent characteristics (SER: DOCTOR) from temporary states, locations, and emotions (ESTAR: PLACE).',
    level: 'Spanish 1 (Beginner)',
    category: 'Grammar',
    unit: 'Unit 2: Fundamentals of Spanish Verbs',
    estimatedMinutes: 5,
    questions: [
      {
        id: 'se-1',
        type: 'multiple_choice',
        prompt: 'Choose the correct form of SER or ESTAR:',
        contextSentence: 'Madrid ___ la capital de España.',
        options: ['es', 'está', 'son', 'están'],
        correctAnswer: 'es',
        audioText: 'Madrid es la capital de España.',
        explanation: 'We use SER ("es") for permanent identity and origin. Madrid being the capital is a permanent classification, not a temporary state.',
        grammarRule: 'SER is used for: Description, Origin, Characteristic, Time, Occupation, Relationship (DOCTOR).',
        hint: 'Think: Is being the capital an identity/fact or a temporary condition?'
      },
      {
        id: 'se-2',
        type: 'multiple_choice',
        prompt: 'Choose the correct form of SER or ESTAR:',
        contextSentence: 'Los estudiantes ___ nerviosos antes del examen final.',
        options: ['son', 'están', 'es', 'está'],
        correctAnswer: 'están',
        audioText: 'Los estudiantes están nerviosos antes del examen final.',
        explanation: 'We use ESTAR ("están") because nervousness is a temporary emotional and physical state, not a permanent character trait.',
        grammarRule: 'ESTAR is used for: Position, Location, Action (ing), Condition, Emotion (PLACE).',
        hint: 'Is nervousness a permanent trait or a temporary feeling?'
      },
      {
        id: 'se-3',
        type: 'fill_in_blank',
        prompt: 'Type the correct form of ESTAR in the blank:',
        spanishSentence: 'Mi mochila ___ debajo del pupitre.',
        englishTranslation: 'My backpack is under the school desk.',
        correctAnswer: 'está',
        acceptableAnswers: ['está', 'esta'],
        audioText: 'Mi mochila está debajo del pupitre.',
        explanation: 'Location is ALWAYS expressed with ESTAR, regardless of whether it is temporary or permanent.',
        grammarRule: 'Location rule: "No matter where you are or what you feel, always use the verb ESTAR."',
        hint: 'Use the singular 3rd person form of ESTAR with an accent mark (está).'
      },
      {
        id: 'se-4',
        type: 'sentence_scramble',
        prompt: 'Unscramble the words to build a grammatically correct Spanish sentence:',
        scrambledWords: ['profesora', 'Nuestra', 'muy', 'es', 'inteligente', 'y', 'amable.'],
        correctAnswer: 'Nuestra profesora es muy inteligente y amable.',
        audioText: 'Nuestra profesora es muy inteligente y amable.',
        explanation: 'Personality traits and descriptions (inteligente, amable) require SER ("es"). The possessive adjective "Nuestra" precedes "profesora".',
        grammarRule: 'Subject + SER + Adjective modifier.',
        hint: 'Start with "Nuestra profesora..."'
      },
      {
        id: 'se-5',
        type: 'conjugation',
        prompt: 'Complete the sentence with the correct present tense conjugation of ESTAR for "Nosotros":',
        contextSentence: 'Nosotros ___ en la clase de español ahora mismo.',
        options: ['estamos', 'somos', 'estáis', 'están'],
        correctAnswer: 'estamos',
        audioText: 'Nosotros estamos en la clase de español ahora mismo.',
        explanation: '"Nosotros estamos" indicates current physical location and presence in class.',
        grammarRule: 'Conjugation of Estar: yo estoy, tú estás, él/ella está, nosotros estamos, ellos/ellas están.',
        hint: 'We are in the classroom = Nosotros estamos'
      },
      {
        id: 'se-6',
        type: 'translation_open',
        prompt: 'Translate this English sentence into Spanish using proper accents:',
        englishTranslation: 'The soup is very hot today, but the chef is friendly.',
        correctAnswer: 'La sopa está muy caliente hoy, pero el chef es amable.',
        acceptableAnswers: [
          'La sopa está muy caliente hoy, pero el chef es amable.',
          'La sopa está muy caliente hoy, pero el cocinero es amable.',
          'La sopa está muy caliente hoy pero el cocinero es simpático.',
          'La sopa está muy caliente hoy pero el chef es simpático.'
        ],
        audioText: 'La sopa está muy caliente hoy, pero el cocinero es amable.',
        explanation: 'We use ESTAR for the temporary temperature of food ("está caliente") and SER for the chef\'s enduring personality ("es amable").',
        grammarRule: 'Food condition = Estar; Personality = Ser.',
        hint: 'Remember: soup temperature is ESTAR, chef personality is SER.'
      }
    ]
  },
  {
    id: 'ex-preterite-imperfect',
    title: 'Pretérito vs. Imperfecto: Narration in the Past',
    description: 'Master the distinction between completed past actions (Preterite) and ongoing background descriptions, habitual actions, and time/weather in the past (Imperfect).',
    level: 'Spanish 2 (Intermediate)',
    category: 'Grammar',
    unit: 'Unit 4: Storytelling & Past Tenses',
    estimatedMinutes: 7,
    questions: [
      {
        id: 'pi-1',
        type: 'multiple_choice',
        prompt: 'Choose the correct past tense form:',
        contextSentence: 'Ayer por la tarde, yo ___ una carta a mis abuelos en México.',
        options: ['escribí', 'escribía', 'escribo', 'he escribir'],
        correctAnswer: 'escribí',
        audioText: 'Ayer por la tarde, yo escribí una carta a mis abuelos en México.',
        explanation: '"Ayer por la tarde" signals a specific, completed past action with a defined timeframe, requiring the Preterite tense ("yo escribí").',
        grammarRule: 'Preterite trigger words: ayer, anoche, la semana pasada, de repente, una vez.',
        hint: '"Ayer" (yesterday) pinpoints a completed event in the preterite.'
      },
      {
        id: 'pi-2',
        type: 'multiple_choice',
        prompt: 'Choose the correct form for habitual childhood actions:',
        contextSentence: 'Cuando yo era niño, siempre ___ al fútbol en el parque con mis amigos.',
        options: ['jugaba', 'jugué', 'juego', 'jugando'],
        correctAnswer: 'jugaba',
        audioText: 'Cuando yo era niño, siempre jugaba al fútbol en el parque con mis amigos.',
        explanation: 'Habitual or repeated actions in the past ("siempre", "cuando era niño") require the Imperfect tense ("jugaba").',
        grammarRule: 'Imperfect trigger words: siempre, todos los días, a menudo, cada verano, mientras.',
        hint: 'Habitual repeated action in youth = Imperfect (jugaba).'
      },
      {
        id: 'pi-3',
        type: 'fill_in_blank',
        prompt: 'Type the correct form of the verb HACER (Imperfect) to describe the weather:',
        spanishSentence: '___ mucho frío cuando salimos de la escuela.',
        englishTranslation: 'It was very cold when we left school.',
        correctAnswer: 'Hacía',
        acceptableAnswers: ['Hacía', 'hacia', 'hacía'],
        audioText: 'Hacía mucho frío cuando salimos de la escuela.',
        explanation: 'Background weather descriptions in past narratives always use the Imperfect ("Hacía frío").',
        grammarRule: 'Weather and background scenery in the past take the Imperfect.',
        hint: 'Imperfect of hacer for weather is "hacía".'
      },
      {
        id: 'pi-4',
        type: 'sentence_scramble',
        prompt: 'Construct the interruptive past sentence (Imperfect action interrupted by Preterite event):',
        scrambledWords: ['Yo', 'estudiaba', 'cuando', 'el', 'teléfono', 'sonó.'],
        correctAnswer: 'Yo estudiaba cuando el teléfono sonó.',
        audioText: 'Yo estudiaba cuando el teléfono sonó.',
        explanation: 'The ongoing action was studying ("estudiaba" - Imperfect), which was interrupted by the phone ringing ("sonó" - Preterite).',
        grammarRule: 'Ongoing background (Imperfect) + Interruption (Preterite).',
        hint: 'Ongoing action first (estudiaba), then interruption (sonó).'
      },
      {
        id: 'pi-5',
        type: 'multiple_choice',
        prompt: 'Identify the verb that shows an exact age in the past:',
        contextSentence: 'Mateo ___ quince años cuando viajó a Costa Rica.',
        options: ['tenía', 'tuvo', 'tiene', 'tendría'],
        correctAnswer: 'tenía',
        audioText: 'Mateo tenía quince años cuando viajó a Costa Rica.',
        explanation: 'Expressing age in the past is an ongoing state and requires the Imperfect ("tenía quince años").',
        grammarRule: 'Age in the past is always expressed with the imperfect form of tener (tenía).',
        hint: 'Age in the past is treated as a continuous state (tenía).'
      }
    ]
  },
  {
    id: 'ex-por-para',
    title: 'Por vs. Para: Expressing Purpose, Cause & Motion',
    description: 'Learn when to use PARA (Goal, Recipient, Destination, Deadline) versus POR (Cause, Exchange, Duration, Means of Transportation).',
    level: 'Spanish 2 (Intermediate)',
    category: 'Grammar',
    unit: 'Unit 5: Essential Prepositions',
    estimatedMinutes: 5,
    questions: [
      {
        id: 'pp-1',
        type: 'multiple_choice',
        prompt: 'Select POR or PARA for the sentence below:',
        contextSentence: 'Este regalo es ___ mi mamá en su cumpleaños.',
        options: ['para', 'por', 'de', 'con'],
        correctAnswer: 'para',
        audioText: 'Este regalo es para mi mamá en su cumpleaños.',
        explanation: 'We use PARA to indicate the recipient of an object or gift (recipient = recipient rule).',
        grammarRule: 'PARA is used for: Perfect Purpose, Recipient, Deadline, Destination, Employment, Comparison.',
        hint: 'Mom is the final recipient of the gift.'
      },
      {
        id: 'pp-2',
        type: 'multiple_choice',
        prompt: 'Select POR or PARA for duration of time:',
        contextSentence: 'Estudiamos en la biblioteca ___ tres horas ayer.',
        options: ['por', 'para', 'durante de', 'a'],
        correctAnswer: 'por',
        audioText: 'Estudiamos en la biblioteca por tres horas ayer.',
        explanation: 'We use POR to express the length/duration of time an action took place ("por tres horas").',
        grammarRule: 'POR is used for: Duration, Exchange ($), Cause/Reason, Through/Along, Means of travel/communication.',
        hint: 'Duration of time requires POR.'
      },
      {
        id: 'pp-3',
        type: 'fill_in_blank',
        prompt: 'Type POR or PARA in the blank for destination/direction:',
        spanishSentence: 'El tren sale mañana temprano ___ Barcelona.',
        englishTranslation: 'The train departs early tomorrow for Barcelona.',
        correctAnswer: 'para',
        acceptableAnswers: ['para'],
        audioText: 'El tren sale mañana temprano para Barcelona.',
        explanation: 'Destination towards a physical place uses PARA ("para Barcelona").',
        grammarRule: 'Destination = PARA; Route through a place = POR.',
        hint: 'Heading towards a destination requires PARA.'
      },
      {
        id: 'pp-4',
        type: 'multiple_choice',
        prompt: 'Select the preposition used for an exchange or price:',
        contextSentence: 'Pagué veinte dólares ___ este libro de español.',
        options: ['por', 'para', 'en', 'con'],
        correctAnswer: 'por',
        audioText: 'Pagué veinte dólares por este libro de español.',
        explanation: 'Financial exchanges, trades, and prices always take POR ("por veinte dólares").',
        grammarRule: 'Exchange / Money = POR ("money for goods").',
        hint: 'Paying money in exchange for an item = POR.'
      }
    ]
  },
  {
    id: 'ex-restaurant-listening',
    title: 'En el Restaurante: Vocabulario y Comprensión Auditiva',
    description: 'Listen to authentic Spanish audio clips to practice ordering food, understanding menus, polite requests, and culinary vocabulary.',
    level: 'Spanish 1 (Beginner)',
    category: 'Listening',
    unit: 'Unit 3: Real-World Conversation & Dining',
    estimatedMinutes: 6,
    questions: [
      {
        id: 'rl-1',
        type: 'listening',
        prompt: 'Listen to the audio clip and select what the customer would like to order:',
        audioText: 'Buenas tardes. Para empezar, quisiera una ensalada mixta y agua mineral sin gas, por favor.',
        options: [
          'A mixed salad and sparkling water',
          'A mixed salad and still mineral water',
          'A fruit salad and orange juice',
          'A soup of the day and tap water'
        ],
        correctAnswer: 'A mixed salad and still mineral water',
        explanation: '"Ensalada mixta" means mixed salad, and "agua mineral sin gas" specifies still (non-carbonated) water.',
        grammarRule: '"Quisiera..." is the polite conditional form of querer (I would like...).',
        hint: 'Listen closely to the words "ensalada mixta" and "sin gas".'
      },
      {
        id: 'rl-2',
        type: 'fill_in_blank',
        prompt: 'Listen to the audio and fill in the missing polite Spanish word for "the check/bill":',
        audioText: 'Camarero, ¿nos trae la cuenta, por favor?',
        spanishSentence: 'Camarero, ¿nos trae la ___, por favor?',
        englishTranslation: 'Waiter, can you bring us the check, please?',
        correctAnswer: 'cuenta',
        acceptableAnswers: ['cuenta', 'la cuenta'],
        explanation: '"La cuenta" is the standard term for the bill/check at a restaurant in the Spanish-speaking world.',
        grammarRule: 'Asking for the bill: "¿Me trae la cuenta, por favor?" or "¿La cuenta, por favor?"',
        hint: 'The word sounds like "kwen-ta".'
      },
      {
        id: 'rl-3',
        type: 'multiple_choice',
        prompt: 'What dietary restriction is being expressed in the phrase below?',
        audioText: 'Soy vegetariana y alérgica a los mariscos.',
        contextSentence: 'Soy vegetariana y alérgica a los mariscos.',
        options: [
          'She is vegetarian and allergic to shellfish/seafood.',
          'She is vegan and cannot eat gluten or dairy.',
          'She only eats seafood and organic vegetables.',
          'She prefers spicy dishes without dairy.'
        ],
        correctAnswer: 'She is vegetarian and allergic to shellfish/seafood.',
        explanation: '"Mariscos" translates directly to shellfish / seafood.',
        grammarRule: 'Health/Diet: "Soy alérgico/a a..." + food item.',
        hint: '"Mariscos" relates to the sea (mar).'
      },
      {
        id: 'rl-4',
        type: 'sentence_scramble',
        prompt: 'Unscramble the Spanish phrase to politely ask for a table for two people:',
        scrambledWords: ['mesa', 'Quisiéramos', 'una', 'para', 'dos', 'personas.'],
        correctAnswer: 'Quisiéramos una mesa para dos personas.',
        audioText: 'Quisiéramos una mesa para dos personas.',
        explanation: '"Quisiéramos" (we would like) + "una mesa para dos personas" (a table for two people).',
        grammarRule: 'Conditional politeness formula: Quisiéramos + noun phrase.',
        hint: 'Start with "Quisiéramos..."'
      }
    ]
  },
  {
    id: 'ex-subjunctive-mood',
    title: 'El Subjuntivo: Expressing Wishes, Doubts & Recommendations',
    description: 'Practice the Present Subjunctive mood triggered by WEIRDOS (Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, Ojalá).',
    level: 'Spanish 3 / AP (Advanced)',
    category: 'Grammar',
    unit: 'Unit 6: Advanced Moods & Perspectives',
    estimatedMinutes: 7,
    questions: [
      {
        id: 'sub-1',
        type: 'multiple_choice',
        prompt: 'Select the correct subjunctive form:',
        contextSentence: 'La profesora quiere que los estudiantes ___ la tarea a tiempo.',
        options: ['hagan', 'hacen', 'hicieron', 'harán'],
        correctAnswer: 'hagan',
        audioText: 'La profesora quiere que los estudiantes hagan la tarea a tiempo.',
        explanation: '"Querer que..." expresses a wish with two different subjects (profesora -> estudiantes), which mandates the present subjunctive ("hagan").',
        grammarRule: 'WEIRDOS rule: Verb of wish/influence + "que" + different subject = Subjunctive mood.',
        hint: 'Opposite ending: -er/-ir verbs take "-a/-an" in present subjunctive (hacer -> hagan).'
      },
      {
        id: 'sub-2',
        type: 'multiple_choice',
        prompt: 'Determine whether Subjunctive or Indicative is required:',
        contextSentence: 'Dudo que nosotros ___ al partido mañana por la lluvia.',
        options: ['vayamos', 'vamos', 'fuimos', 'iremos'],
        correctAnswer: 'vayamos',
        audioText: 'Dudo que nosotros vayamos al partido mañana por la lluvia.',
        explanation: '"Dudar que..." expresses active doubt and uncertainty, which strictly requires the Subjunctive ("vayamos", irregular from IR).',
        grammarRule: 'Doubt (Dudar que, No creer que) -> Subjunctive. Certainty (Creer que, Es obvio que) -> Indicative.',
        hint: 'Doubt triggers the subjunctive. IR is irregular: vayamos.'
      },
      {
        id: 'sub-3',
        type: 'fill_in_blank',
        prompt: 'Conjugate the verb TENER in the present subjunctive for "tú":',
        spanishSentence: 'Es necesario que tú ___ mucho cuidado al manejar.',
        englishTranslation: 'It is necessary that you are very careful when driving.',
        correctAnswer: 'tengas',
        acceptableAnswers: ['tengas'],
        audioText: 'Es necesario que tú tengas mucho cuidado al manejar.',
        explanation: 'Impersonal expressions of necessity ("Es necesario que...") with a specific subject trigger the subjunctive ("tengas").',
        grammarRule: 'Yo-go stem change: tengo -> teng- -> tengas.',
        hint: 'Start with the "yo" present form (tengo), drop the -o, add opposite ending -as.'
      },
      {
        id: 'sub-4',
        type: 'translation_open',
        prompt: 'Translate this sentence into Spanish using the subjunctive mood:',
        englishTranslation: 'I hope that you have a wonderful weekend with your family.',
        correctAnswer: 'Espero que tengas un fin de semana maravilloso con tu familia.',
        acceptableAnswers: [
          'Espero que tengas un fin de semana maravilloso con tu familia.',
          'Espero que pases un fin de semana maravilloso con tu familia.',
          'Ojalá que tengas un fin de semana maravilloso con tu familia.',
          'Espero que tengas un buen fin de semana con tu familia.'
        ],
        audioText: 'Espero que tengas un fin de semana maravilloso con tu familia.',
        explanation: '"Espero que..." triggers the subjunctive form "tengas" or "pases".',
        grammarRule: 'Esperar que + Subjunctive expresses hope.',
        hint: 'Start with "Espero que tengas..."'
      }
    ]
  },
  {
    id: 'ex-latin-culture',
    title: 'Cultura Hispana: Tradiciones, Música y Leyendas',
    description: 'Read cultural passages about El Día de los Muertos, Las Fallas de Valencia, and biodiversity in Costa Rica while answering contextual questions.',
    level: 'Spanish 2 (Intermediate)',
    category: 'Culture',
    unit: 'Unit 7: Cultural Heritage & Reading',
    estimatedMinutes: 6,
    questions: [
      {
        id: 'cul-1',
        type: 'multiple_choice',
        prompt: 'Based on Mexican cultural traditions, what is the primary purpose of the "ofrenda" on Día de los Muertos?',
        contextSentence: 'En México, las familias preparan altares coloridos con flores de cempasúchil, pan de muerto, fotos y velas para honrar la memoria de sus seres queridos.',
        options: [
          'To celebrate the harvest festival in spring',
          'To honor and remember beloved deceased family members with love and joy',
          'To scare away evil spirits during the night of Halloween',
          'To compete for the most expensive artistic decorations in town'
        ],
        correctAnswer: 'To honor and remember beloved deceased family members with love and joy',
        explanation: 'Día de los Muertos is a joyous celebration of remembrance where families honor their deceased ancestors through welcoming altars.',
        grammarRule: 'Cultural literacy: "Honrar la memoria" = To honor the memory.',
        hint: 'Look at the phrase "honrar la memoria de sus seres queridos".'
      },
      {
        id: 'cul-2',
        type: 'sentence_scramble',
        prompt: 'Unscramble the famous Costa Rican national philosophy:',
        scrambledWords: ['vida', 'Pura', 'es', 'el', 'saludo', 'más', 'famoso', 'de', 'Costa', 'Rica.'],
        correctAnswer: 'Pura vida es el saludo más famoso de Costa Rica.',
        audioText: 'Pura vida es el saludo más famoso de Costa Rica.',
        explanation: '"¡Pura Vida!" represents Costa Rican optimism, gratitude, peaceful lifestyle, and connection to nature.',
        grammarRule: 'Cultural idiomatic expressions.',
        hint: 'Start with "Pura vida es..."'
      },
      {
        id: 'cul-3',
        type: 'fill_in_blank',
        prompt: 'Type the Spanish word for the traditional flower used in Mexican altars:',
        spanishSentence: 'La flor anaranjada tradicional del Día de los Muertos se llama ___.',
        englishTranslation: 'The traditional orange flower of Day of the Dead is called cempasúchil (marigold).',
        correctAnswer: 'cempasúchil',
        acceptableAnswers: ['cempasúchil', 'cempasuchil', 'la flor de cempasúchil'],
        audioText: 'La flor anaranjada tradicional del Día de los Muertos se llama cempasúchil.',
        explanation: 'The marigold (cempasúchil) with its bright orange petals and aroma is believed to guide ancestral spirits to the altars.',
        grammarRule: 'Nahuatl loan words in Mexican Spanish: cempasúchil.',
        hint: 'It starts with "cem..." and has an accent on the u: cempasúchil.'
      }
    ]
  }
];
