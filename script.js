
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".topbar nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// Reveal elements as they enter the screen
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// Stagger cards for a cinematic entrance
document.querySelectorAll(".project-card, .skill-card").forEach((card, index) => {
  card.style.transitionDelay = `${(index % 2) * 100}ms`;
});

// Scroll progress indicator
const progressBar = document.querySelector(".progress span");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Cursor-following violet light
const cursorGlow = document.querySelector(".cursor-glow");
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

window.addEventListener("pointermove", event => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  cursorGlow.style.left = `${pointerX}px`;
  cursorGlow.style.top = `${pointerY}px`;
});

// Gentle 3D movement on project and skill cards
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover) {
  document.querySelectorAll(".project-card, .skill-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

// Hero image and stickers react gently to pointer movement
const heroVisual = document.querySelector(".hero-visual");
const photoFrame = document.querySelector(".photo-frame");

if (canHover && heroVisual && photoFrame) {
  heroVisual.addEventListener("pointermove", event => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    photoFrame.style.transform =
      `rotateY(${x * 22 - 8}deg) rotateX(${-y * 14}deg)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    photoFrame.style.transform = "";
  });
}

// Background depth movement while scrolling
const heroGrid = document.querySelector(".hero-grid");
const heroOrbs = document.querySelectorAll(".hero-orb");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrollY * 0.16}px)`;
  }

  heroOrbs.forEach((orb, index) => {
    orb.style.translate = `0 ${scrollY * (index % 2 ? -0.08 : 0.06)}px`;
  });
}, { passive: true });

// Small floating particles in the hero background
const hero = document.querySelector(".hero");

if (hero) {
  const particleCount = window.innerWidth < 650 ? 15 : 28;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${5 + Math.random() * 8}s`;
    hero.appendChild(particle);
  }
}

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

