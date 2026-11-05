// ============================================================
// data/skills.js — SKILL CATEGORIES & ITEMS
// ============================================================
// Add or remove skills here. The site auto-renders from this array.
// Each category has a title (or category name), icon, and items[].
// Each item can use:
//   - icon: FontAwesome class e.g. "fab fa-react", "fas fa-code"
//   - OR image: Custom logo file e.g. "assets/images/skills/my-logo.svg"
// ============================================================

const skillsData = [
  {
    title: "Languages",
    icon: "fas fa-code",
    items: [
      { icon: "fab fa-js", name: "JavaScript" },
      { icon: "fab fa-php", name: "PHP" },
      { icon: "fab fa-java", name: "Java" },
      { icon: "fab fa-python", name: "Python" },
      { icon: "fas fa-database", name: "SQL" },
      { icon: "fab fa-html5", name: "HTML5" },
      { icon: "fab fa-css3-alt", name: "CSS3" },
      // { icon: "fab fa-rust", name: "Rust" },
    ],
  },
  {
    title: "Backend & Frameworks",
    icon: "fas fa-server",
    items: [
      { icon: "fab fa-node-js", name: "Node.js" },
      { icon: "fas fa-project-diagram", name: "GraphQL" },
      { icon: "fas fa-exchange-alt", name: "REST APIs" },
      { icon: "fab fa-laravel", name: "Laravel" },
      { icon: "fab fa-react", name: "React" },
      // { icon: "fab fa-vuejs", name: "Vue.js" },
    ],
  },
  {
    title: "Databases",
    icon: "fas fa-layer-group",
    items: [
      { icon: "fas fa-database", name: "PostgreSQL" },
      { icon: "fas fa-database", name: "MySQL" },
      { icon: "fas fa-leaf", name: "MongoDB" },
      { icon: "fas fa-bolt", name: "Redis" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "fas fa-tools",
    items: [
      { icon: "fab fa-git-alt", name: "Git" },
      { icon: "fab fa-github", name: "GitHub" },
      { icon: "fab fa-docker", name: "Docker" },
      { icon: "fab fa-aws", name: "AWS" },
      { icon: "fas fa-terminal", name: "CLI" },
      { icon: "fab fa-figma", name: "Figma" },
    ],
  },
  // ─── COPY THIS TEMPLATE TO ADD A NEW CATEGORY ─────────
  // {
  //   title: "Mobile Development",
  //   icon: "fas fa-mobile-alt",
  //   items: [
  //     { icon: "fab fa-react", name: "React Native" },
  //     { icon: "fab fa-android", name: "Android / Kotlin" },
  //     { icon: "fab fa-apple", name: "iOS / Swift" },
  //     // Using custom image logo:
  //     // { image: "assets/images/flutter.png", name: "Flutter" },
  //   ],
  // },
];
