
        // Animaciones específicas para la página nosotros
        document.addEventListener('DOMContentLoaded', function() {
            // Contador animado para estadísticas
            const counters = document.querySelectorAll('.text-4xl.font-bold.gradient-text');
            
            const animateCounter = (counter) => {
                const target = counter.textContent.replace(/[^\d]/g, '');
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const suffix = counter.textContent.replace(/[\d]/g, '');
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(updateCounter, 20);
                    }
                };
                
                updateCounter();
            };
            
            // Observador para activar animaciones al hacer scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        });