# 🏋️ FitLog — Workout Library & Daily Training Planner

![FitLog Banner](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)

A sleek, high-performance workout tracking and planning web application built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. FitLog brings a Figma-pixel-perfect dark mode aesthetic with signature neon accents (`#ccff00`), enabling athletes and fitness enthusiasts to organize their daily training splits, monitor burned calories in real time, and explore structured exercise guides.

---

## 🌐 Live Demo & Repository

- **Live Deployment:** [https://workout-library-omega.vercel.app](https://workout-library-omega.vercel.app)
- **Source Code:** [https://github.com/Nahiyan24bd/workout-library.git](https://github.com/Nahiyan24bd/workout-library.git)

---

## ⚡ Tech Stack & Architecture

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict Mode Type Safety) |
| **Styling** | Tailwind CSS (Custom Neon Accents & Dark Palette) |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast (Deduplicated Alerts) |
| **State Management** | React Context API (`WorkoutContext`) + `localStorage` Synchronization |
| **Data Source** | External REST API (`https://api.abcz.workers.dev/api/fitlog`) |
| **Deployment** | Vercel |

---

## ✨ Key Features

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
- Action buttons dynamically toggle into disabled states once the cap is reached or if already added.
- Deduplicated toast notifications confirm additions, saves, or duplicate attempts.

### 4. 📊 Real-Time Metrics Calculation & Capacity Progress Bar
The `/my-plan` hub features an instant computational summary across three core indicators:
- **Total Exercises** count.
- **Aggregated Duration** (in minutes).
- **Cumulative Calories Burned** (in kcal).
- **Visual Progress Bar:** An integrated capacity tracker showing current plan load against the 5-lift daily limit (e.g., `2 / 5 Lifts`).

### 5. ⏱️ Live Workout Stopwatch & Rest Timer Modal
- **Interactive Timer:** Launch a full-screen digital countdown timer directly from any workout card.
- **Precision Controls:** Includes real-time `Start`, `Pause`, and `Reset` controls with an animated neon completion progress ring.
- **Completion Alerts:** Visual cues and celebration triggers when the interval concludes.

### 6. 🔍 Multi-Criteria Sorting & Live Search Filter
- **Sorting Pipeline:** Instantly re-orders active workout logs by **Duration**, **Calories**, or **Rating** using a custom Chevron-integrated dropdown.
- **Live Search Bar:** Real-time search across workout names, equipment types, and muscle group tags.
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
│   │   │   └── page.tsx           # Metrics dashboard, tabs, sort, search & progress
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
│   │       ├── Navbar.tsx         # Header with responsive drawer & live badges
│   │       └── WorkoutTimerModal.tsx # Live countdown & stopwatch timer modal
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
   git clone [https://github.com/Nahiyan24bd/workout-library.git](https://github.com/Nahiyan24bd/workout-library.git)
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