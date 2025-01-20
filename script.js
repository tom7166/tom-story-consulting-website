// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            let current = 0;
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    // Animate on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .stat-card, .stats-container').forEach(el => {
        observer.observe(el);
    });

    // Form Handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                window.location.href = `mailto:ThomasStory716@hotmail.com?subject=Website Inquiry&body=Email: ${email}`;
            }
        });
    }

    // Security Features
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });

    // Scroll Effects
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Add hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Performance monitoring
const performance = {
    metrics: {},
    startTracking(metricName) {
        this.metrics[metricName] = Date.now();
    },
    endTracking(metricName) {
        if (this.metrics[metricName]) {
            const duration = Date.now() - this.metrics[metricName];
            console.log(`${metricName}: ${duration}ms`);
            return duration;
        }
        return 0;
    }
};

// Track page load
performance.startTracking('pageLoad');
window.onload = () => {
    performance.endTracking('pageLoad');
};
