document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.custom-carousel-track');
    // Al corregir el HTML, slides.length ahora será 4
    const slides = Array.from(document.querySelectorAll('.custom-carousel-slide'));
    const pagination = document.querySelector('.custom-carousel-pagination');

    let currentIndex = 0;
    let startX = 0;

    // 1. Crear indicadores (puntos) dinámicamente
    // Ahora creará 4 puntos automáticamente
    pagination.innerHTML = ''; // Limpiamos por si acaso
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
        // Usamos porcentaje basado en el índice
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Actualizar puntos
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
        });
    }

    // 3. Eventos de Swipe (Touch) optimizados
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        handleGesture(startX, endX);
    }, { passive: true });

    function handleGesture(x1, x2) {
        const threshold = 50;
        const diff = x1 - x2;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < slides.length - 1) {
                // Swipe Izquierda -> Siguiente
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe Derecha -> Anterior
                goToSlide(currentIndex - 1);
            }
        }
    }
});