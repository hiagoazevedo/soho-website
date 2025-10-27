/* ========================================
   SOHO AGENCY - CONTROLE DE ANIMAÇÕES
   ======================================== */

class AnimationController {
    constructor() {
        this.animations = {
            scrollAnimations: true,
            loadingStates: true,
            microinteractions: true,
            heroAnimation: true
        };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupLoadingStates();
        this.setupMicrointeractions();
    }

    /* ========================================
       SCROLL ANIMATIONS
       ======================================== */
    
    setupScrollAnimations() {
        if (!this.animations.scrollAnimations) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Para elementos com delay staggerado
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        entry.target.style.transitionDelay = delay + 's';
                    }
                }
            });
        }, observerOptions);

        // Observar elementos animáveis
        const animatedElements = document.querySelectorAll(
            '.about-image-item, .service-item, .video-item, .influencer-card, .services-left, .services-right, .team-member'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    /* ========================================
       LOADING STATES
       ======================================== */
    
    setupLoadingStates() {
        if (!this.animations.loadingStates) return;

        // Imagens com loading progressivo
        this.setupImageLoading();
        
        // Form loading state
        this.setupFormLoading();
        
        // Video loading state
        this.setupVideoLoading();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('.about-img, .influencer-image img');
        
        images.forEach(img => {
            // Se a imagem já foi carregada
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                img.addEventListener('error', () => {
                    console.warn('Erro ao carregar imagem:', img.src);
                    img.classList.add('loaded'); // Remove o blur mesmo se der erro
                });
            }
        });
    }

    setupFormLoading() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }
            });
        });
    }

    setupVideoLoading() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.classList.add('loading');
            
            video.addEventListener('canplaythrough', () => {
                video.classList.remove('loading');
            });
            
            video.addEventListener('error', () => {
                video.classList.remove('loading');
                console.warn('Erro ao carregar vídeo:', video.src);
            });
        });
    }

    /* ========================================
       MICROINTERAÇÕES
       ======================================== */
    
    setupMicrointeractions() {
        if (!this.animations.microinteractions) return;

        this.setupHoverEffects();
        this.setupFocusEffects();
        this.setupClickEffects();
    }

    setupHoverEffects() {
        // Efeito magnético nos service items
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });

        // Efeito nos influencer cards - REMOVIDO (mantido apenas no CSS)
    }

    setupFocusEffects() {
        // Efeitos de foco nos inputs do formulário
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    setupClickEffects() {
        // Efeito de ripple nos botões
        const buttons = document.querySelectorAll('.filter-option, .submit-btn, .about-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
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
            });
        });
    }

    /* ========================================
       CONTROLES DE ANIMAÇÃO
       ======================================== */
    // Painel de controle removido - animações sempre ativas
}

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

// Aguardar DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário prefere movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('no-animations');
        return;
    }
    
    // Inicializar controlador de animações
    window.animationController = new AnimationController();
});

/* ========================================
   CSS ADICIONAL PARA EFEITOS
   ======================================== */

// Adicionar estilos para efeitos dinâmicos
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .focused {
        transform: translateY(-2px);
    }
    
    .focused input,
    .focused textarea {
        border-bottom-color: var(--color-green-primary) !important;
    }
`;
document.head.appendChild(additionalStyles);

