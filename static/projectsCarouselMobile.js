document.addEventListener('DOMContentLoaded', function () {
  const slideContainer = document.querySelector('.projects-carousel-mobile');
  const slides = document.querySelectorAll('.projects-carousel-mobile img');
  const dotsContainer = document.querySelector('.projects-carousel-dots-mobile');

  let slideIndex = 0;
  let startX = 0;
  let isDragging = false;

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

  // Mostrar el primer slide al cargar la página
  showSlide(slideIndex);

  function showSlide(index) {

    const isMobile = window.innerWidth <= 808;

    if (isMobile) {

      const targetSlide = slides[index];

      if (targetSlide) {
        const itemWidth = targetSlide.offsetWidth;
        const parentWidth = slideContainer.parentElement.clientWidth;
        const itemLeft = targetSlide.offsetLeft;

        let moveX = itemLeft - (parentWidth - itemWidth) / 2;
        slideContainer.style.transform = `translateX(-${moveX}px)`;

      }
    } else {
      // Desktop behavior
      slideContainer.style.transform = `translateX(-${index * (80 / slides.length)}%)`;
    }

    // Update Dots
    const dots = dotsContainer.querySelectorAll('.projects-carousel-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function goToSlide(index) {
    showSlide(index);
    slideIndex = index;
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

  // desplazamiento tactil
  slideContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slideContainer.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      if (diffX > 100) {
        nextSlide();
        isDragging = false;
      } else if (diffX < -100) {
        prevSlide();
        isDragging = false;
      }
    }
  });

  slideContainer.addEventListener('touchend', () => {
    isDragging = false;
  });

});