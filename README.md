# Sim-Civics Website

A React + TypeScript + Vite site for the Sim-Civics LA civic education organization.

## Stack

- **React 18** + **TypeScript**
- **Vite** (dev server + build tool)
- **React Router v6** (client-side routing)
- **Lucide React** (icons)
- Pure **CSS** (no Tailwind dependency — easier to customize)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── components/       # Shared UI components
│   ├── Navbar.tsx/css
│   ├── Footer.tsx/css
│   └── DocumentCard.tsx/css
├── pages/            # One file per route
│   ├── Home.tsx/css
│   ├── Simulation.tsx/css
│   ├── Resources.tsx/css
│   └── Contact.tsx/css
├── data/             # ← EDIT THESE to manage site content
│   ├── documents.ts  # Bulletin board documents
│   ├── leadership.ts # Leadership positions & assignees
│   └── resources.ts  # Educational resources
└── styles/
    └── globals.css   # Design tokens + global styles
```

## Managing Content (No Code Required)

### Adding Documents to the Bulletin Board

1. Drop your PDF file into `public/documents/` (e.g. `agenda-session5.pdf`)
2. Open `src/data/documents.ts`
3. Add a new entry to the `documents` array:

```ts
{
  id: 'doc-006',
  title: 'Council Agenda — Session 5',
  description: 'Agenda for the upcoming session including new motions.',
  category: 'agenda',           // 'agenda' | 'minutes' | 'report' | 'motion' | 'notice'
  uploadedAt: '2026-07-01',     // ISO date: YYYY-MM-DD
  sessionLabel: 'Session 5 · Cycle 1',
  file: 'agenda-session5.pdf',  // filename in /public/documents/
  fileSize: '185 KB',
},
```

Set `file: null` if you want a "Pending upload" placeholder visible while you prepare the document.

### Assigning Leadership Roles

Open `src/data/leadership.ts` and update the `assignee` field:

```ts
{
  id: 'mayor',
  title: 'Mayor',
  // ...
  assignee: 'Jordan Rivera',   // ← set to the participant's name
}
```

Set `assignee: null` to show "Seat Vacant".

### Adding Educational Resources

Open `src/data/resources.ts` and append to the `resources` array.

---

## Deployment

### Netlify (recommended — free tier)

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
# Or connect your GitHub repo and set build command: npm run build, publish dir: dist
```

Add a `public/_redirects` file for client-side routing:
```
/*  /index.html  200
```

### Vercel

```bash
npm i -g vercel
vercel
```

### GitHub Pages

Add `base: '/your-repo-name/'` to `vite.config.ts`, then:
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## Connecting a Contact Form Backend

The contact form is currently front-end only. To receive emails:

**Option A — Netlify Forms** (free, no code):
Add `netlify` attribute to the `<form>` element in `Contact.tsx`.

**Option B — Formspree** (free tier):
```ts
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

**Option C — Your own backend**:
POST to any endpoint you control.
