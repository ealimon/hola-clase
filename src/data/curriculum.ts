import { Exercise } from '../types';

export const CURRICULUM_EXERCISES: Exercise[] = [
  // ==========================================
  // SPANISH 1 (BEGINNER) - 3 UNITS x 10 QUESTIONS
  // ==========================================
  {
    id: 'sp1-u1-saludos',
    title: 'Unidad 1: Saludos, Presentaciones y Frases Cotidianas',
    description: 'Aprende los saludos formales e informales (tú vs. usted), preguntas de cortesía, presentaciones personales, números y días de la semana.',
    level: 'Spanish 1 (Beginner)',
    category: 'Conversation',
    unit: 'Spanish 1 - Unit 1: Saludos y Fundamentos',
    estimatedMinutes: 8,
    questions: [
      {
        id: 'sp1-u1-q1',
        type: 'multiple_choice',
        prompt: '¿Cómo saludarías de manera formal a tu directora o profesor?',
        contextSentence: 'Por la mañana al entrar a la escuela:',
        options: ['Buenos días, ¿cómo está usted?', '¡Hola! ¿Qué onda, tú?', 'Buenas noches, chao.', 'Hasta luego, amigo.'],
        correctAnswer: 'Buenos días, ¿cómo está usted?',
        explanation: '"Usted" es el pronombre de respeto formal utilizado con profesores, directores y personas mayores en el mundo hispanohablante.',
        grammarRule: 'Uso formal (Usted) vs. informal (Tú).',
        hint: 'Busca la opción que use el pronombre formal "usted".',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q2',
        type: 'fill_in_blank',
        prompt: 'Escribe la palabra que falta para completar la frase de cortesía en una presentación:',
        spanishSentence: 'Mucho ___, me llamo Mateo.',
        englishTranslation: 'Nice to meet you, my name is Mateo.',
        correctAnswer: 'gusto',
        acceptableAnswers: ['gusto', 'Gusto'],
        explanation: '"Mucho gusto" es la expresión estándar en español para decir "Nice to meet you" / "Encantado de conocerte".',
        grammarRule: 'Presentaciones personales: "Mucho gusto" o "Encantado/a".',
        hint: 'Significa "placer" o "agrado" (g-u-s-t-o).',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q3',
        type: 'multiple_choice',
        prompt: 'Selecciona la respuesta adecuada a la pregunta "¿Cómo te llamas?":',
        contextSentence: '—Hola, ¿cómo te llamas?',
        options: ['Me llamo Sofía.', 'Tengo quince años.', 'Estoy muy bien, gracias.', 'Soy de Madrid.'],
        correctAnswer: 'Me llamo Sofía.',
        explanation: 'La pregunta "¿Cómo te llamas?" indaga sobre el nombre personal y se responde con "Me llamo [nombre]".',
        grammarRule: 'Verbo reflexivo llamarse: Yo me llamo, tú te llamas.',
        hint: 'Responde con tu nombre usando el verbo llamarse.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una oración de saludo correcta:',
        scrambledWords: ['¿cómo', 'días,', 'hoy?', 'Buenos', 'estás'],
        correctAnswer: 'Buenos días, ¿cómo estás hoy?',
        explanation: 'Estructura estándar de saludo cordial: Saludo inicial ("Buenos días") + Pregunta de cortesía ("¿cómo estás hoy?").',
        grammarRule: 'Orden de saludo y signos de interrogación de apertura y cierre.',
        hint: 'Empieza con el saludo "Buenos días..."',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q5',
        type: 'translation_open',
        prompt: 'Traduce esta oración al español:',
        englishTranslation: 'Good morning, my name is Carlos.',
        correctAnswer: 'Buenos días, me llamo Carlos.',
        acceptableAnswers: [
          'Buenos días, me llamo Carlos.',
          'Buenos días, mi nombre es Carlos.',
          'Buen día, me llamo Carlos.',
          'Buen día, mi nombre es Carlos.'
        ],
        explanation: '"Good morning" se traduce como "Buenos días" o "Buen día", y "my name is" como "me llamo" o "mi nombre es".',
        grammarRule: 'Fórmulas fijas de saludo y presentación.',
        hint: 'Usa "Buenos días" y "me llamo Carlos".',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q6',
        type: 'multiple_choice',
        prompt: 'Completa la secuencia de los días de la semana:',
        contextSentence: 'Lunes, martes, miércoles, ___, viernes.',
        options: ['jueves', 'sábado', 'domingo', 'enero'],
        correctAnswer: 'jueves',
        explanation: 'El orden de la semana laboral en español es: lunes, martes, miércoles, jueves, viernes.',
        grammarRule: 'Los días de la semana en español no se escriben con mayúscula inicial a menos que comiencen una oración.',
        hint: 'El día entre miércoles y viernes es jueves.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q7',
        type: 'conjugation',
        prompt: 'Completa con la forma correcta del verbo SER para "Yo":',
        contextSentence: 'Yo ___ estudiante de primer año de secundaria.',
        options: ['soy', 'eres', 'es', 'somos'],
        correctAnswer: 'soy',
        explanation: 'La primera persona singular (Yo) del presente del verbo SER es "soy".',
        grammarRule: 'Conjugación de SER: yo soy, tú eres, él/ella es, nosotros somos, ellos son.',
        hint: 'Primera persona del singular de SER.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q8',
        type: 'fill_in_blank',
        prompt: 'Escribe la palabra de cortesía que falta para decir "Please" en español:',
        spanishSentence: 'Por ___, abre la puerta.',
        englishTranslation: 'Please, open the door.',
        correctAnswer: 'favor',
        acceptableAnswers: ['favor', 'Favor'],
        explanation: '"Por favor" es la frase universal en español para solicitar algo cortésmente.',
        grammarRule: 'Fórmulas de cortesía básica: Por favor, Gracias, De nada.',
        hint: 'Termina la frase "Por..." (f-a-v-o-r).',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u1-q9',
        type: 'sentence_scramble',
        prompt: 'Construye una frase para expresar edad y origen:',
        scrambledWords: ['Tengo', 'años', 'y', 'de', 'quince', 'soy', 'California.'],
        correctAnswer: 'Tengo quince años y soy de California.',
        explanation: 'En español la edad se expresa con el verbo TENER ("Tengo quince años") y el origen con SER ("soy de...").',
        grammarRule: 'Tener + [edad] + años; Ser + de + [lugar].',
        hint: 'Comienza expresando la edad con "Tengo quince años..."',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u1-q10',
        type: 'translation_open',
        prompt: 'Traduce esta despedida al español:',
        englishTranslation: 'See you tomorrow in Spanish class.',
        correctAnswer: 'Hasta mañana en la clase de español.',
        acceptableAnswers: [
          'Hasta mañana en la clase de español.',
          'Nos vemos mañana en la clase de español.',
          'Hasta mañana en clase de español.'
        ],
        explanation: '"See you tomorrow" se expresa naturalmente con "Hasta mañana" o "Nos vemos mañana".',
        grammarRule: 'Despedidas comunes: Hasta mañana, Hasta luego, Hasta la vista.',
        hint: 'Usa "Hasta mañana en la clase de español."',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'sp1-u2-ser-estar',
    title: 'Unidad 2: Ser vs. Estar y Descripción de Personas',
    description: 'Diferencia características permanentes y esenciales (SER: DOCTOR) de ubicaciones, estados emocionales y condiciones temporales (ESTAR: PLACE), junto con la concordancia de adjetivos.',
    level: 'Spanish 1 (Beginner)',
    category: 'Grammar',
    unit: 'Spanish 1 - Unit 2: Ser vs. Estar y Adjetivos',
    estimatedMinutes: 8,
    questions: [
      {
        id: 'sp1-u2-q1',
        type: 'multiple_choice',
        prompt: 'Elige la forma correcta de SER o ESTAR:',
        contextSentence: 'Madrid ___ la capital de España.',
        options: ['es', 'está', 'son', 'están'],
        correctAnswer: 'es',
        explanation: 'Usamos SER ("es") para hechos fundamentales, identidad geográfica y clasificación permanente.',
        grammarRule: 'SER = DOCTOR (Description, Origin, Characteristic, Time, Occupation, Relationship).',
        hint: 'Ser la capital es una identidad permanente del lugar.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q2',
        type: 'multiple_choice',
        prompt: 'Elige la forma correcta para un estado emocional temporal:',
        contextSentence: 'Los estudiantes ___ nerviosos antes del examen final.',
        options: ['están', 'son', 'es', 'está'],
        correctAnswer: 'están',
        explanation: 'Usamos ESTAR ("están") porque el nerviosismo es un estado emocional temporal y circunstancial.',
        grammarRule: 'ESTAR = PLACE (Position, Location, Action, Condition, Emotion).',
        hint: 'La emoción o estado de ánimo temporal requiere ESTAR.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q3',
        type: 'fill_in_blank',
        prompt: 'Completa con la forma correcta de ESTAR para ubicación física:',
        spanishSentence: 'Mi mochila ___ debajo del pupitre.',
        englishTranslation: 'My backpack is under the school desk.',
        correctAnswer: 'está',
        acceptableAnswers: ['está', 'esta'],
        explanation: 'La localización física de objetos o personas SIEMPRE se expresa con el verbo ESTAR.',
        grammarRule: 'Regla de ubicación: "Para indicar dónde estás o dónde está algo, siempre usa ESTAR".',
        hint: 'Forma singular de la 3.ª persona de ESTAR con tilde.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una descripción de personalidad:',
        scrambledWords: ['profesora', 'Nuestra', 'muy', 'es', 'inteligente', 'y', 'amable.'],
        correctAnswer: 'Nuestra profesora es muy inteligente y amable.',
        explanation: 'Los rasgos de personalidad duraderos requieren el verbo SER ("es inteligente y amable").',
        grammarRule: 'Sujeto + SER + Adjetivos calificativos.',
        hint: 'Comienza con "Nuestra profesora..."',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u2-q5',
        type: 'conjugation',
        prompt: 'Completa con la conjugación de ESTAR para "Nosotros":',
        contextSentence: 'Nosotros ___ en la biblioteca escolar ahora mismo.',
        options: ['estamos', 'somos', 'estáis', 'están'],
        correctAnswer: 'estamos',
        explanation: '"Nosotros estamos" indica la ubicación física actual del grupo.',
        grammarRule: 'Conjugación de Estar: estoy, estás, está, estamos, estáis, están.',
        hint: 'Forma de primera persona plural de ESTAR.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q6',
        type: 'translation_open',
        prompt: 'Traduce esta oración que combina estado físico y cualidad personal:',
        englishTranslation: 'The soup is very hot today, but the chef is friendly.',
        correctAnswer: 'La sopa está muy caliente hoy, pero el chef es amable.',
        acceptableAnswers: [
          'La sopa está muy caliente hoy, pero el chef es amable.',
          'La sopa está muy caliente hoy, pero el cocinero es amable.',
          'La sopa está muy caliente hoy pero el cocinero es simpático.',
          'La sopa está muy caliente hoy pero el chef es simpático.'
        ],
        explanation: 'La temperatura circunstancial de la comida usa ESTAR ("está caliente") y la personalidad usa SER ("es amable").',
        grammarRule: 'Condición temporal (Estar) vs. Característica inherente (Ser).',
        hint: 'Sopa -> está caliente; Chef -> es amable.',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u2-q7',
        type: 'multiple_choice',
        prompt: 'Selecciona el adjetivo que concuerda correctamente en género y número:',
        contextSentence: 'Las casas de mi vecindario son muy ___ y modernas.',
        options: ['altas', 'alto', 'alta', 'altos'],
        correctAnswer: 'altas',
        explanation: '"Las casas" es un sustantivo femenino plural, por lo que el adjetivo debe ser femenino plural ("altas").',
        grammarRule: 'Concordancia sustantivo-adjetivo: femenino plural -> terminación -as.',
        hint: '"Las casas" es femenino y plural.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q8',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma correcta de SER para expresar origen familiar:',
        spanishSentence: 'Mis abuelos ___ de Guadalajara, México.',
        englishTranslation: 'My grandparents are from Guadalajara, Mexico.',
        correctAnswer: 'son',
        acceptableAnswers: ['son'],
        explanation: 'El origen y la procedencia siempre se expresan con SER + de ("son de...").',
        grammarRule: 'Origen geográfico: SER + de + lugar.',
        hint: 'Tercera persona del plural de SER (s-o-n).',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u2-q9',
        type: 'multiple_choice',
        prompt: '¿Qué oración utiliza correctamente ESTAR para indicar una condición cambiante?',
        options: [
          'El café está frío, por favor caliéntalo.',
          'El café es frío siempre de origen.',
          'El café son caliente hoy.',
          'El café estás sabroso.'
        ],
        correctAnswer: 'El café está frío, por favor caliéntalo.',
        explanation: 'La temperatura del café es un estado temporal que puede cambiar (se enfría o se calienta), por lo que requiere ESTAR.',
        grammarRule: 'Estados temporales de alimentos = ESTAR.',
        hint: 'Indica una condición que cambió respecto al momento de prepararlo.',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u2-q10',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una descripción completa:',
        scrambledWords: ['trabajadores', 'Ellos', 'son', 'siempre', 'y', 'están', 'alegres.'],
        correctAnswer: 'Ellos son trabajadores y siempre están alegres.',
        explanation: 'Combina SER para un rasgo de carácter duradero ("son trabajadores") y ESTAR para una actitud o emoción ("están alegres").',
        grammarRule: 'Coordinación con Ser y Estar.',
        hint: 'Empieza con el sujeto "Ellos son trabajadores..."',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'sp1-u3-verbos-regulares',
    title: 'Unidad 3: Verbos Regulares en Presente y Vida Escolar',
    description: 'Aprende a conjugar los verbos regulares en presente (-AR, -ER, -IR) y utilízalos para describir tus clases, útiles y actividades del día a día.',
    level: 'Spanish 1 (Beginner)',
    category: 'Grammar',
    unit: 'Spanish 1 - Unit 3: Verbos Regulares y Escuela',
    estimatedMinutes: 8,
    questions: [
      {
        id: 'sp1-u3-q1',
        type: 'multiple_choice',
        prompt: 'Elige la conjugación correcta del verbo HABLAR para "Yo":',
        contextSentence: 'Yo ___ español e inglés en la escuela todos los días.',
        options: ['hablo', 'hablas', 'habla', 'hablamos'],
        correctAnswer: 'hablo',
        explanation: 'Para verbos regulares -AR en presente, la terminación de "yo" es siempre "-o" (habl- + o = hablo).',
        grammarRule: 'Terminaciones de verbos -AR en presente: -o, -as, -a, -amos, -áis, -an.',
        hint: 'La terminación de "yo" en presente es "-o".',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q2',
        type: 'conjugation',
        prompt: 'Conjuga el verbo COMER en presente para "Los chicos":',
        contextSentence: 'Los chicos ___ pizza en la cafetería escolar.',
        options: ['comen', 'come', 'comemos', 'coméis'],
        correctAnswer: 'comen',
        explanation: '"Los chicos" corresponde a la 3.ª persona plural (ellos), cuya terminación en verbos -ER es "-en" (com- + en = comen).',
        grammarRule: 'Terminaciones de verbos -ER en presente: -o, -es, -e, -emos, -éis, -en.',
        hint: 'Terminación plural de ellos para verbos -ER.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q3',
        type: 'fill_in_blank',
        prompt: 'Conjuga el verbo regular VIVIR (-IR) para la persona "Tú":',
        spanishSentence: '¿Dónde ___ tú con tu familia?',
        englishTranslation: 'Where do you live with your family?',
        correctAnswer: 'vives',
        acceptableAnswers: ['vives'],
        explanation: 'Para la persona "tú" en verbos -IR regulares, la terminación del presente es "-es" (viv- + es = vives).',
        grammarRule: 'Terminaciones de verbos -IR en presente: -o, -es, -e, -imos, -ís, -en.',
        hint: 'Raíz viv- + terminación -es.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una oración sobre el estudio escolar:',
        scrambledWords: ['examen', 'estudiamos', 'Nosotros', 'el', 'para', 'de', 'historia.'],
        correctAnswer: 'Nosotros estudiamos para el examen de historia.',
        explanation: 'Estructura: Sujeto ("Nosotros") + Verbo conjugado ("estudiamos") + Complemento de finalidad ("para el examen de historia").',
        grammarRule: 'Sujeto + Verbo + Preposición + Complemento.',
        hint: 'Inicia con el sujeto "Nosotros estudiamos..."',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u3-q5',
        type: 'translation_open',
        prompt: 'Traduce esta oración sobre hábitos escolares al español:',
        englishTranslation: 'She writes notes in her notebook every day.',
        correctAnswer: 'Ella escribe notas en su cuaderno todos los días.',
        acceptableAnswers: [
          'Ella escribe notas en su cuaderno todos los días.',
          'Ella escribe notas en su libreta todos los días.',
          'Ella escribe apuntes en su cuaderno todos los días.',
          'Ella escribe apuntes en su libreta todos los días.'
        ],
        explanation: '"Writes" = escribe (verbo escribir), "notebook" = cuaderno o libreta, "every day" = todos los días.',
        grammarRule: 'Conjugación regular de escribir (él/ella escribe).',
        hint: 'Usa "Ella escribe notas en su cuaderno todos los días."',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u3-q6',
        type: 'multiple_choice',
        prompt: 'Selecciona el útil escolar adecuado para completar la oración:',
        contextSentence: 'Para escribir y tomar apuntes en clase de matemáticas, necesito un ___ y un borrador.',
        options: ['lápiz', 'reloj', 'zapato', 'plato'],
        correctAnswer: 'lápiz',
        explanation: 'Un "lápiz" (pencil) es el útil escolar indispensable para escribir en papel.',
        grammarRule: 'Vocabulario de útiles y materiales escolares.',
        hint: 'Objeto de grafito que se usa para escribir y se puede borrar.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q7',
        type: 'conjugation',
        prompt: 'Conjuga el verbo ESCUCHAR para "Nosotros":',
        contextSentence: 'Nosotros ___ con atención las explicaciones de la profesora.',
        options: ['escuchamos', 'escuchan', 'escucháis', 'escuchas'],
        correctAnswer: 'escuchamos',
        explanation: 'La terminación de "nosotros" para verbos -AR en presente es "-amos" (escuch- + amos = escuchamos).',
        grammarRule: 'Conjugación de nosotros en -AR: raíz + -amos.',
        hint: 'Terminación de nosotros en -AR.',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q8',
        type: 'fill_in_blank',
        prompt: 'Completa con la forma "Yo" del verbo regular LEER en presente:',
        spanishSentence: 'Yo ___ una novela fantástica en la biblioteca.',
        englishTranslation: 'I read a fantastic novel in the library.',
        correctAnswer: 'leo',
        acceptableAnswers: ['leo'],
        explanation: 'El verbo leer en primera persona del singular (yo) termina en -o (le- + o = leo).',
        grammarRule: 'Verbos en -ER: yo leo, tú lees, él lee.',
        hint: 'Verbo leer para "yo" (l-e-o).',
        difficulty: 'easy'
      },
      {
        id: 'sp1-u3-q9',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para hablar de la labor de los docentes:',
        scrambledWords: ['profesores', 'Los', 'muchas', 'enseñan', 'materias', 'en', 'la', 'escuela.'],
        correctAnswer: 'Los profesores enseñan muchas materias en la escuela.',
        explanation: '"Los profesores" (sujeto plural) + "enseñan" (verbo enseñar conjugado en 3.ª plural) + complemento.',
        grammarRule: 'Concordancia de sujeto plural y verbo en 3.ª persona plural.',
        hint: 'Empieza con "Los profesores enseñan..."',
        difficulty: 'medium'
      },
      {
        id: 'sp1-u3-q10',
        type: 'translation_open',
        prompt: 'Traduce esta oración cotidiana al español:',
        englishTranslation: 'We eat lunch at noon with our friends.',
        correctAnswer: 'Nosotros almorzamos al mediodía con nuestros amigos.',
        acceptableAnswers: [
          'Nosotros almorzamos al mediodía con nuestros amigos.',
          'Nosotros comemos el almuerzo al mediodía con nuestros amigos.',
          'Almorzamos al mediodía con nuestros amigos.',
          'Comemos el almuerzo al mediodía con nuestros amigos.'
        ],
        explanation: '"To eat lunch" se puede expresar como "almorzar" o "comer el almuerzo", y "at noon" como "al mediodía".',
        grammarRule: 'Vocabulario horario y actividades del mediodía.',
        hint: 'Puedes usar "Nosotros almorzamos al mediodía con nuestros amigos."',
        difficulty: 'medium'
      }
    ]
  },

  // ==========================================
  // SPANISH 2 (INTERMEDIATE) - 3 UNITS x 10 QUESTIONS
  // ==========================================
  {
    id: 'sp2-u1-preterito-imperfecto',
    title: 'Unidad 1: Pretérito vs. Imperfecto y Narración en Pasado',
    description: 'Domina la narración en pasado distinguiendo acciones puntuales y concluidas (Pretérito) de descripciones de fondo, clima, edad, emociones y acciones habituales (Imperfecto).',
    level: 'Spanish 2 (Intermediate)',
    category: 'Grammar',
    unit: 'Spanish 2 - Unit 1: Pretérito vs. Imperfecto',
    estimatedMinutes: 9,
    questions: [
      {
        id: 'sp2-u1-q1',
        type: 'multiple_choice',
        prompt: 'Elige la forma verbal adecuada para una acción puntual y terminada en el pasado:',
        contextSentence: 'Ayer por la tarde, yo ___ una carta a mis abuelos en México.',
        options: ['escribí', 'escribía', 'escribo', 'he escribir'],
        correctAnswer: 'escribí',
        explanation: '"Ayer por la tarde" es un marcador temporal específico que delimita una acción completa y finalizada, requiriendo el Pretérito ("escribí").',
        grammarRule: 'Marcadores del pretérito: ayer, anoche, la semana pasada, el año pasado, de repente.',
        hint: '"Ayer" señala un evento puntual y cerrado en el tiempo.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q2',
        type: 'multiple_choice',
        prompt: 'Selecciona la forma correcta para una acción habitual y repetida en la infancia:',
        contextSentence: 'Cuando yo era niño, siempre ___ al fútbol en el parque con mis amigos.',
        options: ['jugaba', 'jugué', 'juego', 'jugando'],
        correctAnswer: 'jugaba',
        explanation: 'Las acciones habituales o repetidas en el pasado ("siempre", "cuando era niño") exigen el tiempo Imperfecto ("jugaba").',
        grammarRule: 'Marcadores del imperfecto: siempre, todos los días, a menudo, frecuentemente, mientras.',
        hint: 'Hábito continuo en el pasado = Imperfecto (terminación -aba).',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q3',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma del verbo HACER en Imperfecto para describir el clima de fondo en el pasado:',
        spanishSentence: '___ mucho frío cuando salimos de la escuela.',
        englishTranslation: 'It was very cold when we left school.',
        correctAnswer: 'Hacía',
        acceptableAnswers: ['Hacía', 'hacia', 'hacía'],
        explanation: 'Las descripciones del clima como fondo de una narración en el pasado siempre utilizan el Imperfecto ("Hacía frío").',
        grammarRule: 'El clima y escenario en el pasado toman el imperfecto (Hacer -> Hacía).',
        hint: 'Forma imperfecta de hacer: h-a-c-í-a.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena la oración para mostrar una acción continua interrumpida por un evento puntual:',
        scrambledWords: ['estudiaba', 'Yo', 'cuando', 'teléfono', 'el', 'sonó.'],
        correctAnswer: 'Yo estudiaba cuando el teléfono sonó.',
        explanation: 'La acción en progreso de fondo usa el Imperfecto ("estudiaba"), mientras que la interrupción puntual usa el Pretérito ("sonó").',
        grammarRule: 'Estructura: Acción en progreso (Imperfecto) + cuando + Acción que interrumpe (Pretérito).',
        hint: 'Primero la acción que estaba ocurriendo ("Yo estudiaba...") y luego la interrupción.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q5',
        type: 'multiple_choice',
        prompt: 'Identifica la forma verbal para expresar la edad de una persona en el pasado:',
        contextSentence: 'Mateo ___ quince años cuando viajó por primera vez a Costa Rica.',
        options: ['tenía', 'tuvo', 'tiene', 'tendría'],
        correctAnswer: 'tenía',
        explanation: 'Expresar la edad en el pasado describe un estado continuo y duradero, por lo que siempre se usa el Imperfecto de tener ("tenía").',
        grammarRule: 'La edad y la hora en el pasado se expresan siempre con el Imperfecto.',
        hint: 'Tener en imperfecto para edad es "tenía".',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q6',
        type: 'conjugation',
        prompt: 'Conjuga el verbo irregular IR en Pretérito para "Nosotros":',
        contextSentence: 'El sábado pasado nosotros ___ a la playa de excursión.',
        options: ['fuimos', 'íbamos', 'vamos', 'fueron'],
        correctAnswer: 'fuimos',
        explanation: 'El pretérito del verbo IR/SER para "nosotros" es "fuimos" (acción completada el sábado pasado).',
        grammarRule: 'Pretérito irregular de IR/SER: fui, fuiste, fue, fuimos, fuisteis, fueron.',
        hint: 'Forma irregular de nosotros en pretérito.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q7',
        type: 'translation_open',
        prompt: 'Traduce esta secuencia de acciones completadas al español usando el pretérito:',
        englishTranslation: 'Last night we ate tacos and watched a movie.',
        correctAnswer: 'Anoche comimos tacos y vimos una película.',
        acceptableAnswers: [
          'Anoche comimos tacos y vimos una película.',
          'Anoche nosotros comimos tacos y vimos una película.',
          'Anoche comimos tacos y miramos una película.',
          'Anoche nosotros comimos tacos y miramos una película.'
        ],
        explanation: '"Anoche" indica una serie de acciones concluidas y sucesivas en el pasado, conjugándose en pretérito: comimos y vimos.',
        grammarRule: 'Secuencia de eventos concluidos = Pretérito.',
        hint: 'Usa "Anoche comimos tacos y vimos una película."',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q8',
        type: 'multiple_choice',
        prompt: 'Completa con la forma verbal para acciones simultáneas en el pasado con "mientras":',
        contextSentence: 'Mientras mi madre cocinaba la cena, mi padre ___ el periódico en la sala.',
        options: ['leía', 'leyó', 'lee', 'ha leído'],
        correctAnswer: 'leía',
        explanation: 'Dos acciones continuas que ocurren simultáneamente en el pasado unidas por "mientras" van en Imperfecto (cocinaba / leía).',
        grammarRule: 'Mientras + Imperfecto + Imperfecto (acciones paralelas continuas).',
        hint: 'Ambas acciones ocurrían de forma paralela y continua en el pasado.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u1-q9',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma irregular en pretérito del verbo TENER para "Yo":',
        spanishSentence: 'Ayer por la tarde yo ___ que estudiar cinco horas seguidas.',
        englishTranslation: 'Yesterday afternoon I had to study for five consecutive hours.',
        correctAnswer: 'tuve',
        acceptableAnswers: ['tuve'],
        explanation: 'El verbo TENER tiene cambio de raíz en pretérito (tuv-) y la terminación de "yo" es "-e" sin tilde: "tuve".',
        grammarRule: 'Pretérito con raíz uv: tener -> tuv- (tuve, tuviste, tuvo, tuvimos, tuvieron).',
        hint: 'Raíz tuv- + terminación -e.',
        difficulty: 'hard'
      },
      {
        id: 'sp2-u1-q10',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para construir una narración con cambio de clima repentino:',
        scrambledWords: ['llover', 'comenzó', 'repente', 'caminábamos', 'hacia', 'a', 'De', 'mientras', 'casa.'],
        correctAnswer: 'De repente comenzó a llover mientras caminábamos hacia casa.',
        explanation: '"De repente comenzó..." (Pretérito puntual) irrumpe mientras la acción de fondo transcurría ("mientras caminábamos" - Imperfecto).',
        grammarRule: 'De repente (Pretérito) + mientras (Imperfecto).',
        hint: 'Empieza con el marcador repentino "De repente comenzó a llover..."',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'sp2-u2-por-para-pronombres',
    title: 'Unidad 2: Por vs. Para y Pronombres de Complemento',
    description: 'Aprende a dominar los usos contrastantes de Por y Para (motivo vs. finalidad, duración vs. plazo límite) y el reemplazo con pronombres de objeto directo e indirecto.',
    level: 'Spanish 2 (Intermediate)',
    category: 'Grammar',
    unit: 'Spanish 2 - Unit 2: Por vs. Para y Pronombres',
    estimatedMinutes: 9,
    questions: [
      {
        id: 'sp2-u2-q1',
        type: 'multiple_choice',
        prompt: 'Elige POR o PARA para indicar el destinatario de un objeto:',
        contextSentence: 'Este regalo especial es ___ mi mamá en el Día de las Madres.',
        options: ['para', 'por', 'de', 'hacia'],
        correctAnswer: 'para',
        explanation: 'Usamos PARA para indicar el destinatario o beneficiario final de una acción o regalo.',
        grammarRule: 'PARA = Destinatario, Límite de tiempo, Destino físico, Propósito.',
        hint: 'Indica para quién es el regalo (destinatario).',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u2-q2',
        type: 'multiple_choice',
        prompt: 'Elige POR o PARA para expresar la duración de tiempo de una actividad:',
        contextSentence: 'Estudiamos en la biblioteca central ___ tres horas ayer.',
        options: ['por', 'para', 'durante de', 'a'],
        correctAnswer: 'por',
        explanation: 'La duración o extensión de tiempo durante la cual ocurre una acción se expresa con POR ("por tres horas").',
        grammarRule: 'POR = Duración de tiempo, Causa/Razón, Intercambio, Medio de transporte/comunicación.',
        hint: 'Duración temporal requiere POR.',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u2-q3',
        type: 'fill_in_blank',
        prompt: 'Escribe POR o PARA para indicar dirección o destino hacia un lugar físico:',
        spanishSentence: 'El tren de alta velocidad sale temprano ___ Barcelona.',
        englishTranslation: 'The high-speed train departs early for Barcelona.',
        correctAnswer: 'para',
        acceptableAnswers: ['para'],
        explanation: 'El destino geográfico hacia donde alguien o algo se dirige toma PARA ("para Barcelona").',
        grammarRule: 'Destino hacia un lugar = PARA.',
        hint: 'Indica el destino final del viaje.',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u2-q4',
        type: 'multiple_choice',
        prompt: 'Selecciona la preposición adecuada para un intercambio monetario o precio:',
        contextSentence: 'Pagué veinte dólares ___ este libro de gramática española.',
        options: ['por', 'para', 'con', 'en'],
        correctAnswer: 'por',
        explanation: 'Las transacciones comerciales, precios y trueques siempre se expresan con POR ("pagar dinero por algo").',
        grammarRule: 'Intercambio comercial o equivalencia monetaria = POR.',
        hint: 'Dinero pagado a cambio de un objeto.',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u2-q5',
        type: 'multiple_choice',
        prompt: 'Elige el Pronombre de Objeto Directo (POD) que reemplaza a "el libro":',
        contextSentence: '—¿Tienes el libro de español? —Sí, ___ tengo aquí en mi mochila.',
        options: ['lo', 'la', 'los', 'le'],
        correctAnswer: 'lo',
        explanation: '"El libro" es un sustantivo masculino singular, por lo que su pronombre de objeto directo correspondiente es "lo".',
        grammarRule: 'Pronombres de Objeto Directo: me, te, lo/la, nos, os, los/las.',
        hint: '"El libro" es masculino singular.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u2-q6',
        type: 'fill_in_blank',
        prompt: 'Escribe el Pronombre de Objeto Indirecto (POI) para "a los estudiantes":',
        spanishSentence: 'La profesora ___ explicó la lección difícil a los estudiantes.',
        englishTranslation: 'The teacher explained the difficult lesson to the students.',
        correctAnswer: 'les',
        acceptableAnswers: ['les'],
        explanation: '"A los estudiantes" representa a la 3.ª persona plural como receptor indirecto, requiriendo el pronombre "les".',
        grammarRule: 'Pronombres de Objeto Indirecto: me, te, le, nos, os, les.',
        hint: 'Pronombre indirecto plural de ellos/ellas.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u2-q7',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una oración con pronombre indirecto:',
        scrambledWords: ['compró', 'Mi', 'hermano', 'nueva', 'ayer.', 'una', 'camiseta', 'me'],
        correctAnswer: 'Mi hermano me compró una camiseta nueva ayer.',
        explanation: 'El pronombre de objeto indirecto ("me") se coloca justo antes del verbo conjugado ("compró").',
        grammarRule: 'Posición de pronombres: antes del verbo conjugado.',
        hint: 'Coloca "me" antes de "compró".',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u2-q8',
        type: 'translation_open',
        prompt: 'Traduce al español reemplazando "the letter" con su pronombre directo:',
        englishTranslation: 'I will send it to you tomorrow.',
        correctAnswer: 'Te la enviaré mañana.',
        acceptableAnswers: [
          'Te la enviaré mañana.',
          'Te la mando mañana.',
          'Yo te la enviaré mañana.',
          'Yo te la voy a enviar mañana.',
          'Te la voy a enviar mañana.'
        ],
        explanation: 'En doble pronombre, el indirecto ("te") precede al directo ("la"): "Te la enviaré".',
        grammarRule: 'Orden de doble pronombre: Indirecto + Directo + Verbo (RID rule).',
        hint: 'Recuerda: Indirecto (te) + Directo (la) + Verbo.',
        difficulty: 'hard'
      },
      {
        id: 'sp2-u2-q9',
        type: 'multiple_choice',
        prompt: 'Aplica la regla de transformación de "le/les" a "se" ante pronombres "lo/la":',
        contextSentence: '—¿Le entregaste el informe al director? —Sí, ya ___ entregué.',
        options: ['se lo', 'le lo', 'se la', 'lo le'],
        correctAnswer: 'se lo',
        explanation: 'Cuando dos pronombres de tercera persona coinciden (le + lo), "le" se transforma obligatoriamente en "se" por eufonía ("se lo").',
        grammarRule: 'Regla fonética: le/les + lo/la/los/las -> se + lo/la/los/las.',
        hint: '"Le lo" cambia a "se lo".',
        difficulty: 'hard'
      },
      {
        id: 'sp2-u2-q10',
        type: 'translation_open',
        prompt: 'Traduce esta oración que contrasta POR (motivo/agradecimiento) y PARA (fecha límite):',
        englishTranslation: 'Thank you for your help; this project is for Friday.',
        correctAnswer: 'Gracias por tu ayuda; este proyecto es para el viernes.',
        acceptableAnswers: [
          'Gracias por tu ayuda; este proyecto es para el viernes.',
          'Gracias por tu ayuda, este proyecto es para el viernes.',
          'Gracias por su ayuda, este proyecto es para el viernes.'
        ],
        explanation: '"Gracias por" (motivo) vs. "para el viernes" (plazo límite de entrega).',
        grammarRule: 'Por = motivo/causa; Para = fecha límite.',
        hint: 'Usa "Gracias por..." y "...es para el viernes."',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'sp2-u3-rutinas-mandatos',
    title: 'Unidad 3: Rutinas Diarias, Verbos Reflexivos y Mandatos',
    description: 'Describe tu rutina diaria usando verbos reflexivos con cambio de raíz (despertarse, vestirse, acostarse) y da instrucciones con mandatos informales afirmativos y negativos.',
    level: 'Spanish 2 (Intermediate)',
    category: 'Grammar',
    unit: 'Spanish 2 - Unit 3: Rutinas y Mandatos',
    estimatedMinutes: 9,
    questions: [
      {
        id: 'sp2-u3-q1',
        type: 'multiple_choice',
        prompt: 'Elige la forma reflexiva correcta para la rutina matutina:',
        contextSentence: 'Todas las mañanas yo ___ a las seis y media en punto.',
        options: ['me despierto', 'me desperto', 'despierto me', 'se despierta'],
        correctAnswer: 'me despierto',
        explanation: 'El verbo reflexivo despertarse tiene diptongación en presente (e -> ie) para la primera persona: "me despierto".',
        grammarRule: 'Verbos reflexivos: pronombre reflexivo (me) + verbo con cambio de raíz (despierto).',
        hint: 'Recuerda el cambio de raíz e -> ie en "despertarse".',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u3-q2',
        type: 'fill_in_blank',
        prompt: 'Completa con el pronombre y verbo reflexivo LAVARSE en presente para "Mi hermano":',
        spanishSentence: 'Mi hermano ___ las manos antes de cada comida.',
        englishTranslation: 'My brother washes his hands before each meal.',
        correctAnswer: 'se lava',
        acceptableAnswers: ['se lava'],
        explanation: 'Para la 3.ª persona singular (él), el pronombre reflexivo es "se" y el verbo regular es "lava" ("se lava").',
        grammarRule: 'Pronombres reflexivos: me, te, se, nos, os, se.',
        hint: 'Pronombre "se" + verbo "lava".',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u3-q3',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para describir la rutina antes de ir al colegio:',
        scrambledWords: ['vestimos', 'al', 'colegio.', 'Nosotros', 'nos', 'salir', 'de', 'antes', 'rápidamente'],
        correctAnswer: 'Nosotros nos vestimos rápidamente antes de salir al colegio.',
        explanation: 'Estructura: Sujeto + pronombre reflexivo ("nos") + verbo conjugado ("vestimos") + adverbio ("rápidamente") + complemento.',
        grammarRule: 'Posición del pronombre reflexivo "nos" antes del verbo conjugado.',
        hint: 'Empieza con "Nosotros nos vestimos..."',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u3-q4',
        type: 'multiple_choice',
        prompt: 'Identifica el mandato afirmativo informal (tú) irregular del verbo HACER:',
        contextSentence: '¡___ la tarea completa antes de salir a jugar con tus amigos!',
        options: ['Haz', 'Haces', 'Haga', 'Haza'],
        correctAnswer: 'Haz',
        explanation: 'El mandato afirmativo informal (tú) del verbo HACER es irregular: "¡Haz!".',
        grammarRule: 'Mandatos afirmativos tú irregulares: di, haz, ve, pon, sal, sé, ten, ven.',
        hint: 'Es una palabra corta de tres letras: H-a-z.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u3-q5',
        type: 'multiple_choice',
        prompt: 'Elige el mandato negativo informal (tú) correcto para el verbo HABLAR:',
        contextSentence: '¡Por favor, no ___ mientras el profesor explica la lección!',
        options: ['hables', 'hablas', 'hable', 'no hablar'],
        correctAnswer: 'hables',
        explanation: 'Los mandatos negativos de "tú" utilizan la forma del presente de subjuntivo con terminación opuesta (hablar -> no hables).',
        grammarRule: 'Mandato negativo tú: No + terminación opuesta de subjuntivo (-ar toma -es; -er/-ir toma -as).',
        hint: 'Verbo -ar toma la terminación opuesta -es en mandato negativo.',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u3-q6',
        type: 'conjugation',
        prompt: 'Conjuga el verbo reflexivo con cambio de raíz ACOSTARSE (o -> ue) para "Los niños":',
        contextSentence: 'Los niños siempre ___ temprano los días de escuela.',
        options: ['se acuestan', 'se acostan', 'se acuesta', 'nos acostamos'],
        correctAnswer: 'se acuestan',
        explanation: '"Los niños" (ellos) toma el pronombre "se" y el cambio de raíz o -> ue (acostarse -> se acuestan).',
        grammarRule: 'Cambio de raíz o -> ue en verbos reflexivos de presente.',
        hint: 'Pronombre "se" y cambio de vocal a "ue".',
        difficulty: 'medium'
      },
      {
        id: 'sp2-u3-q7',
        type: 'translation_open',
        prompt: 'Traduce estas instrucciones directas (mandato afirmativo y mandato negativo):',
        englishTranslation: 'Wash your hands and do not eat in the classroom.',
        correctAnswer: 'Lávate las manos y no comas en el salón de clase.',
        acceptableAnswers: [
          'Lávate las manos y no comas en el salón de clase.',
          'Lávate las manos y no comas en la clase.',
          'Lávate las manos y no comas en el aula.'
        ],
        explanation: 'Mandato afirmativo reflexivo: Lávate (con pronombre adjunto al final) + Mandato negativo: no comas.',
        grammarRule: 'En mandatos afirmativos los pronombres se unen al final; en negativos van separados antes del verbo.',
        hint: 'Usa "Lávate las manos y no comas en el salón de clase."',
        difficulty: 'hard'
      },
      {
        id: 'sp2-u3-q8',
        type: 'multiple_choice',
        prompt: 'Selecciona el mandato afirmativo informal irregular de PONER:',
        contextSentence: '¡___ los platos y los cubiertos en la mesa para la cena familiar!',
        options: ['Pon', 'Pone', 'Ponga', 'Pones'],
        correctAnswer: 'Pon',
        explanation: 'El mandato afirmativo de "tú" para PONER es la forma irregular corta "¡Pon!".',
        grammarRule: 'Mandato afirmativo irregular de Poner: Pon.',
        hint: 'Forma irregular corta de tres letras: P-o-n.',
        difficulty: 'easy'
      },
      {
        id: 'sp2-u3-q9',
        type: 'fill_in_blank',
        prompt: 'Escribe el mandato negativo tú del verbo irregular IR:',
        spanishSentence: '¡No ___ solo a ese vecindario oscuro por la noche!',
        englishTranslation: 'Do not go alone to that dark neighborhood at night!',
        correctAnswer: 'vayas',
        acceptableAnswers: ['vayas'],
        explanation: 'El mandato negativo de tú para el verbo IR es irregular y proviene del subjuntivo: "¡No vayas!".',
        grammarRule: 'Mandato negativo irregular de IR: No vayas.',
        hint: 'Forma de subjuntivo tú de ir: v-a-y-a-s.',
        difficulty: 'hard'
      },
      {
        id: 'sp2-u3-q10',
        type: 'sentence_scramble',
        prompt: 'Ordena la secuencia lógica de una rutina matutina:',
        scrambledWords: ['Primero', 'me', 'ducho', 'la', 'ropa', 'y', 'limpia.', 'luego', 'pongo', 'me'],
        correctAnswer: 'Primero me ducho y luego me pongo la ropa limpia.',
        explanation: 'Conectores de secuencia temporal: "Primero me ducho y luego me pongo la ropa limpia".',
        grammarRule: 'Conectores temporales (Primero, luego, después) + Verbos reflexivos.',
        hint: 'Empieza con el conector "Primero me ducho..."',
        difficulty: 'medium'
      }
    ]
  },

  // ==========================================
  // SPANISH 3 (ADVANCED) - 3 UNITS x 10 QUESTIONS
  // ==========================================
  {
    id: 'sp3-u1-subjuntivo-presente',
    title: 'Unidad 1: El Modo Subjuntivo en el Presente (WEIRDOS)',
    description: 'Domina el modo subjuntivo para expresar deseos, dudas, emociones, expresiones impersonales, recomendaciones y situaciones hipotéticas con el acrónimo WEIRDOS.',
    level: 'Spanish 3 / AP (Advanced)',
    category: 'Grammar',
    unit: 'Spanish 3 - Unit 1: Presente de Subjuntivo',
    estimatedMinutes: 10,
    questions: [
      {
        id: 'sp3-u1-q1',
        type: 'multiple_choice',
        prompt: 'Elige la forma del subjuntivo requerida por un verbo de deseo con cambio de sujeto:',
        contextSentence: 'La profesora quiere que los estudiantes ___ la tarea antes de las cinco.',
        options: ['hagan', 'hacen', 'hicieron', 'harán'],
        correctAnswer: 'hagan',
        explanation: '"Querer que..." expresa voluntad/deseo con dos sujetos distintos (profesora -> estudiantes), exigiendo el Presente de Subjuntivo ("hagan").',
        grammarRule: 'Cláusula principal (Deseo) + que + Cláusula subordinada (Subjuntivo).',
        hint: 'Verbo de influencia + que + sujeto diferente -> Subjuntivo (hacer -> hagan).',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q2',
        type: 'multiple_choice',
        prompt: 'Determina si la oración expresa duda (subjuntivo) o certeza (indicativo):',
        contextSentence: 'Dudo que nosotros ___ al partido mañana debido a la fuerte lluvia.',
        options: ['vayamos', 'vamos', 'fuimos', 'iremos'],
        correctAnswer: 'vayamos',
        explanation: '"Dudar que..." expresa duda e incertidumbre explícita, lo cual exige el Subjuntivo ("vayamos", forma irregular de IR).',
        grammarRule: 'Duda/Incertidumbre (Dudo que, No creo que) -> Subjuntivo. Certeza (Creo que, Es obvio que) -> Indicativo.',
        hint: 'La duda activa siempre detona el subjuntivo. Ir -> vayamos.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q3',
        type: 'fill_in_blank',
        prompt: 'Conjuga el verbo irregular TENER en presente de subjuntivo para "Tú":',
        spanishSentence: 'Es necesario que tú ___ mucho cuidado al conducir de noche.',
        englishTranslation: 'It is necessary that you are very careful when driving at night.',
        correctAnswer: 'tengas',
        acceptableAnswers: ['tengas'],
        explanation: 'Expresión impersonal de necesidad ("Es necesario que...") + sujeto específico -> Subjuntivo con raíz "yo-go": tengo -> teng- + as = tengas.',
        grammarRule: 'Fórmula de formación del subjuntivo: Raíz de "yo" presente + terminación opuesta.',
        hint: 'Raíz teng- + terminación opuesta -as.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q4',
        type: 'translation_open',
        prompt: 'Traduce esta oración que expresa un deseo cordial usando el subjuntivo:',
        englishTranslation: 'I hope that you have a wonderful weekend with your family.',
        correctAnswer: 'Espero que tengas un fin de semana maravilloso con tu familia.',
        acceptableAnswers: [
          'Espero que tengas un fin de semana maravilloso con tu familia.',
          'Espero que pases un fin de semana maravilloso con tu familia.',
          'Ojalá que tengas un fin de semana maravilloso con tu familia.',
          'Espero que pases un maravilloso fin de semana con tu familia.'
        ],
        explanation: '"Espero que..." detona el subjuntivo ("tengas" o "pases") para expresar esperanza y buenos deseos.',
        grammarRule: 'Esperar que / Ojalá que + Subjuntivo.',
        hint: 'Usa "Espero que tengas un fin de semana maravilloso con tu familia."',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q5',
        type: 'multiple_choice',
        prompt: 'Elige el verbo en subjuntivo detonado por una reacción emocional:',
        contextSentence: 'Me alegro muchísimo de que ustedes ___ a nuestra fiesta de graduación.',
        options: ['vengan', 'vienen', 'vendrán', 'vinieron'],
        correctAnswer: 'vengan',
        explanation: 'Las expresiones de sentimiento o emoción ("Alegrarse de que...") exigen el subjuntivo en la cláusula subordinada.',
        grammarRule: 'Emoción (Me alegro de que, Siento que, Temo que) + Subjuntivo.',
        hint: 'Venir en presente de subjuntivo para ustedes: vengan.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q6',
        type: 'fill_in_blank',
        prompt: 'Conjuga el verbo altamente irregular SABER en presente de subjuntivo para "él/ella":',
        spanishSentence: 'La empresa busca un candidato que ___ hablar tres idiomas fluidamente.',
        englishTranslation: 'The company is looking for a candidate who knows how to speak three languages fluently.',
        correctAnswer: 'sepa',
        acceptableAnswers: ['sepa'],
        explanation: 'Un antecedente indefinido o no confirmado ("un candidato que...") exige subjuntivo. Saber es irregular: "sepa".',
        grammarRule: 'Subjuntivo con cláusulas adjetivales de antecedente desconocido/indefinido.',
        hint: 'Forma irregular de saber en subjuntivo (s-e-p-a).',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u1-q7',
        type: 'sentence_scramble',
        prompt: 'Ordena la oración con la interjección "Ojalá":',
        scrambledWords: ['llueva', 'Ojalá', 'música.', 'que', 'el', 'festival', 'no', 'durante', 'de'],
        correctAnswer: 'Ojalá que no llueva durante el festival de música.',
        explanation: '"Ojalá (que)..." de origen árabe significa "Dios quiera" y siempre se construye con el modo Subjuntivo ("no llueva").',
        grammarRule: 'Ojalá + Subjuntivo.',
        hint: 'Empieza con la exclamación "Ojalá que no llueva..."',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q8',
        type: 'multiple_choice',
        prompt: 'Selecciona la forma en subjuntivo debido a la existencia negativa del antecedente:',
        contextSentence: 'No hay nadie en esta sala que ___ la respuesta exacta a este dilema.',
        options: ['conozca', 'conoce', 'conoció', 'conocerá'],
        correctAnswer: 'conozca',
        explanation: 'Cuando el antecedente es negado ("No hay nadie que...", "No existe nada que..."), la cláusula subordinada debe ir en Subjuntivo.',
        grammarRule: 'Antecedente inexistente o negativo (Nadie, Nada, Ninguno) -> Subjuntivo.',
        hint: 'Verbo conocer en subjuntivo: conozca.',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u1-q9',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma de SER en presente de subjuntivo para "Nosotros":',
        spanishSentence: 'Es fundamental que todos nosotros ___ honestos y responsables en el trabajo.',
        englishTranslation: 'It is fundamental that all of us are honest and responsible at work.',
        correctAnswer: 'seamos',
        acceptableAnswers: ['seamos'],
        explanation: 'La forma de primera persona plural (nosotros) de SER en presente de subjuntivo es "seamos".',
        grammarRule: 'Subjuntivo irregular de SER: sea, seas, sea, seamos, seáis, sean.',
        hint: 'Forma de nosotros en subjuntivo: s-e-a-m-o-s.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u1-q10',
        type: 'translation_open',
        prompt: 'Traduce esta oración que expresa recomendación e insistencia de los padres:',
        englishTranslation: 'My parents insist that I study before going out with my friends.',
        correctAnswer: 'Mis padres insisten en que yo estudie antes de salir con mis amigos.',
        acceptableAnswers: [
          'Mis padres insisten en que yo estudie antes de salir con mis amigos.',
          'Mis padres insisten en que estudie antes de salir con mis amigos.'
        ],
        explanation: '"Insistir en que..." expresa influencia sobre otra persona y exige el subjuntivo ("estudie").',
        grammarRule: 'Verbos de influencia e insistencia + en que + Subjuntivo.',
        hint: 'Usa "Mis padres insisten en que yo estudie antes de salir con mis amigos."',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'sp3-u2-futuro-condicional',
    title: 'Unidad 2: El Futuro, el Condicional y Situaciones Hipotéticas',
    description: 'Proyecta metas futuras, expresa probabilidad o conjetura en el presente y formula hipótesis o peticiones de máxima cortesía con el condicional simple.',
    level: 'Spanish 3 / AP (Advanced)',
    category: 'Grammar',
    unit: 'Spanish 3 - Unit 2: Futuro y Condicional',
    estimatedMinutes: 10,
    questions: [
      {
        id: 'sp3-u2-q1',
        type: 'multiple_choice',
        prompt: 'Elige la forma irregular correcta del futuro simple para el verbo TENER (Nosotros):',
        contextSentence: 'El próximo año nosotros ___ más oportunidades académicas y profesionales.',
        options: ['tendremos', 'teneremos', 'tenemos', 'tendríamos'],
        correctAnswer: 'tendremos',
        explanation: 'El verbo TENER tiene raíz irregular en futuro (tendr-) y se le añade la terminación "-emos" con tilde ausente en nosotros: "tendremos".',
        grammarRule: 'Raíces irregulares de futuro y condicional: tener -> tendr-, poder -> podr-, hacer -> har-, decir -> dir-.',
        hint: 'Raíz tendr- + terminación de nosotros -emos.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q2',
        type: 'multiple_choice',
        prompt: 'Identifica el uso del Futuro de Probabilidad o Conjetura en el presente:',
        contextSentence: '—¿Qué hora es? —No tengo reloj, pero ___ las cuatro de la tarde.',
        options: ['serán', 'son', 'fueron', 'serían'],
        correctAnswer: 'serán',
        explanation: 'En español, el tiempo Futuro se utiliza frecuentemente para formular una hipótesis o cálculo aproximado en el presente ("Serán las cuatro" = It must be around four).',
        grammarRule: 'Futuro de probabilidad: expresa conjetura o suposición en tiempo presente.',
        hint: 'Expresa suposición de la hora actual en tiempo futuro.',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u2-q3',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma del verbo irregular HACER en futuro simple para "Yo":',
        spanishSentence: 'Mañana por la mañana yo ___ todo lo posible por ayudarte.',
        englishTranslation: 'Tomorrow morning I will do everything possible to help you.',
        correctAnswer: 'haré',
        acceptableAnswers: ['haré', 'hare'],
        explanation: 'HACER cambia su raíz a "har-" en futuro, y para "yo" se le añade "-é" con tilde: "haré".',
        grammarRule: 'Hacer en futuro: haré, harás, hará, haremos, haréis, harán.',
        hint: 'Raíz har- con tilde en la e: h-a-r-é.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena las palabras para formar una cláusula condicional hipotética con el condicional simple:',
        scrambledWords: ['viajaría', 'América', 'tuviera', 'Si', 'por', 'tiempo,', 'más', 'Latina.', 'toda'],
        correctAnswer: 'Si tuviera más tiempo, viajaría por toda América Latina.',
        explanation: 'Estructura condicional hipotética: "Si + Imperfecto de subjuntivo (tuviera), Condicional simple (viajaría)".',
        grammarRule: 'Cláusulas condicionales irreales: Si + Subjuntivo pasado -> Condicional.',
        hint: 'Empieza con la condición hipotética "Si tuviera más tiempo..."',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u2-q5',
        type: 'multiple_choice',
        prompt: 'Elige la forma del condicional que expresa una petición de cortesía formal:',
        contextSentence: 'Disculpe, ¿___ usted la amabilidad de abrir la ventana, por favor?',
        options: ['tendría', 'tiene', 'tendrá', 'tenga'],
        correctAnswer: 'tendría',
        explanation: 'El condicional simple ("tendría", "podría", "desearía") suaviza las peticiones formales transformándolas en fórmulas de alta cortesía.',
        grammarRule: 'El condicional de cortesía se usa para peticiones respetuosas y delicadas.',
        hint: 'Usa el condicional de tener para usted.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q6',
        type: 'translation_open',
        prompt: 'Traduce esta proyección profesional al futuro simple en español:',
        englishTranslation: 'In ten years, I will be a doctor and live in Madrid.',
        correctAnswer: 'En diez años, seré médico y viviré en Madrid.',
        acceptableAnswers: [
          'En diez años, seré médico y viviré en Madrid.',
          'En diez años, seré doctor y viviré en Madrid.',
          'En diez años, seré doctora y viviré en Madrid.',
          'En diez años seré médico y viviré en Madrid.'
        ],
        explanation: 'Los verbos ser y vivir en primera persona singular del futuro: seré y viviré.',
        grammarRule: 'Futuro simple regular: infinitivo + -é, -ás, -á, -emos, -éis, -án.',
        hint: 'Usa "En diez años, seré médico y viviré en Madrid."',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q7',
        type: 'fill_in_blank',
        prompt: 'Escribe la forma condicional del verbo irregular PODER para "Tú":',
        spanishSentence: '¿___ tú ayudarme a revisar este ensayo antes de entregarlo?',
        englishTranslation: 'Could you help me review this essay before handing it in?',
        correctAnswer: 'podrías',
        acceptableAnswers: ['podrías', 'podrias'],
        explanation: 'PODER tiene raíz irregular (podr-) y la terminación de condicional para "tú" es "-ías" con tilde: "podrías".',
        grammarRule: 'Condicional de Poder: podría, podrías, podría, podríamos, podríais, podrían.',
        hint: 'Raíz podr- + terminación -ías.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q8',
        type: 'multiple_choice',
        prompt: 'Selecciona la conjugación correcta del verbo PONER en futuro para "Ellos":',
        contextSentence: 'Los viajeros ___ sus maletas en el compartimento superior del tren.',
        options: ['pondrán', 'ponrán', 'ponerán', 'pondrían'],
        correctAnswer: 'pondrán',
        explanation: 'PONER cambia a "pondr-" en futuro, y para ellos la terminación es "-án": "pondrán".',
        grammarRule: 'Futuro irregular de Poner: pondré, pondrás, pondrá, pondremos, pondrán.',
        hint: 'Raíz pondr- + terminación -án.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q9',
        type: 'sentence_scramble',
        prompt: 'Ordena la oración para hablar sobre un logro futuro:',
        scrambledWords: ['con', 'Nosotros', 'nos', 'al', 'graduaremos', 'semestre.', 'final', 'del', 'honores'],
        correctAnswer: 'Nosotros nos graduaremos con honores al final del semestre.',
        explanation: 'Verbo reflexivo graduarse en futuro ("nos graduaremos") con complemento circunstancial.',
        grammarRule: 'Pronombre reflexivo + verbo en futuro simple.',
        hint: 'Comienza con "Nosotros nos graduaremos con honores..."',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u2-q10',
        type: 'translation_open',
        prompt: 'Traduce esta clásica pregunta hipotética al español:',
        englishTranslation: 'What would you do if you won the lottery?',
        correctAnswer: '¿Qué harías si ganaras la lotería?',
        acceptableAnswers: [
          '¿Qué harías si ganaras la lotería?',
          '¿Qué harías si ganases la lotería?',
          '¿Qué harías tú si ganaras la lotería?',
          '¿Qué harías tú si ganases la lotería?'
        ],
        explanation: 'Condicional en la pregunta principal ("¿Qué harías...?") + Si con imperfecto de subjuntivo ("...si ganaras/ganases la lotería").',
        grammarRule: 'Condicional simple + Si + Imperfecto de subjuntivo.',
        hint: 'Usa "¿Qué harías si ganaras la lotería?"',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'sp3-u3-tiempos-compuestos-pasado',
    title: 'Unidad 3: Tiempos Compuestos, Imperfecto de Subjuntivo y Cláusulas Condicionales',
    description: 'Aprende a articular narraciones complejas con el Pretérito Perfecto (he vivido), el Pluscuamperfecto (había salido), el Imperfecto de Subjuntivo (-ra/-se) y oraciones condicionales avanzadas.',
    level: 'Spanish 3 / AP (Advanced)',
    category: 'Grammar',
    unit: 'Spanish 3 - Unit 3: Tiempos Compuestos y Si Clauses',
    estimatedMinutes: 10,
    questions: [
      {
        id: 'sp3-u3-q1',
        type: 'multiple_choice',
        prompt: 'Completa con el participio irregular del verbo ESCRIBIR para el pretérito perfecto:',
        contextSentence: 'Hoy por la mañana yo he ___ un correo electrónico muy detallado al decano.',
        options: ['escrito', 'escribido', 'escribiendo', 'escrito'],
        correctAnswer: 'escrito',
        explanation: 'El participio pasivo de ESCRIBIR es irregular: "escrito" (haber + escrito).',
        grammarRule: 'Participios irregulares comunes: abrir -> abierto, decir -> dicho, escribir -> escrito, hacer -> hecho, poner -> puesto, ver -> visto, volver -> vuelto.',
        hint: 'El participio irregular de escribir es "escrito".',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u3-q2',
        type: 'multiple_choice',
        prompt: 'Identifica la forma del Pluscuamperfecto para una acción anterior a otro evento pasado:',
        contextSentence: 'Cuando por fin llegamos a la estación central, el tren ya ___ diez minutos antes.',
        options: ['había salido', 'ha salido', 'hubo salido', 'salía'],
        correctAnswer: 'había salido',
        explanation: 'El Pluscuamperfecto (había + participio) expresa una acción pasada que concluyó antes de otro punto específico en el pasado.',
        grammarRule: 'Pluscuamperfecto de indicativo: Imperfecto de haber (había, habías, había, habíamos, habían) + Participio.',
        hint: 'Acción que ocurrió antes de la llegada en el pasado.',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q3',
        type: 'fill_in_blank',
        prompt: 'Conjuga el verbo TENER en Imperfecto de Subjuntivo (-ra) para "Yo":',
        spanishSentence: 'Si yo ___ más tiempo libre, aprendería a tocar el violín.',
        englishTranslation: 'If I had more free time, I would learn to play the violin.',
        correctAnswer: 'tuviera',
        acceptableAnswers: ['tuviera', 'tuviese'],
        explanation: 'El imperfecto de subjuntivo se deriva de la 3.ª persona plural del pretérito (tuvieron -> tuvie-) + terminación "-ra" o "-se": "tuviera" / "tuviese".',
        grammarRule: 'Formación del imperfecto de subjuntivo: Raíz de "ellos" en pretérito + -ra, -ras, -ra, -ramos, -rais, -ran.',
        hint: 'Raíz tuvie- + terminación -ra.',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q4',
        type: 'sentence_scramble',
        prompt: 'Ordena la oración condicional compuesta sobre el pasado (tercer condicional):',
        scrambledWords: ['la', 'habríamos', 'sabido', 'otra', 'verdad,', 'Si', 'hubiéramos', 'decisión.', 'tomado'],
        correctAnswer: 'Si hubiéramos sabido la verdad, habríamos tomado otra decisión.',
        explanation: 'Condicional imposible en el pasado: Si + Pluscuamperfecto de subjuntivo (hubiéramos sabido) + Condicional compuesto (habríamos tomado).',
        grammarRule: 'Tercer condicional: Si + Pluscuamperfecto de subjuntivo -> Condicional perfecto.',
        hint: 'Empieza con la condición en pasado "Si hubiéramos sabido la verdad..."',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q5',
        type: 'multiple_choice',
        prompt: 'Elige la concordancia temporal en subjuntivo cuando la cláusula principal está en pretérito:',
        contextSentence: 'El profesor nos recomendó encarecidamente que ___ el artículo dos veces antes del debate.',
        options: ['leyéramos', 'leamos', 'leemos', 'habíamos leído'],
        correctAnswer: 'leyéramos',
        explanation: 'Cuando el verbo principal está en pasado ("recomendó" - pretérito), la cláusula subordinada debe ir en Imperfecto de Subjuntivo ("leyéramos").',
        grammarRule: 'Secuencia de tiempos (Consecutio Temporum): Verbo principal en pasado -> Subjuntivo en pasado.',
        hint: 'Verbo de recomendación en pasado exige subjuntivo en imperfecto (leyéramos).',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q6',
        type: 'translation_open',
        prompt: 'Traduce esta oración con pretérito perfecto compuesto:',
        englishTranslation: 'We have lived in this city for five years.',
        correctAnswer: 'Hemos vivido en esta ciudad por cinco años.',
        acceptableAnswers: [
          'Hemos vivido en esta ciudad por cinco años.',
          'Hemos vivido en esta ciudad durante cinco años.',
          'Nosotros hemos vivido en esta ciudad por cinco años.',
          'Hace cinco años que vivimos en esta ciudad.'
        ],
        explanation: '"We have lived" se conjuga en pretérito perfecto: "hemos vivido" (haber en presente + participio de vivir).',
        grammarRule: 'Pretérito perfecto: hemos + vivido.',
        hint: 'Usa "Hemos vivido en esta ciudad por cinco años."',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u3-q7',
        type: 'fill_in_blank',
        prompt: 'Escribe el participio irregular del verbo DECIR:',
        spanishSentence: 'Ellos siempre han ___ la verdad a sus profesores y consejeros.',
        englishTranslation: 'They have always told the truth to their teachers and counselors.',
        correctAnswer: 'dicho',
        acceptableAnswers: ['dicho'],
        explanation: 'El participio de DECIR es irregular: "dicho" (d-i-c-h-o).',
        grammarRule: 'Participio irregular de Decir: dicho.',
        hint: 'Palabra de cinco letras: d-i-c-h-o.',
        difficulty: 'medium'
      },
      {
        id: 'sp3-u3-q8',
        type: 'multiple_choice',
        prompt: 'Selecciona la forma del Imperfecto de Subjuntivo de IR/SER:',
        contextSentence: 'A todos nos sorprendió mucho que ellos no ___ a la conferencia de liderazgo estudiantil.',
        options: ['fueran', 'vayan', 'van', 'fueron'],
        correctAnswer: 'fueran',
        explanation: 'Emoción en el pasado ("sorprendió que...") con sujeto diferente exige Imperfecto de Subjuntivo ("fueran" / "fuesen").',
        grammarRule: 'Sorprender en pretérito + que + Imperfecto de subjuntivo (fueran).',
        hint: 'Forma en pasado de subjuntivo de ir/ser.',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q9',
        type: 'sentence_scramble',
        prompt: 'Ordena la oración que expresa un deseo difícil con "Ojalá":',
        scrambledWords: ['viajar', 'al', 'Ojalá', 'pudiéramos', 'espacio', 'día.', 'que', 'algún'],
        correctAnswer: 'Ojalá que pudiéramos viajar al espacio algún día.',
        explanation: '"Ojalá que" + Imperfecto de subjuntivo ("pudiéramos") expresa un deseo hipotético, remoto o poco probable.',
        grammarRule: 'Ojalá + Imperfecto de Subjuntivo = Deseo improbable o remoto.',
        hint: 'Comienza con "Ojalá que pudiéramos viajar..."',
        difficulty: 'hard'
      },
      {
        id: 'sp3-u3-q10',
        type: 'translation_open',
        prompt: 'Traduce esta oración condicional hipotética con Si clause:',
        englishTranslation: 'If you studied more every day, you would get better grades.',
        correctAnswer: 'Si estudiaras más todos los días, sacarías mejores notas.',
        acceptableAnswers: [
          'Si estudiaras más todos los días, sacarías mejores notas.',
          'Si estudiases más todos los días, sacarías mejores notas.',
          'Si estudiaras más todos los días, obtendrías mejores calificaciones.',
          'Si estudiases más todos los días, obtendrías mejores calificaciones.'
        ],
        explanation: 'Condicional hipotética en presente: "Si + Imperfecto de subjuntivo (estudiaras), Condicional simple (sacarías)".',
        grammarRule: 'Si + Imperfecto de subjuntivo (-ras/-ses) -> Condicional simple (-ías).',
        hint: 'Usa "Si estudiaras más todos los días, sacarías mejores notas."',
        difficulty: 'hard'
      }
    ]
  }
];
