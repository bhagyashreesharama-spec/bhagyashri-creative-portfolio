
// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});


// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// CURSOR GLOW
const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
  });
} else {
  cursorGlow.style.display = "none";
}


// SUBTLE 3D CARD TILT
const tiltCards = document.querySelectorAll(
  ".skill-card, .website-card, .brand-card"
);

tiltCards.forEach(card => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 760) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((y / rect.height) - 0.5) * -7;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// HERO PARALLAX
const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 900) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;

    heroVisual.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;
  });
}


// STICKER FLOATING MOVEMENT
document.querySelectorAll(
  ".character-card img, .project-character img, .journey-character img, .contact-character img"
).forEach((sticker, index) => {
  sticker.style.animationDelay = `${index * 0.4}s`;
});


// ACTIVE NAVIGATION HIGHLIGHT
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navigationLinks.forEach(link => {
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


// CURRENT YEAR
const footerYear = document.querySelector(".footer span:last-child");

if (footerYear) {
  footerYear.textContent =
    `© ${new Date().getFullYear()} Bhagyashri Sharma`;
}
