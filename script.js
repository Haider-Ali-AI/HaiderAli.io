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
    }, 1500);
});

// Initialize all animations and effects
function initializeAnimations() {
    // Animate elements on page load
    animateOnLoad();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize tilt effects
    initTiltEffects();
    
    // Start typing animation
    startTypingAnimation();
    
    // Initialize particle system
    initParticleSystem();
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

// Scroll event handlers
window.addEventListener('scroll', () => {
    handleNavbarVisibility();
    handleActiveNavLink();
    handleBackToTopButton();
    handleScrollAnimations();
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

// Handle continuous scroll animations
function handleScrollAnimations() {
    const scrollTop = window.pageYOffset;
    
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollTop * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax effect for header background
    const header = document.getElementById('header');
    if (header) {
        const yPos = scrollTop * 0.3;
        header.style.backgroundPositionY = `${yPos}px`;
    }
}

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Animate stat numbers
function animateStatNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
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
            setTimeout(typeChar, 100);
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

// Initialize tilt effects for cards
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
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
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
    }, 800);
    
    // Animate scroll indicator
    setTimeout(() => {
        document.querySelector('.scroll-indicator')?.classList.add('fade-in');
    }, 1200);
}

// Particle system for enhanced visual effects
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
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
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.3 + 0.1;
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
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        
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

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now()
        });
        
        // Remove old trail points
        while (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        // Create trail element
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #3498db, #9b59b6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            opacity: 0.8;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(trailElement);
        
        // Fade out and remove
        setTimeout(() => {
            trailElement.style.opacity = '0';
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 500);
        }, 100);
    });
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768) {
    initMouseTrail();
}

// Contact form functionality (if needed)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            showNotification('Message sent successfully!', 'success');
        });
    }
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
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initContactForm();
    
    // Add smooth reveal animation to elements
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .edu-exp-card');
    revealElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(() => {
    handleNavbarVisibility();
    handleActiveNavLink();
    handleBackToTopButton();
    handleScrollAnimations();
}, 10));

// Add CSS for no-scroll class
const style = document.createElement('style');
style.textContent = `
    .no-scroll {
        overflow: hidden;
    }
    
    .mouse-trail {
        animation: trailFade 0.5s ease-out;
    }
    
    @keyframes trailFade {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
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
    
    .notification {
        font-weight: 500;
        border-left: 4px solid rgba(255,255,255,0.5);
    }
`;

document.head.appendChild(style);

// Project demo functionality
function initProjectDemos() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const projectOverlays = document.querySelectorAll('.project-overlay');
    
    demoButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Demo video placeholder - Upload your demo video here!', 'info');
        });
    });
    
    // Video placeholder click handlers
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach((placeholder, index) => {
        placeholder.addEventListener('click', () => {
            showNotification('Click here to upload your demo video!', 'info');
            // You can add file upload functionality here
            // Example: triggerFileUpload(index);
        });
        
        // Add hover effect
        placeholder.addEventListener('mouseenter', () => {
            placeholder.style.transform = 'scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', () => {
            placeholder.style.transform = 'scale(1)';
        });
    });
}

// Profile image upload functionality
function initProfileImageUpload() {
    const profilePlaceholder = document.querySelector('.profile-image-placeholder');
    
    if (profilePlaceholder) {
        profilePlaceholder.addEventListener('click', () => {
            showNotification('Click here to upload your profile photo!', 'info');
            // You can add file upload functionality here
            // Example: triggerProfileUpload();
        });
        
        // Add hover effect
        profilePlaceholder.addEventListener('mouseenter', () => {
            profilePlaceholder.style.transform = 'scale(1.05)';
        });
        
        profilePlaceholder.addEventListener('mouseleave', () => {
            profilePlaceholder.style.transform = 'scale(1)';
        });
    }
}

// Example file upload trigger functions (you can implement these)
function triggerFileUpload(projectIndex) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle video upload
            console.log(`Uploading video for project ${projectIndex}:`, file.name);
            showNotification(`Video "${file.name}" selected for project ${projectIndex + 1}!`, 'success');
        }
    };
    input.click();
}

function triggerProfileUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle profile image upload
            const reader = new FileReader();
            reader.onload = (e) => {
                const profilePlaceholder = document.querySelector('.profile-image-placeholder');
                profilePlaceholder.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            };
            reader.readAsDataURL(file);
            showNotification(`Profile image "${file.name}" uploaded successfully!`, 'success');
        }
    };
    input.click();
}

// Enhanced scroll animations with stagger effect
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
                    animateElements(projectCards, 200);
                } else if (entry.target.classList.contains('skills-container')) {
                    const skillCategories = entry.target.querySelectorAll('.skill-category');
                    animateElements(skillCategories, 150);
                } else if (entry.target.classList.contains('education-experience')) {
                    const cards = entry.target.querySelectorAll('.edu-exp-card');
                    animateElements(cards, 300);
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

// Tech stack hover effects
function initTechStackEffects() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Create sparkle effect
            createSparkles(tag);
        });
    });
}

function createSparkles(element) {
    const sparkles = 3;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #3498db;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent += `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Dark/Light theme toggle (optional feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(45deg, #3498db, #9b59b6);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
        transform: translateY(-50%);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    initProjectDemos();
    initProfileImageUpload();
    initStaggeredAnimations();
    initTechStackEffects();
    initThemeToggle();
});

// Matrix rain effect (optional cool background effect)
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.03;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 14, 22, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#3498db';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 100);
}

// Initialize matrix rain on desktop only
if (window.innerWidth > 768) {
    initMatrixRain();
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor FPS
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    
    function calculateFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
            
            // Log performance issues
            if (fps < 30) {
                console.warn('Low FPS detected:', fps);
            }
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    calculateFPS();
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}

// Contact form validation and submission
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
        
        // Add ripple effect on click
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
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent += `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize advanced contact features
document.addEventListener('DOMContentLoaded', () => {
    initAdvancedContactForm();
});

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
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    let focusedElementIndex = 0;
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Custom tab handling if needed
        }
    });
    
    // Announce page changes for screen readers
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

// Initialize accessibility features
initAccessibilityFeatures();

console.log('🚀 Haider Ali Portfolio - All systems loaded and ready!');
console.log('💼 Features initialized:', {
    animations: '✅',
    interactions: '✅',
    accessibility: '✅',
    performance: '✅',
    responsiveness: '✅'
});
