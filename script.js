
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

// DARK AND LIGHT MODE

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");

  themeBtn.textContent = theme === "light" ? "☾" : "☀";

  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light")
    ? "dark"
    : "light";

  setTheme(newTheme);
});

// MOBILE NAVIGATION

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");

  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => {
  sectionObserver.observe(section);
});
