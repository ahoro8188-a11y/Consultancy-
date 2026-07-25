// ============ TESTIMONIAL CAROUSEL ============
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('carouselDots');
let current = [...slides].findIndex(s => s.classList.contains('is-active'));
if (current === -1) current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === current) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  slides[current].classList.remove('is-active');
  dotsContainer.children[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('is-active');
  dotsContainer.children[current].classList.add('active');
}

document.querySelector('.arrow-left').addEventListener('click', () => goTo(current - 1));
document.querySelector('.arrow-right').addEventListener('click', () => goTo(current + 1));

// ============ CONTACT FORM ============
const form = document.getElementById('ctaForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = "Thanks — we'll be in touch within one business day.";
  form.reset();
});
