document.addEventListener('DOMContentLoaded', function () {
  const slideContainer = document.querySelector('.logos-container');
  const slides = document.querySelectorAll('.logos-container img');
  const dotsContainer = document.querySelector('.carousel-dots');

  let slideIndex = 0;
  let startX = 0;
  let isDragging = false;

  // Crear puntos para cada slide
  slides.forEach((_, index) => {

    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Mostrar el primer slide al cargar la página
  showSlide(slideIndex);

  function showSlide(index) {
    const isMobile = window.innerWidth <= 808;

    if (isMobile) {
      // En móvil, centramos el elemento seleccionado
      const targetSlide = slides[index];

      if (targetSlide) {
        const itemWidth = targetSlide.offsetWidth;
        const containerWidth = slideContainer.parentElement.clientWidth;
        const itemLeft = targetSlide.offsetLeft;

        // Centrar: mover el contenedor para que el centro del item coincida con el centro del viewport
        let moveX = itemLeft - (containerWidth - itemWidth) / 2;

        slideContainer.style.transform = `translateX(-${moveX}px)`;
      }

    } else {
      // Desktop behavior
      slideContainer.style.transform = `translateX(-${index * (80 / slides.length)}%)`;
    }

    // Remover la clase 'active' de todos los puntos
    document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));

    // Asegurar que el punto exista antes de acceder
    const dots = document.querySelectorAll('.carousel-dot');
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  function goToSlide(index) {
    showSlide(index);
    slideIndex = index;
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

      if (diffX > 50) {
        nextSlide();
        isDragging = false;
      } else if (diffX < -50) {
        prevSlide();
        isDragging = false;
      }
    }
  });

  slideContainer.addEventListener('touchend', () => {
    isDragging = false;
  });


  // Función para pasar al siguiente slide
  function nextSlide() {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    showSlide(slideIndex);
  }

  // Función para pasar al slide anterior
  function prevSlide() {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    showSlide(slideIndex);
  }

});

function handleResize() {
  if (window.innerWidth <= 808) {
    const ibero = document.querySelector('#ibero');
    const compensar = document.querySelector('#compensar');
    ibero.src = "static/img/iberoamericana_letras_negras.png";
    compensar.src = "static/img/compensar_letras_negras.png";
  }

  if (window.innerWidth > 808) {
    const ibero = document.querySelector('#ibero');
    const compensar = document.querySelector('#compensar');
    ibero.src = "static/img/iberoamericana_letras_blancas.png";
    compensar.src = "static/img/compensar_letras_blancas.png";

    const slideContainer = document.querySelector('.logos-container');
    slideContainer.style.transform = 'none';
  }
}

window.addEventListener('resize', handleResize);