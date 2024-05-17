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
      slideContainer.style.transform = `translateX(-${index * (80 / slides.length)}%)`;
  
      // Remover la clase 'active' de todos los puntos
      document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
      // Añadir la clase 'active' al punto correspondiente al slide actual
      document.querySelectorAll('.carousel-dot')[index].classList.add('active');
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
    
    if (window.innerWidth > 808){
      const ibero = document.querySelector('#ibero');
      const compensar = document.querySelector('#compensar');
      ibero.src = "static/img/iberoamericana_letras_blancas.png";
      compensar.src = "static/img/compensar_letras_blancas.png";

      const slideContainer = document.querySelector('.logos-container');
      slideContainer.style.transform = 'none';
    }
  }

window.addEventListener('resize', handleResize);