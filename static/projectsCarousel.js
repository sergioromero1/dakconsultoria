document.addEventListener('DOMContentLoaded', function () {
  const slideContainerP = document.querySelector('.projects-container');
  const slidesP = document.querySelectorAll('.projects-container img');
  const dotsContainerDesktop = document.querySelector('.projects-carousel-dots');
  const dotsContainerMobile = document.querySelector('.projects-carousel-dots-mobile');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  let slideIndex = 0;
  let startX = 0;
  let isDragging = false;

  // Function to create dots in a specific container
  function createDots(container) {
    if (!container) return;
    container.innerHTML = ''; // Clear existing
    slidesP.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('projects-carousel-dot');
      container.appendChild(dot);

      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  // Create dots for both containers
  createDots(dotsContainerDesktop);
  createDots(dotsContainerMobile);

  // Función para mostrar el slide actual
  function showSlide(index) {
    // Sync breakpoint with clientsCarousel.js
    const isMobile = window.innerWidth <= 808;

    // Asegurarnos que el índice esté dentro del rango
    if (index < 0) index = 0;
    if (index >= slidesP.length) index = slidesP.length - 1;

    if (isMobile) {
      // Logic synced with clientsCarousel.js for mobile
      const targetSlide = slidesP[index];

      if (targetSlide) {
        const itemWidth = targetSlide.offsetWidth;
        const containerWidth = slideContainerP.parentElement.clientWidth;
        const itemLeft = targetSlide.offsetLeft;

        // Centrar: mover el contenedor para que el centro del item coincida con el centro del viewport
        let moveX = itemLeft - (containerWidth - itemWidth) / 2;

        slideContainerP.style.transform = `translateX(-${moveX}px)`;
      }
    } else {
      // Desktop behavior
      const slideWidth = slidesP[0].clientWidth;
      const offset = index * slideWidth;
      slideContainerP.style.transform = `translateX(-${offset}px)`;
    }

    // Aplicar transición suave (re-enabling if disabled by drag)
    slideContainerP.style.transition = 'transform 0.3s ease-in-out';

    // Actualizar dots - SEPARATE LOOP FIX
    const dotsDesktop = document.querySelectorAll('.projects-carousel-dots .projects-carousel-dot');
    const dotsMobile = document.querySelectorAll('.projects-carousel-dots-mobile .projects-carousel-dot');

    dotsDesktop.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    dotsMobile.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Función para ir a un slide específico
  function goToSlide(index) {
    showSlide(index);
    slideIndex = index;
  }

  // Funciones para navegar entre slides
  function nextSlide() {
    if (slideIndex === slidesP.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    showSlide(slideIndex);
  }

  function prevSlide() {
    if (slideIndex === 0) {
      slideIndex = slidesP.length - 1;
    } else {
      slideIndex--;
    }
    showSlide(slideIndex);
  }

  // Eventos táctiles (Synced with clientsCarousel.js style - no live drag, just snap)
  slideContainerP.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slideContainerP.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      if (diffX > 50) {
        nextSlide();
        isDragging = false;
      } else if (diffX < -50) {
        prevSlide();
        isDragging = false;
      }
    }
  });

  slideContainerP.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Botones de navegación
  if (nextButton && prevButton) {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  }

  // Mostrar el primer slide al cargar
  showSlide(0);

  // Manejar cambio de tamaño de ventana
  window.addEventListener('resize', function () {
    // Recalcular y mostrar el slide actual cuando cambia el tamaño de la ventana
    showSlide(slideIndex);
    updateButtonsVisibility();
  });

  // Función para actualizar la visibilidad de los botones según el tamaño de la ventana
  function updateButtonsVisibility() {
    const isMobile = window.innerWidth <= 768;

    if (nextButton && prevButton) {
      nextButton.style.display = isMobile ? 'none' : 'block';
      prevButton.style.display = isMobile ? 'none' : 'block';
    }
  }

  // Actualizar las imágenes según el tamaño de la pantalla
  function updateImages() {
    const project1 = document.querySelector('#project1');
    const project2 = document.querySelector('#project2');

    if (project1 && project2) {
      // Mantener las rutas de las imágenes igual (puedes cambiarlas si tienes versiones diferentes)
      project1.src = "static/img/project1.jpeg";
      project2.src = "static/img/project2.jpeg";

      // Asegurar que las imágenes se carguen completamente
      project1.onload = project2.onload = function () {
        // Recalcular posición después de cargar las imágenes
        showSlide(slideIndex);
      };
    }
  }

  // Inicializar
  updateButtonsVisibility();
  updateImages();
});