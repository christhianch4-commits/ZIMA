/**
 * Every string on the page, in both languages. Components read from here
 * through `useCopy()`, so adding a third language means adding one key at the
 * top level and nothing else.
 */

export type Lang = 'en' | 'es'

export interface Pillar {
  id: string
  number: string
  title: string
  tagline: string
  services: string[]
}

export interface Step {
  number: string
  title: string
  body: string
}

const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  langLabel: 'Cambiar a espanol',
  meta: {
    title: 'Zima* — Growth partner for companies that refuse to blend in',
    description:
      'Zima builds the websites, apps and dashboards, runs the marketing that sells, and wires AI into how your team already works. A growth partner working worldwide.',
  },
  nav: [
    { label: 'Studio', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process', secondary: true },
    { label: 'Work', href: '#services', secondary: true },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    paragraph:
      'Zima is a growth partner for companies that refuse to blend in. We build the sites, apps and dashboards, run the marketing that sells, and wire AI into how your team already works.',
    cta: 'Book a call',
  },
  about: {
    label: 'Growth partner',
    headOne: 'We are Zima,',
    headRole: 'a growth partner.',
    headTwo: 'We design, build and scale the digital side of your business.',
    body: "Founded by Yerika Rodriguez, we work as an extension of your team rather than a vendor kept at arm's length. Strategy, design, engineering and paid growth sit in the same room, so the site, the app, the dashboards and the campaigns are built to feed each other instead of competing for the same budget.",
  },
  process: {
    label: 'How we work',
    headOne: 'Four steps, and you always know which one we are on.',
    headTwo: 'No black box, no monthly mystery.',
    steps: [
      {
        number: '01',
        title: 'Diagnose',
        body: 'We look at what you already have running: traffic, funnel, product, team. You leave with a plain reading of what is costing you growth, whether or not you hire us.',
      },
      {
        number: '02',
        title: 'Plan',
        body: 'One page, ranked by impact against effort. What we do first, what we deliberately leave for later, and the number each move is meant to change.',
      },
      {
        number: '03',
        title: 'Build',
        body: 'We ship in short cycles with the work visible from day one. You watch the site, the app or the campaign come together instead of waiting for a reveal.',
      },
      {
        number: '04',
        title: 'Scale',
        body: 'What worked gets systematised and handed over: documentation, training and dashboards, so it keeps running with or without us.',
      },
    ] as Step[],
  },
  services: {
    label: 'What we do',
    headOne: 'Four pillars, wired into one system.',
    headTwo: 'Build it, grow it, automate it, run it.',
    ariaTabs: 'Service pillars',
    pillars: [
      {
        id: 'build',
        number: '01',
        title: 'Build',
        tagline: 'Everything the business runs on, built properly.',
        services: [
          'Websites that load fast and actually convert',
          'Web and mobile apps, brief to store',
          'Dashboards that answer the question you really asked',
          'Custom digital solutions when nothing off the shelf fits',
        ],
      },
      {
        id: 'grow',
        number: '02',
        title: 'Grow',
        tagline: 'Marketing that answers to revenue, not to vanity metrics.',
        services: [
          'Performance marketing across every paid channel',
          'Social growth with a content engine behind it',
          'Sales-focused funnels and lifecycle flows',
          'Creative testing loops that never stall',
        ],
      },
      {
        id: 'automate',
        number: '03',
        title: 'Automate',
        tagline: 'AI wired into how your team already works.',
        services: [
          'AI implementation across your existing stack',
          'Agents that absorb the repetitive work',
          'Research and reporting that took days, in minutes',
          'Tooling your team will actually adopt',
        ],
      },
      {
        id: 'operate',
        number: '04',
        title: 'Operate',
        tagline: 'The discipline that keeps all of it shipping.',
        services: [
          'Project management from kickoff to handover',
          'Team training and enablement',
          'Process and methodology optimisation',
          'Full project development, brief to launch',
        ],
      },
    ] as Pillar[],
  },
  contact: {
    label: 'Start here',
    heading: 'Tell us where the growth has stalled.',
    body: 'One call, no deck. We look at what you have running, say plainly what we would change first, and you decide whether it is worth doing together.',
    caption: 'Above the noise.',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    message: 'What are you trying to move?',
    send: 'Send',
    sending: 'Sending',
    sent: 'Thanks. We reply within one business day.',
    failed: 'That did not go through. Write to us directly at',
  },
  footer: {
    tagline: 'A growth partner for companies that refuse to blend in.',
    siteTitle: 'Site',
    reachTitle: 'Reach us',
    rights: 'All rights reserved.',
  },
}

const es: typeof en = {
  htmlLang: 'es',
  ogLocale: 'es_ES',
  langLabel: 'Switch to English',
  meta: {
    title: 'Zima* — Growth partner para empresas que no pasan desapercibidas',
    description:
      'Zima construye los sitios, las apps y los dashboards, mueve el marketing que vende, y conecta la IA a como tu equipo ya trabaja. Un growth partner que trabaja en todo el mundo.',
  },
  nav: [
    { label: 'Estudio', href: '#about' },
    { label: 'Servicios', href: '#services' },
    { label: 'Proceso', href: '#process', secondary: true },
    { label: 'Trabajo', href: '#services', secondary: true },
    { label: 'Contacto', href: '#contact' },
  ],
  hero: {
    paragraph:
      'Zima es un growth partner para empresas que se niegan a pasar desapercibidas. Construimos los sitios, las apps y los dashboards, movemos el marketing que vende, y conectamos la IA a como tu equipo ya trabaja.',
    cta: 'Agenda una llamada',
  },
  about: {
    label: 'Growth partner',
    headOne: 'Somos Zima,',
    headRole: 'un growth partner.',
    headTwo: 'Diseñamos, construimos y escalamos el lado digital de tu negocio.',
    body: 'Fundada por Yerika Rodriguez, trabajamos como una extensión de tu equipo y no como un proveedor a distancia. Estrategia, diseño, ingeniería y crecimiento pagado se sientan en la misma sala, así que el sitio, la app, los dashboards y las campañas se construyen para alimentarse entre sí en vez de competir por el mismo presupuesto.',
  },
  process: {
    label: 'Cómo trabajamos',
    headOne: 'Cuatro pasos, y siempre sabes en cuál estamos.',
    headTwo: 'Sin caja negra ni misterio mensual.',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        body: 'Miramos lo que ya tienes en marcha: tráfico, embudo, producto, equipo. Te llevas una lectura clara de qué te está costando crecimiento, nos contrates o no.',
      },
      {
        number: '02',
        title: 'Plan',
        body: 'Una sola página, ordenada por impacto contra esfuerzo. Qué hacemos primero, qué dejamos a propósito para después, y qué número debe mover cada movimiento.',
      },
      {
        number: '03',
        title: 'Construcción',
        body: 'Entregamos en ciclos cortos y con el trabajo a la vista desde el primer día. Ves el sitio, la app o la campaña mientras se arma, no en una presentación final.',
      },
      {
        number: '04',
        title: 'Escala',
        body: 'Lo que funcionó se sistematiza y se entrega: documentación, capacitación y dashboards, para que siga corriendo con o sin nosotros.',
      },
    ] as Step[],
  },
  services: {
    label: 'Lo que hacemos',
    headOne: 'Cuatro pilares, conectados en un mismo sistema.',
    headTwo: 'Constrúyelo, hazlo crecer, automatízalo, opéralo.',
    ariaTabs: 'Pilares de servicio',
    pillars: [
      {
        id: 'build',
        number: '01',
        title: 'Construir',
        tagline: 'Todo aquello sobre lo que corre el negocio, bien construido.',
        services: [
          'Sitios web que cargan rápido y de verdad convierten',
          'Apps web y móviles, del brief a la tienda',
          'Dashboards que responden la pregunta que en serio hiciste',
          'Soluciones digitales a medida cuando nada estándar encaja',
        ],
      },
      {
        id: 'grow',
        number: '02',
        title: 'Crecer',
        tagline: 'Marketing que responde ante ingresos, no ante métricas de vanidad.',
        services: [
          'Marketing de resultados en todos los canales pagados',
          'Crecimiento en redes con un motor de contenido detrás',
          'Embudos y flujos de ciclo de vida enfocados a la venta',
          'Ciclos de prueba creativa que nunca se estancan',
        ],
      },
      {
        id: 'automate',
        number: '03',
        title: 'Automatizar',
        tagline: 'IA conectada a la forma en que tu equipo ya trabaja.',
        services: [
          'Implementación de IA sobre tu stack actual',
          'Agentes que absorben el trabajo repetitivo',
          'Investigación y reportes que tomaban días, en minutos',
          'Herramientas que tu equipo sí va a adoptar',
        ],
      },
      {
        id: 'operate',
        number: '04',
        title: 'Operar',
        tagline: 'La disciplina que mantiene todo esto entregando.',
        services: [
          'Gestión de proyecto del arranque a la entrega',
          'Capacitación y habilitación del equipo',
          'Optimización de procesos y metodologías',
          'Desarrollo de proyecto completo, del brief al lanzamiento',
        ],
      },
    ] as Pillar[],
  },
  contact: {
    label: 'Empieza aquí',
    heading: 'Cuéntanos dónde se frenó el crecimiento.',
    body: 'Una llamada, sin presentación. Miramos lo que tienes corriendo, te decimos sin rodeos qué cambiaríamos primero, y tú decides si vale la pena hacerlo juntos.',
    caption: 'Por encima del ruido.',
    name: 'Nombre',
    email: 'Correo',
    company: 'Empresa',
    message: '¿Qué quieres mover?',
    send: 'Enviar',
    sending: 'Enviando',
    sent: 'Gracias. Respondemos en un día hábil.',
    failed: 'No se pudo enviar. Escríbenos directo a',
  },
  footer: {
    tagline: 'Un growth partner para empresas que se niegan a pasar desapercibidas.',
    siteTitle: 'Sitio',
    reachTitle: 'Escríbenos',
    rights: 'Todos los derechos reservados.',
  },
}

export const COPY = { en, es }
export type Copy = typeof en
