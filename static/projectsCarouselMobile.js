document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.custom-carousel-track');
    const slides = Array.from(document.querySelectorAll('.custom-carousel-slide'));
    const pagination = document.querySelector('.custom-carousel-pagination');

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // 1. Crear indicadores (puntos)
    pagination.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot-p');
        if (index === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot-p');

    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
        });
    }

    // 2. Gestión de Touch mejorada para iOS
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        // Si el movimiento es más horizontal que vertical, podemos prevenir el scroll
        // Pero con 'touch-action: pan-y' en CSS, esto suele ser suficiente.
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < slides.length - 1) {
                // Siguiente
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Anterior
                goToSlide(currentIndex - 1);
            }
        }
        isDragging = false;
    });
});