document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Initial check
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });

    // Parallax on the massive background text
    const bgText = document.querySelector('.bg-text-massive');
    document.addEventListener('mousemove', (e) => {
        if (!bgText) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
        // We override the drift animation slightly using a secondary translate
        bgText.style.marginLeft = `${-x}px`;
        bgText.style.marginTop = `${-y}px`;
    });
});
