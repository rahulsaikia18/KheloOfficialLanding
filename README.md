# Khelo Official — Premium Gaming App Landing Website

A modern, visually impressive, and fully responsive promotional landing website for **Khelo Official**, an online gaming tournament and community Android application.

Built strictly with **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. No frameworks, no external runtime dependencies, and no build tools required. Runs directly in any web browser.

---

## 🎮 Website Purpose

This website serves exclusively as the **official promotional and APK distribution hub** for the Khelo Official Android application.

- **All gaming features** (user accounts, tournament discovery, tournament hosting, custom room codes, match play, and virtual coin rewards) exist **strictly inside the Android mobile app**.
- **No authentication, database, payment gateways, or real-money transactions** are present or required on this landing website.
- **Virtual Coins (Khelo Coins)** are digital non-monetary rewards intended exclusively for in-app entertainment and achievement tracking, with zero real-world cash value.

---

## 📁 Project Architecture

```text
khelo-official/
│
├── index.html                  # Semantic, SEO-optimized HTML5 structure
│
├── css/
│   ├── style.css               # Design system tokens, layout, typography, components
│   ├── animations.css          # Keyframes, scroll reveals, prefers-reduced-motion
│   └── responsive.css          # Mobile-first breakpoints (360px up to 1440px+)
│
├── js/
│   ├── download.js             # Configurable APK download URL and app metadata
│   ├── navigation.js           # Sticky header, mobile drawer menu, smooth scrolling
│   ├── faq.js                  # Accessible accordion with keyboard navigation
│   └── main.js                 # Scroll observers, tab switcher, legal modals
│
├── assets/
│   ├── logo/
│   │   ├── khelo-logo.svg       # Brand logo (light background)
│   │   ├── khelo-logo-white.svg # Brand logo (dark background)
│   │   ├── app-icon.svg         # Official squircle app icon
│   │   └── favicon.svg          # Browser tab icon
│   ├── mockups/
│   │   ├── screen-home.svg        # Home screen app preview
│   │   ├── screen-tournaments.svg # Tournament discovery app preview
│   │   ├── screen-create.svg      # Host & custom room app preview
│   │   └── screen-wallet.svg      # Virtual coin wallet app preview
│   ├── illustrations/
│   │   ├── hero-controller.svg  # Esports controller illustration
│   │   ├── virtual-coin.svg     # Non-monetary Khelo Coin token badge
│   │   ├── trophy.svg           # Championship trophy vector
│   │   └── shield-host.svg      # Tournament host bracket emblem
│   └── icons/
│       ├── android.svg
│       ├── download.svg
│       ├── controller.svg
│       ├── trophy.svg
│       ├── shield.svg
│       ├── coin.svg
│       └── users.svg
│
└── README.md
```

---

## 🎨 Branding & Design System

| Token | Hex Value | Role |
|---|---|---|
| **Primary Red** | `#C6283D` | Key CTA buttons, badges, highlights, active nav |
| **Deep Crimson** | `#991B32` | Gradient depths, card bevels, pressed states |
| **Soft Red** | `#FCE9ED` | Accent pills, hover rings, icon background containers |
| **Main Background** | `#FAF9F7` | Warm, sophisticated clean background |
| **Card Background** | `#FFFFFF` | Elevated cards, dialogs, surfaces |
| **Dark Charcoal** | `#19191D` | Contrast sections (Hosting, Download, Final CTA) |
| **Primary Text** | `#202024` | High-contrast readable body & headings |
| **Secondary Text** | `#77777F` | Subtitles, labels, descriptions |
| **Border** | `#ECEAEC` | Subtle card borders and dividers |

- **Typography**: Google Fonts [Sora](https://fonts.google.com/specimen/Sora) (Headings) and [Inter](https://fonts.google.com/specimen/Inter) (Body).

---

## ⚙️ How to Configure the APK Download URL

Open `js/download.js` and set the `APK_DOWNLOAD_URL` constant:

```javascript
// js/download.js

// 1. Set your actual hosted APK file URL here:
const APK_DOWNLOAD_URL = "https://your-domain.com/downloads/KheloOfficial-v1.0.4.apk";

// 2. Adjust app metadata placeholders if needed:
const APP_METADATA = {
  version: "v1.0.4 (Beta Release)",
  fileSize: "28.4 MB",
  compatibility: "Android 7.0 (Nougat) & Above",
  lastUpdated: "November 2026",
  securityStatus: "Verified Official Build • Malware-Free",
  packageName: "com.khelo.official"
};
```

- When `APK_DOWNLOAD_URL` is set, clicking **any** Download button triggers the immediate APK download.
- When `APK_DOWNLOAD_URL` is left empty `""`, an accessible **"APK Coming Soon"** modal dialog is automatically presented to the visitor.

---

## 🚀 Running the Project

No Node.js or installation steps are required:
1. Double-click `index.html` to open directly in any modern browser (Chrome, Firefox, Safari, Edge), OR
2. Serve locally using any static web server:
   ```bash
   # Python 3
   python -m http.server 8080

   # Or simply open index.html in your browser
   ```

---

## 📱 Mobile Responsiveness & Accessibility

- Tested across standard mobile viewports: **360px, 390px, 430px, 768px, 1024px, 1440px+**.
- Full support for `prefers-reduced-motion` to disable animations for users sensitive to motion.
- Semantic HTML5 landmark tags (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) with accessible ARIA attributes.
- Smooth native keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`).

---

## 📄 License & Copyright

© 2026 Khelo Official. All rights reserved.
