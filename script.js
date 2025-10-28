// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        header.classList.toggle('menu-open');
    });

    // Close menu when clicking on a navigation link (excluding dropdown toggles)
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    navLinks.forEach(link => {
        // Skip dropdown toggles to avoid conflicts
        if (link.classList.contains('dropdown-toggle')) {
            return;
        }
        
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024;
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Different behavior for touch devices vs desktop
        if (isTouchDevice) {
            // For touch devices (mobile/tablet), implement two-click system
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Prevent multiple rapid clicks
                if (dropdownToggle.dataset.clicking === 'true') {
                    return;
                }
                dropdownToggle.dataset.clicking = 'true';
                
                setTimeout(() => {
                    dropdownToggle.dataset.clicking = 'false';
                }, 300);
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Check if dropdown is already open
                if (dropdown.classList.contains('active')) {
                    // Second click: close dropdown and redirect to section
                    dropdown.classList.remove('active');
                    header.classList.remove('dropdown-open');
                    
                    // Close mobile menu
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    header.classList.remove('menu-open');
                    
                    // Allow the default link behavior to redirect to section
                    setTimeout(() => {
                        const href = dropdownToggle.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    }, 100);
                } else {
                    // First click: open dropdown
                    dropdown.classList.add('active');
                    header.classList.add('dropdown-open');
                }
            });
        }
        // For desktop, keep the original hover behavior (no changes needed)
        
        // Prevent dropdown links from closing the mobile menu
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Don't close the mobile menu when clicking dropdown links
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                header.classList.remove('dropdown-open');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            header.classList.remove('menu-open');
        }
    });

    // Smooth scrolling for navigation links (excluding dropdown toggles)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip dropdown toggles to avoid conflicts
        if (anchor.classList.contains('dropdown-toggle')) {
            return;
        }
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero video optimization
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Pause video if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroVideo.pause();
        }
        
        // Ensure video plays when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log('Video autoplay prevented'));
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        observer.observe(heroVideo);
    }

    // Services section functionality
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceContents = document.querySelectorAll('.services-content');

    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // Remove active class from all items and contents
            serviceItems.forEach(serviceItem => {
                serviceItem.classList.remove('active');
            });
            
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add active class to corresponding content
            const targetContent = document.querySelector(`[data-content="${serviceType}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Portfolio videos optimization
    const portfolioVideos = document.querySelectorAll('.video-item video');
    
    if (portfolioVideos.length > 0) {
        // Pause videos if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            portfolioVideos.forEach(video => {
                video.pause();
            });
        }
        
        // Create intersection observer for portfolio videos
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Portfolio video autoplay prevented'));
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.5 // Play when 50% of video is visible
        });
        
        // Observe all portfolio videos
        portfolioVideos.forEach(video => {
            portfolioObserver.observe(video);
        });
    }

    // Contact form functionality
    initializeContactForm();

    // Team section functionality
    initializeTeamSection();

    // Agenciamento page functionality
    initializeAgenciamentoFilters();
    
    // Influencer click functionality
    initializeInfluencerClicks();
    
    // Statistics section animation
    initializeStatisticsAnimation();
    
    // Banners animation
    initializeBannersAnimation();
    
    // Lazy loading optimization
    initializeLazyLoading();
});

// EmailJS Configuration
const EMAILJS_CONFIG = {
    // Estes valores serão fornecidos pelo usuário posteriormente
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

// Initialize EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Initialize contact form
function initializeContactForm() {
    // Initialize EmailJS when DOM is ready
    initializeEmailJS();

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    // Validate form before submission
    if (!validateForm(form)) {
        return;
    }
    
    // Update button state
    submitBtn.disabled = true;
    submitBtn.textContent = 'ENVIANDO...';
    
    try {
        // Collect form data
        const formData = collectFormData(form);
        
        // Send email via EmailJS
        await sendEmail(formData);
        
        // Show success message
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

// Collect form data
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Get all form fields
    data.name = formData.get('name');
    data.email = formData.get('email');
    data.service = formData.get('service');
    data.message = formData.get('message');
    
    // Add timestamp
    data.timestamp = new Date().toLocaleString('pt-BR');
    
    return data;
}

// Send email via EmailJS
async function sendEmail(formData) {
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não está carregado');
    }
    
    // Check if configuration is set
    if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        
        console.log('Dados do formulário (configuração EmailJS pendente):', formData);
        
        // Simulate success for now
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Email enviado com sucesso (simulado)');
            }, 1000);
        });
    }
    
    // Send actual email
    const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
            from_name: formData.name,
            from_email: formData.email,
            service_type: formData.service,
            message: formData.message,
            timestamp: formData.timestamp
        }
    );
    
    return response;
}

// Form validation
function validateForm(form) {
    let isValid = true;
    
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const service = form.querySelector('input[name="service"]:checked');
    const message = form.querySelector('#message');
    
    // Clear previous errors
    clearAllErrors(form);
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Por favor, informe seu nome');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Por favor, informe seu email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Por favor, informe um email válido');
        isValid = false;
    }
    
    // Validate service selection
    if (!service) {
        showFieldError(form.querySelector('.service-options'), 'Por favor, selecione um serviço');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Por favor, deixe uma mensagem');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (field.type) {
        case 'text':
            if (field.name === 'name' && value && value.length < 2) {
                showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
            }
            break;
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Por favor, informe um email válido');
            }
            break;
        case 'textarea':
            if (value && value.length < 10) {
                showFieldError(field, 'Mensagem deve ter pelo menos 10 caracteres');
            }
            break;
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderBottomColor = '#e74c3c';
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderBottomColor = '#000';
}

// Clear all errors
function clearAllErrors(form) {
    const errors = form.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.style.borderBottomColor = '#000';
    });
}

// Show success/error message
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    
    const contactForm = document.getElementById('contact-form');
    contactForm.appendChild(messageDiv);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Export functions for EmailJS configuration
window.updateEmailJSConfig = function(serviceId, templateId, publicKey) {
    EMAILJS_CONFIG.serviceId = serviceId;
    EMAILJS_CONFIG.templateId = templateId;
    EMAILJS_CONFIG.publicKey = publicKey;
    
    // Re-initialize EmailJS with new config
    initializeEmailJS();
    
    console.log('EmailJS configurado com sucesso!');
};

// ===========================
// ABOUT SECTION ANIMATION
// ===========================

function initializeAboutAnimation() {
    const aboutImages = document.querySelector('.about-images');
    
    if (!aboutImages) return;
    
    // Configuração do Intersection Observer
    const observerOptions = {
        threshold: 0.3, // Ativa quando 30% da seção estiver visível
        rootMargin: '-50px 0px -50px 0px' // Margem para ativar um pouco antes
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe animate para iniciar a animação
                aboutImages.classList.add('animate');
                
                // Remove o observer após a primeira ativação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa a seção about
    const aboutSection = document.querySelector('#sobre');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// Inicializa a animação da seção about quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeAboutAnimation);

// ===========================
// TEAM SECTION FUNCTIONALITY
// ===========================

// Team members data
const teamMembers = {
    paloma: {
        name: 'Paloma Viana',
        role: 'Diretora de Criação',
        photo: 'assets/Paloma_Viana.jpg'
    },
    gabriella: {
        name: 'Gabriella Almeida',
        role: 'Diretora de Planejamento',
        photo: 'assets/Gabriella_Almeida.jpg'
    },
    clara: {
        name: 'Clara Kersh',
        role: 'Atendimento',
        photo: 'assets/Clara_kersh.jpg'
    },
    milena: {
        name: 'Milena Araújo',
        role: 'Produtora Audiovisual',
        photo: 'assets/Milena_Araujo.jpg'
    },
    hiago: {
        name: 'Hiago Azevedo',
        role: 'Diretor de Produção Criativa',
        photo: 'assets/placeholder.jpg' // Placeholder para foto não disponível
    },
};

// Initialize team section functionality
function initializeTeamSection() {
    const teamMembersList = document.querySelectorAll('.team-member');
    const memberPhoto = document.getElementById('member-photo');
    const memberName = document.getElementById('member-name');
    const memberRole = document.getElementById('member-role');

    if (!teamMembersList.length || !memberPhoto || !memberName || !memberRole) {
        return; // Exit if elements not found
    }

    // Add click event listeners to team members
    teamMembersList.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            
            // Remove active class from all members
            teamMembersList.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked member
            this.classList.add('active');
            
            // Update display with selected member data
            updateMemberDisplay(memberId);
        });
    });
}

// Update member display
function updateMemberDisplay(memberId) {
    const memberData = teamMembers[memberId];
    const memberPhoto = document.getElementById('member-photo');
    const memberName = document.getElementById('member-name');
    const memberRole = document.getElementById('member-role');

    if (!memberData || !memberPhoto || !memberName || !memberRole) {
        return;
    }

    // Update photo
    memberPhoto.src = memberData.photo;
    memberPhoto.alt = memberData.name;
    
    // Update name and role
    memberName.textContent = memberData.name;
    memberRole.textContent = memberData.role;

    // Add loading state for photo
    memberPhoto.style.opacity = '0.7';
    memberPhoto.onload = function() {
        this.style.opacity = '1';
    };
    
    // Handle photo load error (for placeholder images)
    memberPhoto.onerror = function() {
        this.style.opacity = '0.5';
        // You could set a default placeholder image here
    };
}

// ===========================
// AGENCIAMENTO FILTERS FUNCTIONALITY
// ===========================

// Initialize agenciamento filters
function initializeAgenciamentoFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const influencerCards = document.querySelectorAll('.influencer-card');
    const filterSelected = document.querySelector('.filter-selected');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const filterReset = document.getElementById('filter-reset');

    if (!filterOptions.length || !influencerCards.length) {
        return; // Exit if elements not found
    }

    // Add click event listeners to filter options
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected filter display
            if (filterSelected) {
                filterSelected.textContent = this.textContent;
            }
            
            // Filter influencer cards
            filterInfluencers(filterValue, influencerCards);
        });
    });

    // Add click event listener to reset button
    if (filterReset) {
        filterReset.addEventListener('click', function() {
            // Remove active class from all filter options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Set first option (LIFESTYLE) as active
            const firstOption = filterOptions[0];
            if (firstOption) {
                firstOption.classList.add('active');
            }
            
            // Update selected filter display
            if (filterSelected) {
                filterSelected.textContent = 'LIFESTYLE';
            }
            
            // Show all influencer cards
            showAllInfluencers(influencerCards);
        });
    }

    // Add click event listener to dropdown
    if (filterDropdown) {
        filterDropdown.addEventListener('click', function() {
            // Toggle dropdown functionality could be added here
            console.log('Dropdown clicked');
        });
    }
}

// Filter influencers based on selected category
function filterInfluencers(selectedFilter, cards) {
    const gallery = document.querySelector('.influencers-gallery');
    
    // First, hide all cards with animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
    });
    
    // After animation, reorganize DOM
    setTimeout(() => {
        const visibleCards = [];
        const hiddenCards = [];
        
        // Separate cards into visible and hidden arrays
        cards.forEach(card => {
            const categories = card.getAttribute('data-categories');
            const categoryArray = categories ? categories.split(',') : [];
            
            // Check if the card has the selected filter category
            const hasCategory = categoryArray.includes(selectedFilter);
            
            if (hasCategory) {
                visibleCards.push(card);
            } else {
                hiddenCards.push(card);
            }
        });
        
        // Clear gallery
        gallery.innerHTML = '';
        
        // Add visible cards first
        visibleCards.forEach(card => {
            card.classList.remove('hidden');
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            gallery.appendChild(card);
        });
        
        // Add hidden cards at the end (completely hidden)
        hiddenCards.forEach(card => {
            card.classList.add('hidden');
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            gallery.appendChild(card);
        });
    }, 300);
}

// Show all influencers (reset function)
function showAllInfluencers(cards) {
    const gallery = document.querySelector('.influencers-gallery');
    
    // Reset to original order
    setTimeout(() => {
        // Clear gallery
        gallery.innerHTML = '';
        
        // Add all cards back in original order
        cards.forEach(card => {
            card.classList.remove('hidden');
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            gallery.appendChild(card);
        });
    }, 100);
}

// ===========================
// INFLUENCER CLICK FUNCTIONALITY
// ===========================

// Influencer data
const influencerData = {
    'luiza-machado': {
        name: 'Luiza Machado',
        handle: '@luizamachadop',
        followers: '27.8k',
        description: 'Luiza Machado é criadora de conteúdo de moda, beleza e lifestyle — virginiana, detalhista e apaixonada por cuidar da estética. Conhecida pelo olhar criativo e cheio de referências, ela acompanha de perto as tendências e transforma isso em conteúdos que vão de looks inspiradores e tutoriais de beleza até momentos de lifestyle que misturam autenticidade e sofisticação.',
        mainVideo: 'assets/agenciamento/portfolio-luiza-machado/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-luiza-machado/Beleza-na-Web.mp4', brand: 'Beleza na Web', logo: 'assets/agenciamento/logos-marcas/logo-beleza-na-web.png' },
            { video: 'assets/agenciamento/portfolio-luiza-machado/Eudora.mov', brand: 'Eudora', logo: 'assets/agenciamento/logos-marcas/logo-eudora.png' },
            { video: 'assets/agenciamento/portfolio-luiza-machado/Ipanema.mov', brand: 'Ipanema', logo: 'assets/agenciamento/logos-marcas/logo-ipanema.png' },
            { video: 'assets/agenciamento/portfolio-luiza-machado/Melissa.mp4', brand: 'Melissa', logo: 'assets/agenciamento/logos-marcas/logo-melissa.png' }
        ]
    },
    'melissa-hartman': {
        name: 'Melissa Hartman',
        handle: '@amelissahartman',
        followers: '19.3k',
        description: 'Melissa é uma artista completa: cantora, atriz e influenciadora. Mas é como criadora de conteúdo que ela mostra todo o seu olhar criativo e a capacidade de transformar ideias em narrativas visuais cheias de personalidade. Com autenticidade, estética própria e versatilidade, constrói publicidades que se destacam pela originalidade e conexão com o público.',
        mainVideo: 'assets/agenciamento/portfolio-melissa-hartman/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-melissa-hartman/Loreal.mp4', brand: 'L\'Oréal', logo: 'assets/agenciamento/logos-marcas/logo-loreal.png' },
            { video: 'assets/agenciamento/portfolio-melissa-hartman/O Boticário.mov', brand: 'O Boticário', logo: 'assets/agenciamento/logos-marcas/logo-boticario.png' },
            { video: 'assets/agenciamento/portfolio-melissa-hartman/Tuyo.mp4', brand: 'Tuyo', logo: 'assets/agenciamento/logos-marcas/logo-tuyo.png' },
            { video: 'assets/agenciamento/portfolio-melissa-hartman/Principal.mov', brand: 'Portfolio', logo: 'assets/agenciamento/logos-marcas/portfolio.png' }
        ]
    },
    'flavia-dutra': {
        name: 'Flavia Dutra',
        handle: '@fflaviadutra',
        followers: '75.2k',
        description: 'Flavia é criadora de conteúdo nos nichos de moda e beleza, com uma forma única de se comunicar: leve, divertida e cheia de bom humor. Seus conteúdos misturam referências de estilo e dicas de beleza com um toque descontraído, que aproxima e engaja o público. Sempre autêntica, ela transforma o dia a dia em inspirações criativas, tornando cada parceria ainda mais natural e envolvente.',
        mainVideo: 'assets/agenciamento/portfolio-flavia-dutra/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-flavia-dutra/Video1.mp4', brand: 'Marca A', logo: 'assets/agenciamento/logos-marcas/marca-a.png' },
            { video: 'assets/agenciamento/portfolio-flavia-dutra/Video2.mp4', brand: 'Marca B', logo: 'assets/agenciamento/logos-marcas/marca-b.png' },
            { video: 'assets/agenciamento/portfolio-flavia-dutra/Video3.mp4', brand: 'Marca C', logo: 'assets/agenciamento/logos-marcas/marca-c.png' },
            { video: 'assets/agenciamento/portfolio-flavia-dutra/Video4.mp4', brand: 'Marca D', logo: 'assets/agenciamento/logos-marcas/marca-d.png' }
        ]
    },
    'julia-ceschin': {
        name: 'Julia Ceschin',
        handle: '@juliacceschin',
        followers: '69.7k',
        description: 'Julia é criadora de conteúdo apaixonada por moda e também pelo universo fitness. Com um estilo próprio e cheio de atitude, ela compartilha desde inspirações de looks até sua rotina de treinos e bem-estar. O que mais chama atenção em seu trabalho é a dedicação em produzir vídeos elaborados, com edições criativas e diferentes, que fazem seu conteúdo se destacar nas redes.',
        mainVideo: 'assets/agenciamento/portfolio-julia-ceschin/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-julia-ceschin/C&A.mp4', brand: 'C&A', logo: 'assets/agenciamento/logos-marcas/logo-c&a.png' },
            { video: 'assets/agenciamento/portfolio-julia-ceschin/Eudora.mp4', brand: 'Eudora', logo: 'assets/agenciamento/logos-marcas/logo-eudora.png' },
            { video: 'assets/agenciamento/portfolio-julia-ceschin/FarmaLife.mp4', brand: 'FarmaLife', logo: 'assets/agenciamento/logos-marcas/logo-farmalife.png' },
            { video: 'assets/agenciamento/portfolio-julia-ceschin/Tangle Teezer.mp4', brand: 'Tangle Teezer', logo: 'assets/agenciamento/logos-marcas/logo-tangle-teezer.webp' }
        ]
    },
    'lara-pear': {
        name: 'Lara Pear',
        handle: '@pear.lara',
        followers: '29.2k',
        description: 'Lara é criadora de conteúdo cheia de personalidade — espontânea, autêntica e sempre bem-humorada. Nos nichos de moda, beleza, casa e decoração, ela compartilha inspirações de forma leve e divertida, conquistando o público pela proximidade e naturalidade.',
        mainVideo: 'assets/agenciamento/portfolio-lara-pear/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-lara-pear/Cif.mp4', brand: 'Cif', logo: 'assets/agenciamento/logos-marcas/logo-cif.png' },
            { video: 'assets/agenciamento/portfolio-lara-pear/Mantecorp.mp4', brand: 'Mantecorp', logo: 'assets/agenciamento/logos-marcas/logo-mantecorp.png' },
            { video: 'assets/agenciamento/portfolio-lara-pear/Nívea.mp4', brand: 'Nívea', logo: 'assets/agenciamento/logos-marcas/logo-nivea.png' },
            { video: 'assets/agenciamento/portfolio-lara-pear/Sallve.mp4', brand: 'Sallve', logo: 'assets/agenciamento/logos-marcas/logo-sallve.png' }
        ]
    },
    'gabriela-medeiros': {
        name: 'Gabriela Medeiros',
        handle: '@gabrielamedeiros',
        followers: '327k',
        description: 'Gabriela Medeiros é uma criadora de conteúdo especializada em beleza e fitness. Com sua abordagem autêntica e conhecimento técnico, ela produz conteúdos educativos que inspiram sua audiência a cuidar da saúde e bem-estar de forma equilibrada e sustentável.',
        mainVideo: 'assets/agenciamento/portfolio-gabriela-medeiros/Principal.mov',
        portfolio: [
            { video: 'assets/agenciamento/portfolio-gabriela-medeiros/Video1.mp4', brand: 'Marca A', logo: 'assets/agenciamento/logos-marcas/marca-a.png' },
            { video: 'assets/agenciamento/portfolio-gabriela-medeiros/Video2.mp4', brand: 'Marca B', logo: 'assets/agenciamento/logos-marcas/marca-b.png' },
            { video: 'assets/agenciamento/portfolio-gabriela-medeiros/Video3.mp4', brand: 'Marca C', logo: 'assets/agenciamento/logos-marcas/marca-c.png' },
            { video: 'assets/agenciamento/portfolio-gabriela-medeiros/Video4.mp4', brand: 'Marca D', logo: 'assets/agenciamento/logos-marcas/marca-d.png' }
        ]
    }
};

// Initialize influencer click functionality
function initializeInfluencerClicks() {
    const influencerCards = document.querySelectorAll('.influencer-card');
    
    if (!influencerCards.length) {
        return; // Exit if not on agenciamento page
    }
    
    influencerCards.forEach(card => {
        card.addEventListener('click', function() {
            const influencerName = this.querySelector('.influencer-name-card').textContent.toLowerCase();
            const influencerKey = getInfluencerKey(influencerName);
            
            if (influencerKey && influencerData[influencerKey]) {
                createInfluencerPage(influencerKey);
            }
        });
    });
}

// Get influencer key from name
function getInfluencerKey(name) {
    const nameMap = {
        'luiza machado': 'luiza-machado',
        'melissa hartman': 'melissa-hartman',
        'flavia dutra': 'flavia-dutra',
        'julia ceschin': 'julia-ceschin',
        'lara pear': 'lara-pear',
        'gabriela medeiros': 'gabriela-medeiros'
    };
    
    return nameMap[name] || null;
}

// Create dynamic influencer page
function createInfluencerPage(influencerKey) {
    const data = influencerData[influencerKey];
    if (!data) return;
    
    // Create new page content
    const newContent = `
        <section class="agenciamento-section">
            <div class="container">
                <!-- Título -->
                <div class="agenciamento-title-container">
                    <h1 class="agenciamento-title">Conheça<br>nosso casting</h1>
                </div>

                <!-- Botão de Voltar -->
                <div class="back-button-container">
                    <button class="back-button" onclick="window.location.href='agenciamento.html'">
                        ← Voltar ao casting
                    </button>
                </div>

                <!-- Seção da Influenciadora -->
                <div class="influencer-profile">
                    <!-- Vídeo Principal -->
                    <div class="main-video-container">
                        <video class="main-video" autoplay muted loop playsinline>
                            <source src="${data.mainVideo}" type="video/mp4">
                            Seu navegador não suporta vídeos.
                        </video>
                    </div>

                    <!-- Informações da Influenciadora -->
                    <div class="influencer-info">
                        <div class="influencer-header">
                            <h2 class="influencer-name">${data.name}</h2>
                            <div class="influencer-line"></div>
                            <div class="influencer-stats">
                                <span class="follower-count">${data.followers} de seguidores</span>
                            </div>
                        </div>
                        
                        <div class="influencer-handle">${data.handle}</div>
                        
                        <div class="social-links">
                            <a href="#" class="social-link tiktok" aria-label="TikTok">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link instagram" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                        
                        <p class="influencer-description">${data.description}</p>
                    </div>

                    <!-- Portfólio de Vídeos -->
                    <div class="portfolio-section">
                        <div class="portfolio-grid">
                            ${data.portfolio.map(item => `
                                <div class="portfolio-item">
                                    <div class="portfolio-video">
                                        <video class="portfolio-video-element" autoplay muted loop playsinline>
                                            <source src="${item.video}" type="video/mp4">
                                        </video>
                                    </div>
                                    <div class="portfolio-brand">
                                        ${item.logo ? `<img src="${item.logo}" alt="${item.brand}" class="portfolio-brand-logo" loading="lazy" decoding="async">` : item.brand}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Replace main content
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = newContent;
        
        // Initialize portfolio video interactions
        initializePortfolioVideos();
    }
}

// Initialize portfolio video interactions
function initializePortfolioVideos() {
    const portfolioVideos = document.querySelectorAll('.portfolio-video-element');
    
    portfolioVideos.forEach(video => {
        // Add click event to expand video
        video.addEventListener('click', function(e) {
            e.preventDefault();
            expandVideo(this);
        });
        
        // Add hover effect to show it's clickable
        video.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.opacity = '0.9';
        });
        
        video.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Expand video to fullscreen-like experience
function expandVideo(video) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        width: auto;
        height: auto;
    `;
    
    // Clone the video
    const expandedVideo = video.cloneNode(true);
    expandedVideo.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        cursor: default;
    `;
    
    // Enable sound and controls for expanded video
    expandedVideo.muted = false;
    expandedVideo.controls = true;
    expandedVideo.loop = false;
    
    // Add to DOM
    videoContainer.appendChild(expandedVideo);
    overlay.appendChild(videoContainer);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeExpandedVideo();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeExpandedVideo();
        }
    });
    
    // Prevent video click from closing
    expandedVideo.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Function to close expanded video
    function closeExpandedVideo() {
        document.body.removeChild(overlay);
        // Resume original video playback
        video.muted = true;
        video.controls = false;
        video.loop = true;
        video.play();
    }
}

// ===========================
// STATISTICS SECTION ANIMATION
// ===========================

// Initialize statistics section animation
function initializeStatisticsAnimation() {
    const statisticsSection = document.querySelector('.statistics-section');
    
    if (!statisticsSection) {
        return; // Exit if not on sobre page
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class when section comes into view
                entry.target.classList.add('animate');
                
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before section is fully visible
    });
    
    // Start observing the statistics section
    observer.observe(statisticsSection);
}

// ===========================
// BANNERS ANIMATION
// ===========================

// Initialize banners animation
function initializeBannersAnimation() {
    const bannersSection = document.querySelector('.ramos-banners');
    
    if (!bannersSection) {
        return; // Exit if not on produção de conteúdo page
    }
    
    // Get all banner items except the first one (which stays static)
    const bannerItems = bannersSection.querySelectorAll('.banner-item:not(:first-child)');
    
    if (bannerItems.length === 0) {
        return;
    }
    
    // Create intersection observer for individual banners
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to the specific banner
                entry.target.classList.add('animate');
                
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the banner is visible
        rootMargin: '0px 0px -50px 0px' // Start animation when banner is closer to viewport
    });
    
    // Start observing each banner individually
    bannerItems.forEach(banner => {
        observer.observe(banner);
    });
}

// ===========================
// LAZY LOADING OPTIMIZATION
// ===========================

// Initialize lazy loading optimization
function initializeLazyLoading() {
    // Enhanced lazy loading for images with better performance
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading class for visual feedback
                    img.classList.add('loading');
                    
                    // Preload the image
                    const imageLoader = new Image();
                    imageLoader.onload = function() {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    };
                    imageLoader.onerror = function() {
                        img.classList.remove('loading');
                        img.classList.add('error');
                        console.warn('Erro ao carregar imagem:', img.src);
                    };
                    imageLoader.src = img.src;
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images when they're 50px away from viewport
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical images (eager loading)
    const criticalImages = document.querySelectorAll('img[loading="eager"]');
    criticalImages.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
            });
        } else {
            img.classList.add('loaded');
        }
    });
    
    // Optimize video loading
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Add preload="metadata" for better performance
        if (!video.hasAttribute('preload')) {
            video.setAttribute('preload', 'metadata');
        }
        
        // Add loading state
        video.classList.add('loading');
        video.addEventListener('canplaythrough', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        video.addEventListener('error', function() {
            this.classList.remove('loading');
            this.classList.add('error');
        });
    });
} 