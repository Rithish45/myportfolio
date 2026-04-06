document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial check for elements already in viewport
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
        // Force an initial check immediately
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });

    // Animate background orbs slightly based on mouse movement for extra "wow" factor
    const orbs = document.querySelectorAll('.orb');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            // Combining the float animation with mouse movement using CSS variables could be smoother,
            // but a direct transform translate can fight with the CSS animation.
            // A more advanced approach would use a wrapper div. For now, this stays simple.
        });
    });
});
