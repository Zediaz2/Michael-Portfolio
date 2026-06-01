/* ============================================================
   main.js — Portfolio Logic
   Dark mode, typing effect, scroll behavior, nav, project renderer
   ============================================================ */

(function () {
  "use strict";

  // ── DOM Ready ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initTheme();
    initNavbar();
    initTypingEffect();
    renderProjects();
    initProjectFilters();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
  }

  // ============================================================
  // THEME
  // ============================================================
  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const saved = localStorage.getItem("theme");

    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    }

    toggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ============================================================
  // NAVBAR
  // ============================================================
  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("nav-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const links = navLinks.querySelectorAll("a");

    // Scroll shadow
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
      updateActiveLink();
    });

    // Mobile menu toggle
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu on link click
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        link.classList.toggle(
          "active",
          scrollY >= top && scrollY < top + height
        );
      }
    });
  }

  // ============================================================
  // TYPING EFFECT
  // ============================================================
  function initTypingEffect() {
    const element = document.getElementById("typing-text");
    if (!element) return;

    const roles = [
      "Full-Stack Developer",
      "Mobile Developer",
      "Back-end Engineer",
      "IT Student",
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
        delay = 2000; // pause at full word
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
  // PROJECTS RENDERER
  // ============================================================
  function renderProjects(filter = "All") {
    const grid = document.getElementById("projects-grid");
    if (!grid || typeof projects === "undefined") return;

    const filtered =
      filter === "All"
        ? projects
        : projects.filter((p) => p.type === filter);

    grid.innerHTML = "";

    filtered.forEach((project, i) => {
      const card = document.createElement("div");
      card.className = "project-card reveal";
      card.style.transitionDelay = `${i * 0.1}s`;

      const statusClass = project.status
        .toLowerCase()
        .replace(/\s+/g, "-");

      const imageHTML = project.image
        ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
        : `<div class="project-image-placeholder"><i class="fas fa-code"></i></div>`;

      const tagsHTML = project.tags
        .map((tag) => `<span class="project-tag">${tag}</span>`)
        .join("");

      let linksHTML = "";
      if (project.github) {
        linksHTML += `<a href="${project.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> Code</a>`;
      }
      if (project.demo) {
        linksHTML += `<a href="${project.demo}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>`;
      }

      card.innerHTML = `
        <div class="project-image">
          ${imageHTML}
          <span class="project-status ${statusClass}">${project.status}</span>
        </div>
        <div class="project-body">
          <span class="project-type">${project.type}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHTML}</div>
          <div class="project-links">${linksHTML}</div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Re-trigger reveal for new cards
    requestAnimationFrame(() => {
      grid.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("revealed");
      });
    });
  }

  // ============================================================
  // PROJECT FILTERS
  // ============================================================
  function initProjectFilters() {
    const container = document.getElementById("projects-filters");
    if (!container || typeof projects === "undefined") return;

    // Extract unique types
    const types = ["All", ...new Set(projects.map((p) => p.type))];

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
  // SCROLL REVEAL (IntersectionObserver)
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  // ============================================================
  // SMOOTH SCROLL
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // ============================================================
  // CONTACT FORM (mailto fallback)
  // ============================================================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#form-name").value;
      const email = form.querySelector("#form-email").value;
      const message = form.querySelector("#form-message").value;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );

      window.location.href = `mailto:diaz.email@example.com?subject=${subject}&body=${body}`;

      form.reset();
    });
  }
})();
