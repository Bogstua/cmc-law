// --- Carousel Slider Variables ---
const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');

let index = 0;
const cardWidth = 385; // Card structural width (360px) + Gap (25px)
const maxIndex = 3;    

function startAutoSlide() {
    setInterval(() => {
        index++;
        track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(${-index * cardWidth}px)`;

        if (index >= maxIndex) {
            setTimeout(() => {
                track.style.transition = "none";
                index = 0;
                track.style.transform = `translateX(0px)`;
                updateDots(0);
            }, 500); 
        }

        updateDots(index % maxIndex);
    }, 3500); // Shift every 3.5 seconds
}

function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        if (i === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// --- Intersection Observer Scroll Reveal Animation ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade');
    
    const observerOptions = {
        root: null, // Viewport root
        threshold: 0.12, // Triggers when 12% is in view
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering screen boundary
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// --- App Event Handlers ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Auto Slider
    if (track) {
        startAutoSlide();
    }
    
    // 2. Initialize Scroll Reveal Observers
    initScrollReveal();
    
    // 3. Initialize Vanilla Tilt 3D Handlers
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5,
            speed: 1000,
            glare: true,
            "max-glare": 0.15,
        });
    }
});