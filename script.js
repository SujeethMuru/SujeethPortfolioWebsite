const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeText = themeToggle.querySelector(".theme-toggle-text");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  themeText.textContent = isDark ? "Light" : "Dark";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || (preferredTheme.matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

AOS.init({
  duration: 700,
  once: true,
  offset: 60,
});

const navLinks = [...document.querySelectorAll(".navbar a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${visible.target.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}, { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.5] });

observedSections.forEach((section) => sectionObserver.observe(section));

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

function closeMenu() {
  navbar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const willOpen = !navbar.classList.contains("open");
  navbar.classList.toggle("open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("header")) closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});
