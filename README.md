# VidyaSphere - Gamified STEM Learning Platform

## 🤖 Built with AI
**This entire project was completely generated and built using AI!** 
It leverages the power of **Firebase Studio** alongside the **Antigravity** AI to write the codebase, develop features, and architect the entire platform from scratch.

## 🌟 Overview
VidyaSphere is a modern, interactive, and gamified Web3-inspired STEM learning platform designed to make education immersive through 3D simulations and quizzes. Includes built-in offline capabilities (PWA) and multiple subjects tailored for various grade levels.

## 🚀 Key Features
- **2D Interactive Simulations**: Uses Three.js for immersive learning (e.g. Hardware Sorters, Math Puzzles, Science Arena).
- **Offline Mode (PWA)**: Access previously visited content and lessons without an internet connection.
- **Progress Tracking & Dashboards**: Dedicated portals for classes 6 through 12.
- **Multilingual Support**: Read content seamlessly in different native languages.

## 🔑 Test Credentials
To explore the platform and bypass registration, please use the following test account:
- **Email:** `siddhi123@gmail.com`
- **Password:** `Siddhi2004@`

## 🎮 How to Navigate & Use
1. **Access the Dashboard**:
   - Open the web application and click on **Login**. Enter the test credentials provided above.
2. **Setup Your Profile**:
   - Once logged in, your profile dashboard will auto-route to your designated grade level (e.g., Class 6).
3. **Explore Subjects**:
   - Look through the different subjects available to you, including Mathematics, Science, Engineering, and Technology.
   - You can access worksheets, e-books, and video lectures.
4. **Play Games & Simulations**:
   - Navigate to the **Simulations** or **Games** tab.
   - Here, interact with dynamic Three.js modules, tackle various interactive learning challenges, and earn points automatically!
5. **Install for Offline Usage**:
   - When using a supported browser (Chrome, Edge), click the **Install App** icon in your browser's address bar to install VidyaSphere as a progressive web app (PWA) and access cached learning paths while offline.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, built with Webpack configuration for PWA compatibility)
- **Styling:** Tailwind CSS + Shadcn UI components
- **Backend & Auth:** Firebase Auth and Firestore
- **3D Rendering:** Three.js
- **PWA Capabilities:** `@ducanh2912/next-pwa`

## 💻 Local Setup Instructions
If you wish to run the platform locally on your own machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vivek-2004V/gamified_learning_paltform.git
   ```
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Troubleshooting & Problem Solving

If you encounter any issues while using or setting up the platform, here are some common problems and their solutions:

### 1. Installation Errors
**Problem:** `npm install` fails with dependency conflict errors.
**Solution:** The project uses specific versions of dependencies. Always run the installation with the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### 2. Build or Development Server Issues
**Problem:** `npm run dev` fails, or you see a PostCSS error.
**Solution:** Sometimes clearing the Next.js cache can resolve build issues:
```bash
rm -rf .next
npm run dev
```

### 3. Login/Authentication Problems
**Problem:** Cannot log in with the test credentials, or it says "Invalid Credentials".
**Solution:** 
- Double-check the email (`siddhi123@gmail.com`) and password (`Siddhi2004@`). 
- Ensure there are no spaces at the beginning or end of the password.
- Check your internet connection. Authentication requires Firebase to connect to its servers.

### 4. 3D Simulations Not Loading
**Problem:** The screen stays blank or lags when opening a 3D simulation.
**Solution:**
- **Hardware Acceleration:** Ensure hardware acceleration is enabled in your browser settings (Chrome: `Settings > System > Use graphics acceleration when available`).
- **Device Performance:** Close background tabs or applications. Three.js requires decent GPU power to render smoothly.

### 5. Offline Mode (PWA) Not Working
**Problem:** The app does not load without the internet.
**Solution:** 
- You must install the PWA first while online. Look for the install icon in the URL bar.
- Once installed, open the app from your desktop/home screen. Note that only previously visited lessons and cached assets will be available offline.
- Try clearing your browser cache and Service Workers to reinstall the PWA.

### 6. UI or Styling Looks Broken
**Problem:** Buttons are misaligned or colors are incorrect.
**Solution:** Perform a hard refresh of the page:
- **Windows/Linux:** `Ctrl + F5` or `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

### 7. Server / Client Component Issue
**Problem:** ❌ You see an error like `You're importing a component that needs "use client"`.
**Solution:** This happens when a React hook or browser API is used inside a Next.js Server Component without marking it as a Client Component.
**✅ Fix:** Add the following directive to the very top of the problematic file:
```tsx
"use client";
```

**Still having issues?** 
If your problem is not listed above, check the browser console (`F12` or `Right Click -> Inspect -> Console`) for any red error messages. You can use these messages to diagnose the root cause or open an issue on the GitHub repository.
