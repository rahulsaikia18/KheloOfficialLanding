/**
 * KHELO OFFICIAL - Navigation & Header Interactivity
 * -------------------------------------------------------------
 * Handles sticky navbar styling, mobile menu toggling, smooth scrolling,
 * active link state highlights, and back-to-top functionality.
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav-drawer");
  const navBackdrop = document.querySelector(".nav-backdrop");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const backToTopBtn = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");

  // 1. Sticky Header Background Transition on Scroll
  function handleScrollHeader() {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleScrollHeader, { passive: true });
  handleScrollHeader(); // initial check

  // 2. Mobile Menu Toggling
  function openMobileMenu() {
    mobileToggle?.classList.add("active");
    mobileToggle?.setAttribute("aria-expanded", "true");
    mobileNav?.classList.add("open");
    navBackdrop?.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove("active");
    mobileToggle?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("open");
    navBackdrop?.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMobileMenu);
  }

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  // 3. Smooth Scrolling with Offset Calculation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileMenu();

        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Set URL hash cleanly without abrupt jump
        history.pushState(null, null, targetId);
      }
    });
  });

  // 4. Back To Top
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 5. Active Navigation Link Highlighting on Scroll
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
});
