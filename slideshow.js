document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll('.hero-slideshow .slide');

  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 4000);
});
