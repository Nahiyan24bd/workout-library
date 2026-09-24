# 🏋️ FitLog — Workout Library Web Application

FitLog is a modern, responsive workout library and planner web application built with Next.js (App Router), TypeScript, and Tailwind CSS. It allows fitness enthusiasts to explore comprehensive exercise guides, plan their daily workout splits, track burned calories and durations in real time, and save favorite lifts for future training sessions.

---

## 🚀 Live Demo & Repository
- **Live URL:** [আপনার Vercel লাইভ লিংকটি এখানে দিন]
- **Repository:** [আপনার GitHub রিপোজিটরি লিংকটি এখানে দিন]

---

## 🛠️ Technologies Used
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **State Management:** React Context API & Browser LocalStorage
- **Data Source:** External REST API (`https://api.abcz.workers.dev/api/fitlog`)
- **Deployment:** Vercel

---

## ✨ 5 Key Features

1. **Dynamic Workout Library (3x4 Grid):**
   Seamlessly fetches and displays exercises from an external API with responsive grid layouts, category badges, equipment details, and essential stats (duration, calories, rating).

2. **Detailed Exercise Specifications & Instructions:**
   Dedicated dynamic routes (`/workouts/[id]`) presenting two-column layouts with high-resolution visuals, structured spec tables (sets, reps, difficulty), and step-by-step numbered instructions.

3. **Interactive Plan & Save Management:**
   One-click actions to add workouts to "Today's Plan" (with a realistic 5-lift daily limit) or save them for later, supported by instant toast notifications and persistent `localStorage`.

4. **Real-time Metrics Dashboard:**
   The `/my-plan` page features live-updating stat counters for Total Exercises, Minutes, and Calories that adapt immediately based on user actions and active tabs.

5. **Sorting & Flexible Organization:**
   Instantly sort workout logs by Duration, Calories Burned, or Rating with intuitive controls, custom action triggers ("Mark as Done", "View Details", "Remove"), and interactive empty states.

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone [https://github.com/your-username/workout-library.git](https://github.com/your-username/workout-library.git)

# Install dependencies
npm install

# Run the development server
npm run dev