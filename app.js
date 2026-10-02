import { profile } from './profile.js';

const paths = {
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'arrow-down-right': '<path d="m7 7 10 10M7 17h10V7"/>',
  'arrow-up': '<path d="M12 19V5m-6 6 6-6 6 6"/>',
  'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'corner-down-left': '<path d="M19 5v8a3 3 0 0 1-3 3H5m4-4-4 4 4 4"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20.8 13a9 9 0 0 1-9.8-9.8A9 9 0 1 0 20.8 13Z"/>',
  terminal: '<path d="m5 6 5 6-5 6m8 0h6"/>',
  code: '<path d="m8 5-7 7 7 7m8-14 7 7-7 7m-3-16-2 18"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>',
  smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M12 19h.01"/>',
  git: '<circle cx="6" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 6v12m12-10v3a5 5 0 0 1-5 5H6"/>',
  pen: '<path d="m16 3 5 5-12 12-6 1 1-6L16 3Zm-3 3 5 5M4 15l5 5"/>',
  bulb: '<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1.3 1-1 2-1 2H9s.3-1-1-2Z"/>',
  sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3Zm8-2v4m-2-2h4M3 18v4m-2-2h4"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  mouse: '<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  rotate: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
  github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.7-1.6 6.7-7.3a5.7 5.7 0 0 0-1.6-4c.2-1 .2-2-.1-3 0 0-1.3-.4-4.3 1.6a14 14 0 0 0-7.4 0C4.3.6 3 1 3 1c-.3 1-.3 2-.1 3a5.7 5.7 0 0 0-1.6 4c0 5.7 3.4 6.9 6.7 7.3A3.5 3.5 0 0 0 7 18v4" transform="translate(1 0) scale(.91)"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 5 9 7 9-7"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  cloud: '<path d="M7 18a5 5 0 0 1-1-10 6 6 0 0 1 11-2 6 6 0 1 1 1 12H7Z"/>',
  book: '<path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>'
};

function icon(name, extraClass = '') {
  return '<svg class="' + extraClass + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.code) + '</svg>';
}

function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function webUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function assetUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value, window.location.href);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function externalLink(url, label, iconName, className = '') {
  const safe = webUrl(url);
  return safe ? '<a class="' + className + '" href="' + escapeHtml(safe) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + icon(iconName) + '</a>' : '';
}

renderIcons();
document.documentElement.classList.add('js-ready');
document.querySelectorAll('[data-profile]').forEach(node => {
  if (typeof profile[node.dataset.profile] === 'string') node.textContent = profile[node.dataset.profile];
});
document.title = profile.name + ' — ' + profile.role;
document.getElementById('hero-intro').textContent = (profile.name + ' / ' + profile.role).toUpperCase();
document.getElementById('footer-name').textContent = profile.name;
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('all-project-count').textContent = String(profile.projects.length).padStart(2, '0');
document.getElementById('impact-strip').innerHTML = (profile.highlights || []).map(item => '<div class="impact-item"><strong>' + escapeHtml(item.value) + '</strong><span>' + escapeHtml(item.label) + '</span></div>').join('') + '<a class="impact-more" href="#experience">A little impact.<br>A lot of intention. ' + icon('arrow-down-right') + '</a>';
document.getElementById('experience-timeline').innerHTML = (profile.experience || []).map(item => '<article class="experience-item"><div class="experience-period"><span class="timeline-dot"></span>' + escapeHtml(item.period) + '</div><h3>' + escapeHtml(item.role) + '<span> / ' + escapeHtml(item.company) + '</span></h3><ul>' + item.highlights.map(highlight => '<li>' + escapeHtml(highlight) + '</li>').join('') + '</ul></article>').join('');
document.getElementById('education-list').innerHTML = '<p class="eyebrow">ALWAYS KEEP LEARNING</p>' + (profile.education || []).map(item => '<div class="education-item">' + icon(item.icon) + '<span class="education-year">' + escapeHtml(item.year) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.institution) + '</p></div>').join('');

// The theme is applied before CSS loads, then persisted when changed.
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const next = theme === 'dark' ? 'light' : 'dark';
  themeToggle.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon');
  themeToggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141714' : '#f6f6f0';
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage may be disabled. */ }
}
setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

const mobileNav = document.getElementById('mobile-nav');
const menuToggle = document.getElementById('menu-toggle');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  menuToggle.innerHTML = icon('menu');
}
menuToggle.addEventListener('click', () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.innerHTML = icon(open ? 'close' : 'menu');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); }
});
window.matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Lightweight, illustrative project previews. They are not product screenshots.
function preview(visual, extraClass = '') {
  let content;
  if (visual === 'kasiguru') {
    content = '<div class="preview-inner demo-kasiguru"><div class="kasi-top"><span class="kasi-brand">kasi<span>guru</span><i>✳</i></span><span class="kasi-streak">✦ Keep learning</span></div><p class="kasi-greeting">A little practice.<br>A living language.</p><div class="kasi-lesson"><span class="kasi-lesson-icon">Aa</span><div><b>Explore Kasiguranin</b><span>Words · Stories · Culture</span></div><span class="kasi-lesson-arrow">↗</span></div><div class="kasi-bottom"><span>Learn something new today.</span><span>→</span></div></div>';
  } else if (visual === 'steady') {
    content = '<div class="preview-inner demo-steady"><div class="steady-top"><span class="steady-brand">steady<span>●</span></span><span>YOUR DAILY SPACE</span></div><div class="steady-greeting">A little better,<br><i>every day.</i></div><div class="steady-widgets"><div class="steady-ring"><svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="23" fill="none" stroke="#dce2d6" stroke-width="5"/><circle cx="30" cy="30" r="23" fill="none" stroke="#6d8662" stroke-width="5" stroke-dasharray="105 145" stroke-linecap="round" transform="rotate(-90 30 30)"/></svg><span>Habits</span></div><div class="steady-habits"><div><i>✓</i> Move a little</div><div><i>✓</i> Find a calm moment</div><div><i class="habit-empty"></i> Make time for you</div></div></div></div>';
  } else {
    content = '<div class="preview-inner demo-portfolio"><div class="portfolio-demo-nav"><span>&lt;·&gt; portfolio.</span><span>WORK &nbsp; ABOUT &nbsp; ↗</span></div><div class="portfolio-demo-hero"><div><span class="portfolio-demo-eyebrow">ANTHONY CORDIAL</span><p>Good ideas.<br>Great <i>execution.</i></p><span class="portfolio-demo-button">Explore my work ↘</span></div><div class="portfolio-demo-art">✳</div></div><div class="portfolio-demo-footer"><span>DEVELOP / DESIGN / SOLVE</span><span>&lt;/&gt;</span></div></div>';
  }
  return '<div class="project-preview preview-' + escapeHtml(visual) + ' ' + extraClass + '" aria-hidden="true">' + content + '</div>';
}

function tags(project) {
  return '<div class="project-tags">' + project.tags.map(tag => '<span>' + escapeHtml(tag) + '</span>').join('') + '</div>';
}

const grid = document.getElementById('projects-grid');
function renderProjects(filter = 'all') {
  const projects = profile.projects.filter(project => filter === 'all' || project.type === filter);
  grid.innerHTML = projects.length ? projects.map((project, index) =>
    '<button class="project-card" data-project="' + escapeHtml(project.id) + '" style="animation-delay:' + index * 45 + 'ms" aria-label="Explore ' + escapeHtml(project.name) + '">' +
    preview(project.visual) + '<div class="project-info"><div class="project-category"><span>' + escapeHtml(project.category) + '</span><span>' + escapeHtml(project.number) + ' /</span></div><div class="project-title-line"><h3>' + escapeHtml(project.name) + '</h3><span class="project-open">' + icon('arrow-up-right') + '</span></div><p class="project-tagline">' + escapeHtml(project.tagline) + '</p>' + tags(project) + '</div></button>'
  ).join('') : '<p class="empty-projects">More work is on the way. Explore another category.</p>';
  grid.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', () => openProject(card.dataset.project)));
  document.getElementById('project-status').textContent = projects.length + (projects.length === 1 ? ' project' : ' projects') + ' shown';
}
renderProjects();
document.getElementById('sample-note').hidden = !profile.projects.some(project => project.sample);
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderProjects(button.dataset.filter);
  });
});

const dialog = document.getElementById('project-dialog');
const dialogContent = document.getElementById('dialog-content');
let dialogTrigger = null;
function openProject(id) {
  const project = profile.projects.find(item => item.id === id);
  if (!project) return;
  dialogContent.innerHTML = preview(project.visual, 'dialog-preview') +
    '<div class="dialog-body"><p class="eyebrow">' + escapeHtml(project.category.toUpperCase()) + ' / PROJECT ' + escapeHtml(project.number) + '</p><div class="dialog-heading"><h2 id="dialog-title">' + escapeHtml(project.name) + '</h2>' + (project.sample ? '<span class="concept-badge">Concept project</span>' : '') + '</div><p class="dialog-description">' + escapeHtml(project.description) + '</p>' + tags(project) +
    '<div class="dialog-details"><div><h3>The challenge</h3><p>' + escapeHtml(project.challenge) + '</p></div><div><h3>The approach</h3><p>' + escapeHtml(project.approach) + '</p></div></div><div class="dialog-features"><h3>What’s inside</h3><ul>' + project.features.map(feature => '<li>' + icon('check') + '<span>' + escapeHtml(feature) + '</span></li>').join('') + '</ul></div>' +
    '<div class="dialog-actions">' + externalLink(project.sourceUrl, 'Explore the code', 'github', 'button button-primary') + externalLink(project.liveUrl, 'Visit live project', 'arrow-up-right', 'button button-text') + '</div>' +
    (project.sample ? '<p class="dialog-sample-note">An illustrative project concept, ready to be replaced with real work.</p>' : '<p class="dialog-sample-note">Illustrative preview. Explore the repository for the actual application.</p>') + '</div>';
  dialogTrigger = document.activeElement;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  document.getElementById('dialog-close').focus();
}
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({ preventScroll: true });
});
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

const skillTabs = document.getElementById('skill-tabs');
const skillPanel = document.getElementById('skill-panel');
skillTabs.innerHTML = profile.skillGroups.map((group, index) => '<button class="skill-tab" id="tab-' + escapeHtml(group.id) + '" role="tab" aria-selected="' + (index === 0) + '" aria-controls="skill-panel" tabindex="' + (index === 0 ? '0' : '-1') + '" data-skill="' + escapeHtml(group.id) + '">' + icon(group.icon) + escapeHtml(group.label) + icon('arrow-right', 'tab-arrow') + '</button>').join('');
function selectSkill(id) {
  const group = profile.skillGroups.find(item => item.id === id);
  if (!group) return;
  skillTabs.querySelectorAll('[role="tab"]').forEach(tab => {
    const active = tab.dataset.skill === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  skillPanel.setAttribute('aria-labelledby', 'tab-' + id);
  skillPanel.innerHTML = '<div class="skill-panel-top"><h3>' + escapeHtml(group.label) + '</h3>' + icon(group.icon) + '</div><p>' + escapeHtml(group.description) + '</p><div class="skill-chips">' + group.skills.map((skill, index) => '<span class="skill-chip" style="animation-delay:' + index * 25 + 'ms">' + escapeHtml(skill) + '</span>').join('') + '</div>';
}
selectSkill(profile.skillGroups[0]?.id);
const mobileSkills = window.matchMedia('(max-width: 650px)');
function syncTabOrientation() { skillTabs.setAttribute('aria-orientation', mobileSkills.matches ? 'horizontal' : 'vertical'); }
syncTabOrientation();
mobileSkills.addEventListener('change', syncTabOrientation);
skillTabs.addEventListener('click', event => {
  const tab = event.target.closest('[data-skill]');
  if (tab) selectSkill(tab.dataset.skill);
});
skillTabs.addEventListener('keydown', event => {
  const tabs = [...skillTabs.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  const forward = mobileSkills.matches ? 'ArrowRight' : 'ArrowDown';
  const backward = mobileSkills.matches ? 'ArrowLeft' : 'ArrowUp';
  let next;
  if (event.key === forward) next = (index + 1) % tabs.length;
  else if (event.key === backward) next = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = tabs.length - 1;
  else return;
  event.preventDefault();
  selectSkill(tabs[next].dataset.skill);
  tabs[next].focus();
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3600);
}

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? profile.email : '';
const emailLink = document.getElementById('email-link');
const copyEmail = document.getElementById('copy-email');
const github = webUrl(profile.github);
const linkedin = webUrl(profile.linkedin);
if (email) {
  emailLink.href = 'mailto:' + email;
  copyEmail.hidden = false;
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied. Let’s make something happen.');
    } catch { showToast('Email: ' + email); }
  });
} else if (linkedin || github) {
  emailLink.href = linkedin || github;
  emailLink.target = '_blank';
  emailLink.rel = 'noopener noreferrer';
  emailLink.innerHTML = 'Let’s connect ' + icon('arrow-up-right');
} else {
  document.getElementById('contact-setup').hidden = false;
  emailLink.addEventListener('click', event => {
    event.preventDefault();
    showToast('Contact details are coming soon.');
  });
}
document.getElementById('contact-links').innerHTML = externalLink(github, 'GitHub', 'github') + externalLink(linkedin, 'LinkedIn', 'linkedin');

const resumeUrl = assetUrl(profile.resume);
const resumeLink = document.getElementById('resume-link');
if (resumeUrl) {
  resumeLink.href = resumeUrl;
  resumeLink.target = '_blank';
  resumeLink.rel = 'noopener noreferrer';
  resumeLink.innerHTML = 'View my résumé ' + icon('download');
  document.getElementById('experience-resume').href = resumeUrl;
} else if (github) {
  resumeLink.href = github;
  resumeLink.target = '_blank';
  resumeLink.rel = 'noopener noreferrer';
  resumeLink.innerHTML = 'Explore my GitHub ' + icon('arrow-up-right');
}

// The local server and build output provide the same small photo manifest.
async function loadPhoto() {
  let source = assetUrl(profile.photo);
  if (!source) {
    try {
      const response = await fetch('./photo.json', { cache: 'no-store' });
      if (response.ok) source = assetUrl((await response.json()).photo);
    } catch { /* The abstract artwork stays visible when no photo is available. */ }
  }
  if (!source) return;
  const photo = document.getElementById('profile-photo');
  photo.alt = profile.name;
  photo.style.objectPosition = profile.photoPosition || 'center';
  photo.addEventListener('load', () => {
    photo.hidden = false;
    document.getElementById('portrait-placeholder').hidden = true;
  }, { once: true });
  photo.src = source;
}
loadPhoto();

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const commandHistory = [];
let historyIndex = 0;
function terminalLine(text, className = '') {
  const line = document.createElement('p');
  line.textContent = text;
  if (className) line.className = className;
  terminalOutput.append(line);
  return line;
}
function terminalLink(text, href, external = false) {
  const line = document.createElement('p');
  const link = document.createElement('a');
  link.textContent = text;
  link.href = href;
  if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  line.append(link);
  terminalOutput.append(line);
}
function runCommand(raw) {
  const input = raw.trim();
  if (!input) return;
  const command = input.toLowerCase();
  commandHistory.push(input);
  historyIndex = commandHistory.length;
  if (command === 'clear') { terminalOutput.replaceChildren(); terminalInput.value = ''; return; }
  terminalLine('$ ' + input, 'terminal-muted');
  if (command === 'help') {
    terminalLine('about · projects · skills · contact · github · linkedin · resume · theme · clear', 'terminal-accent');
    terminalLine('Tip: ↑ and ↓ browse your command history.', 'terminal-muted');
  } else if (['about', 'whoami'].includes(command)) {
    terminalLine(profile.name + ' — ' + profile.role, 'terminal-accent');
    terminalLine(profile.about);
  } else if (['projects', 'ls'].includes(command)) {
    profile.projects.forEach(project => terminalLine(project.number + ' / ' + project.name + ' — ' + project.tagline + (project.sample ? ' [concept]' : '')));
    terminalLink('Explore selected work ↗', '#work');
  } else if (command === 'skills') {
    profile.skillGroups.forEach(group => terminalLine(group.label + ' → ' + group.skills.join(', ')));
  } else if (['contact', 'hire', 'sudo hire anthony', 'hello'].includes(command)) {
    terminalLine('Great things start with a conversation.', 'terminal-accent');
    if (email) terminalLink(email, 'mailto:' + email);
    if (linkedin) terminalLink('Let’s connect on LinkedIn ↗', linkedin, true);
    if (!email && !linkedin) terminalLink('Get in touch ↗', '#contact');
  } else if (command === 'github') {
    if (github) terminalLink('Explore my GitHub ↗', github, true);
    else terminalLine('GitHub details are coming soon.');
  } else if (command === 'linkedin') {
    if (linkedin) terminalLink('Connect on LinkedIn ↗', linkedin, true);
    else terminalLine('LinkedIn details are coming soon.');
  } else if (['resume', 'résumé'].includes(command)) {
    if (resumeUrl) terminalLink('View my résumé ↗', resumeUrl, true);
    else terminalLine('For now, my projects tell the story. Try projects or github.');
  } else if (command === 'theme') {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    terminalLine('Switched to ' + document.documentElement.dataset.theme + ' mode.');
  } else {
    terminalLine('Unknown command: ' + input + '. Try help.', 'terminal-muted');
  }
  while (terminalOutput.children.length > 50) terminalOutput.firstElementChild.remove();
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  terminalInput.value = '';
}
document.getElementById('terminal-form').addEventListener('submit', event => { event.preventDefault(); runCommand(terminalInput.value); });
document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => { runCommand(button.dataset.command); terminalInput.focus({ preventScroll: true }); }));
document.getElementById('terminal-reset').addEventListener('click', () => { terminalOutput.replaceChildren(); terminalInput.value = ''; terminalInput.focus({ preventScroll: true }); });
terminalInput.addEventListener('keydown', event => {
  if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'ArrowUp') historyIndex = Math.max(0, historyIndex - 1);
  else historyIndex = Math.min(commandHistory.length, historyIndex + 1);
  terminalInput.value = commandHistory[historyIndex] || '';
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: .06 });
  document.querySelectorAll('.reveal').forEach(node => revealObserver.observe(node));
} else document.querySelectorAll('.reveal').forEach(node => node.classList.add('is-visible'));

let scrollScheduled = false;
function updateScroll() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('reading-progress').style.transform = 'scaleX(' + (total > 0 ? window.scrollY / total : 0) + ')';
  let activeId = '';
  ['work', 'about', 'skills', 'experience'].forEach(id => { if (document.getElementById(id).getBoundingClientRect().top <= 160) activeId = id; });
  if (document.getElementById('contact').getBoundingClientRect().top <= 160) activeId = '';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === activeId;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
