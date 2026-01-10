document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.custom-carousel-track');
    const slides = Array.from(document.querySelectorAll('.custom-carousel-slide'));
    const pagination = document.querySelector('.custom-carousel-pagination');

    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;

    // 1. Crear indicadores (puntos) dinámicamente
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot-p');
        if (index === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot-p');

    // 2. Función para mover el carrusel
    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Actualizar puntos
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
        });
    }

    // 3. Eventos de Swipe (Touch)
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        handleGesture(startX, endX);
    });

    function handleGesture(x1, x2) {
        const threshold = 50; // Mínimo de píxeles para deslizar
        const diff = x1 - x2;

        if (diff > threshold) {
            // Swipe hacia la izquierda -> Siguiente
            if (currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1);
            }
        } else if (diff < -threshold) {
            // Swipe hacia la derecha -> Anterior
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
    }
});