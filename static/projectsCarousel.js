document.addEventListener('DOMContentLoaded', function () {
    const slideContainerP = document.querySelector('.projects-container');
    const slidesP = document.querySelectorAll('.projects-container img');
    const dotsContainerP = document.querySelector('.projects-carousel-dots');
  
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
  
    // Mostrar el primer slide al cargar la página
    showSlide(slideIndex);
  
    function showSlide(index) {
      slideContainerP.style.transform = `translateX(-${index * (85 / slidesP.length)}%)`;
  
      // Remover la clase 'active' de todos los puntos
      document.querySelectorAll('.projects-carousel-dot').forEach(dot => dot.classList.remove('active'));
      // Añadir la clase 'active' al punto correspondiente al slide actual
      document.querySelectorAll('.projects-carousel-dot')[index].classList.add('active');
    }
  
    function goToSlide(index) {
      showSlide(index);
      slideIndex = index;
    }


    // desplazamiento tactil
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


    // Función para pasar al siguiente slide
    function nextSlide() {
      if (slideIndex === slidesP.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }
      showSlide(slideIndex);
    }
  
    // Función para pasar al slide anterior
    function prevSlide() {
      if (slideIndex === 0) {
        slideIndex = slidesP.length - 1;
      } else {
        slideIndex--;
      }
      showSlide(slideIndex);
    }
  
  });

  function handleResize() {
    if (window.innerWidth <= 808) {
      const project1 = document.querySelector('#project1');
      const project2 = document.querySelector('#project2');
      project1.src = "static/img/project1.jpeg";
      project2.src = "static/img/project2.jpeg";
    }
    
    if (window.innerWidth > 808){
      const project1 = document.querySelector('#project1');
      const project2 = document.querySelector('#project2');
      project1.src = "static/img/project1.jpeg";
      project2.src = "static/img/project2.jpeg";

      const slideContainer = document.querySelector('.projects-container');
      slideContainer.style.transform = 'none';
    }
  }

window.addEventListener('resize', handleResize);