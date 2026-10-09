
import { Macroarea, QuestionBlock } from './types';

export const COLORS = {
  primary: '#2e1c4f', // Deep purple
  accent: '#d5ff33',  // Lime green
  textGray: '#4b5563', // Gray-600
};

export const MACROAREAS: Macroarea[] = [
  'Comercial',
  'Administración de Flota',
  'Operaciones',
  'Patio',
  'Administración',
  'Renting Operaciones'
];

export const DEPARTMENTS_MAP: Record<Macroarea, string[]> = {
  'Comercial': ['Reservaciones', 'Ventas', 'Ventas Producto Renting', 'Mercadeo'],
  'Administración de Flota': ['Taller de Enderezado y Pintura', 'Taller Mecánico'],
  'Operaciones': ['Alajuela', 'Zona Guanacaste', 'Zona Pacífico', 'Zona Atlántico', 'San José', 'Otras oficinas', 'Servicio al cliente'],
  'Patio': ['Patio Alajuela', 'Patio San José'],
  'Administración': ['RRHH', 'Bodega', 'Tecnología de Información', 'Contabilidad', 'Crédito y Cobro', 'Administración de Flota'],
  'Renting Operaciones': ['Total Fleet Operaciones', 'Green Motion']
};

export const TIME_OPTIONS: string[] = [
  '0 a 6 meses',
  '6 meses a 1 año',
  '1 año a 3 años',
  '3+ años'
];

export const AGE_OPTIONS: string[] = [
  '18-28 años (Gen Z)',
  '29-44 años (Millenial)',
  '45-60 años (Gen X)',
  '61+ años (Baby Boomer)'
];

export const LIKERT_OPTIONS = [
  { value: 1, label: 'NUNCA' },
  { value: 2, label: 'RARA VEZ' },
  { value: 3, label: 'A VECES' },
  { value: 4, label: 'FRECUENTEMENTE' },
  { value: 5, label: 'SIEMPRE' }
];

export const SURVEY_BLOCKS_P1: QuestionBlock[] = [
  {
    title: 'BLOQUE 1: Mi Entorno y Seguridad Biológica',
    questions: [
      { id: 1, text: 'Tengo la libertad de ordenar mi espacio de trabajo o la secuencia de mis tareas de la manera que mejor me funciona, siempre que cumpla con el objetivo.' },
      { id: 2, text: 'Cuando hay cambios de último minuto (horarios o reglas), me explican con claridad y con tiempo suficiente para adaptarme y entiendo por qué se hacen y cómo me afectan.' },
      { id: 3, text: 'Siento que las reglas, los turnos y las oportunidades se reparten de manera transparente y justa para todos, sin favoritismos.' },
      { id: 4, text: 'Siento que puedo trabajar tranquilamente a mi ritmo, sin que me presionen a socializar más de lo que me siento cómodo/a.' },
      { id: 5, text: 'Los plazos y la cantidad de trabajo que recibo son realistas; puedo terminar mis tareas con calidad dentro de mi horario, sin tener que trabajar a una velocidad excesiva.' },
      { id: 6, text: 'Mi trabajo me permite mantener un equilibrio real entre mis responsabilidades laborales y mi vida personal o familiar, sin que uno invada el espacio del otro.' }
    ]
  },
  {
    title: 'BLOQUE 2: Confianza para Hablar y Seguridad Psicológica',
    questions: [
      { id: 7, text: 'Cuando cometo un error honesto, el equipo se enfoca en "cómo arreglamos el proceso" en lugar de buscar a quién culpar.' },
      { id: 8, text: 'Puedo comportarme con naturalidad, sin gastar energía vigilando cada palabra o gesto para evitar ser juzgado.' },
      { id: 9, text: 'En mi entorno se cortan de raíz las burlas o comentarios ofensivos, y me siento protegido/a ante esas conductas.' },
      { id: 10, text: 'Si necesitara un cambio sencillo (como menos ruido o luz), siento que mis compañeros me apoyarían en lugar de verme mal.' }
    ]
  }
];

export const SURVEY_BLOCKS_P2: QuestionBlock[] = [
  {
    title: 'BLOQUE 3: Mi voz y mis ideas',
    questions: [
      { id: 11, text: 'Si noto un riesgo o error, me siento seguro/a de detener el proceso para reportarlo sin miedo a regaños por "atrasar" el trabajo.' },
      { id: 12, text: 'Mi jefe/a demuestra que está dispuesto a escuchar opiniones diferentes a la suya sin ponerse a la defensiva.' },
      { id: 13, text: 'Si tengo una idea para mejorar algo, confío en que seré escuchado y que se me dará el crédito si se implementa.' },
      { id: 14, text: 'El nivel de dificultad o complejidad de mis tareas está dentro de mis capacidades actuales; me exige sin dejarme sintiéndome constantemente al límite o perdido/a' }
    ]
  },
  {
    title: 'BLOQUE 4: Innovación, Claridad y Foco',
    questions: [
      { id: 15, text: 'Entiendo claramente cómo mi trabajo ayuda a los clientes y compañeros, más allá de solo cumplir números.' },
      { id: 16, text: 'Recibo instrucciones claras de un solo jefe, sin tener a varias personas pidiéndome cosas diferentes al mismo tiempo.' },
      { id: 17, text: 'Tengo clarísimo qué se considera un trabajo terminado "bien hecho". No tengo dudas sobre lo que se espera de mí.' },
      { id: 18, text: 'Puedo mantener mi concentración durante mi turno sin interrupciones frecuentes de compañeros o jefes.' },
      { id: 19, text: 'Cuando me interrumpen en una tarea que requiere concentración, me cuesta algo de tiempo retomar el hilo de lo que estaba haciendo.' },
      { id: 20, text: 'Siento que puedo mantener este ritmo de trabajo durante los próximos 12 meses sin que afecte mi salud o mi vida personal.' }
    ]
  }
];
