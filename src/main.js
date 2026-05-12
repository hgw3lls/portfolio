const defaultProjects = [
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

  {
    id: 'the-fixers-naudia-loftis',
    title: 'The Fixers: Naudia Loftis',
    date: 'Selected film/video work',
    format: 'Collaborative documentary film',
    tags: ['film/video', 'documentary', 'community organizing', 'social practice'],
    summary:
      'A collaborative documentary centered on a seventeen-year-old community organizer in Cleveland’s Kinsman neighborhood.',
    system:
      'Structured through interviews with friends and family, the film foregrounds lived experience within conditions shaped by systemic violence and social instability. Rather than imposing an external narrative, the work creates space for participants to articulate their perspectives through dialogue, proximity, and trust.',
    documentation: ['community screenings', 'gallery presentations', 'public events', '2016 Republican National Convention context'],
    embed: 'Documentary excerpt / screening documentation embed slot',
    pdf: 'docs/the-fixers-naudia-loftis-documentation.pdf',
    media: [],
  },
  {
    id: 'make-america-great-again-and-again',
    title: 'Make America Great Again ... And Again',
    date: 'Selected film/video work',
    format: 'Experimental video work',
    tags: ['film/video', 'experimental video', 'political language', 'speculative fiction'],
    summary:
      'An experimental video work and Short and Sweet Festival Outstanding Film award winner drawing on Octavia E. Butler’s Parable trilogy.',
    system:
      'The project examines political language as a mechanism of narrative construction and control, exploring the relationship between speculative fiction and contemporary political reality. Through montage, abstraction, and layered imagery, it asks not what greatness is, but for whom it is constructed and at what cost.',
    documentation: ['single-channel video', 'festival screening notes', 'montage stills', 'sound/image documentation'],
    embed: 'Experimental video excerpt / screening documentation embed slot',
    pdf: 'docs/make-america-great-again-and-again-documentation.pdf',
    media: [],
  },
  {
    id: 'surface',
    title: 'surFACE',
    date: 'Selected film/video work',
    format: 'Short film, analog recording systems, tape-based process',
    tags: ['film/video', 'analog video', 'feedback', 'drawing', 'sound'],
    summary:
      'A short film produced as part of the larger TAPEHEADS project, investigating analog recording systems, tape-based processes, and the material conditions of image and sound.',
    system:
      'Built from a repetitive drawing practice centered on abstracted faces, the film treats marks as raw material within recording, layering, playback, and transformation. The screen becomes an apparatus where image and sound co-evolve through repetition, distortion, and feedback.',
    documentation: ['TAPEHEADS project context', 'drawing sequences', 'feedback recordings', 'screening stills'],
    embed: 'Short film excerpt / analog feedback documentation embed slot',
    pdf: 'docs/surface-documentation.pdf',
    media: [],
  },
  {
    id: 'flow-lines',
    title: 'Flow Lines (3-channel video)',
    date: 'Selected film/video work',
    format: 'Three-channel collaborative video installation',
    tags: ['film/video', 'three-channel video', 'landscape', 'migration', 'Niagara River'],
    summary:
      'A collaborative video work developed in response to Isaac Julien’s Kapital, exploring the movement of value through geography, history, and narrative.',
    system:
      'Centered on the Niagara River as both physical flow and historical boundary connected to the Underground Railroad, the piece layers landscape, memory, and migration through image, rhythm, and poetic language. It approaches landscape as a living system through which histories are carried, transformed, and reinterpreted.',
    documentation: ['three-channel installation', 'Niagara River research', 'poetic language score', 'installation stills'],
    embed: 'Three-channel video excerpt / installation documentation embed slot',
    pdf: 'docs/flow-lines-documentation.pdf',
    media: [],
  },
  {
    id: 'bobbi-lynn',
    title: 'BOBBI LYNN',
    date: 'Selected film/video work',
    format: 'Music video, generative image systems',
    tags: ['film/video', 'music video', 'generative imagery', 'memory', 'family archive'],
    summary:
      'A music video that explores memory and familial relationships through generative image systems.',
    system:
      'Centered on a son’s recollection of his relationship with his mother, the work replaces photographic reconstruction with synthetic image generation. Drawing on Roland Barthes’ distinction between studium and punctum, it examines how memory, identity, intimacy, and representation become mediated through machine-generated imagery.',
    documentation: ['music video', 'generative image studies', 'family memory framework', 'image-system process notes'],
    embed: 'Music video excerpt / generative image documentation embed slot',
    pdf: 'docs/bobbi-lynn-documentation.pdf',
    media: [],
  },
  {
    id: 'dossier-37',
    title: 'Dossier 37',
    date: 'Selected film/video work',
    format: 'Audiovisual work, forensic interface, data visualization',
    tags: ['film/video', 'audiovisual work', 'AUDINT', 'data visualization', 'disinformation'],
    summary:
      'An audiovisual work developed in collaboration with AUDINT that investigates the unstable territory between sonic warfare, disinformation, and state narrative production.',
    system:
      'Emerging from discourse surrounding alleged sonic attacks on US diplomatic personnel in Cuba and South China, the project examines how fear, rumor, and geopolitical speculation circulate through media systems as forms of perceptual instability. Structured as a forensic and speculative timeline, it visualizes Twitter activity and signal environments around Havana Syndrome.',
    documentation: ['AUDINT collaboration', 'IREX2 interface study', 'Twitter activity visualization', 'forensic timeline'],
    embed: 'Audiovisual excerpt / forensic interface documentation embed slot',
    pdf: 'docs/dossier-37-documentation.pdf',
    media: [],
  },
];

const STORAGE_KEY = 'tony-yanick-portfolio-projects';
const ADMIN_SESSION_KEY = 'tony-yanick-admin-authenticated';
const ADMIN_CREDENTIALS = { username: 'anon', password: '1984' };
const LIVE_SAVE_MESSAGE = 'Public site updated just now.';


let projects = structuredClone(defaultProjects);

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


const projectList = document.querySelector('#project-list');
const projectReader = document.querySelector('#project-reader');
const teachingGrid = document.querySelector('#teaching-grid');
const cvWorkList = document.querySelector('#cv-work-list');
const downloadList = document.querySelector('#download-list');
const toggle = document.querySelector('.mode-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const siteMenu = document.querySelector('#site-menu');
const menuProjects = document.querySelector('#menu-projects');
const routeLinks = document.querySelectorAll('[data-route]');
const views = document.querySelectorAll('[data-view]');
const sortButtons = document.querySelectorAll('[data-sort]');
const adminLogin = document.querySelector('#admin-login');
const adminLoginStatus = document.querySelector('#admin-login-status');
const adminSession = document.querySelector('#admin-session');
const adminLayout = document.querySelector('#admin-layout');
const adminProjectSelect = document.querySelector('#admin-project-select');
const projectEditor = document.querySelector('#project-editor');
const assetEditor = document.querySelector('#asset-editor');
const adminExport = document.querySelector('#admin-export');
const adminNewButton = document.querySelector('[data-admin-new]');
const adminResetButton = document.querySelector('[data-admin-reset]');
const adminLockButton = document.querySelector('[data-admin-lock]');
const adminExportButton = document.querySelector('[data-admin-export]');
const adminAssetList = document.querySelector('#admin-asset-list');
const adminLiveStatus = document.querySelector('#admin-live-status');

let activeProjectId = projects[0].id;
let activeSort = 'date';
let activeRoute = 'works';
let isAdminAuthenticated = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
let liveStatusTimer;


const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const safeUrl = (value = '') => {
  const url = String(value).trim();
  if (!url || url.startsWith('//')) return '';
  if (/^(https?:|mailto:|data:|blob:)/i.test(url)) return url;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  return '';
};

const listFromText = (value = '') => String(value)
  .split(/[\n,]/)
  .map((item) => item.trim())
  .filter(Boolean);

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  if (!file) {
    resolve('');
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result));
  reader.addEventListener('error', () => reject(reader.error));
  reader.readAsDataURL(file);
});

const mergeDefaultProjects = (savedProjects) => {
  const savedProjectIds = new Set(savedProjects.map((project) => project.id));
  const missingDefaultProjects = defaultProjects
    .filter((project) => !savedProjectIds.has(project.id))
    .map((project) => structuredClone(project));

  return [...savedProjects, ...missingDefaultProjects];
};


const updateAdminAccess = () => {
  if (!adminLogin || !adminLayout) return;

  adminLogin.hidden = isAdminAuthenticated;
  adminLayout.hidden = !isAdminAuthenticated;
  if (adminSession) adminSession.hidden = !isAdminAuthenticated;
  if (adminResetButton) adminResetButton.hidden = !isAdminAuthenticated;

  if (adminLoginStatus) {
    adminLoginStatus.textContent = '';
    adminLoginStatus.classList.remove('is-error');
  }
};

const setAdminAuthenticated = (authenticated) => {
  isAdminAuthenticated = authenticated;
  if (authenticated) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
  updateAdminAccess();
};

const requireAdminAccess = () => {
  if (isAdminAuthenticated) return true;
  setAdminAuthenticated(false);
  return false;
};

const loadProjects = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length) {
      projects = mergeDefaultProjects(parsed);
      if (projects.length !== parsed.length) saveProjects({ silent: true });
      if (!projects.some((project) => project.id === activeProjectId)) activeProjectId = projects[0].id;
    }
  } catch (error) {
    console.warn('Unable to load saved project edits.', error);
  }
};

const updateLiveStatus = (message = LIVE_SAVE_MESSAGE) => {
  if (!adminLiveStatus) return;
  adminLiveStatus.textContent = message;
  adminLiveStatus.classList.remove('is-error');
  window.clearTimeout(liveStatusTimer);
  liveStatusTimer = window.setTimeout(() => {
    adminLiveStatus.textContent = 'Edits publish instantly in this browser.';
  }, 2600);
};

const saveProjects = ({ silent = false } = {}) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  if (!silent) updateLiveStatus();
};

const createProjectId = (title) => {
  const base = String(title || 'new-project')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'new-project';
  let id = base;
  let count = 2;
  while (projects.some((project) => project.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  return id;
};

const getEmbeddableVideoUrl = (url) => {
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (parsed.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    if (parsed.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video/${parsed.pathname.split('/').filter(Boolean).pop()}`;
  } catch (error) {
    return url;
  }

  return url;
};

const renderMediaItem = (media) => {
  const url = safeUrl(media.url);
  if (!url) return '';
  const title = escapeHtml(media.title || media.fileName || 'Project media');
  const caption = media.caption ? `<p>${escapeHtml(media.caption)}</p>` : '';
  const download = media.fileName ? ` download="${escapeHtml(media.fileName)}"` : '';

  if (media.type === 'image') {
    return `<figure class="media-item"><img src="${url}" alt="${title}" /><figcaption>${title}${caption}</figcaption></figure>`;
  }

  if (media.type === 'video') {
    const embedUrl = getEmbeddableVideoUrl(url);
    const player = /youtube\.com\/embed|player\.vimeo\.com/.test(embedUrl)
      ? `<iframe src="${embedUrl}" title="${title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      : `<video src="${url}" controls playsinline preload="metadata"></video>`;
    return `<figure class="media-item media-item--video">${player}<figcaption>${title}${caption}</figcaption></figure>`;
  }

  if (media.type === 'audio') {
    return `<figure class="media-item"><audio src="${url}" controls preload="metadata"></audio><figcaption>${title}${caption}</figcaption></figure>`;
  }

  return `<article class="media-item media-item--link"><h4>${title}</h4>${caption}<a href="${url}"${download} target="_blank" rel="noreferrer">Open ${escapeHtml(media.type || 'asset')}</a></article>`;
};

const renderAdminSelect = () => {
  if (!adminProjectSelect) return;
  adminProjectSelect.innerHTML = projects
    .map((project) => `<option value="${project.id}">${escapeHtml(project.title)}</option>`)
    .join('');
  adminProjectSelect.value = activeProjectId;
};


const renderAdminAssets = () => {
  if (!adminAssetList) return;
  const project = projects.find((item) => item.id === activeProjectId) || projects[0];
  const media = project.media || [];
  adminAssetList.innerHTML = `
    <span class="admin-kicker">Current assets</span>
    ${project.pdf ? `<article><strong>Project PDF</strong><a href="${safeUrl(project.pdf)}" target="_blank" rel="noreferrer">Open PDF</a></article>` : '<article>No project PDF set.</article>'}
    ${media.length ? media.map((item, index) => `
      <article>
        <strong>${escapeHtml(item.title || item.fileName || item.type)}</strong>
        <span>${escapeHtml(item.type)}</span>
        <button type="button" data-remove-media="${index}">Remove</button>
      </article>
    `).join('') : '<article>No media items yet.</article>'}
  `;
};

const populateProjectEditor = () => {
  if (!projectEditor) return;
  const project = projects.find((item) => item.id === activeProjectId) || projects[0];
  if (!project) return;
  projectEditor.elements.projectId.value = project.id;
  projectEditor.elements.title.value = project.title || '';
  projectEditor.elements.date.value = project.date || '';
  projectEditor.elements.format.value = project.format || '';
  projectEditor.elements.tags.value = (project.tags || []).join(', ');
  projectEditor.elements.summary.value = project.summary || '';
  projectEditor.elements.system.value = project.system || '';
  projectEditor.elements.documentation.value = (project.documentation || []).join('\n');
  if (assetEditor) assetEditor.elements.pdfLink.value = project.pdf || '';
};

const clearAssetDraftFields = () => {
  if (!assetEditor) return;
  assetEditor.elements.pdfFile.value = '';
  assetEditor.elements.mediaFile.value = '';
  assetEditor.elements.mediaTitle.value = '';
  assetEditor.elements.mediaUrl.value = '';
  assetEditor.elements.mediaCaption.value = '';
  if (adminExport) adminExport.value = '';
};

const refreshAdminEditableContent = ({ clearDrafts = false } = {}) => {
  populateProjectEditor();
  renderAdminAssets();
  if (clearDrafts) clearAssetDraftFields();
};

const refreshPublicPortfolio = () => {
  renderMenuProjects();
  renderProjectList();
  renderProjectReader();
  renderCv();
};

const refreshAdminProjectShell = () => {
  renderAdminSelect();
  refreshAdminEditableContent();
};

const refreshPortfolio = () => {
  refreshPublicPortfolio();
  refreshAdminProjectShell();
};

const applyProjectEditorValues = () => {
  if (!projectEditor || !requireAdminAccess()) return false;
  const form = new FormData(projectEditor);
  const project = projects.find((item) => item.id === activeProjectId);
  if (!project) return false;

  const title = String(form.get('title') || '').trim();
  project.title = title || project.title;
  project.date = String(form.get('date') || '').trim();
  project.format = String(form.get('format') || '').trim();
  project.tags = listFromText(form.get('tags'));
  project.summary = String(form.get('summary') || '').trim();
  project.system = String(form.get('system') || '').trim();
  project.documentation = String(form.get('documentation') || '').split('\n').map((item) => item.trim()).filter(Boolean);
  return true;
};

const publishEditorChanges = () => {
  if (!applyProjectEditorValues()) return;
  saveProjects();
  refreshPublicPortfolio();
  refreshAdminProjectShell();
};

const publishPdfLinkChange = () => {
  if (!assetEditor || !requireAdminAccess()) return;
  const project = projects.find((item) => item.id === activeProjectId);
  if (!project) return;

  project.pdf = safeUrl(assetEditor.elements.pdfLink.value);
  saveProjects();
  refreshPublicPortfolio();
  renderAdminAssets();
};

const slugNumber = (index) => String(index + 1).padStart(2, '0');

const sortedProjects = () => [...projects].sort((a, b) => {
  if (activeSort === 'title') {
    return a.title.localeCompare(b.title);
  }

  if (activeSort === 'format') {
    return a.format.localeCompare(b.format);
  }

  return projects.indexOf(a) - projects.indexOf(b);
});

const setRoute = (route) => {
  activeRoute = route;
  views.forEach((view) => view.classList.toggle('is-active', view.dataset.view === route));
  routeLinks.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  document.body.dataset.route = route;
};

const renderMenuProjects = () => {
  menuProjects.innerHTML = projects
    .map((project, index) => `<a href="#works" data-project-jump="${project.id}">${slugNumber(index)} ${escapeHtml(project.title)}</a>`)
    .join('');
};

const renderProjectReader = () => {
  const project = projects.find((item) => item.id === activeProjectId) || projects[0];
  const index = projects.indexOf(project);
  const pdf = safeUrl(project.pdf);
  const mediaItems = (project.media || []).map(renderMediaItem).join('');

  projectReader.innerHTML = `
    <div class="reader-meta">
      <span>${slugNumber(index)}</span>
      <span>${escapeHtml(project.date)}</span>
      ${pdf ? `<a href="${pdf}" download>PDF</a>` : '<span>No PDF</span>'}
    </div>
    <p class="eyebrow">${escapeHtml(project.format)}</p>
    <h3>${escapeHtml(project.title)}</h3>
    <p class="reader-summary">${escapeHtml(project.summary)}</p>
    <div class="reader-sections">
      <section>
        <h4>System / environment</h4>
        <p>${escapeHtml(project.system)}</p>
      </section>
      <section>
        <h4>Documentation</h4>
        <ul>${(project.documentation || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </section>
    </div>
    <div class="media-module" aria-label="${escapeHtml(project.title)} media">
      <span>media module</span>
      ${mediaItems || `<p>${escapeHtml(project.embed || 'Add project media in Admin.')}</p>`}
    </div>
    <ul class="tag-list">${(project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
  `;
};

const renderProjectList = () => {
  projectList.innerHTML = sortedProjects()
    .map((project) => {
      const index = projects.indexOf(project);
      return `
        <button class="project-row" type="button" data-project="${project.id}" aria-pressed="${project.id === activeProjectId}">
          <span>${slugNumber(index)}</span>
          <strong>${escapeHtml(project.title)}</strong>
          <em>${escapeHtml(project.format)}</em>
          <small>${escapeHtml(project.date)}</small>
          <p class="project-row-summary">${escapeHtml(project.summary)}</p>
          <span class="project-row-cta" aria-hidden="true">View details ↓</span>
        </button>
      `;
    })
    .join('');

  projectList.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', () => {
      activeProjectId = button.dataset.project;
      renderProjectList();
      renderProjectReader();

      if (window.matchMedia('(max-width: 760px)').matches) {
        projectReader.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });

    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      activeProjectId = button.dataset.project;
      renderProjectList();
      renderProjectReader();
    });
  });
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
  cvWorkList.innerHTML = projects.map((project) => `<li>${escapeHtml(project.title)}</li>`).join('');
  downloadList.innerHTML = downloads
    .map(([label, href]) => `<li><a href="${href}" download>${label}</a></li>`)
    .join('');
};

const updateToggleLabel = () => {
  const isNight = document.body.classList.contains('night-mode');
  toggle.textContent = isNight ? 'paper' : 'invert';
  toggle.setAttribute('aria-pressed', String(isNight));
};

const openMenu = () => {
  document.body.classList.add('menu-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  siteMenu.setAttribute('aria-hidden', 'false');
};

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  siteMenu.setAttribute('aria-hidden', 'true');
};

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  updateToggleLabel();
});

routeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const route = link.dataset.route;
    if (!route) return;
    event.preventDefault();
    history.replaceState(null, '', `#${route}`);
    setRoute(route);
    closeMenu();
  });
});

sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeSort = button.dataset.sort;
    sortButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    renderProjectList();
  });
});

menuProjects.addEventListener('click', (event) => {
  const link = event.target.closest('[data-project-jump]');
  if (!link) return;
  event.preventDefault();
  activeProjectId = link.dataset.projectJump;
  setRoute('works');
  closeMenu();
  renderProjectList();
  renderProjectReader();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

adminLogin?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(adminLogin);
  const username = String(form.get('username')).trim();
  const password = String(form.get('password'));

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    adminLogin.reset();
    setAdminAuthenticated(true);
    return;
  }

  if (adminLoginStatus) {
    adminLoginStatus.textContent = 'Incorrect username or password.';
    adminLoginStatus.classList.add('is-error');
  }
});

adminLockButton?.addEventListener('click', () => {
  setAdminAuthenticated(false);
});

adminProjectSelect?.addEventListener('change', () => {
  activeProjectId = adminProjectSelect.value;
  refreshPublicPortfolio();
  renderAdminSelect();
  refreshAdminEditableContent({ clearDrafts: true });
  updateLiveStatus('Editing selected project.');
});

projectEditor?.addEventListener('input', (event) => {
  if (event.target === adminProjectSelect) return;
  publishEditorChanges();
});
projectEditor?.addEventListener('submit', (event) => {
  event.preventDefault();
  publishEditorChanges();
});

adminNewButton?.addEventListener('click', () => {
  if (!requireAdminAccess()) return;
  const project = {
    id: createProjectId('new project'),
    title: 'NEW PROJECT',
    date: 'Draft',
    format: 'Media environment',
    tags: ['draft'],
    summary: 'Add a project summary in the admin editor.',
    system: 'Describe the system, environment, or process.',
    documentation: ['Add documentation notes'],
    embed: 'Add media, a local file, or a hosted link in Admin.',
    pdf: '',
    media: [],
  };
  projects.unshift(project);
  activeProjectId = project.id;
  saveProjects();
  refreshPortfolio();
});

assetEditor?.elements.pdfLink?.addEventListener('input', publishPdfLinkChange);

assetEditor?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!requireAdminAccess()) return;
  const project = projects.find((item) => item.id === activeProjectId);
  if (!project) return;
  const form = new FormData(assetEditor);
  const pdfFile = assetEditor.elements.pdfFile.files[0];
  const mediaFile = assetEditor.elements.mediaFile.files[0];
  const pdfLink = safeUrl(form.get('pdfLink'));

  if (pdfFile) {
    project.pdf = await fileToDataUrl(pdfFile);
  } else if (pdfLink) {
    project.pdf = pdfLink;
  }

  const mediaUrl = mediaFile ? await fileToDataUrl(mediaFile) : safeUrl(form.get('mediaUrl'));
  if (mediaUrl) {
    project.media = project.media || [];
    project.media.push({
      type: form.get('mediaType'),
      title: form.get('mediaTitle').trim() || mediaFile?.name || 'Project media',
      url: mediaUrl,
      caption: form.get('mediaCaption').trim(),
      fileName: mediaFile?.name || '',
    });
  }

  saveProjects();
  clearAssetDraftFields();
  refreshPortfolio();
});

adminExportButton?.addEventListener('click', () => {
  if (!requireAdminAccess() || !adminExport) return;
  adminExport.value = JSON.stringify(projects, null, 2);
  adminExport.select();
});

adminAssetList?.addEventListener('click', (event) => {
  if (!requireAdminAccess()) return;
  const button = event.target.closest('[data-remove-media]');
  if (!button) return;
  const project = projects.find((item) => item.id === activeProjectId);
  if (!project?.media) return;
  project.media.splice(Number(button.dataset.removeMedia), 1);
  saveProjects();
  refreshPortfolio();
});

adminResetButton?.addEventListener('click', () => {
  if (!requireAdminAccess()) return;
  localStorage.removeItem(STORAGE_KEY);
  projects = structuredClone(defaultProjects);
  activeProjectId = projects[0].id;
  refreshPortfolio();
  updateLiveStatus('Public site reset to default projects.');
});

window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY) return;

  try {
    const parsed = event.newValue ? JSON.parse(event.newValue) : structuredClone(defaultProjects);
    if (Array.isArray(parsed) && parsed.length) {
      projects = parsed;
      if (!projects.some((project) => project.id === activeProjectId)) activeProjectId = projects[0].id;
      refreshPortfolio();
    }
  } catch (error) {
    console.warn('Unable to sync project edits from another tab.', error);
  }
});

loadProjects();
updateAdminAccess();

renderMenuProjects();
renderProjectList();
renderProjectReader();
renderTeaching();
renderCv();
renderAdminSelect();
populateProjectEditor();
renderAdminAssets();
const initialRoute = [...views].some((view) => view.dataset.view === location.hash.replace('#', ''))
  ? location.hash.replace('#', '')
  : 'works';
setRoute(initialRoute);
sortButtons[0]?.classList.add('is-active');
