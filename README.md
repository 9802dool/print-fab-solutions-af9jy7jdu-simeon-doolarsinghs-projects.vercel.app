# Print Fab Solutions

Marketing site for **Print Fab Solutions**—sublimation sportswear (jerseys, shorts, pants) and **DTF** printing.

Stack: [Next.js](https://nextjs.org/) 14 (App Router), TypeScript, Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Independent Git remote

This project has its **own** `.git` in this folder (it is not nested inside another repo’s history).

To connect your own remote and push:

```bash
cd print-fab-solutions
git remote add origin https://github.com/YOUR_USER/print-fab-solutions.git
git branch -M main
git push -u origin main
```

Replace the URL with your Git host (GitHub, GitLab, Azure DevOps, etc.).

## Customize

- **Email / contact:** `components/ContactForm.tsx`, `components/SiteFooter.tsx`
- **Copy:** `app/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`

## Build

```bash
npm run build
npm start
```
