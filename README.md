link:-https://neurodetect.lovable.app/

# NeuroDetect

AI-assisted Alzheimer's / cognitive-stage screening interface. Upload a brain MRI scan and get a predicted cognitive stage, confidence breakdown, Grad-CAM heatmap, brain-region analysis, symptom checker, risk assessment and a comparison timeline.

> Educational/demo project. Not a medical device and not for clinical diagnosis.

## Features

- MRI upload with drag & drop and instant preview
- Cognitive stage classification (Normal, Very Mild, MCI, Alzheimer's) with confidence bars
- Grad-CAM style explainability heatmap
- Brain region analysis and clinical insight summary
- Symptom checker and risk assessment forms
- Comparison timeline across scans
- Animated, responsive dark UI (Tailwind + Framer Motion)

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v3 + shadcn/ui (Radix primitives)
- Framer Motion, lucide-react
- Vitest + Playwright

## Getting Started

```bash
git clone https://github.com/kumar0745/NeuroDetect.git
cd NeuroDetect
npm install
npm run dev
```

App runs at http://localhost:8080

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the codebase |
| `npm run test` | Run unit tests |

## Project Structure

```
src/
  components/      UI sections (Upload, GradCAM, Dashboard, ...)
  components/ui/   shadcn/ui primitives
  pages/           Index, NotFound
  hooks/  lib/     Shared hooks and helpers
```

## Connecting a real model

`src/components/UploadSection.tsx` currently uses a simulated prediction. Swap it for your inference API:

```ts
const formData = new FormData();
formData.append("image", file!);
const res = await fetch(import.meta.env.VITE_API_URL + "/predict", {
  method: "POST",
  body: formData,
});
const data = await res.json();
```

Set `VITE_API_URL` in `.env` locally and in your Vercel project environment variables.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: NeuroDetect"
git remote add origin https://github.com/kumar0745/NeuroDetect.git
git branch -M main
git push -u origin main
```

## Deploy on Vercel

1. Go to vercel.com then Add New > Project and import `kumar0745/NeuroDetect`.
2. Framework preset: **Vite**
3. Build command: `npm run build` — Output directory: `dist`
4. Add env vars (e.g. `VITE_API_URL`) if you connect a model API.
5. Deploy.

SPA routing is handled by `vercel.json` (all routes rewrite to `index.html`).

## License

MIT
