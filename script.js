
"use strict";

// ==========================================
// SJC eSports Club
// JavaScript functionality
// ==========================================


// 1. MOBILE NAVIGATION
// Opens and closes the navigation menu on smaller screens.

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

const navigationLinks = [
  ...document.querySelectorAll(".main-nav .nav-link")
];

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    // Update the menu's open/closed state.
    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    // Update the accessible button label.
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    // Show or hide the navigation menu.
    navigation.classList.toggle("is-open", !isOpen);
  });


  // Close the menu after a navigation link is selected.
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );
    });
  });


  // Close the menu when the Escape key is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigation.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );
    }
  });

}


// 2. ACTIVE NAVIGATION LINKS
// Highlights the navigation link for the section currently
// visible on the screen.

const sections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        // Ignore sections that are not currently visible.
        if (!entry.isIntersecting) {
          return;
        }

        const sectionId = entry.target.id;

        navigationLinks.forEach((link) => {

          const isActive =
            link.getAttribute("href") === `#${sectionId}`;

          // Highlight the matching navigation link.
          link.classList.toggle("active", isActive);

          // Improve accessibility for screen readers.
          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }

        });

      });

    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );


  // Monitor each section on the webpage.
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}


// 3. AUTOMATIC COPYRIGHT YEAR
// Updates the footer year automatically.

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
