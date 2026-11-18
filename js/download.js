/**
 * KHELO OFFICIAL - Download & App Configuration
 * -------------------------------------------------------------
 * Centralized configuration for Android APK distribution.
 * All "Download APK" buttons across the website connect directly to this handler.
 */

// Configure the APK download link here.
// Leave as "" to activate the friendly "APK Coming Soon" state.
const APK_DOWNLOAD_URL = "";

// Configurable App Metadata Placeholders (single source of truth)
const APP_METADATA = {
  version: "v1.0.4 (Beta Release)",
  fileSize: "28.4 MB",
  compatibility: "Android 7.0 (Nougat) & Above",
  lastUpdated: "November 2026",
  securityStatus: "Verified Official Build • Malware-Free",
  packageName: "com.khelo.official"
};

/**
 * Initiates the APK download or displays the "Coming Soon" modal.
 * @param {Event} [e] - Optional click event
 */
function handleApkDownload(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const trimmedUrl = APK_DOWNLOAD_URL ? APK_DOWNLOAD_URL.trim() : "";

  if (trimmedUrl && trimmedUrl !== "#" && trimmedUrl !== "javascript:void(0)") {
    // Valid URL configured - trigger download
    const link = document.createElement("a");
    link.href = trimmedUrl;
    link.setAttribute("download", "KheloOfficial.apk");
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // URL not yet set - show professional "APK Coming Soon" modal
    showComingSoonModal();
  }
}

/**
 * Displays the "APK Coming Soon" modal dialog.
 */
function showComingSoonModal() {
  const modal = document.getElementById("coming-soon-modal");
  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    
    // Focus first focusable element for accessibility
    const closeBtn = modal.querySelector(".modal-close-btn");
    if (closeBtn) closeBtn.focus();
  }
}

/**
 * Closes the given modal dialog.
 * @param {string|HTMLElement} modalOrId 
 */
function closeModal(modalOrId) {
  const modal = typeof modalOrId === "string" 
    ? document.getElementById(modalOrId) 
    : modalOrId;

  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
}

/**
 * Injects app metadata into placeholder elements on the page.
 */
function populateAppMetadata() {
  const metaBindings = [
    { selector: "[data-meta='app-version']", value: APP_METADATA.version },
    { selector: "[data-meta='app-size']", value: APP_METADATA.fileSize },
    { selector: "[data-meta='app-compatibility']", value: APP_METADATA.compatibility },
    { selector: "[data-meta='app-updated']", value: APP_METADATA.lastUpdated },
    { selector: "[data-meta='app-security']", value: APP_METADATA.securityStatus }
  ];

  metaBindings.forEach(binding => {
    document.querySelectorAll(binding.selector).forEach(el => {
      el.textContent = binding.value;
    });
  });
}

// Initialize Download Event Listeners once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  populateAppMetadata();

  // Attach download handler to every download trigger
  const downloadTriggers = document.querySelectorAll(
    ".download-apk-btn, [data-action='download-apk'], .btn-download"
  );

  downloadTriggers.forEach(button => {
    button.addEventListener("click", handleApkDownload);
  });

  // Modal close buttons
  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      if (modal) closeModal(modal);
    });
  });

  // Click outside modal content to close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ESC key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal-overlay.active");
      if (openModal) closeModal(openModal);
    }
  });
});
