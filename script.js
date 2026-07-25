// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll(
  '.services, .process, .about, .team, .testimonial, .cta'
);
revealEls.forEach(el => el.classList.add('reveal'));

// Stagger containers: mark each direct child with an --i index for delayed reveal
const staggerContainers = document.querySelectorAll(
  '.service-grid, .process-steps, .team-grid'
);
staggerContainers.forEach(container => {
  container.classList.add('stagger');
  [...container.children].forEach((child, i) => {
    child.style.setProperty('--i', i);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));
staggerContainers.forEach(el => revealObserver.observe(el));

// ============ HERO / BANNER PARALLAX ON MOUSE MOVE ============
const heroLines = document.querySelector('.hero-lines');
if (heroLines && window.matchMedia('(hover: hover)').matches) {
  const heroSection = heroLines.closest('.hero, .page-banner');
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroLines.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroLines.style.transform = 'translate(0, 0)';
  });
  heroLines.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)';
}

// ============ SLIDING NAV UNDERLINE ============
const navInner = document.querySelector('.nav-inner');
if (navInner) {
  const underline = document.createElement('span');
  underline.className = 'nav-underline';
  navInner.appendChild(underline);

  const navLinks = navInner.querySelectorAll('a');

  function moveUnderline(el) {
    underline.style.width = `${el.offsetWidth}px`;
    underline.style.left = `${el.offsetLeft}px`;
  }

  const currentLink = navInner.querySelector('a.is-current');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderline(link));
  });
  navInner.addEventListener('mouseleave', () => {
    if (currentLink) moveUnderline(currentLink);
    else underline.style.opacity = '0';
  });
  if (currentLink) {
    moveUnderline(currentLink);
    underline.style.opacity = '1';
  }
}

// ============ TESTIMONIAL CAROUSEL ============
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('carouselDots');

if (slides.length) {
  let current = [...slides].findIndex(s => s.classList.contains('is-active'));
  if (current === -1) current = 0;
  let autoTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === current) dot.classList.add('active');
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dotsContainer.children[current].classList.add('active');
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  document.querySelector('.arrow-left').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.querySelector('.arrow-right').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  const testimonialSection = document.querySelector('.testimonial');
  testimonialSection.addEventListener('mouseenter', () => clearInterval(autoTimer));
  testimonialSection.addEventListener('mouseleave', resetAuto);

  resetAuto();
}

// ============ CONTACT FORM ============
const form = document.getElementById('ctaForm');
if (form) {
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.style.opacity = '0';
    setTimeout(() => {
      note.textContent = "Thanks — we'll be in touch within one business day.";
      note.style.transition = 'opacity .4s ease';
      note.style.opacity = '1';
    }, 150);
    form.reset();
  });
}
