/**
 * TENZIN PALGYAL — PORTFOLIO APPLICATION
 * Built adhering strictly to landing-page-design & frontend-design specs
 */

(function () {
  'use strict';

  // --- 1. Dharamshala Live Clock (CTA Headquarters, HP, India: UTC+5:30) ---
  function initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      // Calculate IST (UTC + 5.5 hours) with clean hours and minutes
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      const text = `Dharamshala · ${timeStr} IST`;
      clockEl.textContent = text;
      const mobileClockEl = document.getElementById('nav-mobile-clock-text');
      if (mobileClockEl) mobileClockEl.textContent = text;
    }

    update();
    setInterval(update, 10000); // update every 10s to conserve CPU
  }

  // --- Mobile Navigation Drawer System ---
  function initMobileNav() {
    const toggleBtn = document.getElementById('nav-mobile-toggle');
    const drawer = document.getElementById('nav-mobile-drawer');
    const links = document.querySelectorAll('.nav-mobile-link');
    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeDrawer();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --- Scrollspy Navigation Indicator ---
  function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          mobileLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- Floating Back to Top Button ---
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 2. Scroll Reveal for Sections per B7 ---
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      revealElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- 3. Project Category Filter ---
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }

  // --- 8. Project Dossier Modal System with Architecture Blueprints ---
  const projectDossiers = {
    'home-cta': {
      title: 'Central Tibetan Relief Committee (CTRC) Official Portal',
      institution: 'Department of Home, Central Tibetan Administration (CTA)',
      role: 'Lead Full Stack Developer & Systems Engineer',
      liveUrl: 'https://centraltibetanreliefcommittee.net/',
      stack: ['Civic Tech', 'WordPress', 'React', 'PostgreSQL', 'Linux IT'],
      status: 'Live Production System',
      description: 'The primary humanitarian relief and rehabilitation web portal for the Central Tibetan Administration’s Department of Home (CTRC), serving over 40 Tibetan refugee settlements across India, Nepal, and Bhutan.',
      details: [
        'Centralizes settlement rehabilitation, elder sponsorship programs, community loans, and agricultural development into a secure institutional portal.',
        'High security role-based permissions designed to protect sensitive refugee administration records and civil documents.',
        'PostgreSQL schema and custom backend services optimized for multi-settlement population registries, welfare disbursement tracking, and official announcements.',
        'Clean, accessible responsive user interface ensuring elderly welfare officers, donors, and settlement leaders can easily navigate and submit updates.'
      ],
      metrics: '40+ Settlements Connected · Live at centraltibetanreliefcommittee.net · Dual-Tier Security',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Settlement Clients</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">40+ Clusters</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="236" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Nginx Gateway</text>
          <text x="236" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">SSL & Rate Limit</text>

          <path d="M296 50 H336" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="336,47 342,50 336,53" fill="#38BDF8"/>

          <rect x="342" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="402" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Laravel REST API</text>
          <text x="402" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Auth & Business Logic</text>

          <path d="M462 50 H502" stroke="#22C55E" stroke-width="2"/>
          <polygon points="502,47 508,50 502,53" fill="#22C55E"/>

          <rect x="508" y="25" width="102" height="50" rx="8" fill="#131209" stroke="#D4AF37"/>
          <text x="559" y="47" fill="#D4AF37" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL</text>
          <text x="559" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">ACID Relations</text>
        </svg>`
    },
    'ms-project': {
      title: 'MS Project — CTA Institutional Management System',
      institution: 'Department of Home, Central Tibetan Administration',
      role: 'Full Stack Architect & Backend Developer',
      stack: ['Laravel', 'PostgreSQL', 'Livewire', 'Figma', 'Docker'],
      status: 'Core Internal Platform',
      description: 'A comprehensive internal workflow coordination and resource allocation management platform engineered specifically for the administrative machinery of the Department of Home.',
      details: [
        'Streamlines inter-departmental project proposals, budget tracking, milestone approvals, and staff delegation.',
        'Automated document verification pipeline eliminating paper-based delays in settlement rehabilitation grants.',
        'Audited transactional database with strict rollback integrity, preventing data corruption during multi-user write operations.',
        'Custom administrative dashboards built following modular design tokens created in Figma.'
      ],
      metrics: '100% Paperless Workflow Transition · Sub-second Query Latency · Role-Based Access',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="75" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Officer Permissions</text>
          <text x="75" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">RBAC Enforcement</text>

          <path d="M140 50 H180" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="180,47 186,50 180,53" fill="#38BDF8"/>

          <rect x="186" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="256" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Workflow State Machine</text>
          <text x="256" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">Grants & Milestones</text>

          <path d="M326 50 H366" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="366,47 372,50 366,53" fill="#38BDF8"/>

          <rect x="372" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="432" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL ACID</text>
          <text x="432" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Strict Rollbacks</text>

          <path d="M492 50 H532" stroke="#22C55E" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#22C55E"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#22C55E"/>
          <text x="574" y="47" fill="#22C55E" font-size="11" font-family="monospace" text-anchor="middle">Audit</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Ledger</text>
        </svg>`
    },
    'tibetan-keyboard': {
      title: 'Tibetan Keyboard & Interactive Typing Tutor',
      institution: 'Diaspora Education & Digital Literacy Initiative',
      role: 'Creator, UI/UX Designer & Frontend Engineer',
      stack: ['JavaScript (ESM)', 'CSS Grid', 'Unicode Stacking', 'Figma', 'Web Audio'],
      status: 'Public Educational Tool',
      liveUrl: 'https://tibetankeyboard.vercel.app/',
      description: 'A purpose-built digital typing tutor and interactive keyboard simulator created to preserve Tibetan orthography and teach standard typing fluency to young Tibetans in exile and linguistic researchers.',
      details: [
        'Solves the friction of typing complex Tibetan Unicode stacks (root letter, superscripts, subjoined consonants, and vowel signs).',
        'Includes progressive typing drills ranging from isolated 30 consonants to multi-character Classical Tibetan text excerpts.',
        'Zero-dependency standalone architecture that runs seamlessly on low-bandwidth school laptops and mobile browsers.',
        'Visual layout maps intuitive standard QWERTY positions to Sambhota Tibetan keyboard standards.'
      ],
      metrics: '30 Consonants + 4 Vowel Diacritics · Real-time Syllable Parsing · Zero Latency',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Keyboard Event</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Physical / Touch</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="241" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Sambhota Mapping</text>
          <text x="241" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">QWERTY to Uchen</text>

          <path d="M306 50 H346" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="346,47 352,50 346,53" fill="#38BDF8"/>

          <rect x="352" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="422" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Unicode Normalizer</text>
          <text x="422" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">NFC Stack Composition</text>

          <path d="M492 50 H532" stroke="#D4AF37" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#D4AF37"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#D4AF37"/>
          <text x="574" y="47" fill="#D4AF37" font-size="11" font-family="monospace" text-anchor="middle">DOM</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Display</text>
        </svg>`
    },
    'minidock': {
      title: 'MINIDOCK — The Native Liquid-Glass macOS Auxiliary Dock',
      institution: 'Independent Systems & Developer Tooling Architecture',
      role: 'Creator, Systems Engineer & UI Architect',
      stack: ['Swift 6.2', 'AppKit', 'ScreenCaptureKit', 'Mach Kernel APIs', 'Metal', 'CoreAudio'],
      status: 'Active Production / Public Beta',
      liveUrl: 'https://dock-website-one.vercel.app/',
      description: 'A modular, high-performance floating auxiliary dock built natively for macOS in 100% Swift 6 and AppKit. Designed as a lean, zero-Electron companion to the native macOS Dock with 16+ live widgets, real-time Mach processor telemetry, live ScreenCaptureKit window previews, and an ultra-low under-25MB memory footprint.',
      details: [
        '100% Native Swift 6 & AppKit architecture eliminating the 400MB+ Chromium/Electron runtime overhead.',
        'Per-core Mach kernel telemetry with real-time CPU thread utilization, microsecond timestamping, and memory pressure monitoring.',
        'ScreenCaptureKit integration for latency-free live thumbnail peeks into active application windows.',
        'Modular 16+ live widget matrix including month progress dot-matrix, audio waveform meters, battery telemetry, clipboard guard, and quick system controls.',
        'Refractive Liquid Glass visual design conforming strictly to Apple Human Interface Guidelines.'
      ],
      metrics: '< 25MB RAM Footprint · 0.2% CPU Idle · Zero Electron Overhead · 16+ Live Widgets',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="75" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Mach Kernel APIs</text>
          <text x="75" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">host_processor_info</text>

          <path d="M140 50 H180" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="180,47 186,50 180,53" fill="#38BDF8"/>

          <rect x="186" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="256" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Swift 6 Concurrency</text>
          <text x="256" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">Actors &amp; Async Streams</text>

          <path d="M326 50 H366" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="366,47 372,50 366,53" fill="#38BDF8"/>

          <rect x="372" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="437" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">ScreenCaptureKit</text>
          <text x="437" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Zero-Copy Window Peeks</text>

          <path d="M502 50 H538" stroke="#D4AF37" stroke-width="2"/>
          <polygon points="538,47 544,50 538,53" fill="#D4AF37"/>

          <rect x="544" y="25" width="66" height="50" rx="8" fill="#131209" stroke="#D4AF37"/>
          <text x="577" y="47" fill="#D4AF37" font-size="11" font-family="monospace" text-anchor="middle">AppKit</text>
          <text x="577" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Liquid Glass</text>
        </svg>`
    },
    'digital-archive': {
      title: 'The Tibetan Digital Archive System',
      institution: 'Department of Home / Tibetan Cultural Preservation',
      role: 'Architect & Lead Engineer',
      stack: ['React', 'PostgreSQL', 'Laravel', 'Object Storage', 'Metadata Engine'],
      status: 'Currently in Active Development (2026)',
      description: 'A modern, resilient digital archiving platform designed to preserve decades of fragile diaspora settlement history, land rehabilitation deeds, elder oral histories, and institutional records.',
      details: [
        'Multi-faceted cataloging engine supporting Tibetan language metadata, bilingual search, and historical chronology tagging.',
        'Immutable audit logs guaranteeing document provenance and historical verification for generations to come.',
        'High-density archival viewer supporting high-resolution document scans, optical character recognition (OCR) indexing, and PDF rendering.',
        'Engineered with offline-tolerant synchronization for remote settlement archives with intermittent network connectivity.'
      ],
      metrics: 'Active Build · Long-term Preservation Architecture · Dual-Script Indexing',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Document Ingest</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Historical Records</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="246" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Metadata Classifier</text>
          <text x="246" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">Tibetan & English Index</text>

          <path d="M316 50 H356" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="356,47 362,50 356,53" fill="#38BDF8"/>

          <rect x="362" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="427" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL Search</text>
          <text x="427" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">GIN & Full-Text</text>

          <path d="M492 50 H532" stroke="#22C55E" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#22C55E"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#38BDF8"/>
          <text x="574" y="47" fill="#38BDF8" font-size="11" font-family="monospace" text-anchor="middle">S3 Vault</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Cold Store</text>
        </svg>`
    }
  };

  function initProjectModal() {
    const overlay = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-project-title');
    const modalInstitution = document.getElementById('modal-project-institution');
    const modalRole = document.getElementById('modal-project-role');
    const modalStack = document.getElementById('modal-project-stack');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalDetails = document.getElementById('modal-project-details');
    const modalMetrics = document.getElementById('modal-project-metrics');
    const modalBlueprint = document.getElementById('modal-project-blueprint');
    let previouslyFocusedElement = null;

    if (!overlay) return;

    function openModal(projectId) {
      const data = projectDossiers[projectId];
      if (!data) return;

      previouslyFocusedElement = document.activeElement;

      modalTitle.textContent = data.title;
      modalInstitution.textContent = data.institution;
      modalRole.textContent = data.role;
      modalDesc.textContent = data.description;
      modalMetrics.textContent = data.metrics;

      if (modalBlueprint && data.blueprint) {
        modalBlueprint.innerHTML = data.blueprint;
      }

      // Render stack badges
      let stackHtml = data.stack.map(s => `<span class="project-tag">${s}</span>`).join('');
      if (data.liveUrl) {
        stackHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-tag" style="background-color:var(--accent-gold); color:var(--bg-canvas); text-decoration:none; font-weight:600;">Launch Live App ↗</a>`;
      }
      modalStack.innerHTML = stackHtml;

      // Render details bullet list
      modalDetails.innerHTML = data.details.map(d => `<li class="stack-point"><strong style="color:var(--accent-gold);margin-right:6px;">✦</strong> ${d}</li>`).join('');

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (closeBtn) closeBtn.focus();
      }, 50);
    }

    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    }

    // Accessible keyboard focus trap inside modal
    overlay.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-open-modal');
        openModal(id);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  // --- 9. Toast Notification System ---
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('global-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  // --- 10. Copy Email Handlers ---
  function initCopyEmail() {
    const email = 'tenzin7755@gmail.com';
    const copyTriggers = document.querySelectorAll('[data-copy-email]');

    copyTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          showToast(`${email} copied to clipboard`);
        }).catch(() => {
          showToast(`Contact: ${email}`);
        });
      });
    });
  }

  // --- 11. Command Palette (Cmd+K) Spotlight Modal ---
  function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const searchInput = document.getElementById('cmd-search-input');
    const list = document.querySelector('.cmd-list');
    const items = Array.from(document.querySelectorAll('.cmd-item'));
    const triggerBtn = document.getElementById('nav-search-trigger');
    let previouslyFocusedElement = null;
    let selectedIndex = 0;
    let emptyEl = null;

    if (!palette) return;

    function getVisibleItems() {
      return items.filter(item => item.style.display !== 'none');
    }

    function updateSelection(newIndex) {
      const visible = getVisibleItems();
      if (!visible.length) {
        items.forEach(i => i.classList.remove('selected'));
        return;
      }
      if (newIndex < 0) newIndex = visible.length - 1;
      if (newIndex >= visible.length) newIndex = 0;
      selectedIndex = newIndex;

      items.forEach(i => i.classList.remove('selected'));
      const active = visible[selectedIndex];
      if (active) {
        active.classList.add('selected');
        if (typeof active.scrollIntoView === 'function') {
          active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }

    function ensureEmptyState(count) {
      if (!emptyEl && list) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'cmd-empty';
        list.appendChild(emptyEl);
      }
      if (emptyEl) {
        if (count === 0) {
          emptyEl.textContent = `No commands matching "${searchInput ? searchInput.value : ''}"`;
          emptyEl.style.display = 'block';
        } else {
          emptyEl.style.display = 'none';
        }
      }
    }

    function openPalette() {
      previouslyFocusedElement = document.activeElement;
      palette.classList.add('active');
      if (searchInput) {
        searchInput.value = '';
        items.forEach(i => {
          i.style.display = 'flex';
          i.classList.remove('selected');
        });
        if (emptyEl) emptyEl.style.display = 'none';
        selectedIndex = 0;
        updateSelection(0);
        setTimeout(() => searchInput.focus(), 60);
      }
    }

    function closePalette() {
      palette.classList.remove('active');
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    }

    function executeAction(item) {
      if (!item) return;
      const action = item.getAttribute('data-action');
      closePalette();
      if (action === 'work') document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'stack') document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'email') {
        navigator.clipboard.writeText('tenzin7755@gmail.com').then(() => {
          showToast('tenzin7755@gmail.com copied to clipboard');
        });
      }
      else if (action === 'github') window.open('https://github.com/tenzin67', '_blank');
      else if (action === 'linkedin') window.open('https://www.linkedin.com/in/tenzin-palgyal/', '_blank');
      else if (action === 'app') window.open('https://tibetankeyboard.vercel.app/', '_blank');
      else if (action === 'minidock') window.open('https://dock-website-one.vercel.app/', '_blank');
      else if (action === 'ctrc') window.open('https://centraltibetanreliefcommittee.net/', '_blank');
      else if (action === 'print') {
        window.print();
      }
      else if (action === 'nangsi') {
        if (window.openNangsiModal) window.openNangsiModal();
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openPalette);
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let matchCount = 0;
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          const match = text.includes(query);
          item.style.display = match ? 'flex' : 'none';
          if (match) matchCount++;
        });
        ensureEmptyState(matchCount);
        updateSelection(0);
      });

      searchInput.addEventListener('keydown', (e) => {
        const visible = getVisibleItems();
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          updateSelection(selectedIndex + 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          updateSelection(selectedIndex - 1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (visible[selectedIndex]) {
            executeAction(visible[selectedIndex]);
          }
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (palette.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
      }
      if (e.key === 'Escape' && palette.classList.contains('active')) {
        closePalette();
      }
    });

    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });

    items.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        const visible = getVisibleItems();
        const visIdx = visible.indexOf(item);
        if (visIdx !== -1) {
          selectedIndex = visIdx;
          items.forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
        }
      });

      item.addEventListener('click', () => {
        executeAction(item);
      });
    });
  }

  // --- 12. Keyboard Shortcuts ---
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if ((e.key === 'e' || e.key === 'E') && !e.metaKey && !e.ctrlKey) {
        navigator.clipboard.writeText('tenzin7755@gmail.com').then(() => {
          showToast('Quick key [E]: Email copied to clipboard');
        });
      }
    });
  }

  // --- 13. Nangsi MIS Interactive Operations Simulator ---
  function initNangsiDemo() {
    const modal = document.getElementById('nangsi-modal');
    const launchBtn = document.getElementById('launch-nangsi-demo-btn');
    const closeBtn = document.getElementById('nangsi-modal-close');
    const tableBody = document.getElementById('nangsi-table-body');
    const inspector = document.getElementById('nangsi-project-inspector');
    const searchInput = document.getElementById('nangsi-search');
    const settlementFilter = document.getElementById('nangsi-settlement-filter');
    const statusFilter = document.getElementById('nangsi-status-filter');
    const tabBtns = document.querySelectorAll('.nangsi-tab-btn');
    const viewProjects = document.getElementById('nangsi-view-projects');
    const viewRadar = document.getElementById('nangsi-view-radar');
    let previouslyFocusedElement = null;

    if (!modal) return;

    const sampleProjects = [
      {
        code: 'PRJ-2026-0042',
        title: 'Solar Irrigation Deep-well Grid (Camp 4 & 5)',
        sector: 'Agriculture & Green Energy',
        settlement: 'Bylakuppe Lugsung',
        pacInitial: 4200000,
        bargyeKatrol: 650000,
        pacTotal: 4850000,
        disbursed: 3783000,
        status: 'In Progress',
        donor: 'CTRC / Bureau of PRM',
        officer: 'Tenzin Norbu (Desk Officer)',
        handover: '15 Dec 2026',
        beneficiaries: '480 Farmer Households'
      },
      {
        code: 'PRJ-2026-0038',
        title: 'Elder Care Home Solar Heating & Sanitation',
        sector: 'Elder Welfare & Healthcare',
        settlement: 'Mundgod Doeguling',
        pacInitial: 3200000,
        bargyeKatrol: 0,
        pacTotal: 3200000,
        disbursed: 3200000,
        status: 'Completed',
        donor: 'CTA Department of Home Special Grant',
        officer: 'Pema Dolma (Coordinator)',
        handover: 'Completed (Oct 2026)',
        beneficiaries: '124 Elderly Residents'
      },
      {
        code: 'PRJ-2026-0045',
        title: 'High-Altitude Passive Winter Greenhouses',
        sector: 'Sustainable Agriculture',
        settlement: 'Ladakh Sonamling',
        pacInitial: 2500000,
        bargyeKatrol: 280000,
        pacTotal: 2780000,
        disbursed: 1251000,
        status: 'In Progress',
        donor: 'USAID / The Tibet Fund',
        officer: 'Karma Wangchuk (Civil Works)',
        handover: '28 Feb 2027',
        beneficiaries: '85 Agro-Pastoralist Families'
      },
      {
        code: 'PRJ-2026-0051',
        title: 'Community RO Water Filtration & Treatment',
        sector: 'Water, Sanitation & Hygiene (WASH)',
        settlement: 'Clement Town',
        pacInitial: 1920000,
        bargyeKatrol: 0,
        pacTotal: 1920000,
        disbursed: 288000,
        status: 'Approved',
        donor: 'CTRC Welfare Fund',
        officer: 'Lobsang Tashi (Desk Officer)',
        handover: '10 Apr 2027',
        beneficiaries: '1,150 Residents'
      },
      {
        code: 'PRJ-2026-0035',
        title: 'Settlement Internal Arterial Road & Storm Drainage',
        sector: 'Civic Infrastructure',
        settlement: 'Hunsur Rabgyaling',
        pacInitial: 5000000,
        bargyeKatrol: 400000,
        pacTotal: 5400000,
        disbursed: 5400000,
        status: 'Completed',
        donor: 'CTRC Infrastructure Fund',
        officer: 'Sonam Yangzom (Settlement Officer)',
        handover: 'Completed (Aug 2026)',
        beneficiaries: 'Entire Settlement (2,400 People)'
      },
      {
        code: 'PRJ-2026-0058',
        title: 'Community Primary Healthcare Clinic Modernization',
        sector: 'Healthcare & Clinical Care',
        settlement: 'Bir Tibetan Society',
        pacInitial: 2000000,
        bargyeKatrol: 250000,
        pacTotal: 2250000,
        disbursed: 1462500,
        status: 'In Progress',
        donor: 'Direct Community Aid / CTRC',
        officer: 'Dawa Tsering (Admin)',
        handover: '20 Jan 2027',
        beneficiaries: '650 Residents & Monastic Youth'
      }
    ];

    let selectedProject = sampleProjects[0];

    function formatINR(val) {
      return '₹' + Number(val).toLocaleString('en-IN');
    }

    function renderInspector(proj) {
      if (!inspector || !proj) return;
      const unspent = proj.pacTotal - proj.disbursed;
      const pct = Math.round((proj.disbursed / proj.pacTotal) * 100);

      inspector.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="caption-3" style="color:var(--accent-gold);">${proj.code} · ${proj.settlement}</span>
            <h4 class="title-2" style="margin-top:2px; color:var(--text-primary);">${proj.title}</h4>
            <div class="caption-4 text-secondary">Sector: ${proj.sector} · Target: ${proj.beneficiaries}</div>
          </div>
          <span class="nangsi-status-badge ${proj.status === 'Completed' ? 'nangsi-status-completed' : (proj.status === 'In Progress' ? 'nangsi-status-in-progress' : 'nangsi-status-approved')}">${proj.status}</span>
        </div>

        <div class="nangsi-detail-grid" style="margin-top:var(--space-100);">
          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">FINANCIAL PAC BREAKDOWN</div>
            <div class="body-2 font-mono" style="color:var(--accent-gold); margin-top:4px;">${formatINR(proj.pacTotal)}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Initial: ${formatINR(proj.pacInitial)} ${proj.bargyeKatrol > 0 ? `+ Extension: ${formatINR(proj.bargyeKatrol)}` : '(No Extension)'}</div>
          </div>

          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">DISBURSEMENT PROGRESS (${pct}%)</div>
            <div class="body-2 font-mono" style="color:var(--accent-green); margin-top:4px;">${formatINR(proj.disbursed)}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Unspent Balance: ${formatINR(unspent)}</div>
          </div>

          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">INSTITUTIONAL GOVERNANCE</div>
            <div class="body-4" style="color:var(--text-primary); margin-top:4px;">${proj.officer}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Donor: ${proj.donor} · Handover: ${proj.handover}</div>
          </div>
        </div>

        <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
          <button id="nangsi-export-btn" class="project-tag" style="background:var(--accent-gold); color:var(--bg-canvas); border:none; cursor:pointer; font-weight:600; padding:7px 14px; border-radius:var(--radius-sm); display:inline-flex; align-items:center; gap:6px; transition:transform 0.15s ease;">
            <span>📄</span> Export Signed PAC Ledger (PDF)
          </button>
          <button id="nangsi-verify-btn" class="project-tag" style="background:rgba(34, 197, 94, 0.1); color:var(--accent-green); border:1px solid var(--accent-green); cursor:pointer; font-weight:600; padding:7px 14px; border-radius:var(--radius-sm); display:inline-flex; align-items:center; gap:6px; transition:transform 0.15s ease;">
            <span>🔒</span> Verify Settlement Audit Hash
          </button>
        </div>
      `;

      const exportBtn = inspector.querySelector('#nangsi-export-btn');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => {
          showToast(`Exporting PAC ledger for ${proj.code} (${proj.settlement})... PDF ready`);
        });
      }

      const verifyBtn = inspector.querySelector('#nangsi-verify-btn');
      if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
          showToast(`SHA-256 Ledger Hash verified for ${proj.code} [Audit State: VALID]`);
        });
      }
    }

    function renderTable() {
      if (!tableBody) return;
      const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const setFilter = settlementFilter ? settlementFilter.value : 'all';
      const statFilter = statusFilter ? statusFilter.value : 'all';

      const filtered = sampleProjects.filter(p => {
        const matchQ = !q || p.code.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.settlement.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q);
        const matchSet = setFilter === 'all' || p.settlement.toLowerCase().includes(setFilter.toLowerCase());
        const matchStat = statFilter === 'all' || p.status === statFilter;
        return matchQ && matchSet && matchStat;
      });

      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">No infrastructure records matched this filter query.</td></tr>`;
        return;
      }

      tableBody.innerHTML = filtered.map(p => {
        const isSel = selectedProject && selectedProject.code === p.code;
        const pct = Math.round((p.disbursed / p.pacTotal) * 100);
        const badgeClass = p.status === 'Completed' ? 'nangsi-status-completed' : (p.status === 'In Progress' ? 'nangsi-status-in-progress' : 'nangsi-status-approved');
        return `
          <tr data-code="${p.code}" class="${isSel ? 'selected' : ''}">
            <td class="font-mono" style="font-weight:600; color:var(--accent-cyan);">${p.code}</td>
            <td>
              <div style="font-weight:500; color:var(--text-primary);">${p.title}</div>
              <div class="caption-5 text-muted">${p.sector}</div>
            </td>
            <td>${p.settlement}</td>
            <td class="font-mono" style="font-weight:600;">${formatINR(p.pacTotal)}</td>
            <td>
              <div class="font-mono">${formatINR(p.disbursed)}</div>
              <div class="caption-5 text-muted">${pct}% disbursed</div>
            </td>
            <td><span class="nangsi-status-badge ${badgeClass}">${p.status}</span></td>
          </tr>
        `;
      }).join('');

      tableBody.querySelectorAll('tr[data-code]').forEach(row => {
        row.addEventListener('click', () => {
          const code = row.getAttribute('data-code');
          const found = sampleProjects.find(x => x.code === code);
          if (found) {
            selectedProject = found;
            renderTable();
            renderInspector(found);
          }
        });
      });
    }

    if (searchInput) searchInput.addEventListener('input', renderTable);
    if (settlementFilter) settlementFilter.addEventListener('change', renderTable);
    if (statusFilter) statusFilter.addEventListener('change', renderTable);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'projects') {
          if (viewProjects) viewProjects.style.display = 'block';
          if (viewRadar) viewRadar.style.display = 'none';
        } else {
          if (viewProjects) viewProjects.style.display = 'none';
          if (viewRadar) viewRadar.style.display = 'block';
        }
      });
    });

    function openNangsiModal() {
      previouslyFocusedElement = document.activeElement;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderTable();
      renderInspector(selectedProject);
      setTimeout(() => {
        if (closeBtn) closeBtn.focus();
      }, 50);
    }

    function closeNangsiModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    }

    // Accessible keyboard focus trap inside Nangsi modal
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    if (launchBtn) launchBtn.addEventListener('click', openNangsiModal);
    if (closeBtn) closeBtn.addEventListener('click', closeNangsiModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeNangsiModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeNangsiModal();
    });

    window.openNangsiModal = openNangsiModal;
  }

  // --- Initialize All Systems on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    initMobileNav();
    initScrollspy();
    initBackToTop();
    initScrollReveals();
    initProjectFilters();
    initProjectModal();
    initCommandPalette();
    initCopyEmail();
    initKeyboardShortcuts();
    initNangsiDemo();
  });

})();
