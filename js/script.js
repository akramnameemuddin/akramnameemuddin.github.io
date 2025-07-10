// Enhanced Portfolio JavaScript with Advanced Card Stacking
document.addEventListener('DOMContentLoaded', function() {
    // CRITICAL FIX: Ensure all cards are visible immediately
    document.querySelectorAll('.card-section, .card-content').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAdvancedCardStacking();
    initSkillAnimations();
    initContactForm();
    initScrollIndicator();
    initParallaxEffects();
    initTypewriterEffect();
    initCursorEffects();
    initPerformanceOptimizations();
    
    // Initialize new enhanced effects
    initPageLoader();
    initSmoothScrolling();
    initEnhancedParallax();
    initMagneticButtons();
    
    // Add dynamic data attributes for enhanced animations
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
    });
});

// Enhanced Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Enhanced navbar scroll effect with performance optimization
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    });
    
    // Enhanced mobile menu toggle with animation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Add stagger animation to menu items
        if (navMenu.classList.contains('active')) {
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
    
    // Enhanced smooth scrolling with offset calculation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                // Fixed offset calculation - reduced offset to prevent over-scrolling
                const offsetTop = targetSection.offsetTop - navHeight - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu with animation
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Enhanced active link highlighting with intersection observer
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -70% 0px'
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        navObserver.observe(section);
    });
}

// Scroll progress bar
function initScrollIndicator() {
    const scrollProgress = document.querySelector('.scroll-progress');
    let isScrolling = false;
    
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
        isScrolling = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollProgress);
            isScrolling = true;
        }
    });
}

// Advanced Card Stacking Animation System
function initAdvancedCardStacking() {
    const cardSections = document.querySelectorAll('.card-section');
    const cardsContainer = document.querySelector('.cards-container');
    
    if (!cardSections.length) return;
    
    let isScrolling = false;
    let animationId = null;
    
    // Check for scroll-timeline support
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()') || 
                                  CSS.supports('scroll-timeline', 'works');
    
    console.log('Scroll timeline support:', supportsScrollTimeline);
    
    // Enhanced mouse tracking for card interactions
    function initMouseTracking() {
        cardSections.forEach(card => {
            const cardContent = card.querySelector('.card-content');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                cardContent.style.setProperty('--mouse-x', `${x}%`);
                cardContent.style.setProperty('--mouse-y', `${y}%`);
                
                // Add subtle tilt effect
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (e.clientY - rect.top - centerY) / centerY * -5;
                const rotateY = (e.clientX - rect.left - centerX) / centerX * 5;
                
                cardContent.style.setProperty('--rotate-x', `${rotateX}deg`);
                cardContent.style.setProperty('--rotate-y', `${rotateY}deg`);
            });
            
            card.addEventListener('mouseleave', () => {
                cardContent.style.setProperty('--rotate-x', '0deg');
                cardContent.style.setProperty('--rotate-y', '0deg');
            });
        });
    }
    
    if (!supportsScrollTimeline) {
        // Enhanced fallback implementation
        const updateCardStacking = () => {
            const scrollTop = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const cardsContainerTop = cardsContainer.offsetTop;
            const cardsContainerHeight = cardsContainer.offsetHeight;
            
            cardSections.forEach((card, index) => {
                const cardTop = card.offsetTop;
                const cardHeight = card.offsetHeight;
                
                // Calculate scroll progress relative to card position
                const cardProgress = Math.max(0, Math.min(1, 
                    (scrollTop - cardTop + viewportHeight) / (viewportHeight + cardHeight * 0.5)
                ));
                
                // Calculate stacking position
                const stackOrder = cardSections.length - index;
                const baseScale = 1;
                const minScale = 0.88;
                const scaleStep = (baseScale - minScale) / cardSections.length;
                
                let scale = baseScale;
                let translateY = 0;
                let rotateX = 0;
                let blur = 0;
                let brightness = 1;
                let zIndex = stackOrder;
                
                // Apply stacking effect when cards start overlapping
                if (index > 0 && cardProgress > 0.3) {
                    const stackProgress = Math.min((cardProgress - 0.3) / 0.6, 1);
                    
                    // Scale down based on stack position
                    scale = baseScale - (scaleStep * index * stackProgress);
                    
                    // Move cards up in the stack
                    translateY = -index * 25 * stackProgress;
                    
                    // Add subtle rotation for depth
                    rotateX = index * 2 * stackProgress;
                    
                    // Add progressive blur and brightness reduction
                    blur = index * 1.5 * stackProgress;
                    brightness = 1 - (index * 0.05 * stackProgress);
                    
                    // Adjust z-index for proper layering
                    zIndex = Math.max(1, stackOrder - Math.floor(stackProgress * 2));
                }
                
                // Smooth transitions with CSS custom properties
                card.style.setProperty('--card-scale', scale);
                card.style.setProperty('--card-translateY', `${translateY}px`);
                card.style.setProperty('--card-rotateX', `${rotateX}deg`);
                card.style.setProperty('--card-blur', `${blur}px`);
                card.style.setProperty('--card-brightness', brightness);
                card.style.zIndex = zIndex;
                
                // Apply transforms using CSS variables for better performance
                card.style.transform = `
                    scale(var(--card-scale, 1)) 
                    translateY(var(--card-translateY, 0px)) 
                    rotateX(var(--card-rotateX, 0deg))
                    perspective(1000px)
                `;
                
                card.style.filter = `
                    blur(var(--card-blur, 0px)) 
                    brightness(var(--card-brightness, 1))
                `;
                
                // Add/remove stacked class for additional styling
                if (cardProgress > 0.5 && index > 0) {
                    card.classList.add('stacked');
                } else {
                    card.classList.remove('stacked');
                }
                
                // Parallax effect on scroll
                const cardContent = card.querySelector('.card-content');
                if (cardContent) {
                    const parallaxY = (cardProgress - 0.5) * 20;
                    cardContent.style.setProperty('--parallax-y', `${parallaxY}px`);
                }
            });
            
            isScrolling = false;
        };
        
        // Optimized scroll listener with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                animationId = requestAnimationFrame(updateCardStacking);
                isScrolling = true;
            }
            
            // Additional smooth updates
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateCardStacking, 10);
        }, { passive: true });
        
        // Initial call
        updateCardStacking();
        
        // Update on resize
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateCardStacking);
        });
    }
    
    // Initialize mouse tracking for all browsers
    initMouseTracking();
    
    // Enhanced scroll-based reveal animations with stagger
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add entrance animation
                card.classList.add('card-revealed');
                
                // Stagger animation for child elements
                const children = card.querySelectorAll('.animate-child, .section-title, .section-line, .btn, .skill-item, .project-card, .timeline-item');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        child.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                // Unobserve after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px 0px'
    });
    
    // Observe all card sections
    cardSections.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        revealObserver.observe(card);
    });
}

// Enhanced scroll effects with intersection observer
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.id;
                switch(sectionId) {
                    case 'skills':
                        setTimeout(() => animateSkills(), 300);
                        break;
                    case 'projects':
                        setTimeout(() => animateProjects(), 400);
                        break;
                    case 'experience':
                        setTimeout(() => animateTimeline(), 500);
                        break;
                    case 'certifications':
                        setTimeout(() => animateCertifications(), 300);
                        break;
                }
            }
        });
    }, observerOptions);
    
    // Enhanced parallax observer
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const rect = element.getBoundingClientRect();
                const speed = element.dataset.speed || 0.5;
                const yPos = -(rect.top * speed);
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }, { threshold: 0 });
    
    // Observe elements for animations
    document.querySelectorAll('section').forEach(section => {
        fadeInObserver.observe(section);
    });
    
    document.querySelectorAll('[data-parallax]').forEach(element => {
        parallaxObserver.observe(element);
    });
    
    // Add smooth reveal animation to all cards
    const cards = document.querySelectorAll('.card-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, index * 200);
    });
}

// Enhanced skill level animations
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            const level = item.querySelector('.skill-level');
            const percentage = level.getAttribute('data-level');
            
            // Animate the skill bar with easing
            level.style.setProperty('--level', `${percentage}%`);
            
            // Add number counter animation
            const counter = document.createElement('span');
            counter.style.cssText = `
                position: absolute;
                top: -25px;
                right: 0;
                font-size: 0.8rem;
                color: var(--accent-color);
                font-weight: 600;
                opacity: 0;
                transition: opacity 0.3s ease 0.5s;
            `;
            level.appendChild(counter);
            
            animateCounter(counter, 0, parseInt(percentage), 1000);
            setTimeout(() => counter.style.opacity = '1', 500);
            
        }, index * 150);
    });
}

// Enhanced project card animations
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.8)';
        card.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Add hover effect enhancement
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }, index * 200);
    });
}

// Enhanced timeline animations
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const icon = item.querySelector('.timeline-icon');
        
        content.style.opacity = '0';
        content.style.transform = 'translateX(-60px)';
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            content.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
            
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
            
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 200);
        }, index * 300);
    });
}

// Certifications animation
function animateCertifications() {
    const certBadges = document.querySelectorAll('.certification-badge');
    
    certBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(40px) rotateX(90deg)';
        badge.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) rotateX(0)';
        }, index * 150);
    });
}

// Enhanced contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (!form) return;
    
    // Enhanced form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        if (validateForm(formObject)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Enhanced loading state
            submitBtn.innerHTML = `
                <span style="display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" viewBox="0 0 50 50" style="animation: spin 1s linear infinite;">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                            <animate attributeName="stroke-array" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    Sending...
                </span>
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission with enhanced feedback
            setTimeout(() => {
                showEnhancedNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add success animation
                form.style.transform = 'scale(1.02)';
                setTimeout(() => form.style.transform = 'scale(1)', 200);
            }, 2500);
        }
    });
    
    // Enhanced input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            input.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
            input.style.transform = 'translateY(0)';
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            const isValid = validateField(input);
            input.style.borderColor = isValid ? 'var(--accent-color)' : 'var(--neon-pink)';
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Enhanced form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showEnhancedNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Field validation helper
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    switch(name) {
        case 'name':
            return value.length >= 2;
        case 'email':
            return isValidEmail(value);
        case 'subject':
            return value.length >= 3;
        case 'message':
            return value.length >= 10;
        default:
            return true;
    }
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showEnhancedNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="
                width: 30px; 
                height: 30px; 
                border-radius: 50%; 
                background: ${colors[type]}; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                font-weight: bold;
            ">${icons[type]}</span>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 0.25rem;">
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.9;">${message}</div>
            </div>
            <button class="notification-close" style="
                background: none; 
                border: none; 
                color: white; 
                font-size: 1.5rem; 
                cursor: pointer; 
                padding: 0; 
                width: 30px; 
                height: 30px; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">&times;</button>
        </div>
    `;
    
    // Enhanced notification styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.1);
        z-index: 10000;
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        max-width: 400px;
        min-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

// Enhanced cursor effects
function initCursorEffects() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .card-content');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Enhanced Page Loading Animation
function initPageLoader() {
    // Create loader HTML
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-animation">
            <div class="loader-circle"></div>
            <div class="loader-circle"></div>
            <div class="loader-circle"></div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    // Override default scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 80;
                
                // Custom smooth scroll with easing
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

function smoothScrollTo(endY, duration) {
    const startY = window.scrollY;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animateScroll() {
        const elapsed = new Date().getTime() - startTime;
        const fraction = elapsed / duration;
        
        if (fraction < 1) {
            const easedFraction = easeInOutCubic(fraction);
            window.scrollTo(0, startY + (distanceY * easedFraction));
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo(0, endY);
        }
    }
    
    animateScroll();
}

// Enhanced Card Parallax Effects
function initEnhancedParallax() {
    const cards = document.querySelectorAll('.card-content');
    
    cards.forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rect = entry.boundingClientRect;
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    // Apply parallax transform
                    const parallaxY = scrollPercent * 20 - 10;
                    const scale = 1 + (scrollPercent * 0.02);
                    
                    card.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
                }
            });
        }, {
            threshold: Array.from({length: 101}, (_, i) => i / 100)
        });
        
        observer.observe(card);
    });
}

// Magnetic Button Effects
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Scroll progress bar
function initScrollIndicator() {
    const scrollProgress = document.querySelector('.scroll-progress');
    let isScrolling = false;
    
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
        isScrolling = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollProgress);
            isScrolling = true;
        }
    });
}

// Advanced Card Stacking Animation System
function initAdvancedCardStacking() {
    const cardSections = document.querySelectorAll('.card-section');
    const cardsContainer = document.querySelector('.cards-container');
    
    if (!cardSections.length) return;
    
    let isScrolling = false;
    let animationId = null;
    
    // Check for scroll-timeline support
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()') || 
                                  CSS.supports('scroll-timeline', 'works');
    
    console.log('Scroll timeline support:', supportsScrollTimeline);
    
    // Enhanced mouse tracking for card interactions
    function initMouseTracking() {
        cardSections.forEach(card => {
            const cardContent = card.querySelector('.card-content');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                cardContent.style.setProperty('--mouse-x', `${x}%`);
                cardContent.style.setProperty('--mouse-y', `${y}%`);
                
                // Add subtle tilt effect
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (e.clientY - rect.top - centerY) / centerY * -5;
                const rotateY = (e.clientX - rect.left - centerX) / centerX * 5;
                
                cardContent.style.setProperty('--rotate-x', `${rotateX}deg`);
                cardContent.style.setProperty('--rotate-y', `${rotateY}deg`);
            });
            
            card.addEventListener('mouseleave', () => {
                cardContent.style.setProperty('--rotate-x', '0deg');
                cardContent.style.setProperty('--rotate-y', '0deg');
            });
        });
    }
    
    if (!supportsScrollTimeline) {
        // Enhanced fallback implementation
        const updateCardStacking = () => {
            const scrollTop = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const cardsContainerTop = cardsContainer.offsetTop;
            const cardsContainerHeight = cardsContainer.offsetHeight;
            
            cardSections.forEach((card, index) => {
                const cardTop = card.offsetTop;
                const cardHeight = card.offsetHeight;
                
                // Calculate scroll progress relative to card position
                const cardProgress = Math.max(0, Math.min(1, 
                    (scrollTop - cardTop + viewportHeight) / (viewportHeight + cardHeight * 0.5)
                ));
                
                // Calculate stacking position
                const stackOrder = cardSections.length - index;
                const baseScale = 1;
                const minScale = 0.88;
                const scaleStep = (baseScale - minScale) / cardSections.length;
                
                let scale = baseScale;
                let translateY = 0;
                let rotateX = 0;
                let blur = 0;
                let brightness = 1;
                let zIndex = stackOrder;
                
                // Apply stacking effect when cards start overlapping
                if (index > 0 && cardProgress > 0.3) {
                    const stackProgress = Math.min((cardProgress - 0.3) / 0.6, 1);
                    
                    // Scale down based on stack position
                    scale = baseScale - (scaleStep * index * stackProgress);
                    
                    // Move cards up in the stack
                    translateY = -index * 25 * stackProgress;
                    
                    // Add subtle rotation for depth
                    rotateX = index * 2 * stackProgress;
                    
                    // Add progressive blur and brightness reduction
                    blur = index * 1.5 * stackProgress;
                    brightness = 1 - (index * 0.05 * stackProgress);
                    
                    // Adjust z-index for proper layering
                    zIndex = Math.max(1, stackOrder - Math.floor(stackProgress * 2));
                }
                
                // Smooth transitions with CSS custom properties
                card.style.setProperty('--card-scale', scale);
                card.style.setProperty('--card-translateY', `${translateY}px`);
                card.style.setProperty('--card-rotateX', `${rotateX}deg`);
                card.style.setProperty('--card-blur', `${blur}px`);
                card.style.setProperty('--card-brightness', brightness);
                card.style.zIndex = zIndex;
                
                // Apply transforms using CSS variables for better performance
                card.style.transform = `
                    scale(var(--card-scale, 1)) 
                    translateY(var(--card-translateY, 0px)) 
                    rotateX(var(--card-rotateX, 0deg))
                    perspective(1000px)
                `;
                
                card.style.filter = `
                    blur(var(--card-blur, 0px)) 
                    brightness(var(--card-brightness, 1))
                `;
                
                // Add/remove stacked class for additional styling
                if (cardProgress > 0.5 && index > 0) {
                    card.classList.add('stacked');
                } else {
                    card.classList.remove('stacked');
                }
                
                // Parallax effect on scroll
                const cardContent = card.querySelector('.card-content');
                if (cardContent) {
                    const parallaxY = (cardProgress - 0.5) * 20;
                    cardContent.style.setProperty('--parallax-y', `${parallaxY}px`);
                }
            });
            
            isScrolling = false;
        };
        
        // Optimized scroll listener with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                animationId = requestAnimationFrame(updateCardStacking);
                isScrolling = true;
            }
            
            // Additional smooth updates
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateCardStacking, 10);
        }, { passive: true });
        
        // Initial call
        updateCardStacking();
        
        // Update on resize
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateCardStacking);
        });
    }
    
    // Initialize mouse tracking for all browsers
    initMouseTracking();
    
    // Enhanced scroll-based reveal animations with stagger
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add entrance animation
                card.classList.add('card-revealed');
                
                // Stagger animation for child elements
                const children = card.querySelectorAll('.animate-child, .section-title, .section-line, .btn, .skill-item, .project-card, .timeline-item');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        child.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                // Unobserve after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px 0px'
    });
    
    // Observe all card sections
    cardSections.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        revealObserver.observe(card);
    });
}

// Enhanced scroll effects with intersection observer
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.id;
                switch(sectionId) {
                    case 'skills':
                        setTimeout(() => animateSkills(), 300);
                        break;
                    case 'projects':
                        setTimeout(() => animateProjects(), 400);
                        break;
                    case 'experience':
                        setTimeout(() => animateTimeline(), 500);
                        break;
                    case 'certifications':
                        setTimeout(() => animateCertifications(), 300);
                        break;
                }
            }
        });
    }, observerOptions);
    
    // Enhanced parallax observer
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const rect = element.getBoundingClientRect();
                const speed = element.dataset.speed || 0.5;
                const yPos = -(rect.top * speed);
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }, { threshold: 0 });
    
    // Observe elements for animations
    document.querySelectorAll('section').forEach(section => {
        fadeInObserver.observe(section);
    });
    
    document.querySelectorAll('[data-parallax]').forEach(element => {
        parallaxObserver.observe(element);
    });
    
    // Add smooth reveal animation to all cards
    const cards = document.querySelectorAll('.card-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, index * 200);
    });
}

// Enhanced skill level animations
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            const level = item.querySelector('.skill-level');
            const percentage = level.getAttribute('data-level');
            
            // Animate the skill bar with easing
            level.style.setProperty('--level', `${percentage}%`);
            
            // Add number counter animation
            const counter = document.createElement('span');
            counter.style.cssText = `
                position: absolute;
                top: -25px;
                right: 0;
                font-size: 0.8rem;
                color: var(--accent-color);
                font-weight: 600;
                opacity: 0;
                transition: opacity 0.3s ease 0.5s;
            `;
            level.appendChild(counter);
            
            animateCounter(counter, 0, parseInt(percentage), 1000);
            setTimeout(() => counter.style.opacity = '1', 500);
            
        }, index * 150);
    });
}

// Enhanced project card animations
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.8)';
        card.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Add hover effect enhancement
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }, index * 200);
    });
}

// Enhanced timeline animations
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const icon = item.querySelector('.timeline-icon');
        
        content.style.opacity = '0';
        content.style.transform = 'translateX(-60px)';
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            content.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
            
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
            
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 200);
        }, index * 300);
    });
}

// Certifications animation
function animateCertifications() {
    const certBadges = document.querySelectorAll('.certification-badge');
    
    certBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(40px) rotateX(90deg)';
        badge.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) rotateX(0)';
        }, index * 150);
    });
}

// Enhanced contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (!form) return;
    
    // Enhanced form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        if (validateForm(formObject)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Enhanced loading state
            submitBtn.innerHTML = `
                <span style="display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" viewBox="0 0 50 50" style="animation: spin 1s linear infinite;">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                            <animate attributeName="stroke-array" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    Sending...
                </span>
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission with enhanced feedback
            setTimeout(() => {
                showEnhancedNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add success animation
                form.style.transform = 'scale(1.02)';
                setTimeout(() => form.style.transform = 'scale(1)', 200);
            }, 2500);
        }
    });
    
    // Enhanced input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            input.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
            input.style.transform = 'translateY(0)';
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            const isValid = validateField(input);
            input.style.borderColor = isValid ? 'var(--accent-color)' : 'var(--neon-pink)';
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Enhanced form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showEnhancedNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Field validation helper
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    switch(name) {
        case 'name':
            return value.length >= 2;
        case 'email':
            return isValidEmail(value);
        case 'subject':
            return value.length >= 3;
        case 'message':
            return value.length >= 10;
        default:
            return true;
    }
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showEnhancedNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="
                width: 30px; 
                height: 30px; 
                border-radius: 50%; 
                background: ${colors[type]}; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                font-weight: bold;
            ">${icons[type]}</span>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 0.25rem;">
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.9;">${message}</div>
            </div>
            <button class="notification-close" style="
                background: none; 
                border: none; 
                color: white; 
                font-size: 1.5rem; 
                cursor: pointer; 
                padding: 0; 
                width: 30px; 
                height: 30px; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">&times;</button>
        </div>
    `;
    
    // Enhanced notification styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.1);
        z-index: 10000;
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        max-width: 400px;
        min-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
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
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Utility Functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Additional missing functions
function initSkillAnimations() {
    // This is called by the scroll effects
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const percentage = level.getAttribute('data-level');
        if (percentage) {
            level.style.setProperty('--level', `${percentage}%`);
        }
    });
}

function initParallaxEffects() {
    // Basic parallax for floating elements
    const floatingElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

function initTypewriterEffect() {
    // Typewriter effect for hero title
    const heroLines = document.querySelectorAll('.hero-title .line');
    
    heroLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                line.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 800);
    });
}

function initPerformanceOptimizations() {
    // Lazy loading for images
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
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

