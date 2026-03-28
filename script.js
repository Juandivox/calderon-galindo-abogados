// Configuración de Tailwind
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'verde-institucional': '#9EBC8A',
                'negro-profundo': '#1D1D1B',
                'blanco-puro': '#FFFFFF',
            },
            fontFamily: {
                'titulo': ['"STIX Two Text"', 'serif'],
                'cuerpo': ['Inter', 'system-ui', 'sans-serif'],
            },
        }
    }
};

// Datos del equipo
const teamMembers = [
    {
        name: 'Nicolás Calderón Grisales',
        position: 'Socio Fundador',
        description: 'Abogado de la Universidad Libre con especialización en Derecho Tributario de la Universidad Externado de Colombia. Experto en protección patrimonial, quiebra y fiscalidad internacional. Cuenta con más de 5 años de experiencia.',
        email: 'ncalderon@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/NICO 7 JUN CORP8038.jpg',
        hasDetailPage: true
    },
    {
        name: 'Johan Manuel Galindo Toloza',
        position: 'Socio Fundador',
        description: 'Abogado de la Universidad Libre con especialización en Derecho Administrativo Laboral. Cuenta con más de 5 años de experiencia.',
        email: 'jgalindo@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/NICO 7 JUN CORP8267.jpg',
        hasDetailPage: true
    },
    {
        name: 'Cristofer Blandón',
        position: 'Abogado',
        description: 'Abogado de la Universidad Libre. Áreas de Práctica: Litigios Civiles y Comerciales, Arbitraje, Responsabilidad Civil.',
        email: 'cblandon@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/NICO 7 JUN CORP80122.jpg',
        hasDetailPage: true
    },
    {
        name: 'Ivan Dario Pardo Clavijo',
        position: 'Abogado',
        description: 'Abogado de la Universidad Santo Tomás, es especialista en Derecho Financiero y Criptoactivos de la Universidad del Rosario.',
        email: 'ipardo@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/IVAN.jpeg',
        hasDetailPage: true
    },
    {
        name: 'Julián David Romero Espinoza',
        position: 'Abogado',
        description: 'Abogado de la Universidad Militar Nueva Granada. Especialista en derecho comercial y societario.',
        email: 'jromero@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/NICO 7 JUN CORP80066.jpg',
        hasDetailPage: true
    },
    {
        name: 'Leidy Yasmín Celi Celi',
        position: 'Abogada',
        description: 'Abogada de la Universidad Católica de Colombia. Especialista en derecho laboral y seguridad social.',
        email: 'lceli@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/LEIDY.png',
        hasDetailPage: true
    },
    {
        name: 'John Fredy Sossa Buitrago',
        position: 'Abogado',
        description: 'Abogado de la Universidad Libre con especialización en Derecho Penal de la misma institución. Experto en litigio penal, defensa estratégica y asesoría en procesos penales complejos.',
        email: 'jsossa@calderongalindo.com.co',
        linkedin: '#',
        photo: 'Image/Abogados/Fotos/JOHN.jpeg',
        hasDetailPage: true
    }
];

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Lucide Icons
    lucide.createIcons();
    
    // Renderizar equipo
    renderTeam();
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Configurar animaciones al scroll
    setupScrollAnimations();
    
    // Configurar smooth scroll para enlaces internos
    setupSmoothScroll();
});

// Variables del carrusel
let currentSlide = 0;
const cardsPerView = 3;
let autoSlideInterval;

// Renderizar carrusel del equipo
function renderTeam() {
    const carousel = document.getElementById('team-carousel');
    if (!carousel) return;
    
    // Crear las tarjetas
    carousel.innerHTML = teamMembers.map(member => `
        <div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
            <div class="bg-blanco-puro rounded-xl p-6 shadow-xl border-2 border-verde-institucional/30 hover:shadow-2xl transition duration-300 card-hover flex flex-col h-full">
                <div class="flex justify-center mb-4">
                    <img src="${member.photo}" 
                         alt="${member.name}" 
                         class="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-verde-institucional/50"
                         style="object-position: center 20%; image-rendering: -webkit-optimize-contrast; image-rendering: high-quality;">
                </div>
                <h3 class="font-titulo text-2xl font-semibold text-center mb-1 text-negro-profundo">${member.name}</h3>
                <p class="font-cuerpo text-verde-institucional text-center mb-3 text-lg font-medium">${member.position}</p>
                <p class="font-cuerpo text-gray-700 text-sm mb-4 leading-relaxed flex-grow">${member.description}</p>
                ${member.hasDetailPage ? `
                    <a href="equipo.html" class="block w-full text-center px-4 py-2 mb-4 bg-verde-institucional text-blanco-puro rounded-lg font-medium hover:bg-opacity-90 transition duration-300">
                        Conocer más
                    </a>
                ` : ''}
                <div class="flex justify-center space-x-4 text-negro-profundo">
                    <a href="mailto:${member.email}" class="hover:text-verde-institucional transition duration-300" title="Enviar correo">
                        <i data-lucide="mail" class="w-5 h-5"></i>
                    </a>
                    <a href="${member.linkedin}" target="_blank" class="hover:text-verde-institucional transition duration-300" title="Ver perfil de LinkedIn">
                        <i data-lucide="linkedin" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Crear indicadores
    createCarouselIndicators();
    
    // Configurar navegación
    setupCarouselNavigation();
    
    // Iniciar auto-slide
    startAutoSlide();
    
    // Re-inicializar iconos
    lucide.createIcons();
}

// Crear indicadores del carrusel
function createCarouselIndicators() {
    const indicators = document.getElementById('carousel-indicators');
    if (!indicators) return;
    
    const totalSlides = Math.ceil(teamMembers.length / cardsPerView);
    indicators.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
        <button class="carousel-indicator w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-verde-institucional w-8' : 'bg-verde-institucional/30'}" data-slide="${i}"></button>
    `).join('');
    
    // Agregar event listeners a los indicadores
    indicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

// Configurar navegación del carrusel
function setupCarouselNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            previousSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
}

// Ir a un slide específico
function goToSlide(slideIndex) {
    const carousel = document.getElementById('team-carousel');
    if (!carousel) return;
    
    const totalSlides = Math.ceil(teamMembers.length / cardsPerView);
    currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    
    const offset = -(currentSlide * 100);
    carousel.style.transform = `translateX(${offset}%)`;
    
    updateIndicators();
}

// Slide anterior
function previousSlide() {
    const totalSlides = Math.ceil(teamMembers.length / cardsPerView);
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    goToSlide(currentSlide);
}

// Slide siguiente
function nextSlide() {
    const totalSlides = Math.ceil(teamMembers.length / cardsPerView);
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
}

// Actualizar indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-verde-institucional/30', 'w-2');
            indicator.classList.add('bg-verde-institucional', 'w-8');
        } else {
            indicator.classList.remove('bg-verde-institucional', 'w-8');
            indicator.classList.add('bg-verde-institucional/30', 'w-2');
        }
    });
}

// Iniciar auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 8000); // Cambia cada 8 segundos
}

// Detener auto-slide
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Configurar menú móvil
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            
            if (!isHidden) {
                menuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            } else {
                menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            }
            
            lucide.createIcons();
        });
    }
}

// Cerrar menú móvil
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    
    if (menuToggle) {
        menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        lucide.createIcons();
    }
}

// Configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.card-hover, section > div > h2, section > div > h3');
    animatedElements.forEach(el => observer.observe(el));
}

// Configurar smooth scroll para enlaces internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });
}

// Funciones del modal
function showMessageBox(title, message) {
    const messageBox = document.getElementById('message-box');
    const messageTitle = document.getElementById('message-title');
    const messageText = document.getElementById('message-text');
    
    if (messageBox && messageTitle && messageText) {
        messageTitle.textContent = title;
        messageText.textContent = message;
        messageBox.style.display = 'flex';
    }
}

function closeMessageBox() {
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}

// Manejo del formulario de contacto
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    
    // Validación básica
    if (!name || !email || !message) {
        showMessageBox(
            'Campos Incompletos',
            'Por favor complete todos los campos del formulario.'
        );
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessageBox(
            'Email Inválido',
            'Por favor ingrese un correo electrónico válido.'
        );
        return;
    }
    
    // Simulación de envío exitoso
    showMessageBox(
        '¡Mensaje Enviado con Éxito!',
        `Gracias ${name} por contactar a Calderón Galindo Abogados. Hemos recibido su consulta y nos pondremos en contacto con usted a la brevedad posible.`
    );
    
    // Resetear formulario
    form.reset();
}

// Cambiar estilo del header al hacer scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.classList.add('shadow-xl');
        } else {
            header.classList.remove('shadow-xl');
        }
    }
    
    lastScroll = currentScroll;
});

// Exponer funciones globales necesarias
window.closeMobileMenu = closeMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.showMessageBox = showMessageBox;
window.closeMessageBox = closeMessageBox;
