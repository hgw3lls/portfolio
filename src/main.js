const projects = [
  {
    id: 'hypnagnosis',
    title: 'HYPNAGNOSIS',
    date: 'Ongoing',
    format: 'Risograph works, altered-state artifacts, print/media environment',
    tags: ['printmaking', 'risograph aesthetics', 'sleep paralysis', 'liminal perception'],
    summary:
      'Artifacts of altered states: risograph works and media structures concerned with sleep paralysis, liminal perception, unstable embodiment, dream architectures, and psychological thresholds.',
    system:
      'The project treats the printed artifact as a perceptual interface: color separation, repetition, grain, and registration drift become evidence of an unstable body moving between waking and dream states.',
    documentation: ['Risograph editions', 'installation views', 'detail scans', 'process plates'],
    embed: 'Image sequence / print documentation embed slot',
    pdf: 'docs/hypnagnosis-documentation.pdf',
  },
  {
    id: 'cosmomorphosis',
    title: 'COSMOMORPHOSIS',
    date: 'Ongoing',
    format: 'Generative audiovisual installation driven by ISS telemetry',
    tags: ['telemetry', 'audiovisual installation', 'live data', 'temporal drift'],
    summary:
      'A generative audiovisual installation in which ISS telemetry modulates image, sound, duration, and nonlinear temporal behavior.',
    system:
      'Orbital data functions as more than input; it becomes an environmental condition that produces evolving audiovisual drift, delayed perception, and a sense of scale between body, signal, and planetary infrastructure.',
    documentation: ['single-channel excerpt', 'installation diagram', 'telemetry mapping', 'sound/image stills'],
    embed: 'Video / live data capture embed slot',
    pdf: 'docs/cosmomorphosis-documentation.pdf',
  },
  {
    id: 'transmissions',
    title: 'TRANSMISSIONS',
    date: 'Ongoing',
    format: 'Speculative transmission system, sound, voice, distributed media',
    tags: ['hip-hop', 'spoken word', 'science fiction', 'pirate radio', 'participatory media'],
    summary:
      'A speculative transmission system mixing hip-hop, spoken word, science fiction, pirate radio aesthetics, distributed signal structures, and broken broadcast environments.',
    system:
      'TRANSMISSIONS frames broadcast as a fractured commons: voice, rhythm, and signal circulate through unstable infrastructures where participation changes the conditions of reception.',
    documentation: ['audio excerpts', 'broadcast scripts', 'installation views', 'participant signal traces'],
    embed: 'Audio player / transmission archive embed slot',
    pdf: 'docs/transmissions-documentation.pdf',
  },
  {
    id: 'shape-of-a-packet',
    title: 'SHAPE OF A PACKET',
    date: 'Ongoing',
    format: 'Networked participatory installation',
    tags: ['mobile systems', 'local networks', 'mesh-style connectivity', 'archives'],
    summary:
      'A networked participatory installation involving mobile systems, local connectivity, archives, participant contribution, and distributed media.',
    system:
      'The work makes network behavior perceptible as social and spatial form: packets, contributions, and local archives become a temporary media environment assembled by participants.',
    documentation: ['interface captures', 'network diagram', 'participant archive', 'installation documentation'],
    embed: 'Local network interface / documentation embed slot',
    pdf: 'docs/shape-of-a-packet-documentation.pdf',
  },
  {
    id: 'n2-the-secretary',
    title: 'N2: THE SECRETARY',
    date: 'Selected work',
    format: 'Language, signal, archive, synthetic image/sound system',
    tags: ['fictional archive', 'language systems', 'signal', 'synthetic media'],
    summary:
      'A layered configuration of language, signal, sound, and image in which archives and synthetic media operate as unstable evidence.',
    system:
      'Documents, recordings, and generated images are organized as a speculative administrative system whose authority remains unresolved.',
    documentation: ['archive fragments', 'scripted documents', 'synthetic image sets', 'sound documentation'],
    embed: 'Archive reader / moving-image excerpt slot',
    pdf: 'docs/n2-the-secretary-documentation.pdf',
  },
  {
    id: 'artificial-cinema',
    title: 'ARTIFICIAL CINEMA',
    date: 'Ongoing',
    format: 'Computational audiovisual environment',
    tags: ['computational media', 'AI systems', 'expanded cinema', 'operative environments'],
    summary:
      'A computational audiovisual environment treating AI and media systems as operative environments rather than output generators.',
    system:
      'The project approaches model behavior as cinematic condition: perception is reorganized through prompts, constraints, recursive feedback, generated fragments, and temporal arrangement.',
    documentation: ['system captures', 'prompt/interface studies', 'audiovisual excerpts', 'installation diagrams'],
    embed: 'A/V excerpt / computational system capture embed slot',
    pdf: 'docs/artificial-cinema-documentation.pdf',
  },
  {
    id: 'variation-79-podkop',
    title: 'VARIATION 79 / PODKOP',
    date: 'Selected works',
    format: 'Experimental audiovisual works',
    tags: ['film/video', 'sound', 'recursion', 'mediated memory'],
    summary:
      'Experimental audiovisual works concerned with repetition, recursion, mediated memory, and the residues of speculative systems.',
    system:
      'These works extend a recurring concern with temporal displacement: fragments return as altered signals, producing a field of repetition, delay, and unresolved evidence.',
    documentation: ['video stills', 'sound excerpts', 'screening notes', 'process documentation'],
    embed: 'Video excerpt / screening documentation embed slot',
    pdf: 'docs/variation-79-podkop-documentation.pdf',
  },
];

const teachingMaterials = [
  {
    title: 'Systems-based media studio',
    type: 'Course framework',
    text: 'A studio model that asks students to build relationships between image, sound, code, archive, and spatial experience rather than treating media as separate disciplines.',
    href: 'docs/systems-based-media-studio.pdf',
  },
  {
    title: 'Computational media as environment',
    type: 'Workshop / seminar',
    text: 'Assignments introduce computational systems as cultural and perceptual infrastructures, foregrounding constraints, feedback, iteration, and critical technical literacy.',
    href: 'docs/computational-media-environment.pdf',
  },
  {
    title: 'Analog / digital publication systems',
    type: 'Teaching material',
    text: 'A hybrid print and screen sequence connecting risograph processes, archives, typography, sequencing, and networked distribution.',
    href: 'docs/analog-digital-publication-systems.pdf',
  },
];

const downloads = [
  ['Curriculum vitae', 'docs/tony-yanick-cv.pdf'],
  ['Artist statement', 'docs/tony-yanick-artist-statement.pdf'],
  ['Research statement', 'docs/tony-yanick-research-statement.pdf'],
  ['Teaching portfolio', 'docs/tony-yanick-teaching-portfolio.pdf'],
  ['Project documentation packet', 'docs/tony-yanick-project-documentation.pdf'],
];

const projectIndex = document.querySelector('#project-index');
const projectPages = document.querySelector('#project-pages');
const teachingGrid = document.querySelector('#teaching-grid');
const cvWorkList = document.querySelector('#cv-work-list');
const downloadList = document.querySelector('#download-list');
const toggle = document.querySelector('.mode-toggle');

const slugNumber = (index) => String(index + 1).padStart(2, '0');

const renderProjectIndex = () => {
  projectIndex.innerHTML = projects
    .map(
      (project, index) => `
        <a class="project-row" href="#${project.id}">
          <span>${slugNumber(index)}</span>
          <strong>${project.title}</strong>
          <em>${project.format}</em>
        </a>
      `,
    )
    .join('');
};

const renderProjectPages = () => {
  projectPages.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-page" id="${project.id}">
          <div class="project-page__meta">
            <span>${slugNumber(index)}</span>
            <span>${project.date}</span>
            <a href="${project.pdf}" download>Download project PDF</a>
          </div>
          <div class="project-page__body">
            <header>
              <p class="kicker">${project.format}</p>
              <h3>${project.title}</h3>
              <p>${project.summary}</p>
            </header>
            <div class="project-page__grid">
              <section>
                <h4>System / environment</h4>
                <p>${project.system}</p>
              </section>
              <section>
                <h4>Documentation</h4>
                <ul>${project.documentation.map((item) => `<li>${item}</li>`).join('')}</ul>
              </section>
            </div>
            <div class="media-module" aria-label="${project.title} media embed placeholder">
              <div>
                <span>Media embed</span>
                <p>${project.embed}</p>
              </div>
              <ul>${project.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
};

const renderTeaching = () => {
  teachingGrid.innerHTML = teachingMaterials
    .map(
      (item) => `
        <article>
          <span>${item.type}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <a href="${item.href}" download>Download material</a>
        </article>
      `,
    )
    .join('');
};

const renderCv = () => {
  cvWorkList.innerHTML = projects.map((project) => `<li>${project.title}</li>`).join('');
  downloadList.innerHTML = downloads
    .map(([label, href]) => `<li><a href="${href}" download>${label}</a></li>`)
    .join('');
};

const updateToggleLabel = () => {
  const isNight = document.body.classList.contains('night-mode');
  toggle.textContent = isNight ? 'Day signal' : 'Night signal';
  toggle.setAttribute('aria-pressed', String(isNight));
};

toggle.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  updateToggleLabel();
});

renderProjectIndex();
renderProjectPages();
renderTeaching();
renderCv();
