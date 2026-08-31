# ¡HolaClase! — Spanish Practice & Active Time Tracker

An interactive Spanish language learning web application designed for Mrs. Limon's classes. Features interactive exercises, active study time tracking with anti-idle and tab-blur detection, Spanish special character quick-typing bars, native voice pronunciation audio, teacher gradebook export, and an AI quiz generator.

---

## 🚀 Deploying to GitHub & Free Hosting

### Step 1: Export to GitHub
1. In Google AI Studio, click the **GitHub** tab or **Settings (gear icon) > Export to GitHub** in the top header.
2. Select or create a repository (e.g. `holaclase-spanish-practice` or `spanish-practice-app`).
3. Export your code.

---

### Step 2: 1-Click Free Hosting (Recommended: Render or Vercel)

#### Option A: Deploy on Render (Full-Stack with Express Backend)
1. Sign up / Log in to [render.com](https://render.com) (Free tier).
2. Click **New +** > **Web Service**.
3. Select your GitHub repository.
4. Configure the settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. *(Optional for AI Quiz Generator)* Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your free Gemini API key from [aistudio.google.com](https://aistudio.google.com).
6. Click **Deploy Web Service**. You will receive a permanent live HTTPS URL (e.g., `https://your-app.onrender.com`).

#### Option B: Deploy on Vercel
1. Sign up / Log in to [vercel.com](https://vercel.com) (Free tier).
2. Click **Add New Project** and import your GitHub repository.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 💻 Local Development

1. Clone the repository and install dependencies:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_NAME>
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

---

## 📦 Build & Production Commands

- `npm run dev`: Boots server with live development reload.
- `npm run build`: Compiles the React client (`/dist`) and bundles the Express backend server (`/dist/server.cjs`).
- `npm start`: Runs the production server (`node dist/server.cjs`).
- `npm run lint`: Type-checks TypeScript code.
