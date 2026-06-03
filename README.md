# 🚀 Pratham Mishra — Professional Portfolio

[![Vercel Deployment](https://img.shields.io/badge/deployed_on-Vercel-black?logo=vercel)](https://vercel.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
[![TanStack Router](https://img.shields.io/badge/TanStack%20Router-FF4154?logo=reactrouter&logoColor=white)](#)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-34A853?logo=google&logoColor=white)](#)

A high-performance, premium personal portfolio website and blog system built using **React**, **Vite**, **TanStack Start (with Server-Side Rendering)**, and **Tailwind CSS v4**. It features a serverless contact form backend integrated with **Google Sheets** and **Gmail** notifications via **Google Apps Script**.

---

## 🌟 Key Features

### 1. Server-Side Rendered (SSR) Architecture
* **Framework:** Powered by **TanStack Start** (file-based routing with `@tanstack/react-router`).
* **Nitro Engine:** Uses Nitro to generate a lightweight, standard-compliant Node.js SSR handler.
* **Vercel Serverless Ready:** Nitro builds Vercel Build Output API v3 (`.vercel/output/`) with auto-generated routes and serverless function wrappers—no manual `vercel.json`.

### 2. Complete Dynamic Blog System
* **File-Based Routing:** Uses TanStack Router's dynamic routes (`src/routes/blog/$slug.tsx`).
* **Interactive Post Pages:** Complete with progress indicators, share tools, next/prev navigation, and category filtering.
* **SEO Optimized:** Native route header injection via TanStack's `head()` hook per article.

### 3. Serverless CORS-Free Contact Form
* **No Third-Party Services:** Zero external dependency on paid form platforms.
* **CORS Prevention:** Submits data using a standard `FormData` payload to avoid browser preflight `OPTIONS` requests.
* **Robust Backend:** Custom **Google Apps Script Web App** to append responses to **Google Sheets** and dispatch immediate email notifications via **Gmail**.
* **Anti-Spam Controls:** Client and server-side honeypot traps and a 30-second user cooldown period.

### 4. Premium Responsive Design
* **Styling System:** Styled using **Tailwind CSS v4** with a dark, modern aesthetic.
* **Fluid Micro-interactions:** Smooth animations powered by **Framer Motion**.
* **Interactive Components:** Clean, accessible layouts built with Radix UI primitives.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite 7 |
| **Routing & SSR** | TanStack Start, TanStack Router v1 |
| **Styling** | Tailwind CSS v4, Vanilla CSS |
| **Animations** | Framer Motion 12, Lucide React |
| **Backend / Database** | Google Apps Script (Web App), Google Sheets, Gmail API |
| **Validation** | Zod (schema validation), React Hook Form |
| **Hosting** | Vercel (Serverless Functions Node.js 20.x) |

---

## 📂 Repository Structure

```text
pratham-portfolio/
├── .env.example                # Sample environment variables config
├── .gitignore                  # Git ignore patterns (fixed for cross-platform support)
├── components.json             # Component configuration metadata
├── package.json                # Project dependencies and build scripts
├── vite.config.ts              # Vite + Nitro (vercel preset) for SSR and Vercel Build Output API
├── google-apps-script/
│   ├── Code.gs                 # Google Apps Script contact form handler
│   └── DEPLOYMENT.md           # Step-by-step Apps Script deployment guide
├── public/                     # Static public assets (resume PDF, images, etc.)
└── src/
    ├── components/             # Reusable UI component blocks
    │   ├── portfolio/          # Portfolio sections (Hero, About, Projects, Contact, Blogs)
    │   └── ui/                 # Atomic UI components (Buttons, Accordions, Dialogs, etc.)
    ├── data/
    │   └── blogData.ts         # Blog data schema and written articles
    ├── routes/                 # File-based routes (TanStack Start convention)
    │   ├── blog/
    │   │   ├── index.tsx       # /blog listing page route
    │   │   └── $slug.tsx       # /blog/:slug individual blog post route
    │   ├── index.tsx           # Home page route
    │   └── __root.tsx          # Main application layout wrapper
    ├── server.ts               # SSR entry point and server wrapper
    ├── start.ts                # Client entry point
    └── styles.css              # Main global stylesheets & design tokens
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v18.x or later recommended)
* NPM or [Bun](https://bun.sh) package manager

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Pratham-Mishra225/pratham-portfolio.git
cd pratham-portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the project root:
```bash
cp .env.example .env
```
Fill in the configuration details:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. TanStack Router will auto-generate route definitions under `src/routeTree.gen.ts` as you modify files.

### 4. Build for Production
Verify typescript check and server-client bundling:
```bash
npm run build
```
This command generates:
* `dist/client` - Static browser assets
* `dist/server` - Server-side rendering entry point (`server.js`)

---

## 📨 Google Apps Script Form Integration

The portfolio uses a custom backend built on Google Sheets and Google Apps Script to securely log submissions and notify you.

> [!TIP]
> Refer to the detailed setup guide in [google-apps-script/DEPLOYMENT.md](file:///c:/Github_Projects/pratham-portfolio/google-apps-script/DEPLOYMENT.md) for full instructions, authorization steps, and troubleshooting.

### Quick Setup Steps:
1. Create a new Google Sheet named `Portfolio Enquiries`.
2. Extract the Spreadsheet ID from the URL (`docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`).
3. Open [Google Apps Script](https://script.google.com/home), create a new project, paste the content of [Code.gs](file:///c:/Github_Projects/pratham-portfolio/google-apps-script/Code.gs), and replace `SHEET_ID` and `NOTIFY_EMAIL` at the top.
4. Deploy the script as a **Web App** with configurations:
   * **Execute as:** `Me` (your Google Account)
   * **Who has access:** `Anyone`
5. Copy the generated Web App URL and save it to `.env` as `VITE_GOOGLE_SCRIPT_URL`.

---

## ☁️ Vercel Deployment

This project deploys to **Vercel** as an SSR app. `npm run build` runs Nitro with the `vercel` preset, which writes [Vercel Build Output API v3](https://vercel.com/docs/build-output-api/v3) artifacts to `.vercel/output/` (`config.json`, `static/`, `functions/`). Do not add a `vercel.json` with manual routes—it would conflict with Nitro’s generated config.

### Vercel Dashboard Settings
When importing this repository on the Vercel dashboard, apply the following project settings:

| Setting | Value |
|---|---|
| **Framework Preset** | `Other` (Do **not** select Vite since this uses TanStack Start SSR) |
| **Build Command** | `npm run build` |
| **Output Directory** | `.vercel/output` |
| **Install Command** | `npm install` |
| **Node.js Version** | `20.x` |

After a local build, you can sanity-check: `.vercel/output/config.json` (routes), `.vercel/output/functions/` (SSR handler), `.vercel/output/static/` (client assets).

### Environment Variables
Under project settings, add the environment variable:
* **Key:** `VITE_GOOGLE_SCRIPT_URL`
* **Value:** `https://script.google.com/macros/s/YOUR_DEPLOYED_APPS_SCRIPT_ID/exec`

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
