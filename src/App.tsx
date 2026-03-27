import { useEffect, useState } from 'react';

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
      { label: 'Backend', href: 'https://github.com/dranyam13/cocoguard-backend' },
      { label: 'Web', href: 'https://github.com/dranyam13/cocoguard-web' },
    ],
  },
];

const supportProjects = [
  ['Inventory Management System', 'Standalone inventory tracking with stock management and reporting.'],
  ['TATCare System', 'Patient turnaround time tracking for hospital operational workflows.'],
  ['Tech & Gadgets Website', 'Product showcase site with catalog and UI/UX implementation.'],
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

const githubRepos = [
  { label: 'sales-backend', href: 'https://github.com/dranyam13/sales-backend' },
  { label: 'suki_web', href: 'https://github.com/dranyam13/suki_web' },
  { label: 'cocoguard-backend', href: 'https://github.com/dranyam13/cocoguard-backend' },
  { label: 'cocoguard-web', href: 'https://github.com/dranyam13/cocoguard-web' },
  { label: 'View All on GitHub', href: 'https://github.com/dranyam13' },
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const roleWords = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roleWords.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [roleWords.length]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-mist text-ink antialiased">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,#dbeafe_0,transparent_42%),radial-gradient(circle_at_85%_0%,#fde68a_0,transparent_38%),linear-gradient(#f8fafc,#f1f5f9)]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-line/70 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="font-heading text-lg font-bold tracking-tight">Maynard Ermita</a>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#github" className="nav-link">GitHub</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
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
              <a href="#home" className="nav-link" onClick={closeMenu}>Home</a>
              <a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a>
              <a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a>
              <a href="#experience" className="nav-link" onClick={closeMenu}>Experience</a>
              <a href="#github" className="nav-link" onClick={closeMenu}>GitHub</a>
              <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
              <a href="mailto:maynardermita@gmail.com" className="nav-link" onClick={closeMenu}>Hire Me</a>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <section id="home" className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Hello, I&apos;m</p>
            <h1 className="font-heading text-4xl font-extrabold leading-[0.95] sm:text-5xl md:text-6xl">Maynard Ermita</h1>
            <p className="mt-3 text-lg font-semibold text-slate-700">{roleWords[roleIndex]}</p>
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

          <div className="mx-auto w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px]">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <img src="/menong.jpg" alt="Maynard Ermita portrait" className="h-auto w-full object-cover" loading="eager" />
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
