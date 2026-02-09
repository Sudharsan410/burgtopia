

// Carousel Logic
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.querySelectorAll('.dot'); // Select all dots
const slides = document.querySelectorAll('.carousel-slide');
let index = 0;

function updateCarousel() {
    const slide = document.querySelector('.carousel-slide');
    if (!slide) return;

    // Calculate width: on mobile, gap should usually be 0 or handled by the slide width
    const gap = window.innerWidth <= 768 ? 0 : 20;
    const slideWidth = slide.clientWidth + gap; 
    
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Update Dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

nextBtn.addEventListener('click', () => {
    // On mobile (<=768px), we show 1 slide. On desktop, we show 3.
    const visibleCount = window.innerWidth <= 768 ? 1 : 3;
    
    if (index < slides.length - visibleCount) {
        index++;
    } else {
        index = 0; // Loop back to start
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = slides.length - (window.innerWidth <= 768 ? 1 : 3); // Loop to end
    }
    updateCarousel();
});

// Dot Click Logic
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});

// Mobile Menu Toggle Logic
const mobileBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileBtn.addEventListener('click', () => {
    const isFlex = navMenu.style.display === "flex";
    navMenu.style.display = isFlex ? "none" : "flex";
    
    if (!isFlex) {
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "70px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.background = "#0c0c0c";
        navMenu.style.padding = "20px";
        navMenu.style.zIndex = "100";
    }
});

window.addEventListener('resize', () => {
    // Reset index on resize to avoid alignment issues
    index = 0;
    updateCarousel();
});

// Initialize on load
updateCarousel();