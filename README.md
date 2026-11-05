# Diaz — Developer Portfolio

A modern, high-performance developer portfolio built with pure HTML, CSS & JavaScript. Designed for GitHub Pages or static hosts — zero build step required.

## ✨ Highlights & Upgrades

- **Floating Center-Top Pill Navigation** — Sleek floating dock with glassmorphism, glowing active indicator dot, smooth scroll tracking, and magnetic hover micro-interactions.
- **Dynamic Data Architecture** — Easily add or edit **Projects**, **Skills**, **Work Experience**, and **Images** through organized data files without editing core HTML!
- **Rich Motion & Animations** — Staggered directional scroll reveals (fade up, left, right), 3D perspective card tilt on hover, animated stat count-up, breathing pill dock, Ken Burns image zoom, and glowing badges.
- **Dark & Light Mode** — Instant switching with smooth transitions and persistent `localStorage` preference.
- **Image Fallback System** — Drop screenshots into `assets/images/`. If an image is missing or invalid, a placeholder is rendered automatically.
- **Auto-Filter Projects** — Filter tabs are generated on the fly based on project types.

---

## 📁 File Structure

```
portfolio/
├── index.html              ← Clean HTML structure (sections & pill nav)
├── style.css               ← Complete design system, glassmorphism & animations
├── main.js                 ← Pill dock, dynamic renderers, 3D tilt, counters
├── data/
│   ├── projects.js         ← 🚀 Add / edit your projects & project screenshots
│   ├── skills.js           ← ⚡ Add / edit skills, categories & custom icons
│   └── experience.js       ← 💼 Add / edit timeline roles & company details
├── assets/
│   └── images/             ← 🖼️ Store profile picture & project screenshots
│       └── Porfile.png
└── README.md
```

---

## 🛠️ How to Add Content Easily

### 1. Adding a Project & Images
Open `data/projects.js` and add an entry:
```javascript
{
  title: "My New App",
  description: "A full-stack application built with modern architecture.",
  tags: ["React", "Node.js", "PostgreSQL"],
  type: "Full-Stack",                  // Used for filter buttons
  status: "Completed",                 // "Completed" | "In Progress"
  github: "https://github.com/...",    // Leave "" if private
  demo: "https://my-app.com",          // Leave "" if none
  image: "assets/images/my-app.png"    // Save your image in assets/images/
}
```
> **Tip for Images**: Place your screenshot in `assets/images/my-app.png`. If `image: ""` is left blank, a fallback code placeholder is rendered.

---

### 2. Adding Skills & Icons
Open `data/skills.js`. You can add a skill using FontAwesome icons or your own custom image logo:
```javascript
// Inside any category's items[]:
{ icon: "fab fa-docker", name: "Docker" }

// Or using your own image file:
{ image: "assets/images/skills/my-tool.svg", name: "Custom Tool" }
```
You can also copy the template at the bottom of `data/skills.js` to add an entire new category!

---

### 3. Adding Work Experience
Open `data/experience.js` and add an entry at the top:
```javascript
{
  date: "2024 — Present",
  role: "Software Developer",
  company: "Acme Corporation",
  bullets: [
    "Developed high-throughput REST APIs and microservices.",
    "Integrated database caching with Redis to reduce query response times.",
    "Collaborated across design and engineering teams to deploy features."
  ]
}
```

---

### 4. Updating the Profile Picture
To change your hero / about profile photo:
1. Save your photo into `assets/images/` (e.g., `assets/images/profile.jpg`).
2. Update the `src` in `index.html` (around line 71):
   ```html
   <img src="assets/images/profile.jpg" alt="Me" />
   ```

---

## 🎨 Design Tokens & Customization
All colors, radii, shadows, and glassmorphism values are defined at the top of `style.css` in `:root` and `[data-theme="light"]`. Customize `--accent`, `--accent-gradient`, or card backgrounds in one place.

## 📦 Deploy to GitHub Pages
1. Push all files to your GitHub repository `your-username.github.io`.
2. Head to **Settings → Pages → Source: Deploy from a branch (`main` / `root`)**.
3. Your updated portfolio will be live in minutes!
