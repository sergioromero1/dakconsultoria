document.addEventListener('DOMContentLoaded', function () {
    const slideContainer = document.querySelector('.projects-carousel-mobile');
    const slides = document.querySelectorAll('.projects-carousel-mobile img');
    const dotsContainer = document.querySelector('.projects-carousel-dots-mobile');

    // If elements don't exist, stop
    if (!slideContainer || !dotsContainer || slides.length === 0) return;

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

    function showSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;

        slideIndex = index;

        // Mobile Logic (Clients style)
        const targetSlide = slides[index];
        if (targetSlide) {
            const itemWidth = targetSlide.offsetWidth;
            const parentWidth = slideContainer.parentElement.clientWidth;
            const itemLeft = targetSlide.offsetLeft;

            const moveX = itemLeft - (parentWidth - itemWidth) / 2;
            slideContainer.style.transform = `translateX(-${moveX}px)`;
        }

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

    // Touch Events - Live Drag
    slideContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slideContainer.style.transition = 'none';
    });

    slideContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        // Calculate current base offset for live drag
        const targetSlide = slides[slideIndex];
        if (targetSlide) {
            const itemWidth = targetSlide.offsetWidth;
            const parentWidth = slideContainer.parentElement.clientWidth;
            const itemLeft = targetSlide.offsetLeft;
            const baseOffset = itemLeft - (parentWidth - itemWidth) / 2;

            slideContainer.style.transform = `translateX(-${baseOffset + diffX}px)`;
        }
    });

    slideContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const currentX = e.changedTouches[0].clientX;
        const diffX = startX - currentX;

        slideContainer.style.transition = 'transform 0.3s ease-in-out';

        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
        } else {
            showSlide(slideIndex);
        }
    });

    // Init
    showSlide(0);

    // Handle resize
    window.addEventListener('resize', function () {
        // Only trigger update if mobile container is visible? 
        // Or just let it run, simpler.
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
