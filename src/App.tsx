import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
}

type Project = {
  badge: string;
  title: string;
  description: string;
  stack: string[];
  links: { label: string; href: string; primary?: boolean }[];
};

const projects: Project[] = [
  {
    badge: 'Featured · Live System',
    title: 'Android POS, Inventory & Customer Loyalty System',
    description:
      'Full-stack operations platform built for a motorcycle parts shop. Handles inventory tracking, point-of-sale, sales reporting, and a customer loyalty program — all deployed and actively used by the client.',
    stack: ['Flutter', 'Python', 'MySQL', 'Cloudflare Pages', 'Render'],
    links: [
      { label: 'Live POS', href: 'https://pos-inventory-98u.pages.dev/#/login', primary: true },
      { label: 'Live Website', href: 'https://sukiwebsite.cocoguardapp.workers.dev/suki_login' },
      { label: 'Backend', href: 'https://github.com/dranyam13/sales-backend' },
      { label: 'Frontend', href: 'https://github.com/dranyam13/suki_web' },
    ],
  },
  {
    badge: 'Featured · Full Project Lead',
    title: 'CocoGuard — Coconut Pest Detection System',
    description:
      'Led end-to-end development of an ML-powered pest detection platform for coconut farmers. Flutter mobile app for field capture, Python backend with ML inference, and a web admin dashboard. Deployed and accessible.',
    stack: ['Flutter', 'Python', 'Machine Learning', 'MySQL', 'Cloudflare Workers'],
    links: [
      { label: 'Live Site', href: 'https://cocoguard-web.cocoguardapp.workers.dev/', primary: true },
      { label: 'Download App', href: 'https://cocoguard-web.cocoguardapp.workers.dev/download' },
      { label: 'Backend', href: 'https://github.com/dranyam13/cocoguard-backend' },
      { label: 'Web', href: 'https://github.com/dranyam13/cocoguard-web' },
    ],
  },
];

const supportProjects = [
  ['Inventory Management System', 'Standalone inventory tracking with stock management and reporting.'],
  ['TATCare System', 'Patient turnaround time tracking for hospital operational workflows.'],
  ['Inventory & POS (.NET)', 'Desktop-based inventory and sales system built in C# / .NET.'],
  ['Space Shooter', '2D game project — game loop, collision, scoring, asset management.'],
  ['Galaxy Shooter', 'Extended 2D shooter with enhanced mechanics and level progression.'],
] as const;

const skills = [
  { label: 'Languages', values: ['Python', 'Dart', 'JavaScript', 'PHP', 'C#', 'Visual Basic'] },
  { label: 'Frontend & Mobile', values: ['Flutter', 'HTML', 'CSS', 'JavaScript'] },
  { label: 'Backend', values: ['Python', 'FastAPI', 'PHP', 'REST APIs'] },
  { label: 'Database', values: ['MySQL', 'PostgreSQL (Production)', 'Schema Design', 'Relational Modeling'] },
  { label: 'Deployment & Tools', values: ['GitHub', 'Render', 'Cloudflare', 'Power BI'] },
  { label: 'Design', values: ['Figma', 'Canva', 'UI/UX'] },
] as const;

const portfolioSiteStack = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Node.js + npm (build tooling)',
  'Cloudflare Pages (hosting/deployment)',
  'GitHub (repo + CI-triggered deploy source)',
] as const;

const githubRepos = [
  { label: 'sales-backend', href: 'https://github.com/dranyam13/sales-backend' },
  { label: 'suki_web', href: 'https://github.com/dranyam13/suki_web' },
  { label: 'cocoguard-backend', href: 'https://github.com/dranyam13/cocoguard-backend' },
  { label: 'cocoguard-web', href: 'https://github.com/dranyam13/cocoguard-web' },
  { label: 'View All on GitHub', href: 'https://github.com/dranyam13' },
] as const;

const certificateFiles = [
  'Wadhwani Foundation Certificate - 660b6850676ef3934d8036bc.pdf',
  'Wadhwani Foundation Certificate - 660b8810676ef3934d806934.pdf',
  'Wadhwani Foundation Certificate - 6617b995676ef3934d990936.pdf',
  'Wadhwani Foundation Certificate - 6617b995676ef3934d99093a.pdf',
  'Wadhwani Foundation Certificate - 6617b995676ef3934d99093e.pdf',
  'Wadhwani Foundation Certificate - 6617b995676ef3934d990942.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d99604a.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d99604e.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996052.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996060 (1).pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996060.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996064.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996068.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996082.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996088 (1).pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d996088.pdf',
  'Wadhwani Foundation Certificate - 6617e14c676ef3934d99608a.pdf',
] as const;

const navSections = ['home', 'projects', 'skills', 'experience', 'certificates', 'github', 'contact'] as const;
type NavSection = (typeof navSections)[number];
const roleWords = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver'] as const;

const normalizeHashSection = (rawHash: string): NavSection | null => {
  const cleaned = rawHash.replace('#', '').replace(/^\/+/, '').trim().toLowerCase();
  return navSections.includes(cleaned as NavSection) ? (cleaned as NavSection) : null;
};

const renderPdfFirstPage = async (pdfUrl: string, scale: number) => {
  const task = getDocument(pdfUrl);
  const pdf = await task.promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    await pdf.destroy();
    return null;
  }

  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  await page.render({ canvasContext: context, viewport, canvas }).promise;
  const preview = canvas.toDataURL('image/jpeg', 0.92);
  await pdf.destroy();

  return preview;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedRole, setTypedRole] = useState<string>(roleWords[0]);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [certificateSlide, setCertificateSlide] = useState(0);
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null);
  const [certificateZoom, setCertificateZoom] = useState(100);
  const [certificateThumbs, setCertificateThumbs] = useState<Record<string, string>>({});
  const [activeCertificateImage, setActiveCertificateImage] = useState<string>('');
  const [activeCertificateLoading, setActiveCertificateLoading] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setActiveCertificate(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedRole(roleWords[0]);
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId = 0;

    const step = () => {
      const word = roleWords[wordIndex];
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setTypedRole(word.slice(0, Math.max(charIndex, 0)));

      if (!isDeleting && charIndex >= word.length) {
        isDeleting = true;
        timerId = window.setTimeout(step, 1200);
        return;
      }

      if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % roleWords.length;
        timerId = window.setTimeout(step, 260);
        return;
      }

      timerId = window.setTimeout(step, isDeleting ? 55 : 85);
    };

    setTypedRole('');
    timerId = window.setTimeout(step, 320);

    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const sectionElements = navSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const detectSectionFromScroll = () => {
      const marker = Math.max(130, window.innerHeight * 0.38);
      let current: NavSection = 'home';

      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          current = section.id as NavSection;
          break;
        }
        if (rect.top <= marker) current = section.id as NavSection;
      }

      setActiveSection(current);
    };

    const syncFromHash = () => {
      const hashSection = normalizeHashSection(window.location.hash);
      if (hashSection) setActiveSection(hashSection);
      else detectSectionFromScroll();
    };

    syncFromHash();
    detectSectionFromScroll();

    window.addEventListener('scroll', detectSectionFromScroll, { passive: true });
    window.addEventListener('resize', detectSectionFromScroll);
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('scroll', detectSectionFromScroll);
      window.removeEventListener('resize', detectSectionFromScroll);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadThumbnails = async () => {
      for (const fileName of certificateFiles) {
        if (cancelled) return;

        const href = `/certificates/${encodeURIComponent(fileName)}`;
        try {
          const preview = await renderPdfFirstPage(href, 1.35);
          if (!cancelled && preview) {
            setCertificateThumbs((prev) => (prev[fileName] ? prev : { ...prev, [fileName]: preview }));
          }
        } catch {
          // Ignore rendering failure and keep the fallback visual.
        }
      }
    };

    loadThumbnails();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!activeCertificate) {
      setActiveCertificateImage('');
      return;
    }

    const loadActivePreview = async () => {
      setActiveCertificateLoading(true);
      const href = `/certificates/${encodeURIComponent(activeCertificate)}`;
      try {
        const preview = await renderPdfFirstPage(href, 2.2);
        if (!cancelled && preview) setActiveCertificateImage(preview);
      } catch {
        if (!cancelled) setActiveCertificateImage('');
      } finally {
        if (!cancelled) setActiveCertificateLoading(false);
      }
    };

    loadActivePreview();

    return () => {
      cancelled = true;
    };
  }, [activeCertificate]);

  const closeMenu = () => setMenuOpen(false);
  const navClass = (id: NavSection) => (activeSection === id ? 'nav-link nav-link-active' : 'nav-link');

  const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: y * -9, y: x * 11 });
  };

  const resetCardTilt = () => setCardTilt({ x: 0, y: 0 });

  const goToNextCertificate = () => {
    setCertificateSlide((prev) => (prev + 1) % certificateFiles.length);
  };

  const goToPrevCertificate = () => {
    setCertificateSlide((prev) => (prev - 1 + certificateFiles.length) % certificateFiles.length);
  };

  const openCertificateModal = (fileName: string) => {
    setCertificateZoom(100);
    setActiveCertificate(fileName);
  };

  const closeCertificateModal = () => setActiveCertificate(null);

  const handleNavClick = (id: NavSection) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(id);
    closeMenu();

    if (id === 'home') {
      window.history.replaceState(null, '', '#/home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.history.replaceState(null, '', `#/${id}`);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-mist text-ink antialiased">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,#dbeafe_0,transparent_42%),radial-gradient(circle_at_85%_0%,#fde68a_0,transparent_38%),linear-gradient(#f8fafc,#f1f5f9)]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-line/70 bg-white/90 shadow-[0_8px_28px_-22px_rgba(15,23,42,0.55)] backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="font-heading text-lg font-bold tracking-tight">Maynard Ermita</a>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li><a href="#home" className={navClass('home')} onClick={handleNavClick('home')}>Home</a></li>
            <li><a href="#projects" className={navClass('projects')} onClick={handleNavClick('projects')}>Projects</a></li>
            <li><a href="#skills" className={navClass('skills')} onClick={handleNavClick('skills')}>Skills</a></li>
            <li><a href="#experience" className={navClass('experience')} onClick={handleNavClick('experience')}>Experience</a></li>
            <li><a href="#certificates" className={navClass('certificates')} onClick={handleNavClick('certificates')}>Certificates</a></li>
            <li><a href="#github" className={navClass('github')} onClick={handleNavClick('github')}>GitHub</a></li>
            <li><a href="#contact" className={navClass('contact')} onClick={handleNavClick('contact')}>Contact</a></li>
          </ul>
          <a href="mailto:maynardermita@gmail.com" className="hidden rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold transition hover:bg-slate-900 hover:text-white md:inline-flex">
            Hire Me
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-line bg-white/95 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <a href="#home" className={navClass('home')} onClick={handleNavClick('home')}>Home</a>
              <a href="#projects" className={navClass('projects')} onClick={handleNavClick('projects')}>Projects</a>
              <a href="#skills" className={navClass('skills')} onClick={handleNavClick('skills')}>Skills</a>
              <a href="#experience" className={navClass('experience')} onClick={handleNavClick('experience')}>Experience</a>
              <a href="#certificates" className={navClass('certificates')} onClick={handleNavClick('certificates')}>Certificates</a>
              <a href="#github" className={navClass('github')} onClick={handleNavClick('github')}>GitHub</a>
              <a href="#contact" className={navClass('contact')} onClick={handleNavClick('contact')}>Contact</a>
              <a href="mailto:maynardermita@gmail.com" className="nav-link" onClick={closeMenu}>Hire Me</a>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-14 pt-6 md:px-8 md:pb-20 md:pt-8">
        <section id="home" className="scroll-mt-24 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Hello, I&apos;m</p>
            <h1 className="font-heading text-4xl font-extrabold leading-[0.95] sm:text-5xl md:text-6xl">Maynard Ermita</h1>
            <p className="mt-3 text-lg font-semibold text-slate-700"><span>{typedRole}</span><span className="typing-caret" aria-hidden="true">|</span></p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
              From deployed POS platforms to ML-powered agricultural tools and hospital workflow software, I build digital products that run reliably in real-world environments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">View Projects</a>
              <a href="#contact" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500">Contact Me</a>
              <a href="/Maynard_Ermita_Resume.pdf" download="Maynard_Ermita_Resume.pdf" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500">
                Download Resume
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="chip">Live POS deployed to real client</span>
              <span className="chip">Full lead on ML app</span>
              <span className="chip">MIS dept. hospital experience</span>
              <span className="chip">Flutter · Python · MySQL</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[295px] sm:max-w-[325px] md:max-w-[355px]">
            <div
              className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_22px_40px_-26px_rgba(15,23,42,0.55)] transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `perspective(1100px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)` }}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCardTilt}
            >
              <img src="/menong.jpg" alt="Maynard Ermita portrait" className="h-[360px] w-full bg-white object-contain object-top sm:h-[390px] md:h-[420px]" loading="eager" />
              <div className="border-t border-line px-4 py-3">
                <p className="font-heading text-base font-bold">Maynard Ermita</p>
                <p className="mt-1 text-sm text-slate-600">Aspiring Software Engineer</p>
                <div className="mt-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">Online</span>
                  <a href="#contact" className="nav-link font-semibold text-slate-700">Contact Me</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="section-eyebrow">Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">Not classroom exercises. Real systems, built for real problems, deployed and in use.</p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{project.badge}</span>
                <h3 className="mt-4 font-heading text-2xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-3 text-slate-700">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link.primary ? 'project-link-primary' : 'project-link'}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 section-eyebrow">Also Built</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supportProjects.map(([title, desc]) => (
              <article key={title} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <h4 className="font-heading text-lg font-bold">{title}</h4>
                <p className="mt-2 text-sm text-slate-700">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="philosophy" className="mt-20 scroll-mt-24 md:mt-24">
          <article className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p className="font-heading text-2xl font-bold text-slate-800">
              &quot;Good software is <em>quiet.</em> It does exactly what it&apos;s supposed to do - without getting in the way.&quot;
            </p>
          </article>
          <article className="mt-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p className="section-eyebrow">How I Think</p>
            <p className="mt-3 text-slate-700">I don&apos;t build things to pass a grade or complete a checklist. I build them because there&apos;s a real problem that needs a real solution.</p>
            <p className="mt-3 text-slate-700">That means thinking carefully about the actual user - the shop owner who doesn&apos;t want to count stock manually, the farmer who can&apos;t tell which pest is destroying their crop, the hospital admin who needs reliable data to make decisions.</p>
            <p className="mt-3 text-slate-700">Real software works under real conditions. I care about data integrity, deployment reliability, and UX that doesn&apos;t require a manual.</p>
          </article>
        </section>

        <section id="skills" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">Technical Stack</h2>
          <article className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h3 className="font-heading text-lg font-bold">Portfolio Website Stack</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {portfolioSiteStack.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </article>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {skills.map((group) => (
              <article key={group.label} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.values.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">Background</h2>
          <div className="mt-8 space-y-4">
            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">2025 · On-the-Job Training · MIS Department</p>
              <h3 className="mt-2 font-heading text-2xl font-bold">Frontend & Backend Developer · IT Support</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">Calamba Medical Center</p>
              <p className="mt-4 text-slate-700">
                Contributed to real hospital software inside a Medical Information Systems department - an environment where reliability and operational accuracy matter.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
                <li>Built TATCare, a patient turnaround time tracking system.</li>
                <li>Developed inventory system components with PHP and MySQL.</li>
                <li>Designed UI/UX using Figma and Canva.</li>
                <li>Implemented backend logic and database schemas.</li>
                <li>Participated in debugging, testing, and documentation.</li>
                <li>Provided technical support for hospital systems and devices.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">2022 to Present · BS Computer Science</p>
              <h3 className="mt-2 font-heading text-2xl font-bold">Bachelor of Science in Computer Science</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">CITI Global College</p>
              <p className="mt-4 text-slate-700">
                Full-Stack development, database systems (MySQL and PostgreSQL in production deployments), mobile development, machine learning, and software engineering. Built and deployed multiple real-world systems as capstone and independent projects throughout.
              </p>
            </article>
          </div>
        </section>

        <section id="certificates" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="section-eyebrow">Credentials</p>
          <h2 className="section-title">Certificates</h2>
          <p className="section-sub">Browse certificates in a centered slideshow. Click the preview to open a zoomable viewer.</p>

          <div className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-line bg-white p-4 shadow-sm md:p-6">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${certificateSlide * 100}%)` }}
            >
              {certificateFiles.map((fileName) => {
                const href = `/certificates/${encodeURIComponent(fileName)}`;
                return (
                  <article key={fileName} className="w-full shrink-0 px-1 md:px-2">
                    <button
                      type="button"
                      className="group relative w-full overflow-hidden rounded-2xl border border-line bg-slate-50 text-left"
                      aria-label="Open certificate preview"
                      onClick={() => openCertificateModal(fileName)}
                    >
                      <div className="aspect-[16/11] w-full">
                        {certificateThumbs[fileName] ? (
                          <img
                            src={certificateThumbs[fileName]}
                            alt="Certificate preview"
                            className="h-full w-full object-contain bg-white transition duration-300 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-sm font-semibold text-slate-400">
                            Loading preview...
                          </div>
                        )}
                      </div>
                    </button>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Open PDF
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white md:left-4"
              aria-label="Previous certificate"
              onClick={goToPrevCertificate}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white md:right-4"
              aria-label="Next certificate"
              onClick={goToNextCertificate}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent md:w-20" />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {certificateFiles.map((file, index) => (
              <button
                key={file}
                type="button"
                className={index === certificateSlide ? 'h-2.5 w-7 rounded-full bg-slate-900' : 'h-2.5 w-2.5 rounded-full bg-slate-300'}
                aria-label={`Show certificate ${index + 1}`}
                onClick={() => setCertificateSlide(index)}
              />
            ))}
          </div>

          {activeCertificate && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Certificate viewer"
              onClick={closeCertificateModal}
            >
              <div
                className="w-full max-w-6xl rounded-2xl border border-slate-700 bg-white p-3 shadow-2xl md:p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700"
                      onClick={() => setCertificateZoom((prev) => Math.max(50, prev - 10))}
                    >
                      Zoom -
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700"
                      onClick={() => setCertificateZoom((prev) => Math.min(200, prev + 10))}
                    >
                      Zoom +
                    </button>
                    <span className="text-sm font-semibold text-slate-600">{certificateZoom}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/certificates/${encodeURIComponent(activeCertificate)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700"
                    >
                      Open Original PDF
                    </a>
                    <button
                      type="button"
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700"
                      onClick={closeCertificateModal}
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="h-[70vh] overflow-auto rounded-xl border border-line bg-white">
                  {activeCertificateLoading ? (
                    <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">Rendering certificate...</div>
                  ) : activeCertificateImage ? (
                    <div className="flex min-h-full items-start justify-center p-3">
                      <img
                        src={activeCertificateImage}
                        alt="Certificate full preview"
                        className="max-w-none rounded-lg shadow-sm transition-transform duration-300 ease-out"
                        style={{ transform: `scale(${certificateZoom / 100})`, transformOrigin: 'top center' }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                      Preview unavailable. Use Open Original PDF.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="github" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="section-eyebrow">Open Source</p>
          <h2 className="section-title">Code on GitHub</h2>
          <p className="section-sub">All major projects are public. Browse the repositories below.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {githubRepos.map((repo, i) => (
              <a
                key={repo.href}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === githubRepos.length - 1 ? 'project-link-primary' : 'project-link'}
              >
                {repo.label}
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-20 scroll-mt-24 rounded-3xl border border-line bg-white p-7 shadow-sm md:mt-24 md:p-10">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let&apos;s work together.</h2>
          <p className="section-sub">Open to junior developer roles, internships, freelance projects, and serious collaborations.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a className="contact-item" href="mailto:maynardermita@gmail.com">maynardermita@gmail.com</a>
            <a className="contact-item" href="tel:09682678399">09682678399</a>
            <p className="contact-item">Sta. Rosa, Laguna</p>
            <a className="contact-item" target="_blank" rel="noopener noreferrer" href="https://github.com/dranyam13">github.com/dranyam13</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-sm text-slate-600 md:flex-row md:items-center md:px-8">
          <p>© 2026 Maynard Ermita · Sta. Rosa, Laguna</p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="https://github.com/dranyam13" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href="mailto:maynardermita@gmail.com" className="nav-link">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
