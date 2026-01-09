document.addEventListener('DOMContentLoaded', function () {
  // Desktop Container
  const slideContainer = document.querySelector('.projects-container');
  const slides = document.querySelectorAll('.projects-container img');
  const dotsContainer = document.querySelector('.projects-carousel-dots');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Stop if desktop elements missing
  if (!slideContainer || !dotsContainer || slides.length === 0) return;

  let slideIndex = 0;

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('projects-carousel-dot');
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  createDots();

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    slideIndex = index;

    // Desktop Logic
    const slideWidth = slides[0].clientWidth;
    const offset = index * slideWidth;
    slideContainer.style.transform = `translateX(-${offset}px)`;
    slideContainer.style.transition = 'transform 0.3s ease-in-out';

    // Update Dots
    const dots = dotsContainer.querySelectorAll('.projects-carousel-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function nextSlide() {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    showSlide(slideIndex);
  }

  function prevSlide() {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    showSlide(slideIndex);
  }

  // Buttons
  if (nextButton && prevButton) {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  }

  // Init
  showSlide(0);

  // Resize
  window.addEventListener('resize', function () {
    if (getComputedStyle(slideContainer).display !== 'none') {
      showSlide(slideIndex);
    }
  });

  // Image Load Handler
  function updateImages() {
    let loadedCount = 0;
    slides.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === slides.length) showSlide(slideIndex);
        };
      }
    });
  }
  updateImages();
});