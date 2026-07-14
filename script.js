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
