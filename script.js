document.addEventListener('DOMContentLoaded', () => {
    // Apple-style scroll reveal elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial state for intersection observer targeting cards and sections
    document.querySelectorAll('.card, .section-title, .hero-contact').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // --- Physical Hardware Light Interaction ---
    // This creates the effect of a physical light hitting the titanium rims of the cards
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the exact card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set css variables to control the position of the radial gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
