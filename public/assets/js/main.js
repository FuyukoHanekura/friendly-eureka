// Set dark theme by default
document.documentElement.setAttribute('data-theme', 'dark');

// Carousel functionality

// Data for slides
const slides = [
    {
        bg: 'assets/img/BackgroundThumbnail2.png',
        title: "Portfolio",
        subtitle: ['Web Dev', 'Portfolio'],
    },
    {
        bg: 'assets/img/BackgroundThumbnail3.png',
        title: 'Placeholder',
        subtitle: ['Subtitle 1', 'Subtitle 2'],
    },
];

// Cache DOM elements
const carousel = document.getElementById('carousel');
const bgA = carousel.querySelector('.bg-a');
const bgB = carousel.querySelector('.bg-b');
const titleCard = carousel.querySelector('.title-card');
const heroTitle = carousel.querySelector('.hero-title');
const [subtitle1, subtitle2] = carousel.querySelectorAll('.hero-subtitle span');

//Warning if markup is missing or incorrect
if (!carousel || !bgA || !bgB || !titleCard || !heroTitle || !subtitle1 || !subtitle2) {
    console.warn('Carousel markup is missing or incorrect.');
}

// State variables
let idx = 0;
let active = 'a';
let timer = null;
const interval = 5000; // 5 seconds

// Function to apply a slide
function applySlide(i, { animate = true } = {}) 
{
    const currentSlide = slides[i];

    const nextActive = (active === 'a') ? bgB : bgA;
    nextActive.style.backgroundImage = `url("${currentSlide.bg}")`;

    if (animate) titleCard.classList.add('is-out');

    setTimeout(() => {
        heroTitle.textContent = currentSlide.title;
        subtitle1.textContent = currentSlide.subtitle[0] ?? '';
        subtitle2.textContent = currentSlide.subtitle[1] ?? '';

        active = (active === 'a') ? 'b' : 'a';
        carousel.setAttribute('data-active', active);

        if (animate)
        {
            setTimeout(() => {
                titleCard.classList.remove('is-out');
            }, 50)
        }
    }, animate ? 200 : 0);
}

// Controls
function next()
{
    idx = (idx + 1) % slides.length;
    applySlide(idx);
}

function previous()
{
    idx = (idx - 1 + slides.length) % slides.length;
    applySlide(idx);
}

// Auto-play controls
function startAutoPlay()
{
    if(timer) return;
    timer = setInterval(next, interval);
}

function stopAutoPlay()
{
    if(!timer) return;
    clearInterval(timer);
    timer = null;
}

//Pause on hover
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoPlay();
    else startAutoPlay();
});

// Keyboard navigation
carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { previous(); e.preventDefault(); }
});

// Initialize
(function initCarousel() {
    bgA.style.backgroundImage = `url("${slides[0].bg}")`;
    bgB.style.backgroundImage = `url("${slides[0].bg}")`;
    carousel.setAttribute('data-active', 'a');
    applySlide(0, { animate: false });
    startAutoPlay();
})();
