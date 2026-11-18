/**
 * KHELO OFFICIAL - Main JavaScript Controller
 * -------------------------------------------------------------
 * Scroll reveal observers, app showcase screen switcher,
 * legal modal viewer, and accessibility helpers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Accessibility: Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2. Scroll Reveal Animations with IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion or unsupported, immediately reveal all
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // 3. Interactive App Showcase Screen Switcher
  const showcaseTabs = document.querySelectorAll(".showcase-tab-btn");
  const showcaseScreens = document.querySelectorAll(".showcase-screen-item");

  if (showcaseTabs.length > 0 && showcaseScreens.length > 0) {
    showcaseTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetScreenId = tab.getAttribute("data-target-screen");

        // Update active tab button
        showcaseTabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        // Update active screen mockup
        showcaseScreens.forEach((screen) => {
          if (screen.id === targetScreenId) {
            screen.classList.add("active");
          } else {
            screen.classList.remove("active");
          }
        });
      });
    });
  }

  // 4. Legal / Informational Modal System
  const legalModal = document.getElementById("legal-info-modal");
  const legalModalTitle = document.getElementById("legal-modal-title");
  const legalModalBody = document.getElementById("legal-modal-body");

  // Comprehensive static content for informational legal dialogs
  const legalDocuments = {
    privacy: {
      title: "Privacy Policy",
      content: `
        <p><strong>Last Updated: November 2026</strong></p>
        <p>Khelo Official is committed to protecting your privacy. This promotional website does not collect personal identifiers, passwords, payment details, or tracking cookies.</p>
        <h4>1. Information Collection on this Website</h4>
        <p>This website serves strictly as an informational and APK distribution hub. We do not require registration, login, email submission, or payment details to browse this site or download the official Android application.</p>
        <h4>2. In-App Data Processing</h4>
        <p>Account registration, tournament matchmaking, in-game stats, and virtual coin balances are managed exclusively within the Khelo Official Android application. Refer to the in-app privacy settings for detailed account data controls.</p>
        <h4>3. Security</h4>
        <p>Our official APK releases are digitally signed and verified to ensure integrity and malware-free distribution. Always ensure you download only from the official domain.</p>
      `
    },
    terms: {
      title: "Terms & Conditions",
      content: `
        <p><strong>Last Updated: November 2026</strong></p>
        <p>By accessing this website and downloading the Khelo Official APK, you agree to these Terms and Conditions.</p>
        <h4>1. Platform Purpose</h4>
        <p>Khelo Official is an esports tournament organizing and community platform for Android devices. This website is purely promotional and provides official APK installation packages.</p>
        <h4>2. No Real-Money Gaming or Gambling</h4>
        <p>Khelo Official is not a gambling, betting, or real-money gaming service. Khelo Coins are strictly non-monetary virtual rewards with no cash value.</p>
        <h4>3. User Eligibility</h4>
        <p>Users must comply with applicable local laws regarding mobile video gaming and tournament participation. Tournament rules are governed by individual tournament hosts inside the mobile application.</p>
      `
    },
    coins: {
      title: "Virtual Coin Policy",
      content: `
        <p><strong>Virtual Currency Clarification & Entertainment Disclaimer</strong></p>
        <div class="disclaimer-callout">
          <strong>Official Notice:</strong> Khelo Coins are non-monetary digital virtual tokens intended exclusively for entertainment within the Khelo Official platform. They possess no monetary value and cannot be withdrawn, exchanged for cash, or transferred for real-world currency.
        </div>
        <h4>1. Nature of Khelo Coins</h4>
        <p>Khelo Coins are in-app points earned through participation in eligible tournaments, daily activity streaks, and community milestones. They serve as entertainment markers and rank badges.</p>
        <h4>2. No Cash Redemption or Withdrawal</h4>
        <p>Under no circumstances can Khelo Coins be redeemed, exchanged, refunded, or cashed out. The website and app do not provide any withdrawal, payment gateway, or financial transaction mechanism.</p>
        <h4>3. Fair Competition</h4>
        <p>Any attempt to manipulate coin counters or exploit tournament scoring through unofficial means will result in account suspension inside the Android application.</p>
      `
    },
    community: {
      title: "Community Guidelines",
      content: `
        <p><strong>Fair Play & Sportsmanship Standard</strong></p>
        <p>Khelo Official is built on mutual respect, healthy competition, and clean esports sportsmanship.</p>
        <h4>1. Zero Tolerance for Cheating</h4>
        <p>Use of third-party aimbots, wallhacks, scripts, modded APKs, or unfair exploits in any tournament is strictly prohibited and permanently banned.</p>
        <h4>2. Respectful Communication</h4>
        <p>Harassment, abusive language, hate speech, or unsportsmanlike behavior toward hosts, opponents, or community members will not be tolerated.</p>
        <h4>3. Host Responsibilities</h4>
        <p>Tournament hosts must establish transparent room codes, adhere to stated schedules, and uphold fair match reporting within the mobile application.</p>
      `
    }
  };

  document.querySelectorAll("[data-legal-doc]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const docKey = link.getAttribute("data-legal-doc");
      const doc = legalDocuments[docKey];

      if (doc && legalModal && legalModalTitle && legalModalBody) {
        legalModalTitle.textContent = doc.title;
        legalModalBody.innerHTML = doc.content;
        legalModal.classList.add("active");
        legalModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }
    });
  });

  // 5. Hero Micro-interaction: Mouse parallax on floating badges (desktop only)
  if (!prefersReducedMotion && window.innerWidth > 992) {
    const heroVisual = document.querySelector(".hero-visual-wrapper");
    const floatingBadges = document.querySelectorAll(".floating-badge");

    if (heroVisual && floatingBadges.length > 0) {
      heroVisual.addEventListener("mousemove", (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        floatingBadges.forEach((badge, index) => {
          const factor = (index + 1) * 12;
          badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      });

      heroVisual.addEventListener("mouseleave", () => {
        floatingBadges.forEach((badge) => {
          badge.style.transform = "";
        });
      });
    }
  }
});
