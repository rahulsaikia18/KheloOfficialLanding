/**
 * KHELO OFFICIAL - Interactive FAQ Accordion
 * -------------------------------------------------------------
 * Accessible, keyboard-friendly accordion interaction.
 * Respects ARIA specifications with smooth animated height transitions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Optional: Close other open accordion items for a cleaner reading experience
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector(".faq-question");
          const otherContent = otherItem.querySelector(".faq-answer");
          if (otherTrigger && otherContent) {
            otherItem.classList.remove("open");
            otherTrigger.setAttribute("aria-expanded", "false");
            otherContent.style.maxHeight = null;
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    // Keyboard support (Enter & Space)
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // Re-calculate open FAQ height on window resize
  window.addEventListener("resize", () => {
    const openItem = document.querySelector(".faq-item.open .faq-answer");
    if (openItem) {
      openItem.style.maxHeight = openItem.scrollHeight + "px";
    }
  });
});
