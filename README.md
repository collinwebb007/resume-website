# 🚀 Collin Webb — Interactive Resume & Portfolio Website

A bold, modern, and high-performance resume website engineered to impress hiring managers, technical recruiters, and engineering leaders.

Built with **vanilla modern web technologies (HTML5, CSS3, ES6+ JavaScript)** for blazing-fast 100/100 Lighthouse performance, instant zero-config Vercel deployment, and modular architecture.

---

## ✨ Features

- 🌌 **Aurora Gradient Mesh & Glassmorphism**: Vibrant animated ambient background with frosted glass cards.
- ⚡ **Interactive Code Showcase**: Live developer object viewer in the hero section.
- 📊 **Animated Skills Matrix**: Category breakdown with animated proficiency bars and core strengths pillars.
- 💼 **Career Timeline**: Clean experience cards with quantifiable bullet points and tech tags.
- 🛠️ **Filterable Featured Projects**: Filter by Full Stack, Frontend, and Backend with live links and metric callouts.
- 📋 **One-Click Actions**: Direct email client trigger, instant clipboard copy with toast notifications, and CV download.
- 🌓 **Theme Switcher**: Dark & Light mode toggle with smooth CSS variable transitions.
- 📱 **Fully Responsive**: Optimized for phones, tablets, laptops, and ultra-wide displays.
- 🚀 **Zero-Config Hosting**: Ready for immediate deployment on **Vercel** or **GitHub Pages**.

---

## 📁 Project Structure

```text
Resume Website/
├── index.html          # Main HTML structure with semantic sections
├── css/
│   └── style.css       # Complete design system, animations, & responsive styles
├── js/
│   ├── data.js         # Single source of truth for all resume text & projects
│   └── main.js         # Dynamic DOM rendering, animations, & interactivity
├── assets/             # Place your resume.pdf, photos, or project screenshots here
├── vercel.json         # Vercel security headers and clean URL config
├── .gitignore          # Standard git ignore rules
└── README.md           # Documentation
```

---

## 🛠️ How to Customize

All resume content is neatly separated in **[`js/data.js`](file:///Users/collinwebb/Downloads/Resume%20Website/js/data.js)**. You don't have to fiddle with complex HTML tags to update your experience:

1. **Personal & Hero Details**: Edit `resumeData.personal` (Name, role, email, LinkedIn, GitHub, summary).
2. **Skills & Strengths**: Edit `resumeData.skills` (categories, skill percentages, core pillars).
3. **Experience**: Edit `resumeData.experience` (companies, roles, dates, bullet achievements).
4. **Projects**: Edit `resumeData.projects` (project titles, descriptions, metrics, tech tags, links).
5. **Education**: Edit `resumeData.education` and `resumeData.certifications`.

---

## 💻 Local Preview

Run a simple local web server with Python (pre-installed on your Mac):

```bash
python3 -m http.server 3000
```

Then open your browser to: **`http://localhost:3000`**

---

## 🌐 Deploying to GitHub & Vercel

### Step 1: Push to GitHub

1. Initialize Git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of interactive resume website"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (Free & Instant)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your resume repository and click **"Import"**.
4. Leave all build settings as default (Framework Preset: *Other*).
5. Click **"Deploy"**.
6. In ~10 seconds, your site will be live with a free custom SSL domain (e.g. `collin-webb-resume.vercel.app`)!
