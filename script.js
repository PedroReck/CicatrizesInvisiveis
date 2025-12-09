/**
 * Cicatrizes Invisíveis - Script Principal
 * Design moderno com logo como elemento principal
 */

(function() {
    'use strict';

    // ============================================
    // PRELOADER
    // ============================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }

    // ============================================
    // NAVEGAÇÃO
    // ============================================
    function initNavigation() {
        const nav = document.getElementById('mainNav');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close menu on link click (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');
        
        function setActiveLink() {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', setActiveLink);
    }

    // ============================================
    // FRASES CAROUSEL
    // ============================================
    function initFrases() {
        const fraseItems = document.querySelectorAll('.frase-item');
        const fraseButtons = document.querySelectorAll('.frase-btn');
        let currentIndex = 0;
        let intervalId = null;

        function showFrase(index) {
            // Remove active de todos
            fraseItems.forEach(item => item.classList.remove('active'));
            fraseButtons.forEach(btn => btn.classList.remove('active'));

            // Adiciona active no atual
            if (fraseItems[index]) {
                fraseItems[index].classList.add('active');
            }
            if (fraseButtons[index]) {
                fraseButtons[index].classList.add('active');
            }

            currentIndex = index;
        }

        function nextFrase() {
            const nextIndex = (currentIndex + 1) % fraseItems.length;
            showFrase(nextIndex);
        }

        function startAutoPlay() {
            intervalId = setInterval(nextFrase, 5000);
        }

        function stopAutoPlay() {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }

        // Botões de controle
        fraseButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                stopAutoPlay();
                showFrase(index);
                startAutoPlay();
            });
        });

        // Pausar no hover
        const frasesContainer = document.querySelector('.frases-container');
        if (frasesContainer) {
            frasesContainer.addEventListener('mouseenter', stopAutoPlay);
            frasesContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // Iniciar autoplay
        startAutoPlay();
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos que precisam de animação
        const animatedElements = document.querySelectorAll('.sobre-content, .objetivo-card, .mensagem-content');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // ============================================
    // LER MAIS - OBJETIVOS
    // ============================================
    function initLerMais() {
        const lerMaisButtons = document.querySelectorAll('.ler-mais-btn');
        
        lerMaisButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.objetivo-card');
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    this.textContent = 'Ler mais';
                } else {
                    card.classList.add('expanded');
                    this.textContent = 'Ler menos';
                }
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL PARA LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.getElementById('mainNav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // PARALLAX EFFECT NO HERO
    // ============================================
    function initParallax() {
        const hero = document.querySelector('.hero');
        const logo = document.querySelector('.main-logo');
        
        if (!hero || !logo) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.5;
                logo.style.transform = `translateY(${parallax}px) scale(${1 - scrolled / heroHeight * 0.2})`;
            }
        });
    }

    // ============================================
    // CURSOR EFFECT (OPCIONAL)
    // ============================================
    function initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Adicionar efeito em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .objetivo-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initPreloader();
        initNavigation();
        initFrases();
        initScrollAnimations();
        initSmoothScroll();
        initParallax();
        initLerMais();
        
        // Cursor effect apenas em desktop
        if (window.innerWidth > 768) {
            // initCursorEffect(); // Descomente se quiser usar
        }
    }

    init();

})();

