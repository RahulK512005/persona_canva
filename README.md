## 🌟 Persona Canvas – The Leadership Mirror

## 🚀 Live Demo Hub

| Module | Description | Link |
|--------|-------------|------|
| 🧭 Employee Dashboard | Reflect on leadership experiences, get AI insights | [Open](https://leadership-mirror-we03101.public.builtwithrocket.new) |
| 🧠 Leadership Coach AI | Scenario-based AI feedback and growth tips | [Open](https://leadership-coach-ai-vkv9942.public.builtwithrocket.new) |
| 🎮 Leadership Assessment Scenarios | Gamified leadership style discovery | [Open](https://v0-leadership-assessment-scenarios.vercel.app/) |

---

## 🧭 Overview

**Persona Canvas – The Leadership Mirror** is an AI-powered system designed to help leaders understand and improve their leadership style through **self-reflection, AI analysis, and team feedback**.  

It encourages **self-awareness, communication growth, and emotional intelligence**, transforming daily leadership experiences into actionable insights.

---

## 🎯 Objectives

The main objectives of this project are:

1. **Self-Reflection:** Provide leaders with tools to reflect on their daily decisions, communication, and leadership behavior.  
2. **Leadership Analysis:** Identify leadership styles, emotional states, and strengths/weaknesses using AI-driven insights.  
3. **Team Feedback Integration:** Collect and analyze team feedback to promote awareness, improvement, and accountability.  
4. **Learning & Growth:** Offer personalized learning resources including videos, books, and courses tailored to the user’s leadership profile.  
5. **Visual Progress Tracking:** Track leadership growth trends over time through interactive dashboards and visualizations.  
6. **Gamification & Engagement:** Encourage continuous engagement through gamified features like badges, streaks, and scenario-based exercises.  

---

## 🧩 System Architecture

The system consists of **four main modules**:

---

### 🧠 Task 1 – Leadership Reflection AI

#### Description
An **AI coach** helps users reflect on daily leadership experiences through text, voice, and structured assessments.

#### Features
- **Input Types:**
  - 📄 Written reflections  
  - 🎤 Audio reflections (auto-transcribed)  
  - ✅ Assessment questions (confidence, stress, clarity, satisfaction)  
- **AI Analysis:**
  - NLP-based tone and sentiment analysis  
  - Leadership style detection  
  - Emotional state classification  
- **Output Summary Format:**


## 📁 Project Structure 

react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

#### Leadership Styles
- Visionary  
- Collaborative  
- Empowering  
- Decisive / Adaptive  
- Self-Doubt  

#### YouTube Recommendations
| Style | Video | Duration | Link |
|-------|-------|---------|------|
| Visionary | Simon Sinek – "Start With Why" | 18 min | [Watch](https://www.youtube.com/watch?v=u4ZoJKF_VuA) |
| Collaborative / Empowering | "Empowering Leaders: Simon Sinek's Guide" | 60 min | [Watch](https://www.youtube.com/watch?v=g25bGA-qlRo) |
| Decisive / Adaptive | "How to Make Tough Decisions At Work" | 10 min | [Watch](https://www.youtube.com/watch?v=7Kx2v8r0LRM) |
| Self-Doubt | "How to Claim Your Leadership Power" (TEDx) | 11 min | [Watch](https://www.youtube.com/watch?v=V4yO-aeFvTg) |
| All Styles | "5 Practices of Resilient Leadership" | 16 min | [Watch](https://www.youtube.com/watch?v=dFDKljEhGQs) |

---

### 🧭 Task 2 – Team Feedback Dashboard

#### Objective
Enable leaders to **receive, analyze, and respond** to team feedback interactively.

#### Components
| Icon | Function | Action |
|------|----------|--------|
| 📝 | Feedback from Team | Opens Google Form for submitting/viewing feedback |
| 📊 | AI Analysis | Summarizes feedback using Gemini API, detects tone and emotion |
| 💬 | Justify / Apologize | Opens a reply board for leader responses |

#### Example Feedback
> “Your communication often lacks clarity, causing misunderstandings within the team.”

> “Decisions are frequently postponed, delaying progress.”

#### Example AI Analysis

---

### 📚 Task 3 – Books & Courses Section

#### Top Book Recommendations
1. [Start With Why – Simon Sinek](https://www.amazon.com/Start-Why-Leaders-Inspire-Everyone/dp/1591846447)  
2. [Leaders Eat Last – Simon Sinek](https://www.amazon.com/Leaders-Eat-Last-Together-Others/dp/1591848016)  
3. [Dare to Lead – Brené Brown](https://www.amazon.com/Dare-Lead-Brave-Conversations-Hearts/dp/0399592520)  
4. [The 7 Habits of Highly Effective People – Stephen Covey](https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1982137274)  
5. [Extreme Ownership – Jocko Willink](https://www.amazon.com/Extreme-Ownership-U-S-Navy-SEALs/dp/1250067057)  

#### Top Leadership Courses
| Course | Platform | Duration | Focus |
|--------|---------|---------|-------|
| [Inspiring Leadership through Emotional Intelligence](https://www.coursera.org/learn/emotional-intelligence-leadership) | Coursera | 4 weeks | Self-awareness & empathy |
| [Leading People and Teams](https://www.coursera.org/specializations/leading-teams) | Coursera | 3 months | Motivation & collaboration |
| [Foundations of Everyday Leadership](https://www.coursera.org/learn/everyday-leadership-foundation) | Coursera | 4 weeks | Influence without authority |
| [Strategic Leadership and Management](https://www.coursera.org/specializations/strategic-leadership) | Coursera | 6 months | Visionary thinking & strategy |
| [Adaptive Leadership in Development](https://www.edx.org/learn/leadership/harvard-university-adaptive-leadership-in-development) | edX | 8 weeks | Crisis management & resilience |

---

### 👤 Task 4 – Leader Profile & History

#### Features
- Personal details: Name, Role, Job Description  
- Leadership style summary and key traits  
- History of reflections, AI summaries, and video recommendations  
- Trend graphs tracking:
  - Confidence over time  
  - Stress variation  
  - Communication clarity  
  - Team involvement  
- Books read and courses completed  
- Editable profile for evolving roles  

#### Example Insight
> “Team involvement improved 20% over the last month.”  
> “Stress levels decreased steadily over the last 10 days.”

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TailwindCSS + Framer Motion |
| Backend | Node.js / Python (FastAPI or Flask) |
| Database | Firebase / MongoDB |
| AI Models | GPT-5 (reflection analysis), Gemini API (tone detection) |
| Visualization | Recharts / Chart.js |
| Deployment | Vercel / Replit / GitHub Pages |

---

## 🎨 UI & Experience

- **Dark mode** interface with glowing animations  
- **Gamified reflection flow** – streaks, badges, milestones  
- **AI Coach Avatar** for guidance  
- **Animated Leadership Persona Canvas** for style evolution  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/leadership-mirror.git
cd leadership-mirror


