// Modern Portfolio JavaScript - Clean & Professional
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initResumeDownload();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const mailtoLink = `mailto:akramnaeemuddin09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            alert('Thank you for your message! Your email client should open now.');

            // Reset form
            contactForm.reset();
        });
    }
}

// Resume download functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Download the PDF resume file
            const link = document.createElement('a');
            link.href = 'resume/AkramNaeemuddin_Resume.pdf';
            link.download = 'AkramNaeemuddin_Resume.pdf';
            link.click();

            // Show success message
            setTimeout(() => {
                alert('Resume PDF downloaded successfully!');
            }, 100);
        });
    }
}

// Enhanced animations and interactions
function initAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.cert-item, .project-card, .experience-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize child elements for staggered animations
    const animatedChildren = document.querySelectorAll('.cert-item, .project-card, .experience-item');
    animatedChildren.forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card, .featured-project');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Remove problematic typing animation that cuts off the name
    // The hero title will use CSS animations instead for better responsiveness

    // Add floating animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '';
        });
    });
}