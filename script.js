// Main JavaScript file for ZILA Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPieChart();
    initTokenomicsInteraction();
    initAirdropButton();
    initScrollAnimations();
});

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Pie Chart =====
function initPieChart() {
    const pieChart = document.getElementById('pieChart');
    if (!pieChart) return;

    const svg = pieChart.querySelector('.pie-svg');
    
    const data = [
        { percent: 40, color: '#3b82f6', label: 'Staking' },
        { percent: 10, color: '#ef4444', label: 'Liquidity' },
        { percent: 20, color: '#eab308', label: 'Ecosystem' },
        { percent: 15, color: '#dc2626', label: 'Presale' },
        { percent: 8, color: '#1d4ed8', label: 'Team' },
        { percent: 5, color: '#7c3aed', label: 'Burn' },
        { percent: 2, color: '#a855f7', label: 'Airdrop' }
    ];

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;

    // Clear existing segments
    svg.innerHTML = '';

    data.forEach((item, index) => {
        const segmentLength = (item.percent / 100) * circumference;
        const dashArray = `${segmentLength} ${circumference - segmentLength}`;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '100');
        circle.setAttribute('r', radius);
        circle.setAttribute('class', 'pie-segment');
        circle.setAttribute('stroke', item.color);
        circle.setAttribute('stroke-dasharray', dashArray);
        circle.setAttribute('stroke-dashoffset', -currentOffset);
        circle.setAttribute('data-index', index);
        circle.style.color = item.color;
        
        svg.appendChild(circle);
        
        currentOffset += segmentLength;
    });

    // Add animation on load
    const segments = svg.querySelectorAll('.pie-segment');
    segments.forEach((segment, index) => {
        segment.style.opacity = '0';
        segment.style.transition = 'opacity 0.5s ease, stroke-width 0.3s ease';
        setTimeout(() => {
            segment.style.opacity = '1';
        }, index * 100);
    });
}

// ===== Tokenomics Interaction =====
function initTokenomicsInteraction() {
    const tokenItems = document.querySelectorAll('.token-item');
    const pieSegments = document.querySelectorAll('.pie-segment');

    tokenItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Toggle active state
            tokenItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Highlight corresponding pie segment
            pieSegments.forEach(seg => seg.classList.remove('active'));
            const segment = document.querySelector(`.pie-segment[data-index="${index}"]`);
            if (segment) {
                segment.classList.add('active');
            }
        });

        item.addEventListener('mouseenter', () => {
            const segment = document.querySelector(`.pie-segment[data-index="${index}"]`);
            if (segment) {
                segment.classList.add('active');
            }
        });

        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                const segment = document.querySelector(`.pie-segment[data-index="${index}"]`);
                if (segment) {
                    segment.classList.remove('active');
                }
            }
        });
    });

    // Pie segment click interaction
    pieSegments.forEach((segment, index) => {
        segment.addEventListener('click', () => {
            tokenItems.forEach(i => i.classList.remove('active'));
            pieSegments.forEach(s => s.classList.remove('active'));
            
            segment.classList.add('active');
            if (tokenItems[index]) {
                tokenItems[index].classList.add('active');
                tokenItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// ===== Airdrop Button =====
function initAirdropButton() {
    const airdropBtn = document.getElementById('airdropBtn');
    if (!airdropBtn) return;

    airdropBtn.addEventListener('click', () => {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'airdrop-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-icon">🎉</div>
                <h3>Pre-Registration Coming Soon!</h3>
                <p>Thank you for your interest in the ZILA Airdrop. Pre-registration will be available shortly. Follow us on social media for updates!</p>
                <div class="modal-socials">
                    <a href="#" class="modal-social">Twitter/X</a>
                    <a href="#" class="modal-social">Telegram</a>
                    <a href="#" class="modal-social">Discord</a>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .airdrop-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
            }
            .modal-content {
                position: relative;
                background: linear-gradient(180deg, #1a1a2e 0%, #12121a 100%);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 24px;
                padding: 40px;
                max-width: 450px;
                text-align: center;
                animation: slideUp 0.4s ease;
                box-shadow: 0 0 60px rgba(139, 92, 246, 0.3);
            }
            .modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                color: #a1a1aa;
                font-size: 28px;
                cursor: pointer;
                transition: color 0.2s;
            }
            .modal-close:hover {
                color: #fff;
            }
            .modal-icon {
                font-size: 60px;
                margin-bottom: 20px;
            }
            .modal-content h3 {
                font-family: 'Orbitron', sans-serif;
                font-size: 24px;
                margin-bottom: 16px;
                background: linear-gradient(135deg, #8b5cf6, #a855f7, #ec4899);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .modal-content p {
                color: #a1a1aa;
                line-height: 1.7;
                margin-bottom: 24px;
            }
            .modal-socials {
                display: flex;
                gap: 12px;
                justify-content: center;
            }
            .modal-social {
                padding: 10px 20px;
                background: rgba(139, 92, 246, 0.1);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 8px;
                color: #8b5cf6;
                font-size: 14px;
                transition: all 0.2s;
            }
            .modal-social:hover {
                background: #8b5cf6;
                color: #fff;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal
        const closeModal = () => {
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                modal.remove();
                style.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .ecosystem-card,
        .team-card,
        .roadmap-card,
        .eco-detail-card,
        .stat-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ecosystem-card.animate-in,
        .team-card.animate-in,
        .roadmap-card.animate-in,
        .eco-detail-card.animate-in,
        .stat-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.ecosystem-card, .team-card, .roadmap-card, .eco-detail-card, .stat-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Roadmap cards stagger animation
    const roadmapCards = document.querySelectorAll('.roadmap-card');
    roadmapCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
}

// ===== Particles Effect for Airdrop Section =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? '#8b5cf6' : '#3b82f6'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
createParticles();

// ===== Console Easter Egg =====
console.log('%c🔮 ZILA Token', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cWhere AI Intelligence Meets Web3 & Meme Culture', 'font-size: 14px; color: #a1a1aa;');
console.log('%c⚠️ This is a meme token for entertainment purposes only.', 'font-size: 12px; color: #ef4444;');
