/**
 * BURNS 2024 - Presidential Campaign
 * Interactive Scripts
 */

// ===================================
// DOM READY
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initScrollAnimations();
    initStatsCounter();
    initTabs();
    initDonationTiers();
    initForms();
    initSmoothScroll();
});

// ===================================
// NAVBAR
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===================================
// PARTICLES
// ===================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2 and 8 pixels
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration and delay
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// ===================================
// STATS COUNTER
// ===================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (target - start) + start);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ===================================
// TABS
// ===================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===================================
// DONATION TIERS
// ===================================
function initDonationTiers() {
    const tiers = document.querySelectorAll('.donate-tier');
    const amountDisplay = document.getElementById('selectedAmount');
    const customAmountInput = document.getElementById('customAmount');
    
    tiers.forEach(tier => {
        const selectBtn = tier.querySelector('.btn-tier');
        
        selectBtn.addEventListener('click', () => {
            // Remove featured class from all tiers
            tiers.forEach(t => t.classList.remove('featured'));
            
            // Add featured class to selected tier
            tier.classList.add('featured');
            
            // Update amount display
            const amount = tier.getAttribute('data-amount');
            amountDisplay.textContent = amount;
            
            // Clear custom amount
            customAmountInput.value = '';
            
            // Scroll to form on mobile
            if (window.innerWidth < 992) {
                document.querySelector('.donate-form-container').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });
    });
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            const value = customAmountInput.value;
            if (value) {
                amountDisplay.textContent = value;
                
                // Remove featured from all tiers
                tiers.forEach(t => t.classList.remove('featured'));
            }
        });
    }
}

// ===================================
// FORMS
// ===================================
function initForms() {
    // Volunteer form
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessModal('Thank you for your commitment to excellence! Smithers will contact you with your first assignment shortly.');
            this.reset();
        });
    }
    
    // Donate form
    const donateForm = document.getElementById('donateForm');
    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessModal('Your contribution has been processed! Your name will be added to the "Benefactors of Excellence" plaque.');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessModal('Welcome to the inner circle! Prepare to receive the most excellent emails.');
            this.reset();
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip empty anchors
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// MODALS
// ===================================
function showComingSoon(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('comingSoonModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageEl = document.getElementById('successMessage');
    
    if (messageEl) {
        messageEl.textContent = message;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// ===================================
// NEWS TICKER PAUSE ON HOVER
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        ticker.parentElement.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        
        ticker.parentElement.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }
});

// ===================================
// CARD HOVER EFFECTS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add tilt effect to vision cards
    const cards = document.querySelectorAll('.vision-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ===================================
// BURNS' EXCELLENT CURSOR TRAIL
// ===================================
let cursorTrail = [];
let isThrottled = false;

document.addEventListener('mousemove', (e) => {
    if (isThrottled) return;
    isThrottled = true;
    
    setTimeout(() => {
        isThrottled = false;
    }, 50);
    
    // Occasionally create a "gold sparkle" effect
    if (Math.random() > 0.95) {
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #d4af37 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: sparkleFade 1s ease forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFade {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Change all headings to say "Excellent"
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.textContent = 'EXCELLENT';
        heading.style.color = '#d4af37';
    });
    
    // Add Burns laugh effect
    const laugh = document.createElement('div');
    laugh.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        font-family: 'Playfair Display', serif;
        color: #d4af37;
        text-shadow: 0 0 50px #d4af37;
        z-index: 10000;
        animation: laughAnimation 3s ease forwards;
        pointer-events: none;
    `;
    laugh.textContent = 'AH-HA-HA-HA!';
    document.body.appendChild(laugh);
    
    setTimeout(() => laugh.remove(), 3000);
    
    // Add laugh animation
    const laughStyle = document.createElement('style');
    laughStyle.textContent = `
        @keyframes laughAnimation {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            40% { transform: translate(-50%, -50%) scale(1) rotate(-5deg); }
            60% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
            80% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
    `;
    document.head.appendChild(laughStyle);
}

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.burns-portrait');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// POLICY TAB ICON ANIMATION
// ===================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.style.animation = 'none';
        icon.offsetHeight; // Trigger reflow
        icon.style.animation = 'shake 0.5s ease';
    });
});

// ===================================
// DONATE TIER SELECTION VISUAL FEEDBACK
// ===================================
document.querySelectorAll('.donate-tier').forEach(tier => {
    tier.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-tier')) return;
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        
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

// ===================================
// FORM INPUT ANIMATIONS
// ===================================
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===================================
// QUOTE ROTATION IN TESTIMONIALS
// ===================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonialCards.length === 0) return;
    
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
        }
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Rotate every 5 seconds
setInterval(rotateTestimonials, 5000);

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c BURNS 2024 ', 'background: #0d5c48; color: #d4af37; font-size: 40px; font-weight: bold; padding: 20px;');
console.log('%c Welcome to the campaign, minion! ', 'background: #d4af37; color: #1a1a1a; font-size: 16px; padding: 10px;');
console.log('%c Try the Konami code for a surprise! ', 'color: #0d5c48; font-size: 14px;');

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger reveal sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ===================================
// NAVBAR BACK TO TOP
// ===================================
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// POLICY VISUAL ANIMATIONS
// ===================================
const policyVisuals = document.querySelectorAll('.policy-visual');
const policyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const visual = entry.target.querySelector('div');
            if (visual) {
                visual.style.animation = 'pulseIcon 2s ease-in-out';
            }
        }
    });
}, { threshold: 0.5 });

policyVisuals.forEach(visual => policyObserver.observe(visual));

// ===================================
// DONATION AMOUNT FORMATTING
// ===================================
const amountInput = document.getElementById('customAmount');
if (amountInput) {
    amountInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// ===================================
// CREDIT CARD FORMATTING
// ===================================
const cardInput = document.getElementById('cardNumber');
if (cardInput) {
    cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 16);
        
        // Add spaces every 4 digits
        const parts = value.match(/.{1,4}/g);
        if (parts) {
            e.target.value = parts.join(' ');
        }
    });
}

// Expiry date formatting
const expiryInput = document.getElementById('expiry');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 4);
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        e.target.value = value;
    });
}

// CVV formatting
const cvvInput = document.getElementById('cvv');
if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#0d5c48'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add slide out animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(slideOutStyle);

// ===================================
// TYPEWRITER EFFECT FOR HERO SUBTITLE
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typewriter effect on load
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 40);
    }
});

// ===================================
// BURNS STICKER (Fun addition)
// ===================================
const burnsSticker = document.createElement('div');
burnsSticker.innerHTML = '☢️';
burnsSticker.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--burns-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: all 0.3s ease;
`;

burnsSticker.addEventListener('mouseenter', () => {
    burnsSticker.style.transform = 'scale(1.1) rotate(10deg)';
    burnsSticker.style.background = '#d4af37';
});

burnsSticker.addEventListener('mouseleave', () => {
    burnsSticker.style.transform = 'scale(1) rotate(0deg)';
    burnsSticker.style.background = '#0d5c48';
});

burnsSticker.addEventListener('click', () => {
    showNotification('Smithers! Get me a coffee!', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(burnsSticker);
