const CONTENT_URL = 'content.json';
const STORAGE_KEY = 'tony-yanick-portfolio-projects';
const MODE_STORAGE_KEY = 'tony-yanick-portfolio-mode';
const ADMIN_SESSION_KEY = 'tony-yanick-admin-authenticated';
const ADMIN_CREDENTIALS = { username: 'anon', password: '1984' };
const ADMIN_BACKDOOR_HASH = '#anonadmin';

const loadSiteContent = async () => {
  const response = await fetch(CONTENT_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${CONTENT_URL}: ${response.status}`);
  return response.json();
};

const siteContent = await loadSiteContent();
const defaultProjects = structuredClone(siteContent.projects || []);
let projects = structuredClone(defaultProjects);
let teachingMaterials = siteContent.teaching?.materials || [];
let downloads = siteContent.cv?.downloads || [];

const setDocumentMeta = ({ meta = {} } = {}) => {
  if (meta.title) document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && meta.description) description.setAttribute('content', meta.description);
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
};

const setLink = (selector, { href, label, download } = {}) => {
  const element = document.querySelector(selector);
  if (!element) return;
  if (href) element.setAttribute('href', href);
  if (label !== undefined) element.textContent = label;
  if (download) element.setAttribute('download', '');
};

const isAdminRoute = (route) => route === 'admin';
const isAdminBackdoorHash = () => window.location.hash === ADMIN_BACKDOOR_HASH;

const createNavLink = ({ route, label }) => {
  const link = document.createElement('a');
  link.href = `#${route}`;
  link.dataset.route = route;
  link.textContent = label;
  return link;
};

const createMenuLink = ({ route, href, label, download }) => {
  const link = document.createElement('a');
  link.href = route ? `#${route}` : href;
  if (route) link.dataset.route = route;
  if (download) link.setAttribute('download', '');
  link.textContent = label;
  return link;
};

const FIT_TEXT_SELECTOR = [
  '.wordmark',
  '.mode-toggle',
  '.route-tabs a',
  '.sticky-head button',
  '.project-row strong',
  '.project-reader h3',
  '.project-row em',
  '.project-row small',
  '.project-row-cta',
  '.filter-chip',
  '.reader-action',
  '.reader-return',
].join(', ');

const fitSingleLineText = (root = document) => {
  const scope = root instanceof Element ? root : document;
  const elements = scope.matches?.(FIT_TEXT_SELECTOR)
    ? [scope]
    : [...scope.querySelectorAll(FIT_TEXT_SELECTOR)];

  requestAnimationFrame(() => {
    elements.forEach((element) => {
      element.style.fontSize = '';
      if (!element.isConnected || element.clientWidth <= 0 || element.scrollWidth <= element.clientWidth) return;

      const baseSize = Number.parseFloat(getComputedStyle(element).fontSize);
      const minSize = Number.parseFloat(element.dataset.fitMin || '8');
      if (!Number.isFinite(baseSize) || baseSize <= minSize) return;

      let nextSize = baseSize;
      let attempts = 0;
      while (element.scrollWidth > element.clientWidth && nextSize > minSize && attempts < 12) {
        const ratio = element.clientWidth / element.scrollWidth;
        nextSize = Math.max(minSize, nextSize * Math.min(0.98, ratio * 0.98));
        element.style.fontSize = `${nextSize}px`;
        attempts += 1;
      }
    });
  });
};

const replaceChildren = (element, children) => {
  if (!element) return;
  element.replaceChildren(...children.filter(Boolean));
};

const populateMenu = ({ menu = {} } = {}) => {
  const columns = document.querySelector('.menu-columns');
  if (!columns) return;
  document.querySelector('#site-menu')?.setAttribute('aria-label', menu.ariaLabel || 'Expanded navigation');
  columns.replaceChildren(...(menu.sections || []).map((section) => {
    const wrapper = document.createElement('section');
    const title = document.createElement('h2');
    title.textContent = section.title;
    wrapper.append(title);

    if (section.projectJump) {
      const jump = document.createElement('div');
      jump.className = 'menu-projects';
      jump.id = 'menu-projects';
      wrapper.append(jump);
      return wrapper;
    }

    (section.links || [])
      .filter(({ route }) => !isAdminRoute(route))
      .forEach((link) => wrapper.append(createMenuLink(link)));
    if (section.button) {
      const button = document.createElement('button');
      button.className = 'menu-note';
      button.type = 'button';
      button.textContent = section.button;
      wrapper.append(button);
    }
    return wrapper;
  }));
};

const populateStaticContent = (content) => {
  setDocumentMeta(content);
  setText('.skip-link', content.site?.skipLink);
  setText('.wordmark', content.site?.wordmark);
  document.querySelector('.wordmark')?.setAttribute('aria-label', content.site?.wordmarkAriaLabel || content.site?.wordmark || 'Home');
  document.querySelector('.menu-toggle').textContent = content.site?.menuToggleLabel || '+';
  document.querySelector('.menu-toggle')?.setAttribute('aria-label', content.site?.menuOpenAriaLabel || 'Open navigation');
  document.querySelector('.menu-close').textContent = content.site?.menuCloseLabel || '−';
  document.querySelector('.menu-close')?.setAttribute('aria-label', content.site?.menuCloseAriaLabel || 'Close navigation');

  const ticker = document.querySelector('.ticker');
  replaceChildren(ticker, (content.site?.ticker || []).map((item) => {
    const span = document.createElement('span');
    span.textContent = item;
    return span;
  }));

  replaceChildren(document.querySelector('.route-tabs'), (content.navigation || [])
    .filter(({ route }) => !isAdminRoute(route))
    .map(createNavLink));
  populateMenu(content);
  fitSingleLineText();

  setText('.identity-panel .eyebrow', content.hero?.eyebrow);
  setText('#hero-title', content.hero?.title);
  setText('.identity-panel .lede', content.hero?.lede);

  const sortLabels = content.works?.sortButtons || {};
  Object.entries(sortLabels).forEach(([key, label]) => setText(`[data-sort="${key}"]`, label));
  setText('.sticky-head span', content.works?.openLabel);
  setText('#works-title', content.works?.title);
  document.querySelector('#project-list')?.setAttribute('aria-label', content.works?.projectListAriaLabel || 'Selectable project list');
  document.querySelector('#project-reader')?.setAttribute('aria-label', content.works?.projectReaderAriaLabel || 'Selected project detail');

  setText('#statement .view-head span', content.statement?.number);
  setLink('#statement .view-head a', { href: content.statement?.pdfHref, label: content.statement?.pdfLabel, download: true });
  setText('#statement-title', content.statement?.title);
  const statement = document.querySelector('#statement');
  statement?.querySelectorAll('p').forEach((paragraph) => paragraph.remove());
  (content.statement?.paragraphs || []).forEach((copy) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = copy;
    statement?.append(paragraph);
  });

  setText('#research .view-head span', content.research?.number);
  setLink('#research .view-head a', { href: content.research?.pdfHref, label: content.research?.pdfLabel, download: true });
  setText('#research-title', content.research?.title);
  const researchGrid = document.querySelector('#research .card-grid');
  replaceChildren(researchGrid, (content.research?.cards || []).map((card) => {
    const article = document.createElement('article');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = card.title;
    paragraph.textContent = card.text;
    article.append(heading, paragraph);
    return article;
  }));

  setText('#teaching .view-head span', content.teaching?.number);
  setLink('#teaching .view-head a', { href: content.teaching?.pdfHref, label: content.teaching?.pdfLabel, download: true });
  setText('#teaching-title', content.teaching?.title);
  setText('#teaching .section-intro', content.teaching?.intro);

  setText('#cv .view-head span', content.cv?.number);
  setLink('#cv .view-head a', { href: content.cv?.pdfHref, label: content.cv?.pdfLabel, download: true });
  setText('#cv-title', content.cv?.title);
  setText('#cv article:nth-child(1) h3', content.cv?.educationHeading);
  const educationList = document.querySelector('#cv article:nth-child(1) ul');
  replaceChildren(educationList, (content.cv?.education || []).map((item) => {
    const li = document.createElement('li');
    li.innerHTML = item;
    return li;
  }));
  setText('#cv article:nth-child(2) h3', content.cv?.selectedWorksHeading);
  setText('#cv article:nth-child(3) h3', content.cv?.downloadsHeading);

  setText('#admin .view-head span', content.admin?.number);
  setText('[data-admin-reset]', content.admin?.resetLabel);
  setText('#admin-title', content.admin?.title);
  setText('#admin .section-intro', content.admin?.intro);
  setText('#admin-login-title', content.admin?.loginTitle);
  setText('#admin-login button[type="submit"]', content.admin?.unlockLabel);
  setText('#admin-session p', `${content.admin?.sessionPrefix || 'Signed in as'} `);
  const sessionUser = document.createElement('strong');
  sessionUser.textContent = content.admin?.sessionUser || 'anon';
  document.querySelector('#admin-session p')?.append(sessionUser, '.');
  setText('[data-admin-lock]', content.admin?.lockLabel);
  setText('#project-editor .admin-kicker', content.admin?.projectPanelTitle);
  setText('#admin-live-status', content.admin?.liveStatusDefault);
  setText('#asset-editor .admin-kicker', content.admin?.assetPanelTitle);

  const setLabelText = (formSelector, controlName, labelText) => {
    const control = document.querySelector(`${formSelector} [name="${controlName}"]`);
    const label = control?.closest('label');
    if (!label || labelText === undefined) return;
    const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (textNode) textNode.textContent = `\n                ${labelText}\n                `;
  };

  setLabelText('#admin-login', 'username', content.admin?.usernameLabel);
  setLabelText('#admin-login', 'password', content.admin?.passwordLabel);
  setLabelText('#project-editor', 'projectId', content.admin?.selectProjectLabel);
  setLabelText('#project-editor', 'title', content.admin?.projectTitleLabel);
  setLabelText('#project-editor', 'date', content.admin?.dateLabel);
  setLabelText('#project-editor', 'format', content.admin?.formatLabel);
  setLabelText('#project-editor', 'tags', content.admin?.tagsLabel);
  setLabelText('#project-editor', 'summary', content.admin?.summaryLabel);
  setLabelText('#project-editor', 'system', content.admin?.systemLabel);
  setLabelText('#project-editor', 'documentation', content.admin?.documentationLabel);
  setLabelText('#asset-editor', 'pdfLink', content.admin?.pdfLinkLabel);
  setLabelText('#asset-editor', 'pdfFile', content.admin?.pdfUploadLabel);
  setLabelText('#asset-editor', 'mediaType', content.admin?.mediaTypeLabel);
  setLabelText('#asset-editor', 'mediaTitle', content.admin?.mediaTitleLabel);
  setLabelText('#asset-editor', 'mediaUrl', content.admin?.mediaLinkLabel);
  setLabelText('#asset-editor', 'mediaFile', content.admin?.mediaUploadLabel);
  setLabelText('#asset-editor', 'mediaCaption', content.admin?.captionLabel);

  const pdfLink = document.querySelector('#asset-editor [name="pdfLink"]');
  if (pdfLink) pdfLink.placeholder = content.admin?.pdfLinkPlaceholder || '';
  const mediaTitle = document.querySelector('#asset-editor [name="mediaTitle"]');
  if (mediaTitle) mediaTitle.placeholder = content.admin?.mediaTitlePlaceholder || '';
  const mediaUrl = document.querySelector('#asset-editor [name="mediaUrl"]');
  if (mediaUrl) mediaUrl.placeholder = content.admin?.mediaLinkPlaceholder || '';

  const mediaType = document.querySelector('#asset-editor [name="mediaType"]');
  if (mediaType) {
    mediaType.replaceChildren(...(content.admin?.mediaTypeOptions || []).map((option) => {
      const element = document.createElement('option');
      element.value = option.value;
      element.textContent = option.label;
      return element;
    }));
  }
  setText('#project-editor button[type="submit"]', content.admin?.saveLabel);
  setText('[data-admin-new]', content.admin?.newProjectLabel);
  setText('#asset-editor button[type="submit"]', content.admin?.updateAssetLabel);
  setText('[data-admin-export]', content.admin?.exportLabel);
  const adminExport = document.querySelector('#admin-export');
  if (adminExport) adminExport.placeholder = content.admin?.exportPlaceholder || '';

  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.replaceChildren();
    const paragraph = document.createElement('p');
    paragraph.textContent = content.footer?.text || '';
    footer.append(paragraph, ...(content.footer?.links || []).map(createMenuLink));
  }
};

populateStaticContent(siteContent);

const projectList = document.querySelector('#project-list');
const projectReader = document.querySelector('#project-reader');
const projectSearch = document.querySelector('#project-search');
const projectFilters = document.querySelector('#project-filters');
const projectCount = document.querySelector('#project-count');
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
let activeFilter = 'all';
let activeQuery = '';
let activeRoute = 'works';
let isAdminAuthenticated = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
let lastFocusedElement = null;
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

const normalizeSearchValue = (value = '') => String(value).trim().toLowerCase();

const getProjectSearchText = (project = {}) => [
  project.title,
  project.date,
  project.format,
  project.summary,
  project.system,
  ...(project.tags || []),
  ...(project.documentation || []),
].join(' ').toLowerCase();

const projectMatchesControls = (project) => {
  const searchText = getProjectSearchText(project);
  const query = normalizeSearchValue(activeQuery);
  const matchesQuery = !query || searchText.includes(query);
  const filter = normalizeSearchValue(activeFilter);
  const matchesFilter = filter === 'all'
    || (project.tags || []).some((tag) => normalizeSearchValue(tag) === filter)
    || normalizeSearchValue(project.format).includes(filter);

  return matchesQuery && matchesFilter;
};

const getFilterOptions = () => {
  const preferred = [
    'installation',
    'generative systems',
    'speculative fiction',
    'signal systems',
    'experimental film',
    'participatory infrastructure',
  ];
  const counts = new Map();

  projects.forEach((project) => {
    (project.tags || []).forEach((tag) => {
      const label = String(tag).trim();
      if (!label) return;
      const key = normalizeSearchValue(label);
      counts.set(key, { label, count: (counts.get(key)?.count || 0) + 1 });
    });
  });

  const preferredOptions = preferred
    .map((key) => counts.get(key))
    .filter(Boolean);
  const rankedOptions = [...counts.values()]
    .filter((option) => !preferred.includes(normalizeSearchValue(option.label)))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  return [
    { label: 'All', value: 'all' },
    ...[...preferredOptions, ...rankedOptions].slice(0, 7).map(({ label }) => ({ label, value: label })),
  ];
};

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

const updateLiveStatus = (message = siteContent.admin?.savedMessage || 'Public site updated just now.') => {
  if (!adminLiveStatus) return;
  adminLiveStatus.textContent = message;
  adminLiveStatus.classList.remove('is-error');
  window.clearTimeout(liveStatusTimer);
  liveStatusTimer = window.setTimeout(() => {
    adminLiveStatus.textContent = siteContent.admin?.liveStatusDefault || 'Edits publish instantly in this browser.';
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
  const title = escapeHtml(media.title || media.fileName || siteContent.works?.mediaDefaultTitle || 'Project media');
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

  return `<article class="media-item media-item--link"><h4>${title}</h4>${caption}<a href="${url}"${download} target="_blank" rel="noreferrer">${escapeHtml(siteContent.works?.openAssetPrefix || 'Open')} ${escapeHtml(media.type || 'asset')}</a></article>`;
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
    <span class="admin-kicker">${escapeHtml(siteContent.admin?.currentAssetsLabel || 'Current assets')}</span>
    ${project.pdf ? `<article><strong>${escapeHtml(siteContent.admin?.projectPdfLabel || 'Project PDF')}</strong><a href="${safeUrl(project.pdf)}" target="_blank" rel="noreferrer">${escapeHtml(siteContent.admin?.openPdfLabel || 'Open PDF')}</a></article>` : `<article>${escapeHtml(siteContent.admin?.noProjectPdfLabel || 'No project PDF set.')}</article>`}
    ${media.length ? media.map((item, index) => `
      <article>
        <strong>${escapeHtml(item.title || item.fileName || item.type)}</strong>
        <span>${escapeHtml(item.type)}</span>
        <button type="button" data-remove-media="${index}">${escapeHtml(siteContent.admin?.removeMediaLabel || 'Remove')}</button>
      </article>
    `).join('') : `<article>${escapeHtml(siteContent.admin?.noMediaLabel || 'No media items yet.')}</article>`}
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
  renderWorkControls();
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

const visibleProjects = () => sortedProjects().filter(projectMatchesControls);

const setRoute = (route) => {
  const requestedRoute = route;
  if (isAdminRoute(route) && !isAdminBackdoorHash()) route = 'works';
  activeRoute = route;
  views.forEach((view) => view.classList.toggle('is-active', view.dataset.view === route));
  routeLinks.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  document.body.dataset.route = route;
  if (isAdminRoute(requestedRoute) && route !== requestedRoute) {
    history.replaceState(null, '', '#works');
  }
};

const renderMenuProjects = () => {
  if (!menuProjects) return;
  menuProjects.innerHTML = projects
    .map((project, index) => `<a href="#works" data-project-jump="${project.id}">${slugNumber(index)} ${escapeHtml(project.title)}</a>`)
    .join('');
};

const renderWorkControls = () => {
  if (projectSearch && projectSearch.value !== activeQuery) projectSearch.value = activeQuery;

  if (projectFilters) {
    projectFilters.innerHTML = getFilterOptions()
      .map((option) => {
        const isActive = normalizeSearchValue(option.value) === normalizeSearchValue(activeFilter);
        return `<button class="filter-chip" type="button" data-filter="${escapeHtml(option.value)}" aria-pressed="${isActive}">${escapeHtml(option.label)}</button>`;
      })
      .join('');
  }

  if (projectCount) {
    const count = visibleProjects().length;
    projectCount.textContent = `${count} ${count === 1 ? 'work' : 'works'}`;
  }

  fitSingleLineText(projectFilters || document);
};

const renderProjectReader = () => {
  const visible = visibleProjects();
  if (!visible.length) {
    projectReader.innerHTML = `
      <div class="reader-empty">
        <p>No works match the current filters.</p>
      </div>
    `;
    return;
  }
  const project = visible.find((item) => item.id === activeProjectId) || visible[0];
  activeProjectId = project.id;

  const index = projects.indexOf(project);
  const pdf = safeUrl(project.pdf);
  const mediaItems = (project.media || []).map(renderMediaItem).join('');

  projectReader.innerHTML = `
    <div class="reader-actions">
      <button class="reader-return" type="button" data-reader-return>Browse works</button>
      ${pdf ? `<a class="reader-action" href="${pdf}" download>${escapeHtml(siteContent.works?.pdfLabel || 'PDF')}</a>` : `<span class="reader-action is-disabled">${escapeHtml(siteContent.works?.noPdfLabel || 'No PDF')}</span>`}
    </div>
    <div class="reader-meta">
      <span>${slugNumber(index)}</span>
      <span>${escapeHtml(project.date)}</span>
      ${pdf ? `<a href="${pdf}" download>${escapeHtml(siteContent.works?.pdfLabel || 'PDF')}</a>` : `<span>${escapeHtml(siteContent.works?.noPdfLabel || 'No PDF')}</span>`}
    </div>
    <p class="eyebrow">${escapeHtml(project.format)}</p>
    <h3>${escapeHtml(project.title)}</h3>
    <p class="reader-summary">${escapeHtml(project.summary)}</p>
    <div class="reader-sections">
      <section>
        <h4>${escapeHtml(siteContent.works?.systemHeading || 'System / environment')}</h4>
        <p>${escapeHtml(project.system)}</p>
      </section>
      <section>
        <h4>${escapeHtml(siteContent.works?.documentationHeading || 'Documentation')}</h4>
        <ul>${(project.documentation || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </section>
    </div>
    <div class="media-module" aria-label="${escapeHtml(`${project.title} ${siteContent.works?.mediaAriaSuffix || 'media'}`)}">
      <span>${escapeHtml(siteContent.works?.mediaModuleLabel || 'media module')}</span>
      ${mediaItems || `<p>${escapeHtml(project.embed || siteContent.works?.fallbackMediaText || 'Add project media in Admin.')}</p>`}
    </div>
    <ul class="tag-list">${(project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
  `;

  projectReader.querySelector('[data-reader-return]')?.addEventListener('click', () => {
    projectList?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });

  fitSingleLineText(projectReader);
};

const selectProject = (projectId, { scrollReader = false, focusReader = false } = {}) => {
  if (!projects.some((project) => project.id === projectId)) return;
  activeProjectId = projectId;
  renderProjectList();
  renderProjectReader();

  if (focusReader) projectReader?.focus({ preventScroll: true });
  if (scrollReader && window.matchMedia('(max-width: 760px)').matches) {
    projectReader?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
};

const renderProjectList = () => {
  const visible = visibleProjects();
  if (visible.length && !visible.some((project) => project.id === activeProjectId)) {
    activeProjectId = visible[0].id;
  }

  if (!visible.length) {
    projectList.innerHTML = `
      <div class="project-empty">
        <strong>No matching works</strong>
        <p>Try another search term or clear the active filter.</p>
      </div>
    `;
    if (projectCount) projectCount.textContent = '0 works';
    return;
  }

  projectList.innerHTML = visible
    .map((project) => {
      const index = projects.indexOf(project);
      const tags = (project.tags || []).slice(0, 3);
      return `
        <button class="project-row" type="button" data-project="${project.id}" aria-pressed="${project.id === activeProjectId}">
          <span>${slugNumber(index)}</span>
          <strong>${escapeHtml(project.title)}</strong>
          <em>${escapeHtml(project.format)}</em>
          <small>${escapeHtml(project.date)}</small>
          <span class="project-row-tags">${tags.map((tag) => `<b>${escapeHtml(tag)}</b>`).join('')}</span>
          <p class="project-row-summary">${escapeHtml(project.summary)}</p>
          <span class="project-row-cta" aria-hidden="true">${escapeHtml(siteContent.works?.viewDetailsLabel || 'View details ↓')}</span>
        </button>
      `;
    })
    .join('');

  fitSingleLineText(projectList);

  projectList.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', () => {
      selectProject(button.dataset.project, { scrollReader: true });
    });

    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      selectProject(button.dataset.project);
    });
  });
};

const renderTeaching = () => {
  teachingGrid.innerHTML = teachingMaterials
    .map(
      (item) => `
        <article>
          <span>${escapeHtml(item.type)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <a href="${item.href}" download>${escapeHtml(siteContent.teaching?.downloadLabel || 'Download material')}</a>
        </article>
      `,
    )
    .join('');
};

const renderCv = () => {
  cvWorkList.innerHTML = projects.map((project) => `<li>${escapeHtml(project.title)}</li>`).join('');
  downloadList.innerHTML = downloads
    .map(({ label, href, download = true }) => `<li><a href="${safeUrl(href)}"${download ? ' download' : ''}>${escapeHtml(label)}</a></li>`)
    .join('');
};

const updateToggleLabel = () => {
  const isNight = document.body.classList.contains('night-mode');
  toggle.textContent = isNight ? (siteContent.site?.modeToggle?.active || 'paper') : (siteContent.site?.modeToggle?.default || 'invert');
  toggle.setAttribute('aria-pressed', String(isNight));
};

const restoreModePreference = () => {
  const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
  if (savedMode === 'night' || savedMode === 'day') {
    document.body.classList.toggle('night-mode', savedMode === 'night');
  }
  updateToggleLabel();
};

const updateSortButtons = () => {
  sortButtons.forEach((button) => {
    const isActive = button.dataset.sort === activeSort;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const openMenu = () => {
  lastFocusedElement = document.activeElement;
  document.body.classList.add('menu-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  siteMenu.setAttribute('aria-hidden', 'false');
  menuClose?.focus();
};

const closeMenu = () => {
  const wasOpen = document.body.classList.contains('menu-open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  siteMenu.setAttribute('aria-hidden', 'true');
  if (wasOpen && lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
};

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  localStorage.setItem(MODE_STORAGE_KEY, document.body.classList.contains('night-mode') ? 'night' : 'day');
  updateToggleLabel();
});

routeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const route = link.dataset.route;
    if (!route) return;
    event.preventDefault();
    const nextHash = isAdminRoute(route) ? ADMIN_BACKDOOR_HASH : `#${route}`;
    history.replaceState(null, '', nextHash);
    setRoute(route);
    closeMenu();
  });
});

sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeSort = button.dataset.sort;
    updateSortButtons();
    renderProjectList();
    renderProjectReader();
  });
});

projectSearch?.addEventListener('input', () => {
  activeQuery = projectSearch.value;
  renderWorkControls();
  renderProjectList();
  renderProjectReader();
});

projectFilters?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter || 'all';
  renderWorkControls();
  renderProjectList();
  renderProjectReader();
});

projectList?.addEventListener('keydown', (event) => {
  const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
  if (!keys.includes(event.key)) return;
  const visible = visibleProjects();
  if (!visible.length) return;
  const currentIndex = Math.max(0, visible.findIndex((project) => project.id === activeProjectId));
  const nextIndex = {
    ArrowDown: Math.min(visible.length - 1, currentIndex + 1),
    ArrowUp: Math.max(0, currentIndex - 1),
    Home: 0,
    End: visible.length - 1,
  }[event.key];

  event.preventDefault();
  selectProject(visible[nextIndex].id);
  projectList.querySelector(`[data-project="${visible[nextIndex].id}"]`)?.focus();
});

menuProjects.addEventListener('click', (event) => {
  const link = event.target.closest('[data-project-jump]');
  if (!link) return;
  event.preventDefault();
  activeFilter = 'all';
  activeQuery = '';
  setRoute('works');
  closeMenu();
  renderWorkControls();
  selectProject(link.dataset.projectJump, { scrollReader: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
  if (event.key !== 'Tab' || !document.body.classList.contains('menu-open')) return;

  const focusable = [...siteMenu.querySelectorAll('a[href], button:not([disabled])')]
    .filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener('hashchange', () => {
  const routeHash = location.hash.replace('#', '');
  if (isAdminBackdoorHash()) {
    setRoute('admin');
    closeMenu();
    return;
  }

  const route = [...views].some((view) => view.dataset.view === routeHash) && !isAdminRoute(routeHash)
    ? routeHash
    : 'works';
  setRoute(route);
  closeMenu();
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
    adminLoginStatus.textContent = siteContent.admin?.incorrectLogin || 'Incorrect username or password.';
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
  updateLiveStatus(siteContent.admin?.editingMessage || 'Editing selected project.');
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
    title: siteContent.admin?.newProject?.title || 'NEW PROJECT',
    date: siteContent.admin?.newProject?.date || 'Draft',
    format: siteContent.admin?.newProject?.format || 'Media environment',
    tags: siteContent.admin?.newProject?.tags || ['draft'],
    summary: siteContent.admin?.newProject?.summary || 'Add a project summary in the admin editor.',
    system: siteContent.admin?.newProject?.system || 'Describe the system, environment, or process.',
    documentation: siteContent.admin?.newProject?.documentation || ['Add documentation notes'],
    embed: siteContent.admin?.newProject?.embed || 'Add media, a local file, or a hosted link in Admin.',
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
  adminExport.value = JSON.stringify({ ...siteContent, projects }, null, 2);
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
  updateLiveStatus(siteContent.admin?.resetMessage || 'Public site reset to content.json projects.');
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
restoreModePreference();

renderMenuProjects();
renderWorkControls();
renderProjectList();
renderProjectReader();
renderTeaching();
renderCv();
renderAdminSelect();
populateProjectEditor();
renderAdminAssets();
const initialRouteHash = location.hash.replace('#', '');
const initialRoute = isAdminBackdoorHash()
  ? 'admin'
  : [...views].some((view) => view.dataset.view === initialRouteHash) && !isAdminRoute(initialRouteHash)
    ? initialRouteHash
    : 'works';
setRoute(initialRoute);
updateSortButtons();
fitSingleLineText();
window.addEventListener('resize', () => fitSingleLineText());
