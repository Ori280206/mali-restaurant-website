/* ============================================
   MALI THAI CUISINE - INTERACTIVE SCRIPTS
   ============================================ */

// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================

const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-fade elements
document.querySelectorAll('.scroll-fade').forEach(el => {
    observer.observe(el);
});

// ============================================
// ADD SCROLL FADE ANIMATION TO SECTIONS
// ============================================

window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Add fade-in animation to section content
        const elements = section.querySelectorAll('h2, h3, p, .menu-card, .pricing-card, .testimonial-card, .info-item');
        elements.forEach((el, i) => {
            el.classList.add('scroll-fade');
            el.style.animationDelay = `${i * 0.1}s`;
        });
    });
});

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const preferences = document.getElementById('preferences').checked;
        
        // Basic validation
        if (!name || !email) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Success message
        showNotification('Thank you for subscribing! Check your email for a special welcome offer.', 'success');
        
        // Reset form
        newsletterForm.reset();
        
        // Log subscription data (in production, send to backend)
        console.log({
            name,
            email,
            phone,
            preferences,
            timestamp: new Date().toISOString()
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#1a5f5f' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FORM VALIDATION HELPERS
// ============================================

const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#d4a574';
    });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = '#1a5f5f';
    });
    
    input.addEventListener('input', () => {
        if (input.type === 'email' && input.value) {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            input.style.borderColor = isValid ? '#1a5f5f' : '#e74c3c';
        }
    });
});

// ============================================
// RESERVATION/CONTACT CTA BUTTONS
// ============================================

const ctaButtons = document.querySelectorAll('a[href="#contact"]');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        const emailInput = document.getElementById('email');
        
        window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Focus on email input after a short delay
        setTimeout(() => {
            emailInput.focus();
            emailInput.style.boxShadow = '0 0 0 3px rgba(212, 165, 116, 0.2)';
        }, 500);
    });
});

// ============================================
// PHONE NUMBER FORMATTING
// ============================================

const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        e.target.value = value;
    });
}

// ============================================
// MENU/FEATURE CARDS INTERACTION
// ============================================

const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================================
// PRICING CARD HIGHLIGHT
// ============================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => {
            c.style.opacity = c === card ? '1' : '0.7';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ============================================
// TESTIMONIAL CAROUSEL (OPTIONAL ENHANCEMENT)
// ============================================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialCount = testimonialCards.length;

function rotateTestimonials() {
    if (window.innerWidth <= 768) {
        testimonialCards.forEach((card, index) => {
            card.style.display = index === currentTestimonial ? 'block' : 'none';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    }
}

// Auto-rotate testimonials on mobile
if (testimonialCount > 0 && window.innerWidth <= 768) {
    setInterval(rotateTestimonials, 5000);
}

// ============================================
// HIGHLIGHT ACTIVE NAVIGATION SECTION
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('id');
        
        if (sectionId && rect.top <= 150 && rect.bottom >= 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// HEADER BACKGROUND IMAGE PARALLAX
// ============================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrollPosition = window.scrollY;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPosition = `center ${scrollPosition * parallaxSpeed}px`;
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION - DEBOUNCE
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Your scroll functions here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// ANALYTICS TRACKING (OPTIONAL)
// ============================================

function trackEvent(eventName, eventDetails = {}) {
    console.log(`Event: ${eventName}`, eventDetails);
    
    // Send to analytics service (e.g., Google Analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventDetails);
    }
}

// Track form submissions
if (newsletterForm) {
    newsletterForm.addEventListener('submit', () => {
        trackEvent('newsletter_signup', {
            timestamp: new Date().toISOString()
        });
    });
}

// Track button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        trackEvent('cta_button_click', {
            button_text: buttonText
        });
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('MALI Restaurant Website Loaded Successfully');
    
    // Add fade-in animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Initialize tooltips or popovers if needed
    initializeTooltips();
});

// ============================================
// TOOLTIP INITIALIZATION
// ============================================

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #1a5f5f;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            }, { once: true });
        });
    });
}

// ============================================
// RESPONSIVE BEHAVIOR
// ============================================

function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific behavior
        document.body.classList.add('mobile');
    } else {
        // Desktop-specific behavior
        document.body.classList.remove('mobile');
    }
}

handleResponsive();
window.addEventListener('resize', handleResponsive);

// ============================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================

window.MALI = {
    trackEvent,
    showNotification,
    debounce
};

console.log('MALI Restaurant - All scripts initialized and ready!');
