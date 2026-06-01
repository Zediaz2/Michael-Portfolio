# Diaz — Developer Portfolio

A modern, responsive developer portfolio built with pure HTML, CSS & JavaScript. Designed for GitHub Pages — zero build step required.

## ✨ Features

- **Dark/Light Mode** — Toggle with persistent `localStorage` preference
- **Dynamic Projects** — Edit `data/projects.js` to add/remove projects, no HTML changes needed
- **Typing Animation** — Animated role titles in the hero section
- **Scroll Reveal** — Smooth `IntersectionObserver`-based section animations
- **Glassmorphism Cards** — Frosted glass UI with subtle gradients
- **Fully Responsive** — Mobile-first breakpoints for all screen sizes
- **Filterable Projects** — Auto-generated filter buttons by project type
- **Contact Form** — `mailto:` powered form (no backend needed)

## 📁 File Structure

```
portfolio/
├── index.html              ← Single page, all sections
├── style.css               ← Styles + CSS variables for theming
├── main.js                 ← Dark mode, scroll behavior, nav logic
├── data/
│   └── projects.js         ← ✅ Your customization file
├── assets/
│   └── images/
└── README.md
```

## 🚀 Adding a New Project

Open `data/projects.js` and add a new object to the array:

```js
{
  title: "My New Project",
  description: "A short description of what this project does...",
  tags: ["React", "Node.js", "MongoDB"],
  type: "Full-Stack",          // Used for filter buttons
  status: "Completed",         // "Completed" | "In Progress"
  github: "https://github.com/...",
  demo: "https://...",         // Leave "" if no live demo
  image: "assets/images/project.png"  // Leave "" for default icon
}
```

Save, commit, push — live in ~1 minute.

## 🎨 Customization

- **Theme Colors**: Edit CSS variables in `:root` inside `style.css`
- **Bio / Education**: Edit the About section directly in `index.html`
- **Skills**: Add/remove skill cards in the Skills section of `index.html`
- **Experience**: Update the timeline cards in `index.html`
- **Contact Info**: Update email/links in the Contact section and `main.js`

## 📦 Deploy to GitHub Pages

1. Create a repo named `your-username.github.io`
2. Push all files to `main` branch
3. Go to **Settings → Pages → Source: main branch, / (root)**
4. Your site is live at `https://your-username.github.io`

## 🛠 Tech Stack

| Layer     | Choice            | Why                                    |
| --------- | ----------------- | -------------------------------------- |
| Structure | HTML5             | GitHub Pages serves static files       |
| Styling   | CSS3 + Variables  | Dark/light mode with zero JS overhead  |
| Logic     | Vanilla JS        | No build step, no Node needed          |
| Icons     | Font Awesome CDN  | No install needed                      |
| Fonts     | Google Fonts CDN  | Free, fast (Inter + Fira Code)         |

## 📝 License

MIT — feel free to use as a template for your own portfolio.
