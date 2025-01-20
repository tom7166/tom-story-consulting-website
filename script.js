// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Construction Alert Handler
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        setTimeout(() => {
            alertBanner.style.height = alertBanner.offsetHeight + 'px';
            alertBanner.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                alertBanner.style.height = '0';
                alertBanner.style.padding = '0';
                alertBanner.style.margin = '0';
                setTimeout(() => alertBanner.style.display = 'none', 300);
            });
        }, 5000); // Hide after 5 seconds
    }

    // Revenue Number Formatter
    const formatRevenue = (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(number / 1000000) + 'M+';
    };

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            let current = 0;
            let target;
            
            // Special handling for revenue number
            if (stat.textContent.includes('$')) {
                target = 2.4; // $2.4M
                const increment = target / 50;
                
                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = '$' + current.toFixed(1) + 'M+';
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = '$' + target.toFixed(1) + 'M+';
                    }
                };
                updateCount();
            } else {
                target = parseInt(stat.textContent);
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
            }
        });
    };

    // Form Handling with Beta Notice
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                const message = `
                Beta Testing Inquiry
                Email: ${email}
                Note: This service is currently in beta testing phase.
                `;
                window.location.href = `mailto:ThomasStory716@hotmail.com?subject=Website Beta Testing Inquiry&body=${encodeURIComponent(message)}`;
            }
        });
    }

    // Beta Button Handlers
    document.querySelectorAll('button, .learn-more').forEach(element => {
        element.addEventListener('click', (e) => {
            if (element.classList.contains('learn-more')) {
                e.preventDefault();
            }
            if (!element.classList.contains('no-beta')) {
                alert('This feature is currently in beta testing. Thank you for your patience!');
            }
        });
    });

    // Security Features
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });

    // Scroll Animations
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

    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat-card, .stats-container').forEach(el => {
        observer.observe(el);
    });

    // Performance Monitoring
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

    // Add session warning
    let sessionWarningShown = false;
    setInterval(() => {
        if (!sessionWarningShown) {
            alert('Note: This site is currently in beta testing phase. Some features may be limited.');
            sessionWarningShown = true;
        }
    }, 300000); // Show warning after 5 minutes
});
