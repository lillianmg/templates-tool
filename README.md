# Email & Phone Templates

A job search communication tool built for the neurodivergent community and anyone who finds networking and follow-ups challenging.

## About

I built this after a layoff and career transition. Through participating in job search communities, I noticed that the biggest struggle wasn't applying to jobs but it was the connecting. Networking, following up, and reaching out consistently made up 90% of an effective job search strategy, yet it's exactly where most people get stuck.

This tool provides structured email and phone templates across every stage of the job search: networking, applying, interviewing, and salary negotiation. The minimized floating widget lets you keep a template open alongside your email or LinkedIn so you can use it as a guide while writing in your own words.

The goal is to outgrow it.

---
## Tech Stack

- React 18
- Vite 5
- JavaScript (JSX)
- Deployed via GitHub Pages
---
## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/email-phone-templates.git
cd email-phone-templates

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to GitHub Pages, Netlify, Vercel, etc.

---

## Features

- **Email templates**: salary negotiation, networking, applying to jobs, interviewing
- **Phone talking points**: same categories, structured for calls
- **About tab**: the story behind why this was built
- **Minimized floating widget**: drag it anywhere on screen; keep it next to your email or LinkedIn as a live reference
- **Copy button**: one click to copy the full message or talking points

---

## Deploying to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Add to `vite.config.js`:
```js
base: '/email-phone-templates/'
```

Then run:
```bash
npm run deploy
```

---

## License

MIT
