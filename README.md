# AI Mastery 2026: 10-Week Challenge Tracker

A premium, ultra-modern dashboard designed to track linear progress through a structured 10-week AI mastery curriculum. Built with a focus on high-end aesthetics, smooth interactions, and efficient data persistence.


![App Preview]docs/screenshots/checklist-webapp-week1.jpg)

![Dashboard Preview]docs/screenshots/checklist-webapp-week1-detail.jpg)




## ✨ Features

- **Progress Dashboard:** Real-time visualization of your "Overall Mastery Progress" and current stage.
- **Interactive Weekly Grid:** Dynamic cards displaying challenge summaries with sleek hover effects and transitions.
- **Detailed Challenge Modals:** Deep dive into each week's objectives, complete with a dedicated "Journal & Insights" area for reflection.
- **Persistence:** Automatically saves completion status and journal notes to a local data store.
- **Ultra-Modern UI:** Custom-crafted dark mode aesthetics using Glassmorphism, tailored typography (Inter & Outfit), and high-performance Vanilla CSS.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Library:** [React 19](https://reactjs.org)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Icons:** [Lucide React](https://lucide.dev)
- **Data Store:** Local JSON Persistence (`/data/weeks.json`)
- **Styling:** Vanilla CSS with Modern Web APIs (Flexbox, Grid, Backdrop-filter)

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app`: Application routes, API logic (`/api/weeks`), and global styles.
- `src/components`: UI components including `WeekCard` and `WeekModal`.
- `src/lib`: Core logic including the data `store.ts` and utility functions.
- `data/`: Local JSON storage for persistent application state.

## 🎨 Design Philosophy

The application prioritizes "Visual Excellence" and "Dynamic Design":
- **Rich Aesthetics:** Uses curated HSL-tailored colors and deep dark surfaces.
- **Micro-animations:** Smooth state transitions for hover effects and modal interactions.
- **Responsive Layout:** A fluid grid system that translates well across device sizes.

---
*Transcend the ordinary. Master the future of technology, one week at a time.*
