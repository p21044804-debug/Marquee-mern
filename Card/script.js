// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add click animation to cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Ripple effect
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        // Add ripple animation if not exists
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                @keyframes ripple {
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                        transform: translate(-50%, -50%);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe info boxes for animation
document.querySelectorAll('.info-box').forEach(box => {
    box.style.opacity = '0';
    observer.observe(box);
});

// Smooth color transition on scroll
let scrollProgress = 0;
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = window.pageYOffset / windowHeight;
});

// Add keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 300, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -300, behavior: 'smooth' });
    }
});

// Animate elements on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});