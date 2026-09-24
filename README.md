🏋️ FitLog — Workout Library & Daily Training PlannerA sleek, high-performance workout tracking and planning web application built using Next.js (App Router), TypeScript, and Tailwind CSS. FitLog brings a Figma-pixel-perfect dark mode aesthetic with signature neon accents (#ccff00), enabling athletes and fitness enthusiasts to organize their daily training splits, monitor burned calories in real time, and explore structured exercise guides.🌐 Live Demo & RepositoryLive Deployment: https://workout-library-one.vercel.appSource Code: https://github.com/your-username/workout-library⚡ Tech Stack & ArchitectureCategoryTechnologiesFrameworkNext.js (App Router, Server & Client Components)LanguageTypeScript (Strict Mode Type Safety)StylingTailwind CSS (Custom Neon Accents & Dark Palette)IconsLucide ReactNotificationsReact Hot ToastState ManagementReact Context API (WorkoutContext) + localStorage SynchronizationData SourceFitLog REST API (https://api.abcz.workers.dev/api/fitlog)DeploymentVercel✨ 5 Key Features1. 🗂️ Dynamic Workout Library GridFetches workout routines from an external API and renders them in an ultra-clean 3×4 responsive grid. Each card showcases exercise visual assets, muscle group badges, target equipment, and detailed stat chips (Duration, Calories, Rating) with direct routing to exercise detail pages.2. 📋 Comprehensive Exercise Specification HubDynamic individual route (/workouts/[id]) presenting an asymmetrical two-column layout:High-resolution visual frame with aspect ratio safety.Spec sheet displaying Difficulty, Target Equipment, Sets, Reps, Calories, and User Ratings.Step-by-step ordered instructions for proper biomechanics and form execution.3. 🎯 Rule-Governed Training Scheduler (5-Lift Cap)Empowers users to curate daily workout regimens with intelligent validation:Enforces an athlete-focused 5-lift daily ceiling to prevent overtraining.Action buttons dynamically toggle into disabled states once the cap is reached.Non-intrusive toast notifications confirm additions, saves, or duplicate attempts.4. 📊 Real-Time Metrics Calculation DashboardThe /my-plan hub features an instant computational summary across three core indicators:Total Exercises count.Aggregated Duration (in minutes).Cumulative Calories Burned (in kcal).Metrics dynamically recalculate whether you toggle between Today's Plan and Saved logs or mark workouts completed.5. 🔍 Multi-Criteria Sorting & Live Search FilterSorting Pipeline: Instantly re-orders active workout logs by Duration, Calories, or Rating using a custom Chevron-integrated dropdown.Keyword Search: Deep searches across workout names, equipment types, and muscle group tags simultaneously.Workflow Actions: Includes quick action triggers for View Details, Mark as Done (with celebration alerts), and Remove alongside a custom dashed empty state container[cite: 1, 2, 3]

📁 Project Directory StructurePlaintextworkout-library/
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