document.addEventListener('DOMContentLoaded', function () {
  const slideContainerP = document.querySelector('.projects-container');
  const slidesP = document.querySelectorAll('.projects-container img');
  const dotsContainerP = document.querySelector('.projects-carousel-dots');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  let slideIndex = 0;
  let startX = 0;
  let isDragging = false;

  // Crear puntos para cada slide
  slidesP.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('projects-carousel-dot');
    dotsContainerP.appendChild(dot);

    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Función para mostrar el slide actual
  function showSlide(index) {
    const isMobile = window.innerWidth <= 768;
    const slideWidth = slidesP[0].clientWidth;
    
    // Asegurarnos que el índice esté dentro del rango
    if (index < 0) index = 0;
    if (index >= slidesP.length) index = slidesP.length - 1;
    
    // Cálculo del desplazamiento
    let offset;
    
    if (isMobile) {
      // En móvil, ajustamos el desplazamiento considerando márgenes
      offset = index * slideWidth;
    } else {
      // En desktop, usamos un cálculo más preciso
      offset = index * slideWidth +20;
    }
    
    // Aplicar transformación con transición suave
    slideContainerP.style.transition = 'transform 0.3s ease-in-out';
    slideContainerP.style.transform = `translateX(-${offset}px)`;

    // Actualizar dots
    document.querySelectorAll('.projects-carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Actualizar slideIndex
    slideIndex = index;
  }

  // Función para ir a un slide específico
  function goToSlide(index) {
    showSlide(index);
  }

  // Funciones para navegar entre slides
  function nextSlide() {
    const newIndex = slideIndex === slidesP.length - 1 ? 0 : slideIndex + 1;
    showSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = slideIndex === 0 ? slidesP.length - 1 : slideIndex - 1;
    showSlide(newIndex);
  }

  // Eventos táctiles
  slideContainerP.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    // Detener transición mientras arrastra
    slideContainerP.style.transition = 'none';
  });

  slideContainerP.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    
    // Aplicar un pequeño desplazamiento durante el arrastre para feedback visual
    const currentOffset = -slideIndex * slidesP[0].clientWidth;
    slideContainerP.style.transform = `translateX(${currentOffset - diffX}px)`;
  });

  slideContainerP.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const currentX = e.changedTouches[0].clientX;
    const diffX = startX - currentX;
    
    // Restaurar transición
    slideContainerP.style.transition = 'transform 0.3s ease-in-out';
    
    // Cambiar slide basado en la dirección del swipe
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    } else {
      // Si el swipe no fue suficiente, volver al slide actual
      showSlide(slideIndex);
    }
    
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
  window.addEventListener('resize', function() {
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
      project1.onload = project2.onload = function() {
        // Recalcular posición después de cargar las imágenes
        showSlide(slideIndex);
      };
    }
  }

  // Inicializar
  updateButtonsVisibility();
  updateImages();
});