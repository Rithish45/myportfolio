document.addEventListener('DOMContentLoaded', () => {
    // --- 3D Space WebGL/Canvas Engine ---
    const canvas = document.getElementById('space-engine');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // The Space Depth config
    const numStars = 1500;
    const stars = [];
    const focalLength = 350; 

    for(let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * 3000 - 1500,
            y: Math.random() * 3000 - 1500,
            z: Math.random() * 2000,
            size: Math.random() * 1.5 + 0.2, // Small, realistic stars
            alpha: Math.random() * 0.8 + 0.2
        });
    }

    // Interactive Camera Parallax
    let targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - width/2) * 0.05;
        targetY = (e.clientY - height/2) * 0.05;
    });

    let time = 0;
    function animateSpace() {
        time += 0.002;
        
        // Advanced "Breathing" - moving the camera Z back and forth very slowly
        const breatheZ = Math.sin(time) * 150; 
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        
        // Deep Space Nebulous Dust (Monochrome Minimalism)
        // Two massive, very faint radial gradients slowly shifting
        const dustGlow1 = ctx.createRadialGradient(cx + Math.sin(time)*300, cy + Math.cos(time*0.5)*200, 100, cx, cy, 1000);
        dustGlow1.addColorStop(0, 'rgba(40, 40, 45, 0.4)');
        dustGlow1.addColorStop(1, 'transparent');
        ctx.fillStyle = dustGlow1;
        ctx.fillRect(0, 0, width, height);

        // Rendering the 3D Starfield
        for(let i = 0; i < numStars; i++) {
            let star = stars[i];
            
            // Constantly drifting forward + the breathing camera variance
            star.z -= 0.6 + Math.cos(time)*0.2; 
            
            if (star.z <= 0) {
                star.z = 2000;
                star.x = Math.random() * 3000 - 1500;
                star.y = Math.random() * 3000 - 1500;
            }
            
            // Mouse Parallax Projection math
            let xOffset = star.x - targetX * (2000 - star.z) * 0.0005;
            let yOffset = star.y - targetY * (2000 - star.z) * 0.0005;
            
            // 3D Perspective Scale
            const scale = focalLength / (star.z + focalLength + breatheZ);
            const projectedX = cx + xOffset * scale;
            const projectedY = cy + yOffset * scale;
            const projectedSize = star.size * scale;
            
            // Render only if strictly on-screen
            if (projectedX > 0 && projectedX < width && projectedY > 0 && projectedY < height) {
                // Distance fading (further away = fainter)
                const distanceFade = Math.max(0, 1 - (star.z / 1800));
                
                ctx.beginPath();
                ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * distanceFade})`;
                ctx.fill();
            }
        }
        requestAnimationFrame(animateSpace);
    }
    animateSpace();


    // --- Apple Scroll Reveal Mechanics ---
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

    document.querySelectorAll('.card, .section-title, .hero-contact').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // --- Physical Hardware Light Edge Simulation ---
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
