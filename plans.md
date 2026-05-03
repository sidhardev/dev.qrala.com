# SYSTEM PROMPT / PROJECT VISION: 3D Immersive Portfolio
**Developer:** Dev Sidhar | Full-stack Developer
**Goal:** Build a high-performance, interactive 3D portfolio website that acts as a digital showroom for technical projects.

## 1. Core Architecture & Tech Stack (Portfolio Site)
This portfolio must be built using modern, lightweight tools to ensure 60FPS 3D rendering.
* **3D Engine:** Three.js (WebGL rendering).
* **Animation & Routing:** GSAP (GreenSock) + ScrollTrigger for seamless camera paths and UI transitions.
* **Frontend UI:** Vanilla HTML5, JavaScript, and Tailwind CSS for HUDs, modals, and overlays.
* **Assets:** GLTF/GLB formats optimized with Draco compression.
* **Styling:** Sleek, dark-themed cyberpunk/minimalist aesthetic with neon accents.

## 2. Next-Level 3D Environment & Animations
* **Environment:** A dynamic, infinite-feeling 3D gallery.
* **Lighting:** Real-time volumetric lighting, glowing materials (Emission), and mouse-tracked point lights (flashlight effect).
* **Post-Processing:** Use Three.js EffectComposer for Bloom (neon glow), Depth of Field (background blur), and slight Chromatic Aberration for a cinematic feel.
* **Camera Movement:** Implement CatmullRomCurve3 (Splines) combined with GSAP ScrollTrigger to move the camera smoothly along a curved track between pedestals, preventing rigid linear motion.
* **Pedestal Interaction:** When the user clicks or scrolls to a project, the camera should smoothly lerp to a dynamic close-up angle, and the 3D model should perform a complex idle animation (e.g., levitating, breaking apart into wireframes, or rotating with particle trails).

## 3. Featured Projects Showcase
The showroom consists of 3 primary project pedestals. Render the UI modals for these projects with the following specific details when "View Project" is triggered.

### A. VisionSecure (AI Physical Safety Auditor)
* **3D Representation:** A futuristic floating security camera or a glowing cybernetic eye scanning the area with a laser beam.
* **Project Overview:** Acts as an automated, online security guard. It utilizes AI to monitor video feeds and instantly detects specific user-defined objects, anomalies, or physical altercations (fights).
* **Key Features:** * Real-time object and threat detection.
    * Instantaneous notification system pushing detailed alerts and images directly to the user's Telegram via a custom Bot.
* **Tech Stack:** PHP, Vanilla JavaScript, Tailwind CSS, AI/Vision Model Integration, Telegram Bot API.

### B. Automobile Application Backend & Full-Stack Admin Panel
* **3D Representation:** A high-poly wireframe car engine that dynamically assembles and disassembles, or a futuristic interactive dashboard console.
* **Project Overview:** A highly robust backend infrastructure and a comprehensive frontend Admin panel built for a large-scale automotive platform.
* **Key Features:** * Complex data modeling for vehicles, user roles, and inventory.
    * Full-stack Admin panel for seamless CRUD operations, content moderation, and system management.
* **Tech Stack:** NestJS (Backend API Architecture), React.js with Material UI (MUI) (Frontend Admin Dashboard).

### C. Loyalty Management System (LMS)
* **3D Representation:** A glowing digital gold coin or a holographic gift card that emits a particle field of data points (representing users).
* **Project Overview:** A B2C loyalty and customer retention platform designed to track engagement and reward users dynamically.
* **Key Features:** * Advanced campaign management and promotional rules engine.
    * Dynamic user segmentation based on engagement and purchase history.
* **Tech Stack:** NestJS (Backend logic & transaction handling), React.js (Frontend user interfaces).

## 4. User Journey Flow
1.  **Boot Sequence:** Terminal-style loading screen ("Compiling Shaders...", "Loading Assets...") using a custom preloader.
2.  **The Drop-in:** Camera starts from a high angle and swoops down into the center of the showroom where "Dev Sidhar | Full-stack Developer" hovers in 3D typography.
3.  **Exploration:** User scrolls down. The camera travels along a spline path, stopping precisely at each project pedestal.
4.  **Deep Dive Modal:** Clicking "Explore Tech" morphs the HTML DOM over the 3D canvas, presenting a sleek, glassmorphic UI card containing the project summaries (as defined in Section 3) and live/GitHub links.
5.  **The Exit/Contact:** The final stop on the spline path is a glowing terminal providing contact information.

## 5. Contact & Socials (Footer/Final Pedestal)
* **LinkedIn:** [dev-sidhar-6251862b8](https://www.linkedin.com/in/dev-sidhar-6251862b8/)
* **GitHub:** [sidhardev](https://github.com/sidhardev)
* **Email:** devsuthar065@gmail.com
* **Location:** India