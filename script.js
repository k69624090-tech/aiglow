const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const loginButton = document.querySelector(".login-button");
const guideFloating = document.querySelector("#guideFloating");
const guideMessage = document.querySelector("#guideMessage");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("is-open", !isOpen);
  loginButton?.classList.toggle("is-open", !isOpen);
});

const watchedSections = [...document.querySelectorAll(".section-watch")];
if (guideFloating && guideMessage && watchedSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const message = visible.target.getAttribute("data-guide");
      if (message) {
        guideMessage.textContent = message;
        guideFloating.classList.add("is-active");
        window.setTimeout(() => guideFloating.classList.remove("is-active"), 420);
      }
    },
    { threshold: [0.35, 0.55, 0.75] }
  );
  watchedSections.forEach((section) => observer.observe(section));
}

let lastScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    const delta = Math.min(18, Math.max(-18, window.scrollY - lastScrollY));
    document.documentElement.style.setProperty("--scroll-tilt", `${delta * 0.06}deg`);
    lastScrollY = window.scrollY;
  },
  { passive: true }
);
