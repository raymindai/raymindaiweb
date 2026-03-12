// ══════════════════════════════════════
// Raymind.AI — Main Scripts
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  initHeroGlow();
  initHeroAnimation();
  initManifesto();
  initCursor();
  initScrollReveal();
  initSmoothScroll();
  initWaitlistForm();
  initContactForm();
});

// ──────────────────────────────────────
// Hero glow follows mouse
// ──────────────────────────────────────
function initHeroGlow() {
  const glow = document.getElementById('heroGlow');
  const hero = document.querySelector('.hero');
  if (!glow || !hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - glow.offsetWidth / 2;
    const y = e.clientY - rect.top - glow.offsetHeight / 2;
    glow.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ──────────────────────────────────────
// Hero text animation
// ──────────────────────────────────────
function initHeroAnimation() {
  setTimeout(() => {
    document.querySelectorAll('.slide-inner').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
    const footer = document.querySelector('.hero-footer');
    if (footer) footer.classList.add('visible');
  }, 200);
}

// ──────────────────────────────────────
// Manifesto word-by-word reveal
// ──────────────────────────────────────
function initManifesto() {
  const text = "A year ago, shipping this many projects alone would have been *delusional.* Now it's just how I work. AI changed the math. Not by replacing humans — by removing the walls around what one person can do. I design, I code, I ship. The only bottleneck left is *how fast I can think.*";
  const container = document.getElementById('manifestoText');
  if (!container) return;

  const words = [];

  text.split(' ').forEach((word) => {
    const span = document.createElement('span');
    const isEmphasis = word.startsWith('*') && word.endsWith('*');
    span.textContent = (isEmphasis ? word.replace(/\*/g, '') : word) + ' ';
    span.className = 'word' + (isEmphasis ? ' emphasis' : '');
    container.appendChild(span);
    words.push(span);
  });

  function update() {
    const threshold = window.innerHeight * 0.75;
    words.forEach((span) => {
      if (span.getBoundingClientRect().top < threshold) {
        span.classList.add('lit');
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
}

// ──────────────────────────────────────
// Custom cursor
// ──────────────────────────────────────
function initCursor() {
  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');
  if (!ring || !dot) return;

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  (function animate() {
    ringX += (mouseX - ringX) * 0.09;
    ringY += (mouseY - ringY) * 0.09;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, .product-visual, .product-section, .idea-card, select').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

// ──────────────────────────────────────
// Scroll reveal (IntersectionObserver)
// ──────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ──────────────────────────────────────
// Smooth scroll for anchor links
// ──────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ──────────────────────────────────────
// Waitlist form
// ──────────────────────────────────────
function initWaitlistForm() {
  const form = document.getElementById('waitlistForm');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button');
  const message = document.getElementById('waitlistMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    button.disabled = true;
    button.textContent = 'Sending...';

    try {
      await subscribeEmail(email);
      showMessage(message, 'You\'re in. Welcome.', 'success');
      input.value = '';
    } catch (err) {
      showMessage(message, err.message, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Subscribe →';
    }
  });
}

// ──────────────────────────────────────
// Contact form
// ──────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const button = form.querySelector('.form-submit');
  const message = document.getElementById('contactMessage');

  button.addEventListener('click', async () => {
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const type = form.querySelector('select[name="type"]').value;
    const msg = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !type || !msg) {
      showMessage(message, 'Please fill in all fields.', 'error');
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending...';

    try {
      await submitInquiry({ name, email, type, message: msg });
      showMessage(message, 'Sent. We\'ll be in touch.', 'success');
      form.reset();
    } catch (err) {
      showMessage(message, err.message, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Send inquiry';
    }
  });
}

// ──────────────────────────────────────
// Utility: show form message
// ──────────────────────────────────────
function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'form-message visible ' + type;
  setTimeout(() => {
    el.classList.remove('visible');
  }, 5000);
}
