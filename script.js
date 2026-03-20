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

// ─── Form Submit — Envío de email con Formspree ──────────────────────────────────
const form = document.getElementById('contacto-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-form');
  const originalText = btn.textContent;
  
  // Mostrar animación de envío
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.cursor = 'not-allowed';

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const plan = document.getElementById('plan').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica
  if (!nombre || !email) {
    btn.textContent = 'Completá nombre y email';
    btn.classList.add('btn--error');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('btn--error');
      btn.disabled = false;
      btn.style.cursor = 'pointer';
    }, 3000);
    return;
  }

  // Preparar datos para Formspree
  const formData = new FormData();
  formData.append('name', nombre);
  formData.append('email', email);
  formData.append('plan', plan);
  formData.append('message', mensaje);
  formData.append('_subject', `Nueva consulta web - ${plan || 'Sin plan'}`);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    
    if (res.ok) {
      btn.textContent = '¡Mensaje enviado!';
      btn.classList.add('btn--success');
      form.reset();
      
      // Resetear después de 3 segundos
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('btn--success');
        btn.disabled = false;
        btn.style.cursor = 'pointer';
      }, 3000);
    } else {
      throw new Error('Error en el envío');
    }
  } catch (error) {
    btn.textContent = 'Error al enviar';
    btn.classList.add('btn--error');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('btn--error');
      btn.disabled = false;
      btn.style.cursor = 'pointer';
    }, 3000);
  }
});

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
