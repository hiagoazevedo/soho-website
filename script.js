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

    // Close menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
        
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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