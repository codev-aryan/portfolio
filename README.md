<div align="center">

# 🚀 codev-aryan — Portfolio

<p>
  <img src="https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge"/>
</p>

<p>
  A fast, zero-dependency portfolio with glassmorphism UI, scroll animations, and live competitive programming ratings fetched directly from CodeChef and Codeforces at page load.
</p>

**[View Live →](https://codev-aryan.github.io/portfolio)**

</div>

---

## Features

### UI & Design
- **Glassmorphism** — frosted-glass cards with `backdrop-filter: blur`, translucent borders, and layered depth
- **Animated gradient background** — slow-cycling `400% 400%` mesh that shifts between three purple-navy tones
- **Scroll-triggered fade-ins** — every section element enters via `IntersectionObserver` as it scrolls into view
- **Count-up animations** — rating numbers animate from 0 to their live value when the profiles section becomes visible
- **Typing effect** — hero subtitle types character by character with a blinking cursor
- **Active nav highlighting** — navigation link updates automatically as you scroll through sections
- **Hover micro-interactions** — cards lift, buttons invert, skill pills change color, social icons bounce

### Live Data
- **CodeChef rating & stars** — fetched on load via `codechef-api.vercel.app`; automatically retries through a CORS proxy (`allorigins.win`) if the direct request is blocked; star tier calculated client-side with if/else rating bands
- **Codeforces rating & rank title** — fetched from the official Codeforces public API; rank label (Newbie → Legendary Grandmaster) rendered in its exact official color
- **Hardcoded fallbacks** — both cards show correct static values instantly; live data replaces them silently on success, so the page never looks broken

### Responsive
- Hamburger menu on mobile with slide-in nav panel
- Single-column stacked layout below 768px
- Fluid typography with `clamp()` — no layout breaks at any viewport width

---

## Structure

```
portfolio/
├── index.html      ← all content and markup
├── styles.css      ← design system, glassmorphism, animations, responsive
├── script.js       ← interactions, live API fetching, count-up, observers
└── README.md
```

---

## Getting Started

```bash
git clone https://github.com/codev-aryan/portfolio.git
cd portfolio
```

Open `index.html` directly in any browser — no build step, no dependencies, no server needed.

```bash
# quick one-liner
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

---

## Customisation

**Colors** — edit the four root variables in `styles.css`, everything updates:
```css
:root {
    --bg-grad-1:   #0a0e27;
    --bg-grad-2:   #1a1a3e;
    --bg-grad-3:   #2d1b4e;
    --accent-cyan: #00d4ff;
    --accent-pink: #ff006e;
}
```

**Typing text** — one line in `script.js`:
```js
const textToType = "Your text here";
```

**Ratings** — update the `FALLBACK` object in `script.js` and the `data-target` attributes in `index.html` to match your handles:
```js
const FALLBACK = {
    codechef:   { rating: 1615, stars: 3 },
    codeforces: { rating: 1243, rank: 'Pupil', color: '#008000' },
};
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|:---|:---|
| ≥ 1024px | 3-column project grids, full nav |
| 768px – 1023px | 2-column grids |
| < 768px | Single column, hamburger menu |

---

## Roadmap

- [ ] **GitHub API integration** — auto-fetch pinned repos and inject project cards without touching HTML
- [ ] **LeetCode live stats** — problem count and contest rating via LeetCode public GraphQL API  
- [ ] **Codeforces contest history chart** — mini rating graph rendered on a `<canvas>` inside the profile card
- [ ] **Dark / light mode toggle** — swap CSS variable set with a single class on `<body>`
- [ ] **Project filter tabs** — click a category (Systems · ML · Frontend) to filter the projects grid
- [ ] **CI/CD auto-deploy** — GitHub Actions workflow to deploy to GitHub Pages on every push to `main`

---

## Browser Support

Chrome · Firefox · Safari · Edge · Opera — all modern browsers with `backdrop-filter` support.

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">
  <sub>Built by <a href="https://github.com/codev-aryan">codev-aryan</a></sub>
</div>
