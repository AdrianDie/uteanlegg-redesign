document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

/* ---------- Nav: services dropdown + mobile submenu (shared across pages) ---------- */
const desktopDropdown = document.getElementById('desktopServicesDropdown');
if (desktopDropdown) {
  desktopDropdown.innerHTML = SERVICES.map(s => `<a href="tjenester.html#${s.slug}">${s.title}</a>`).join('');
}
const mobileSub = document.getElementById('mobileServicesSub');
if (mobileSub) {
  mobileSub.innerHTML = SERVICES.map(s => `<a href="tjenester.html#${s.slug}">${s.title}</a>`).join('');
}

/* ---------- Homepage: services grid ---------- */
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
  servicesGrid.innerHTML = SERVICES.map(s => `
    <a class="service-card reveal" href="tjenester.html#${s.slug}">
      <div class="service-card-img"><img src="${s.img}" alt="${s.title}" loading="lazy"></div>
      <div class="service-card-body">
        <h3>${s.title}</h3>
        <p>${s.teaser}</p>
        <span class="service-card-link">Les mer
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>`).join('');
}

/* ---------- Homepage: projects teaser grid (first 4) ---------- */
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  projectsGrid.innerHTML = PROJECTS.slice(0, 4).map(p => `
    <a class="project-card reveal" href="prosjekter.html#${p.slug}">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="project-card-label">
        <span>Prosjekt</span>
        <h3>${p.title}</h3>
      </div>
    </a>`).join('');
}

/* ---------- Header scroll state ---------- */
const siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
const mobileMenu = document.getElementById('mobileMenu');
const navToggle = document.getElementById('navToggle');
if (mobileMenu && navToggle) {
  const openMenu = () => { mobileMenu.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileMenu.classList.remove('is-open'); document.body.style.overflow = ''; };
  navToggle.addEventListener('click', openMenu);
  mobileMenu.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeMenu));
  mobileMenu.querySelectorAll('a').forEach(el => el.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ---------- Hero slideshow ---------- */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dots button');
if (heroSlides.length) {
  let current = 0;
  const showSlide = i => {
    heroSlides[current].classList.remove('is-active');
    heroDots[current] && heroDots[current].classList.remove('is-active');
    current = i % heroSlides.length;
    heroSlides[current].classList.add('is-active');
    heroDots[current] && heroDots[current].classList.add('is-active');
  };
  let timer = setInterval(() => showSlide(current + 1), 5500);
  heroDots.forEach((dot, i) => dot.addEventListener('click', () => {
    clearInterval(timer);
    showSlide(i);
    timer = setInterval(() => showSlide(current + 1), 5500);
  }));
}

/* ---------- GSAP scroll reveals ---------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.gsap && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);
  const revealTargets = gsap.utils.toArray('.reveal');
  revealTargets.forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
}
