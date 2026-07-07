const etiTimelineEvents = [
  {
    year: "1991",
    date: "1991",
    category: "Fundamentos normativos",
    title: "Nuestra Constitucion",
    summary: "La Constitucion Politica reconoce a las Entidades Territoriales Indigenas como parte de la estructura politico-administrativa del Estado.",
    description: "La Constitucion establece que las Entidades Territoriales Indigenas hacen parte de la estructura politico-administrativa del Estado, junto con municipios, departamentos y distritos. Por tanto, pueden gestionar sus intereses de manera autonoma y gobernarse por autoridades propias, de acuerdo con los sistemas de conocimiento indigena.",
    highlight: true
  },
  {
    year: "1991",
    date: "1991",
    category: "Fundamentos normativos",
    title: "Articulo 56 transitorio de la Constitucion Politica",
    summary: "Se faculta al Gobierno Nacional para expedir normas sobre los territorios indigenas mientras el Congreso expide la ley correspondiente.",
    description: "El articulo 56 transitorio faculta al Gobierno Nacional para expedir normas, con fuerza de ley, sobre temas relacionados con los territorios indigenas mientras el Congreso expide la ley que senala el articulo 329 de la Constitucion."
  },
  {
    year: "2011",
    date: "2011",
    category: "Fundamentos normativos",
    title: "Que paso con las ETI",
    summary: "La Ley 1454 de 2011 excluyo a las Entidades Territoriales Indigenas del marco juridico de municipios, departamentos y distritos.",
    description: "A traves de la Ley 1454 de 2011, el Congreso desarrolla el marco juridico para municipios, departamentos y distritos, pero excluye a las Entidades Territoriales Indigenas."
  },
  {
    year: "2018",
    date: "Abril de 2018",
    category: "Formalizacion ETI",
    title: "Un hito: Decreto Ley 632 de 2018",
    summary: "El Decreto Ley 632 de 2018 establece mecanismos y procedimientos para formalizar las ETI en Guainia, Vaupes y Amazonas.",
    description: "El Decreto Ley 632 de 2018 dispone los mecanismos y procedimientos para formalizar las Entidades Territoriales Indigenas en los departamentos de Guainia, Vaupes y Amazonas.",
    highlight: true
  },
  {
    year: "2018",
    date: "Diciembre de 2018",
    category: "Formalizacion ETI",
    title: "La decision de ser ETI",
    summary: "Dieciseis territorios indigenas de la Amazonia oriental deciden emprender el camino de formalizacion como ETI.",
    description: "Dieciseis territorios indigenas de la Amazonia oriental deciden autonomamente emprender el camino de formalizacion como Entidades Territoriales Indigenas, de acuerdo con el procedimiento definido en el Decreto Ley 632 de 2018."
  },
  {
    year: "2019",
    date: "Septiembre - diciembre de 2019",
    category: "Formalizacion ETI",
    title: "Constitucion y solicitud de registro de los Consejos Indigenas",
    summary: "Siete territorios indigenas dan el primer paso hacia su formalizacion como ETI.",
    description: "Siete territorios indigenas solicitan el registro de sus Consejos Indigenas, segun lo establecido en el Decreto Ley 632 de 2018."
  },
  {
    year: "2019",
    date: "Septiembre de 2019",
    category: "Barreras administrativas",
    title: "Los gobiernos indigenas tutelan sus derechos",
    summary: "Gobiernos indigenas del Rio Pira Parana, Yaigoje Apaporis, Miriti Parana y Medio Rio Guainia tutelan sus derechos.",
    description: "Ante la negligencia y las barreras puestas en el tramite de solicitud de registro, los gobiernos indigenas de estos territorios tutelan sus derechos al debido proceso, al autogobierno y a la autodeterminacion."
  },
  {
    year: "2019",
    date: "Diciembre de 2019",
    category: "Barreras administrativas",
    title: "Barrancominas",
    summary: "Se crea un municipio sobre un territorio indigena en Guainia, a pesar de que ya existia una decision de organizarse como ETI.",
    description: "El domingo 1 de diciembre de 2019 se creo el municipio de Barrancominas en Guainia. El tramite se hizo mientras ya habia una decision de organizarse como Entidad Territorial Indigena."
  },
  {
    year: "2020",
    date: "Diciembre de 2020",
    category: "Barreras administrativas",
    title: "Barreras administrativas en el registro de los Consejos Indigenas",
    summary: "Aunque varios territorios solicitaron el registro, al finalizar 2020 el Ministerio del Interior unicamente habia registrado dos Consejos Indigenas.",
    description: "Dos territorios hicieron la solicitud de registro de sus Consejos Indigenas durante este ano y, en total, se consolidaron nueve solicitudes. Sin embargo, al finalizar 2020 el Ministerio del Interior unicamente habia registrado dos Consejos Indigenas."
  },
  {
    year: "2021",
    date: "Marzo de 2021",
    category: "Barreras administrativas",
    title: "La Corte ordena no poner barreras administrativas",
    summary: "La Corte Constitucional revisa una tutela y ordena no poner barreras administrativas.",
    description: "Por el caracter de interes nacional, la Corte Constitucional reviso la tutela presentada por los gobiernos indigenas en septiembre de 2019 y emitio la sentencia T-072, que ordeno al Ministerio del Interior no poner barreras administrativas y emitir los actos de registro de los Consejos Indigenas del Rio Pira Parana y Medio Rio Guainia."
  },
  {
    year: "2020 - 2022",
    date: "2020 - 2022",
    category: "Superacion de barreras",
    title: "Superacion de barreras administrativas: registro de Consejos",
    summary: "Se conforman y registran 14 Consejos Indigenas ante el Ministerio del Interior.",
    description: "Entre 2020 y 2022 se conforman y registran 14 Consejos Indigenas ante el Ministerio del Interior. En promedio, el Gobierno Nacional tardo 14 meses en realizar estos registros, con casos que tomaron entre 6 y 22 meses."
  },
  {
    year: "2022",
    date: "Febrero de 2022",
    category: "Fundamentos normativos",
    title: "El Congreso desconoce los territorios indigenas",
    summary: "La Ley 2200 de 2022 desconoce la Constitucion de 1991 frente a los territorios indigenas.",
    description: "El Congreso expide la Ley 2200 de 2022, que permite a las gobernaciones departamentales ejercer administracion sobre los territorios indigenas y establece un procedimiento para la creacion de municipios, desconociendo la Constitucion de 1991."
  },
  {
    year: "2022",
    date: "2022",
    category: "Fundamentos normativos",
    title: "Consulta previa para crear municipios en territorios indigenas",
    summary: "La Corte Constitucional precisa que la creacion excepcional de municipios sobre territorios indigenas solo puede decidirse por los Consejos Indigenas.",
    description: "La sentencia C-047 de 2022 precisa que la creacion excepcional de municipios sobre territorios indigenas debe decidirse por los Consejos Indigenas como maxima autoridad en el territorio, mediante consultas previas."
  },
  {
    year: "2022",
    date: "Mayo de 2022",
    category: "Formalizacion ETI",
    title: "Plan Nacional de Desarrollo 2022-2026",
    summary: "Se acuerdan adecuaciones normativas e institucionales para garantizar la implementacion del Decreto Ley 632 de 2018.",
    description: "En el marco del Plan Nacional de Desarrollo 2022-2026 se establecen adecuaciones normativas e institucionales para garantizar la implementacion del Decreto Ley 632 de 2018 y poner en funcionamiento siete Territorios Indigenas en 2024."
  },
  {
    year: "2023",
    date: "Marzo de 2023",
    category: "Fundamentos normativos",
    title: "Se limita el poder de las gobernaciones",
    summary: "La Corte Constitucional declara inexequibles articulos de la Ley 2200 de 2022.",
    description: "La Corte Constitucional declara inconstitucionales los articulos 6 y 151 de la Ley 2200 de 2022, al considerar que no es posible imponer el regimen de los municipios a los territorios indigenas y que las asambleas departamentales deben atender especialmente los derechos a la autodeterminacion y autonomia territorial de los pueblos indigenas."
  },
  {
    year: "2023 - 2024",
    date: "Octubre de 2023 - junio de 2024",
    category: "Dialogos interculturales",
    title: "Dialogos interculturales con el Estado",
    summary: "Representantes de los pueblos indigenas se reunen con entidades del Estado para reconocer y acoger fundamentos culturales, constitucionales e interculturales.",
    description: "Representantes de los pueblos indigenas se reunen con el Ministerio de Agricultura, el Ministerio del Interior, la Agencia Nacional de Tierras, el DANE y el IGAC para reconocer y acoger los fundamentos culturales, los principios constitucionales y la interpretacion cultural con los que se ha decidido emprender la organizacion de las Entidades Territoriales Indigenas."
  },
  {
    year: "2024",
    date: "19 de junio de 2024",
    category: "Dialogos interculturales",
    title: "Dialogo intercultural previo al Decreto Ley 1275",
    summary: "Se acuerda que las competencias ambientales indigenas cuentan con amparo constitucional.",
    description: "En un dialogo intercultural con el Ministerio de Ambiente, la Procuraduria Ambiental y Agraria y el equipo del senador Julio Cesar Estrada, se acordo que las competencias ambientales indigenas cuentan con el amparo de la Corte Constitucional y que deben ejercerse bajo principios de coordinacion, concurrencia, complementariedad y subsidiariedad."
  },
  {
    year: "2024",
    date: "Julio de 2024",
    category: "Fundamentos normativos",
    title: "La Corte Constitucional falla por primera vez un caso sobre REDD+",
    summary: "La sentencia T-248 de 2024 protege autonomia, libre determinacion, integridad cultural y territorial frente a proyectos REDD+.",
    description: "La sentencia T-248 de 2024 protege la autonomia, libre determinacion, integridad cultural y territorial de comunidades indigenas frente a proyectos REDD+."
  },
  {
    year: "2024",
    date: "Junio - noviembre de 2024",
    category: "Formalizacion ETI",
    title: "Visitas tecnicas de la Agencia Nacional de Tierras",
    summary: "La ANT realiza visitas tecnicas para precisar ubicacion, extension territorial y linderos.",
    description: "La Agencia Nacional de Tierras realiza visitas tecnicas a los territorios de Bajo Rio Caqueta, PANI, Yaigoje Apaporis, Miriti Parana, Rio Tiquie, Rios Cotuhe Putumayo - CIMTAR, UITIBOC - Asoaintam y Arica, para precisar ubicacion, extension territorial y linderos."
  },
  {
    year: "2023 - 2025",
    date: "Abril de 2023 - julio de 2025",
    category: "Puesta en funcionamiento",
    title: "Solicitud de puesta en funcionamiento ETI",
    summary: "Se radican planes de vida de 12 territorios indigenas para formalizar la solicitud de puesta en funcionamiento.",
    description: "Se radican ante el Ministerio del Interior los Planes de Vida de 12 territorios indigenas para formalizar la solicitud de puesta en funcionamiento de las Entidades Territoriales Indigenas."
  },
  {
    year: "2024",
    date: "Octubre de 2024",
    category: "Fundamentos normativos",
    title: "Decreto Ley 1275",
    summary: "Se reconoce a los pueblos indigenas como autoridades ambientales en sus territorios.",
    description: "El Decreto Ley 1275 reconoce a los pueblos indigenas de Colombia como autoridades ambientales en sus territorios y establece normas para la coordinacion con las demas autoridades y entidades del sistema estatal."
  },
  {
    year: "2024 - 2025",
    date: "Agosto de 2024 - mayo de 2025",
    category: "Dialogos interculturales",
    title: "Se formalizan los mecanismos de coordinacion",
    summary: "Se formalizan mecanismos de coordinacion entre territorios indigenas y departamentos.",
    description: "Se formalizan mecanismos de coordinacion y articulacion entre territorios indigenas y departamentos, conforme al articulo 11 del Decreto Ley 632 de 2018."
  },
  {
    year: "2025",
    date: "Marzo de 2025",
    category: "Fundamentos normativos",
    title: "Sentencia T-106",
    summary: "La Corte Constitucional falla a favor del Macroterritorio de los Jaguares de Yurupari.",
    description: "La Corte Constitucional falla a favor del Macroterritorio de los Jaguares de Yurupari en una sentencia historica que subraya la urgencia de formalizar las Entidades Territoriales Indigenas para garantizar de manera integral y adecuada los derechos fundamentales de los pueblos."
  },
  {
    year: "2025",
    date: "Abril - mayo de 2025",
    category: "Formalizacion ETI",
    title: "Blindaje de la autonomia de las ETI",
    summary: "El Decreto Ley 488 indica el camino para la formalizacion de las ETI en el pais.",
    description: "El Decreto Ley 488 indica el camino para la formalizacion de las ETI en el pais, mas alla de la Amazonia oriental colombiana. Define el momento y el mecanismo mediante el cual los territorios indigenas empiezan formalmente el ejercicio de funciones y competencias en coordinacion con otras entidades del gobierno nacional y territorial."
  },
  {
    year: "2025",
    date: "Abril - mayo de 2025",
    category: "Ordenamiento territorial",
    title: "Ajuste de la organizacion territorial en el mapa del departamento de Amazonas",
    summary: "Se acuerda ajustar la organizacion territorial en el mapa del departamento de Amazonas.",
    description: "A partir de la adopcion de las figuras de las ETI en el Plan de Ordenamiento Territorial, se acuerda ajustar la organizacion territorial en el mapa del departamento de Amazonas."
  },
  {
    year: "2025",
    date: "Mayo - junio de 2025",
    category: "Formalizacion ETI",
    title: "La ANT expide actos administrativos de delimitacion de jurisdiccion politico-administrativa",
    summary: "La ANT expide actos administrativos para ocho territorios indigenas.",
    description: "La Agencia Nacional de Tierras expide los actos administrativos de delimitacion de jurisdiccion politico-administrativa de ocho territorios indigenas: PANI, Bajo Rio Caqueta, Rio Tiquie, Miriti Parana, Yaigoje Apaporis, Arica, UITIBOC-Asoaintam y Rios Cotuhe y Putumayo - CIMTAR."
  },
  {
    year: "2025",
    date: "28 de julio - 1 de agosto de 2025",
    category: "Dialogos interculturales",
    title: "Encuentro de 10 gobiernos indigenas en proceso de formalizacion",
    summary: "Los Consejos Indigenas de 10 territorios se reunen en Bogota para coordinarse y llamar al Gobierno Nacional.",
    description: "Los Consejos Indigenas de 10 territorios de la Amazonia oriental colombiana se reunen en Bogota para coordinarse y hacer un llamado al Gobierno Nacional para la formalizacion de las Entidades Territoriales Indigenas."
  },
  {
    year: "2025",
    date: "4 - 18 de agosto de 2025",
    category: "Dialogos interculturales",
    title: "Dialogos interculturales para la socializacion de los Acuerdos Interculturales",
    summary: "Se formalizan las primeras ocho ETI de la Amazonia colombiana.",
    description: "En estos dialogos se formalizan las primeras ocho Entidades Territoriales Indigenas de la Amazonia colombiana entre los gobiernos indigenas y el Gobierno Nacional. Se acuerda que su inclusion en la norma se hara a traves de decretos expedidos por el presidente de la Republica."
  },
  {
    year: "2025",
    date: "4 de diciembre de 2025",
    category: "Dialogos interculturales",
    title: "Suscripcion de los Acuerdos Interculturales de los territorios indigenas",
    summary: "Se suscriben los Acuerdos Interculturales de los territorios indigenas.",
    description: "Se suscriben los Acuerdos Interculturales de ARICA, PANI, Rio Tiquie, Bajo Rio Caqueta Amazonas, Yaigoje Apaporis, UITIBOC-ASOAINTAM, Rios Cotuhe Putumayo y Miriti Parana, entre sus gobiernos y los ministerios correspondientes."
  },
  {
    year: "2025",
    date: "11 de diciembre de 2025",
    category: "Dialogos interculturales",
    title: "Dialogo intercultural para la protocolizacion de los Acuerdos Interculturales",
    summary: "Gobiernos indigenas convocan al presidente de la Republica para firmar decretos que protocolizan los Acuerdos Interculturales.",
    description: "Diez gobiernos indigenas convocan al presidente de la Republica a firmar los decretos que protocolizan los Acuerdos Interculturales."
  },
  {
    year: "2025",
    date: "16 de diciembre de 2025",
    category: "Formalizacion ETI",
    title: "Se formalizan las primeras ocho Entidades Territoriales Indigenas de la Amazonia colombiana",
    summary: "Se formalizan las primeras ocho ETI de la Amazonia colombiana.",
    description: "La expedicion de los decretos 1367, 1368, 1369, 1370, 1371, 1372, 1273 y 1274 por parte del presidente de la Republica y el ministro del Interior protocoliza los Acuerdos Interculturales firmados en noviembre del mismo ano.",
    highlight: true
  }
];

const etiCouncils = [
  "Consejo Indigena del Territorio Indigena Bajo Rio Caqueta - Amazonas",
  "Consejo Indigena del Territorio Miriti Parana - Amazonas - CITMA",
  "Consejo Indigena del Territorio PANI",
  "Consejo Indigena del Rio Pira Parana",
  "Consejo Indigena del Territorio Yaigoje Apaporis",
  "Consejo Indigena del Territorio Indigena Medio Rio Guainia",
  "Consejo Indigena del Territorio Indigena del Alto Rio Guainia - PAYAWIAYA JIWIDAM",
  "Consejo Indigena del Territorio Indigena Unido de los Rios Isana y Surubi",
  "Consejo Indigena del Territorio Indigena Curripaco Nheengatu del Bajo Rio Guainia",
  "Consejo Indigena Multietnico del Territorio Ancestral de los Rios Atabapo e Inirida - CIMTARAI",
  "Consejo Indigena Mayor de Tarapaca Amazonas - CIMTAR",
  "Consejo Indigena del Territorio Indigena de los Rios Cotuhe y Putumayo",
  "Consejo Indigena de Unidad, Pensamiento y Sabiduria de la Palabra de Vida para el cuidado de las Generaciones del Territorio Indigena Arica",
  "Consejo de Autoridades Tradicionales Indigenas de Tarapaca Amazonas del Territorio Indigena UITIBOC-ASOAINTAM",
  "Consejo Indigena del Territorio Indigena del Rio Tiquie",
  "Consejo Indigena de Autoridades del Rio Papunahua"
];

const categoryOrder = [
  "Todos",
  "Fundamentos normativos",
  "Barreras administrativas",
  "Superacion de barreras",
  "Dialogos interculturales",
  "Formalizacion ETI",
  "Puesta en funcionamiento",
  "Ordenamiento territorial"
];
const yearOrder = ["Todos", "1991", "2011", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

const categoryFilters = document.getElementById("etiCategoryFilters");
const yearFilters = document.getElementById("etiYearFilters");
const timelineList = document.getElementById("etiTimelineList");
const timelineCount = document.getElementById("etiTimelineCount");
const councilsList = document.getElementById("etiCouncilsList");

let activeCategory = "Todos";
let activeYear = "Todos";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSpanish(value) {
  return String(value)
    .replace(/\bConstitucion\b/g, "Constitución")
    .replace(/\bconstitucional\b/g, "constitucional")
    .replace(/\bPolitica\b/g, "Política")
    .replace(/\bIndigena\b/g, "Indígena")
    .replace(/\bIndigenas\b/g, "Indígenas")
    .replace(/\bindigena\b/g, "indígena")
    .replace(/\bindigenas\b/g, "indígenas")
    .replace(/\bAmazonia\b/g, "Amazonía")
    .replace(/\bGuainia\b/g, "Guainía")
    .replace(/\bVaupes\b/g, "Vaupés")
    .replace(/\bCaqueta\b/g, "Caquetá")
    .replace(/\bMiriti\b/g, "Mirití")
    .replace(/\bParana\b/g, "Paraná")
    .replace(/\bPira\b/g, "Pirá")
    .replace(/\bTiquie\b/g, "Tiquié")
    .replace(/\bCotuhe\b/g, "Cotuhé")
    .replace(/\bYaigoje\b/g, "Yaigojé")
    .replace(/\bRio\b/g, "Río")
    .replace(/\bRios\b/g, "Ríos")
    .replace(/\bBogota\b/g, "Bogotá")
    .replace(/\bTarapaca\b/g, "Tarapacá")
    .replace(/\bInirida\b/g, "Inírida")
    .replace(/\bYurupari\b/g, "Yuruparí")
    .replace(/\bAutonomia\b/g, "Autonomía")
    .replace(/\bautonomia\b/g, "autonomía")
    .replace(/\bDecision\b/g, "Decisión")
    .replace(/\bdecision\b/g, "decisión")
    .replace(/\bDialogos\b/g, "Diálogos")
    .replace(/\bdialogos\b/g, "diálogos")
    .replace(/\bDialogo\b/g, "Diálogo")
    .replace(/\bdialogo\b/g, "diálogo")
    .replace(/\bFormalizacion\b/g, "Formalización")
    .replace(/\bformalizacion\b/g, "formalización")
    .replace(/\bSuperacion\b/g, "Superación")
    .replace(/\bPuesta en funcionamiento\b/g, "Puesta en funcionamiento")
    .replace(/\bOrdenamiento territorial\b/g, "Ordenamiento territorial")
    .replace(/\bpolitico-administrativa\b/g, "político-administrativa")
    .replace(/\bjuridico\b/g, "jurídico")
    .replace(/\bjuridica\b/g, "jurídica")
    .replace(/\bmaxima\b/g, "máxima")
    .replace(/\bmas\b/g, "más")
    .replace(/\bpais\b/g, "país")
    .replace(/\bano\b/g, "año")
    .replace(/\banos\b/g, "años");
}

function createFilterButton(label, group, isActive) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `gaia-timeline-filter${isActive ? " active" : ""}`;
  button.textContent = formatSpanish(label);
  button.setAttribute("aria-pressed", isActive ? "true" : "false");
  button.addEventListener("click", () => {
    if (group === "category") activeCategory = label;
    if (group === "year") activeYear = label;
    renderTimeline();
  });
  return button;
}

function yearMatches(event, year) {
  if (year === "Todos") return true;
  return event.year.includes(year) || event.date.includes(year);
}

function getFilteredEvents() {
  return etiTimelineEvents.filter((event) => {
    const categoryMatches = activeCategory === "Todos" || event.category === activeCategory;
    return categoryMatches && yearMatches(event, activeYear);
  });
}

function renderControls() {
  categoryFilters.innerHTML = "";
  categoryOrder.forEach((category) => {
    categoryFilters.appendChild(createFilterButton(category, "category", category === activeCategory));
  });

  yearFilters.innerHTML = "";
  yearOrder.forEach((year) => {
    yearFilters.appendChild(createFilterButton(year, "year", year === activeYear));
  });
}

function renderCouncils() {
  councilsList.innerHTML = etiCouncils.map((council) => `<li>${escapeHtml(formatSpanish(council))}</li>`).join("");
}

function renderTimeline() {
  renderControls();
  const filteredEvents = getFilteredEvents();
  timelineCount.textContent = `${filteredEvents.length} hito${filteredEvents.length === 1 ? "" : "s"} encontrado${filteredEvents.length === 1 ? "" : "s"}.`;

  timelineList.innerHTML = filteredEvents.map((event, index) => {
    const id = `eti-event-${index}-${event.year.replace(/\W/g, "-")}`;
    return `
      <article class="gaia-timeline-card${event.highlight ? " gaia-timeline-card--highlight" : ""}">
        <button class="gaia-timeline-card-toggle" type="button" aria-expanded="false" aria-controls="${id}">
          <span class="gaia-timeline-year">${escapeHtml(formatSpanish(event.year))}</span>
          <span class="gaia-timeline-date">${escapeHtml(formatSpanish(event.date))}</span>
          <span class="gaia-timeline-category">${escapeHtml(formatSpanish(event.category))}</span>
          <strong class="gaia-timeline-title">${escapeHtml(formatSpanish(event.title))}</strong>
          <span class="gaia-timeline-summary">${escapeHtml(formatSpanish(event.summary))}</span>
        </button>
        <div class="gaia-timeline-description" id="${id}" hidden>
          <p>${escapeHtml(formatSpanish(event.description))}</p>
        </div>
      </article>
    `;
  }).join("");

  timelineList.querySelectorAll(".gaia-timeline-card-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const description = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      if (description) description.hidden = isExpanded;
      button.closest(".gaia-timeline-card")?.classList.toggle("is-expanded", !isExpanded);
    });
  });
}

renderCouncils();
renderTimeline();
