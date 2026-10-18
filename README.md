# 🧠 MindForge

**Think Independently. Research Intelligently. Solve Creatively.**

🌐 **Explore the Live Demo:** https://mindforge-6548.ai.studio/dashboard

💻 **GitHub Repository:** https://github.com/abhay-kushwaha01/Mindforge

👤 **Connect with me on LinkedIn:** https://www.linkedin.com/in/abhay-kushwaha-21b2b7394/

---

## 📌 About the Project

**MindForge** is an AI-powered critical-thinking and problem-solving platform designed to help users develop independent reasoning, creativity, and analytical skills.

In a world where AI-generated answers are increasingly accessible, MindForge encourages people to think independently rather than simply accepting ready-made solutions.

The platform combines daily thinking challenges, AI-powered feedback, and web research through TinyFish to encourage users to explore information, evaluate ideas, and develop evidence-based solutions.

Our goal is simple: **use AI to strengthen human thinking, not replace it.**

## 🎯 Problem Statement

Many people increasingly rely on ready-made AI answers instead of developing their own problem-solving approaches. This can reduce opportunities to practise independent reasoning and creative thinking.

Other challenges include:

- Limited practice with unfamiliar, real-world problems.
- Difficulty evaluating the quality and feasibility of proposed solutions.
- Lack of structured feedback to improve reasoning.
- Limited visibility into learning progress over time.

MindForge aims to address these challenges through regular practice, actionable feedback, and research-supported problem-solving.

## 💡 Our Solution

MindForge provides a learning environment where users can attempt challenges, develop their own solutions, explore relevant web research, and improve their thinking through feedback.

Rather than focusing only on final answers, the platform makes the **thinking process** an important part of learning.

## ✨ Key Features

### 🧩 Daily Thinking Challenges
Open-ended questions and problem-solving tasks designed to encourage logical reasoning, creativity, and independent thinking.

### 🤖 AI-Powered Feedback
Feedback and suggestions intended to help users identify areas for improvement and refine their solutions.

### 🔍 TinyFish Web Research
Web research integration intended to help users discover relevant information and source links to support their reasoning.

### 📈 Progress Tracking
A way to follow completed challenges and monitor learning progress over time.

### 🏆 Leaderboards
A competitive element intended to encourage participation and consistent practice.

### 💭 Evidence-Based Problem-Solving
Encourages users to combine their own ideas with research and logical reasoning when developing solutions.

> **Note:** Feature availability depends on the current prototype implementation. Some capabilities may still be under development.

## ⚙️ How It Works

1. **Choose a Challenge** — Explore a thinking challenge or problem.
2. **Develop Your Solution** — Analyse the problem and create your own approach.
3. **Explore Research** — Use available TinyFish web research to find relevant information and sources.
4. **Review Feedback** — Use available feedback to identify opportunities to improve.
5. **Learn and Improve** — Practise regularly and track your progress where supported.

## 🔎 TinyFish API Integration

MindForge is designed to use TinyFish web research to help users explore information relevant to their challenges.

The intended research flow is:

1. A user submits a research query.
2. The backend handles the request and communicates with the TinyFish API.
3. Relevant research results, such as titles, URLs, and snippets, are returned.
4. Users explore the sources and use the information to support their own reasoning.

API credentials should remain on the server side and be stored securely in environment variables.

> The integration flow should be verified against the actual implementation before being described as fully operational.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe application development |
| Vite | Development server and build tooling |
| Tailwind CSS | Interface styling |
| Node.js | JavaScript runtime for backend functionality |
| Express | Backend API and request handling |
| TinyFish API | Web research integration |

*Verify this list against the actual repository before publishing.*

## 🏗️ Application Architecture

The intended high-level research flow is:

```text
         ┌─────────────────────┐
         │        User         │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   React Frontend    │
         │ Challenges & UI     │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   Express Backend   │
         │ Request Validation  │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │    TinyFish API     │
         │    Web Research     │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  Research Results   │
         │   & Source Links    │
         └─────────────────────┘
```

This diagram illustrates the intended research flow; the actual implementation may differ.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A TinyFish API key if you want to use the research functionality

### 1. Clone the Repository

```bash
git clone https://github.com/abhay-kushwaha01/Mindforge.git
cd Mindforge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Configure the environment variables required by the backend.

For TinyFish research functionality, the configuration may include:

```env
TINYFISH_API_KEY=your_tinyfish_api_key
```

Use the environment file and variable names expected by the actual application. Never upload real API keys to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal.

If the backend requires a separate startup command, check the scripts defined in `package.json`.

## 🔐 Security Best Practices

- Never commit API keys, passwords, or other secrets.
- Keep private environment files out of version control.
- Store sensitive API credentials on the backend.
- Validate incoming requests before processing them.
- Use rate limiting and appropriate error handling for API endpoints.

## 🌱 Future Scope

MindForge can be expanded with features such as:

- More diverse and adaptive thinking challenges.
- Personalised challenge difficulty.
- Detailed learning analytics and progress insights.
- Improved feedback and solution evaluation.
- Community-based sharing and evaluation of ideas.
- Broader adoption in schools, colleges, and learning communities.

These are potential future improvements, not claims that every feature is already implemented.

## 🎓 Target Audience

- **Students:** Develop critical-thinking and creative problem-solving skills.
- **Self-Learners:** Practise independent reasoning through regular challenges.
- **Educators:** Support analytical learning and problem-solving exercises.
- **Critical Thinkers:** Explore different perspectives and evaluate evidence.
- **Problem Solvers:** Apply research and logic to real-world problems.

## 👥 Team Web4Nerve

## 🔗 Project Links

- **Live Prototype:** [Open MindForge](https://mindforge-6548.ai.studio/dashboard)
- **GitHub Repository:** [abhay-kushwaha01/Mindforge](https://github.com/abhay-kushwaha01/Mindforge)

---

<p align="center">
  <b>MindForge — Think Independently. Research Intelligently. Solve Creatively.</b>
</p>

<p align="center">
  Made with 💙 by Team Web4Nerve
</p>
