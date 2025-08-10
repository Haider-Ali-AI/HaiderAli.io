// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize animations after loading
            initializeAnimations();
        }, 500);
    }, 1200); // Reduced loading time
});

// Initialize all animations and effects
function initializeAnimations() {
    // Animate elements on page load
    animateOnLoad();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize tilt effects (reduced intensity)
    initTiltEffects();
    
    // Start typing animation
    startTypingAnimation();
    
    // Initialize reduced particle system
    initReducedParticleSystem();
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Account for fixed navbar
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Video toggle function for projects
function toggleVideo(projectId) {
    const video = document.getElementById(projectId + 'Video');
    const placeholder = document.getElementById(projectId + 'Placeholder');
    
    // Check if video file exists
    video.addEventListener('loadeddata', () => {
        placeholder.style.display = 'none';
        video.style.display = 'block';
        video.play();
    });
    
    video.addEventListener('error', () => {
        showNotification(`Video not found: videos/${projectId}-demo.mp4`, 'info');
    });
    
    // Try to load the video
    video.load();
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinksContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Debounced scroll event handler
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        handleNavbarVisibility();
        handleActiveNavLink();
        handleBackToTopButton();
        handleScrollAnimations();
    }, 10);
});

// Show/hide navbar on scroll
function handleNavbarVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > window.innerHeight * 0.1) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
}

// Update active navigation link
function handleActiveNavLink() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollTop >= offset && scrollTop < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to top button
function handleBackToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate stat numbers when about section is visible
                if (entry.target.id === 'about') {
                    animateStatNumbers();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    sections.forEach(section => observer.observe(section));
    
    document.querySelectorAll('.project-card, .edu-exp-card, .skill-category, .about-card').forEach(el => {
        observer.observe(el);
    });
}

// Handle continuous scroll animations (reduced intensity)
function handleScrollAnimations() {
    const scrollTop = window.pageYOffset;
    
    // Reduced parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.05); // Reduced speed
        const yPos = -(scrollTop * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 150); // Slightly faster stagger
    });
}

// Animate stat numbers
function animateStatNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 40; // Faster animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 60); // Faster intervals
    });
}

// Typing animation
function startTypingAnimation() {
    const text = "Machine Learning Engineer";
    const typingElement = document.querySelector('.typing-text');
    let index = 0;
    
    if (!typingElement) return;
    
    typingElement.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 120); // Slightly slower typing
        } else {
            // Start cursor blinking
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'inline';
            }, 500);
        }
    }
    
    typeChar();
}

// Initialize tilt effects with reduced intensity
function initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced tilt intensity
    const rotateX = (y - centerY) / 15; // Increased divisor for less tilt
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Animate elements on page load
function animateOnLoad() {
    // Animate profile section
    setTimeout(() => {
        document.querySelector('.profile-section')?.classList.add('fade-in');
    }, 200);
    
    // Animate CTA button
    setTimeout(() => {
        document.querySelector('.cta-button')?.classList.add('fade-in');
    }, 600);
    
    // Animate scroll indicator
    setTimeout(() => {
        document.querySelector('.scroll-indicator')?.classList.add('fade-in');
    }, 1000);
}

// Reduced particle system for enhanced visual effects
function initReducedParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15'; // Reduced opacity
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class with reduced intensity
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3; // Smaller particles
            this.speedX = Math.random() * 1 - 0.5; // Slower movement
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.2 + 0.05; // Lower opacity
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(52, 152, 219, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize fewer particles
    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 25000); // Fewer particles
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
}

// Reduced mouse trail effect (desktop only)
function initReducedMouseTrail() {
    const trail = [];
    const maxTrailLength = 12; // Reduced trail length
    
    document.addEventListener('mousemove', (e) => {
        // Only create trail occasionally
        if (Math.random() > 0.7) { // Reduced frequency
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #3498db, #9b59b6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 2}px;
                top: ${e.clientY - 2}px;
                opacity: 0.4;
                transition: opacity 0.8s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            // Fade out and remove
            setTimeout(() => {
                trailElement.style.opacity = '0';
                setTimeout(() => {
                    if (trailElement.parentNode) {
                        trailElement.parentNode.removeChild(trailElement);
                    }
                }, 800);
            }, 150);
        }
    });
}

// Initialize reduced mouse trail on desktop only
if (window.innerWidth > 768) {
    initReducedMouseTrail();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-size: 0.9rem;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = e.key === 'ArrowDown' 
            ? getNextSection(currentSection) 
            : getPreviousSection(currentSection);
        
        if (nextSection) {
            scrollToSection(nextSection.id);
        }
    }
});

function getCurrentSection() {
    const scrollTop = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollTop) {
            return section;
        }
    }
    return sections[0];
}

function getNextSection(currentSection) {
    const currentIndex = Array.from(sections).indexOf(currentSection);
    return sections[currentIndex + 1] || null;
}

function getPreviousSection(currentSection) {
    const currentIndex = Array.from(sections).indexOf(currentSection);
    return sections[currentIndex - 1] || null;
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Enhanced scroll animations with reduced stagger effect
function initStaggeredAnimations() {
    const animateElements = (elements, delay = 100) => {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * delay);
        });
    };
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('projects-grid')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    animateElements(projectCards, 150); // Reduced delay
                } else if (entry.target.classList.contains('skills-container')) {
                    const skillCategories = entry.target.querySelectorAll('.skill-category');
                    animateElements(skillCategories, 100); // Reduced delay
                } else if (entry.target.classList.contains('education-experience')) {
                    const cards = entry.target.querySelectorAll('.edu-exp-card');
                    animateElements(cards, 200); // Reduced delay
                }
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe containers
    document.querySelectorAll('.projects-grid, .skills-container, .education-experience').forEach(container => {
        staggerObserver.observe(container);
    });
}

// Tech stack hover effects (reduced intensity)
function initTechStackEffects() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Create subtle sparkle effect
            if (Math.random() > 0.5) { // Only sometimes
                createSparkles(tag, 2); // Fewer sparkles
            }
        });
    });
}

function createSparkles(element, count = 2) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #3498db;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: sparkleFloat 1.5s ease-out forwards;
            opacity: 0.6;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

// Contact form functionality with ripple effects
function initAdvancedContactForm() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', (e) => {
            const href = method.getAttribute('href');
            
            if (href.startsWith('mailto:')) {
                // Email validation and formatting
                const email = href.replace('mailto:', '');
                const subject = encodeURIComponent('Portfolio Inquiry from Visitor');
                const body = encodeURIComponent(`Hello Haider Ali,\n\nI visited your portfolio and would like to connect.\n\nBest regards,\n[Your Name]`);
                
                method.setAttribute('href', `mailto:${email}?subject=${subject}&body=${body}`);
                showNotification('Opening email client...', 'info');
            } else if (href.includes('github.com')) {
                showNotification('Opening GitHub profile...', 'info');
            } else if (href.includes('linkedin.com')) {
                showNotification('Opening LinkedIn profile...', 'info');
            }
        });
        
        // Add reduced ripple effect on click
        method.addEventListener('click', createRippleEffect);
    });
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Profile image error handling
function initImageHandling() {
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImage) {
        profileImage.addEventListener('error', () => {
            profileImage.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        });
        
        profileImage.addEventListener('load', () => {
            profilePlaceholder.style.display = 'none';
            profileImage.style.display = 'block';
        });
    }
    
    // Handle project videos
    document.querySelectorAll('.project-video').forEach((video, index) => {
        video.addEventListener('error', () => {
            const projectId = 'project' + (index + 1);
            const placeholder = document.getElementById(projectId + 'Placeholder');
            video.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
        
        video.addEventListener('loadeddata', () => {
            const projectId = 'project' + (index + 1);
            const placeholder = document.getElementById(projectId + 'Placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            video.style.display = 'block';
        });
    });
}

// Accessibility improvements
function initAccessibilityFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3498db;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
        font-weight: 500;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce section changes for screen readers
    function announcePageChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Announce section changes
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
                announcePageChange(`Navigated to ${sectionName} section`);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Performance optimization: Throttle resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled resize handler
window.addEventListener('resize', throttle(() => {
    // Re-initialize particle system if needed
    if (window.innerWidth <= 768) {
        // Remove particles on mobile for performance
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    } else {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'block';
        }
    }
}, 250));

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initStaggeredAnimations();
    initTechStackEffects();
    initAdvancedContactForm();
    initImageHandling();
    initAccessibilityFeatures();
    
    // Add smooth reveal animation to elements with reduced delay
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .edu-exp-card');
    revealElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.05}s`; // Reduced delay
    });
});

// Add CSS animations to DOM
const style = document.createElement('style');
style.textContent = `
    .no-scroll {
        overflow: hidden;
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .slide-in-right {
        animation: slideInRight 0.8s ease forwards;
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-20px) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Reduced console output for better performance
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 Haider Ali Portfolio - Optimized version loaded!');
    console.log('✨ Reduced animations for better performance');
}

// Service worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
