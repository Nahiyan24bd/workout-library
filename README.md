# 🏋️ FitLog — Workout Library & Daily Training Planner

![FitLog Banner](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)

A sleek, high-performance workout tracking and planning web application built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. FitLog brings a Figma-pixel-perfect dark mode aesthetic with signature neon accents (`#ccff00`), enabling athletes and fitness enthusiasts to organize their daily training splits, monitor burned calories in real time, and explore structured exercise guides.

---

## 🌐 Live Demo & Repository

- **Live Deployment:** [https://workout-library-one.vercel.app](https://workout-library-one.vercel.app)
- **Source Code:** [https://github.com/your-username/workout-library](https://github.com/your-username/workout-library)

---

## ⚡ Tech Stack & Architecture

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict Mode Type Safety) |
| **Styling** | Tailwind CSS (Custom Neon Accents & Dark Palette) |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **State Management** | React Context API (`WorkoutContext`) + `localStorage` Synchronization |
| **Data Source** | FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`) |
| **Deployment** | Vercel |

---

## ✨ 5 Key Features

### 1. 🗂️ Dynamic Workout Library Grid
Fetches workout routines from an external API and renders them in an ultra-clean **3×4 responsive grid**. Each card showcases exercise visual assets, muscle group badges, target equipment, and detailed stat chips (Duration, Calories, Rating) with direct routing to exercise detail pages.

### 2. 📋 Comprehensive Exercise Specification Hub
Dynamic individual route (`/workouts/[id]`) presenting an asymmetrical two-column layout:
- High-resolution visual frame with aspect ratio safety.
- Spec sheet displaying **Difficulty**, **Target Equipment**, **Sets**, **Reps**, **Calories**, and **User Ratings**.
- Step-by-step ordered instructions for proper biomechanics and form execution.

### 3. 🎯 Rule-Governed Training Scheduler (5-Lift Cap)
Empowers users to curate daily workout regimens with intelligent validation:
- Enforces an athlete-focused **5-lift daily ceiling** to prevent overtraining.
- Action buttons dynamically toggle into disabled states once the cap is reached.
- Non-intrusive toast notifications confirm additions, saves, or duplicate attempts.

### 4. 📊 Real-Time Metrics Calculation Dashboard
The `/my-plan` hub features an instant computational summary across three core indicators:
- **Total Exercises** count.
- **Aggregated Duration** (in minutes).
- **Cumulative Calories Burned** (in kcal).

Metrics dynamically recalculate whether you toggle between **Today's Plan** and **Saved** logs or mark workouts completed.

### 5. 🔍 Multi-Criteria Sorting & Live Search Filter
- **Sorting Pipeline:** Instantly re-orders active workout logs by **Duration**, **Calories**, or **Rating** using a custom Chevron-integrated dropdown.
- **Keyword Search:** Deep searches across workout names, equipment types, and muscle group tags simultaneously.
- **Workflow Actions:** Includes quick action triggers for *View Details*, *Mark as Done* (with celebration alerts), and *Remove* alongside a custom dashed empty state container.

---

## 📁 Project Directory Structure

```text
workout-library/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Context Providers & Toaster
│   │   ├── loading.tsx            # Global route suspense spinner
│   │   ├── not-found.tsx          # Custom themed 404 handler
│   │   ├── page.tsx               # Home landing with Hero & 3x4 Library
│   │   ├── my-plan/
│   │   │   └── page.tsx           # Metrics dashboard, tabs, sort & search
│   │   └── workouts/
│   │       └── [id]/
│   │           └── page.tsx       # Dynamic detail spec sheet & action triggers
│   ├── components/
│   │   ├── details/
│   │   │   └── DetailActions.tsx  # Client interactive action triggers
│   │   ├── home/
│   │   │   ├── Hero.tsx           # Hero billboard banner
│   │   │   ├── Library.tsx        # Library exercise grid container
│   │   │   └── WorkoutCard.tsx    # Individual workout tile card
│   │   └── shared/
│   │       ├── Footer.tsx         # Brand footer with legal tagline
│   │       └── Navbar.tsx         # Header with responsive drawer & live badges
│   ├── context/
│   │   └── WorkoutContext.tsx     # Global store with localStorage persistence
│   └── types/
│       └── workout.ts             # TypeScript entity definitions
├── public/
│   └── _redirects                 # Route rewrite protection for production
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Local Development Setup

Follow these steps to run FitLog on your local development machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/workout-library.git](https://github.com/your-username/workout-library.git)
   cd workout-library
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Launch application:**
   Open your browser and navigate to `http://localhost:3000`.

5. **Create production build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 License & Attribution

Designed and engineered as part of the **FitLog Workout Library Platform**.  
*© 2026 FitLog — Workout Library. Train hard, log honest.*