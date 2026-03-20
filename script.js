// ─── Nav Scroll Effect ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

// ─── Hamburger Menu ───────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav__links--open');
  hamburger.classList.toggle('nav__hamburger--open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    hamburger.classList.remove('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── Smooth scroll for all anchor links ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Scroll-reveal animations ─────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.plan-card, .portfolio__card, .section-header, .contacto__info, .contacto__form, .trust-bar__item, .hero__stat'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ─── Form Submit — Envío de email ────────────────────────────────────────────
// OPCIÓN ACTIVA: mailto (abre el cliente de correo del visitante — funciona sin servidor)
// OPCIÓN WEB: Formspree (ver comentario abajo — requiere cuenta gratuita en formspree.io)

const DESTINO_EMAIL = 'patagonia.host.nqn@gmail.com';

const form = document.getElementById('contacto-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const planEl = document.getElementById('plan');
  const plan = planEl.options[planEl.selectedIndex].text;
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica
  if (!nombre || !email) {
    document.getElementById('nombre').focus();
    return;
  }

  // Construir el mailto
  const asunto = `Consulta Web — ${plan !== 'Seleccionar plan...' ? plan : 'Sin plan seleccionado'}`;
  const cuerpo = [
    `Nombre: ${nombre}`,
    `Email de contacto: ${email}`,
    `Plan de interés: ${plan}`,
    ``,
    `Mensaje:`,
    mensaje || '(Sin mensaje adicional)',
    ``,
    `---`,
    `Enviado desde patagoniahost.com`,
  ].join('\n');

  const mailtoUrl = `mailto:${DESTINO_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  window.location.href = mailtoUrl;

  // Feedback visual
  const btn = document.getElementById('submit-form');
  btn.textContent = '¡Abriendo tu correo!';
  btn.classList.add('btn--success');
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Enviar Consulta';
    btn.classList.remove('btn--success');
    btn.disabled = false;
    form.reset();
  }, 3000);
});

/* ── OPCIÓN FORMSPREE (para cuando esté online) ──────────────────────────────
   1. Registrate gratis en https://formspree.io
   2. Creá un nuevo form apuntando a patagonia.host.nqn@gmail.com
   3. Copiá tu Form ID (ej: "xrgvdabk") y pegalo abajo
   4. Cambiá el action del <form> en index.html a: action="https://formspree.io/f/TU_ID"
   5. Borrá el bloque mailto: de arriba y descomentá este:

const form = document.getElementById('contacto-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-form');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  const data = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      btn.textContent = '¡Mensaje enviado!';
      btn.classList.add('btn--success');
      form.reset();
    } else {
      btn.textContent = 'Error — intentá de nuevo';
    }
  } catch {
    btn.textContent = 'Sin conexión';
  }

  setTimeout(() => {
    btn.textContent = 'Enviar Consulta';
    btn.classList.remove('btn--success');
    btn.disabled = false;
  }, 3500);
});
───────────────────────────────────────────────────────────────────────────── */


// ─── WhatsApp button show on scroll ──────────────────────────────────────────
const waBtn = document.getElementById('whatsapp-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    waBtn.classList.add('whatsapp-btn--visible');
  } else {
    waBtn.classList.remove('whatsapp-btn--visible');
  }
}, { passive: true });

// ─── Hidro Rima video: play on hover, reset on mouse leave ───────────────────
const hidrorimaCard = document.getElementById('portfolio-1');
const hidrorimaVideo = document.getElementById('hidrorima-video');

if (hidrorimaCard && hidrorimaVideo) {
  hidrorimaCard.addEventListener('mouseenter', () => {
    hidrorimaVideo.currentTime = 0;
    hidrorimaVideo.play().catch(() => {
      // Autoplay blocked in some browsers — silently ignore
    });
  });

  hidrorimaCard.addEventListener('mouseleave', () => {
    hidrorimaVideo.pause();
    hidrorimaVideo.currentTime = 0;
  });
}
const rimaoilCard = document.getElementById('portfolio-2');
const rimaoilVideo = document.getElementById('rimaoil-video');

if (rimaoilCard && rimaoilVideo) {
  rimaoilCard.addEventListener('mouseenter', () => {
    rimaoilVideo.currentTime = 0;
    rimaoilVideo.play().catch(() => {
      // Autoplay blocked in some browsers — silently ignore
    });
  });

  rimaoilCard.addEventListener('mouseleave', () => {
    rimaoilVideo.pause();
    rimaoilVideo.currentTime = 0;
  });
}

// ─── Grabación portfolio-3: play on hover, reset on mouse leave ──────────
const grabacionCard = document.getElementById('portfolio-3');
const grabacionVideo = document.getElementById('grabacion-video');

if (grabacionCard && grabacionVideo) {
  grabacionCard.addEventListener('mouseenter', () => {
    grabacionVideo.currentTime = 0;
    grabacionVideo.play().catch(() => {
      // Autoplay blocked in some browsers — silently ignore
    });
  });

  grabacionCard.addEventListener('mouseleave', () => {
    grabacionVideo.pause();
    grabacionVideo.currentTime = 0;
  });
}
