// Enable animation mode only when JavaScript is available
document.documentElement.classList.add("js-motion");

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// SCROLL REVEAL
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// HERO TEXT ANIMATION
const changingWord = document.getElementById("changingWord");
const words = [
  "DIGITAL EXPERIENCES",
  "CREATIVE WEBSITES",
  "AI-POWERED CONTENT",
  "VISUAL STORIES",
  "NEW POSSIBILITIES"
];

let wordNumber = 0;
let character = words[0].length;
let deleting = true;

function changeText() {
  if (!changingWord) return;

  const current = words[wordNumber];

  if (deleting) {
    character--;
    changingWord.textContent = current.substring(0, character);

    if (character <= 0) {
      deleting = false;
      wordNumber = (wordNumber + 1) % words.length;
      setTimeout(changeText, 300);
      return;
    }
  } else {
    const next = words[wordNumber];
    character++;
    changingWord.textContent = next.substring(0, character);

    if (character >= next.length) {
      deleting = true;
      setTimeout(changeText, 1500);
      return;
    }
  }

  setTimeout(changeText, deleting ? 45 : 75);
}

setTimeout(changeText, 1800);

// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(75, Math.floor(width / 17));

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    opacity: Math.random() * 0.5 + 0.15
  }));
}

function animateParticles() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, width, height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190,145,255,${p.opacity})`;
    ctx.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const distance = Math.hypot(p.x - other.x, p.y - other.y);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(170,115,235,${(1 - distance / 100) * 0.13})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}

if (canvas && ctx) {
  resizeCanvas();
  animateParticles();
  window.addEventListener("resize", resizeCanvas);
}

// PROJECT CARD TILT
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".project, .skill").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
