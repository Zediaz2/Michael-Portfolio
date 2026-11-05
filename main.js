/* ============================================================
   main.js — Modern Portfolio Logic
   Centered Pill Nav, Dynamic Rendering, 3D Tilt, Stat Counters,
   Smooth Reveals & Theme Management
   ============================================================ */

(function () {
  "use strict";

  // ── DOM Ready ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initTheme();
    renderSkills();
    renderExperience();
    initProjectFilters();
    renderProjects("All");
    initPillNav();
    initTypingEffect();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initContactForm();
    initTiltEffect();
  }

  // ============================================================
  // 1. THEME MANAGEMENT
  // ============================================================
  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    // Check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "light");
    }

    toggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);

      // Micro bounce animation on icon
      toggle.style.transform = "scale(0.85) rotate(15deg)";
      setTimeout(() => {
        toggle.style.transform = "";
      }, 200);
    });
  }

  // ============================================================
  // 2. CENTERED PILL NAVIGATION
  // ============================================================
  function initPillNav() {
    const pillNav = document.getElementById("pill-nav");
    if (!pillNav) return;

    const navLinks = pillNav.querySelectorAll(".pill-nav-item[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    // Active link highlighting on scroll
    function updateActive() {
      const scrollY = window.scrollY + 140;

      let currentSectionId = "";
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      // Special handling for top and bottom of page
      if (window.scrollY < 80) {
        currentSectionId = "hero";
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        currentSectionId = "contact";
      }

      navLinks.forEach((link) => {
        const targetId = link.getAttribute("href").replace("#", "");
        if (targetId === currentSectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    // Smooth click handler with instant active update
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Desktop Magnetic Micro-Interaction
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      navLinks.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          item.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        item.addEventListener("mouseleave", () => {
          item.style.transform = "";
        });
      });
    }
  }

  // ============================================================
  // 3. TYPING EFFECT
  // ============================================================
  function initTypingEffect() {
    const element = document.getElementById("typing-text");
    if (!element) return;

    const roles = [
      "IT Staff",
      "Helpdesk Specialist",
      "Front-end Developer",
      "Graphic Designer",
      "Network Engineer",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = roles[roleIndex];

      if (isDeleting) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    type();
  }

  // ============================================================
  // 4. SKILLS RENDERER (from data/skills.js)
  // ============================================================
  function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container || typeof skillsData === "undefined") return;

    container.innerHTML = "";

    skillsData.forEach((category, catIdx) => {
      const catDiv = document.createElement("div");
      catDiv.className = "skill-category reveal";
      catDiv.style.transitionDelay = `${catIdx * 0.1}s`;

      const catTitle = category.title || category.category || "Skills";
      const catIcon = category.icon || "fas fa-code";

      const itemsHTML = category.items
        .map((skill) => {
          const iconHTML = skill.image
            ? `<img src="${skill.image}" alt="${skill.name}" class="skill-img-icon" loading="lazy" />`
            : `<i class="${skill.icon || "fas fa-check"}"></i>`;
          return `
            <div class="skill-card">
              ${iconHTML}
              <span>${skill.name}</span>
            </div>
          `;
        })
        .join("");

      catDiv.innerHTML = `
        <h3><i class="${catIcon}"></i> ${catTitle}</h3>
        <div class="skills-grid">
          ${itemsHTML}
        </div>
      `;

      container.appendChild(catDiv);
    });
  }

  // ============================================================
  // 5. EXPERIENCE RENDERER (from data/experience.js)
  // ============================================================
  function renderExperience() {
    const container = document.getElementById("experience-container");
    if (!container || typeof experienceData === "undefined") return;

    container.innerHTML = "";

    experienceData.forEach((item, idx) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "timeline-item reveal reveal-left";
      itemDiv.style.transitionDelay = `${idx * 0.15}s`;

      const bulletsHTML = item.bullets
        .map((b) => `<li>${b}</li>`)
        .join("");

      itemDiv.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-date">${item.date}</div>
          <h3 class="timeline-role">${item.role}</h3>
          <p class="timeline-company">${item.company}</p>
          <ul class="timeline-bullets">
            ${bulletsHTML}
          </ul>
        </div>
      `;

      container.appendChild(itemDiv);
    });
  }

  // ============================================================
  // 6. PROJECTS RENDERER (from data/projects.js)
  // ============================================================
  function renderProjects(filter = "All") {
    const grid = document.getElementById("projects-grid");
    if (!grid || typeof projects === "undefined") return;

    const filtered =
      filter === "All"
        ? projects
        : projects.filter((p) => p.type === filter);

    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 0; color: var(--text-muted);">
          <i class="fas fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; display: block; color: var(--accent);"></i>
          <p>No projects found in this category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((project, i) => {
      const card = document.createElement("div");
      card.className = "project-card reveal";
      card.style.transitionDelay = `${i * 0.1}s`;

      const statusClass = (project.status || "Completed")
        .toLowerCase()
        .replace(/\s+/g, "-");

      const imageHTML = project.image
        ? `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'project-image-placeholder\\'><i class=\\'fas fa-code\\'></i></div>';" />`
        : `<div class="project-image-placeholder"><i class="fas fa-laptop-code"></i></div>`;

      const tagsHTML = (project.tags || [])
        .map((tag) => `<span class="project-tag">${tag}</span>`)
        .join("");

      let linksHTML = "";
      if (project.github) {
        linksHTML += `<a href="${project.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> Code</a>`;
      }
      if (project.demo) {
        linksHTML += `<a href="${project.demo}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
      }

      card.innerHTML = `
        <div class="project-image">
          ${imageHTML}
          <span class="project-status ${statusClass}">${project.status || "Completed"}</span>
        </div>
        <div class="project-body">
          <span class="project-type">${project.type || "Project"}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHTML}</div>
          ${linksHTML ? `<div class="project-links">${linksHTML}</div>` : ""}
        </div>
      `;

      grid.appendChild(card);
    });

    // Re-trigger reveal animation for newly generated cards
    requestAnimationFrame(() => {
      grid.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("revealed");
      });
    });

    // Attach 3D tilt effect to project cards
    initTiltEffect();
  }

  // ============================================================
  // 7. PROJECT FILTERS
  // ============================================================
  function initProjectFilters() {
    const container = document.getElementById("projects-filters");
    if (!container || typeof projects === "undefined") return;

    // Extract unique types dynamically
    const types = ["All", ...new Set(projects.map((p) => p.type).filter(Boolean))];

    container.innerHTML = "";
    types.forEach((type) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (type === "All" ? " active" : "");
      btn.textContent = type;

      btn.addEventListener("click", () => {
        container.querySelectorAll(".filter-btn").forEach((b) =>
          b.classList.remove("active")
        );
        btn.classList.add("active");
        renderProjects(type);
      });

      container.appendChild(btn);
    });
  }

  // ============================================================
  // 8. SCROLL REVEAL (IntersectionObserver)
  // ============================================================
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
  }

  // ============================================================
  // 9. ANIMATED STAT COUNTERS
  // ============================================================
  function initCounterAnimation() {
    const statElements = document.querySelectorAll(".stat-number[data-target]");
    if (!statElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-target"), 10) || 0;
            const suffix = el.getAttribute("data-suffix") || "";
            animateValue(el, 0, target, 1200, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statElements.forEach((el) => observer.observe(el));

    function animateValue(element, start, end, duration, suffix) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing: easeOutCubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * (end - start) + start);
        element.textContent = current + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = end + suffix;
        }
      };
      window.requestAnimationFrame(step);
    }
  }

  // ============================================================
  // 10. 3D TILT EFFECT ON CARDS
  // ============================================================
  function initTiltEffect() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = document.querySelectorAll(".skill-card, .project-card, .stat-card");

    cards.forEach((card) => {
      // Prevent duplicate event listeners
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = "true";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ============================================================
  // 11. SMOOTH SCROLL (Internal Links)
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not(.pill-nav-item)').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // ============================================================
  // 12. CONTACT FORM (with Feedback & Mailto fallback)
  // ============================================================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const name = form.querySelector("#form-name").value;
      const email = form.querySelector("#form-email").value;
      const message = form.querySelector("#form-message").value;

      // Visual feedback
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(
          `Hello John Michael,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        // Open mail client
        window.location.href = `mailto:johnmichaeldiaz.102403@gmail.com?subject=${subject}&body=${body}`;

        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = "var(--status-completed)";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          form.reset();
        }, 2500);
      }, 500);
    });
  }
})();
