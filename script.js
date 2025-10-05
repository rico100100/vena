// ===== MAIN APPLICATION JAVASCRIPT =====

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const modulesGrid = document.getElementById('modulesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Application State
let currentFilter = 'all';
let visibleModules = 12;
let allModules = [];

// Module Data Structure
const moduleData = [
    {
        id: 'aneurismas-venosos',
        title: 'Aneurismas Venosos',
        category: 'evaluation',
        description: 'Gestión completa de aneurismas venosos raros con protocolos basados en evidencia científica',
        features: ['Casos Clínicos', 'Algoritmos', 'Referencias'],
        icon: 'fas fa-microscope',
        badge: 'Evaluación'
    },
    {
        id: 'angiojet',
        title: 'AngioJet System',
        category: 'tools',
        description: 'Sistema completo de trombectomía reolítica con calculadoras, protocolos y evidencia científica',
        features: ['Calculadoras', 'Protocolos', 'Meta-análisis'],
        icon: 'fas fa-cogs',
        badge: 'Herramientas'
    },
    {
        id: 'villalta',
        title: 'Score Villalta',
        category: 'scores',
        description: 'Evaluación del síndrome post-trombótico con calculadora automática y interpretación clínica',
        features: ['Automático', 'Validado', 'PDF Export'],
        icon: 'fas fa-calculator',
        badge: 'Puntuaciones'
    },
    {
        id: 'vcss',
        title: 'VCSS Score',
        category: 'scores',
        description: 'Venous Clinical Severity Score para evaluación integral de la enfermedad venosa crónica',
        features: ['Estándar Oro', 'Seguimiento', 'Internacional'],
        icon: 'fas fa-chart-line',
        badge: 'Puntuaciones'
    },
    {
        id: 'caprini',
        title: 'Score Caprini',
        category: 'scores',
        description: 'Evaluación del riesgo trombótico con estratificación automática y recomendaciones profilácticas',
        features: ['Riesgo TEV', 'Profilaxis', 'Guidelines'],
        icon: 'fas fa-exclamation-triangle',
        badge: 'Puntuaciones'
    },
    {
        id: 'tvp',
        title: 'TVP Management',
        category: 'tools',
        description: 'Manejo integral de la trombosis venosa profunda con algoritmos diagnósticos y terapéuticos',
        features: ['Diagnóstico', 'Tratamiento', 'Seguimiento'],
        icon: 'fas fa-heartbeat',
        badge: 'Herramientas'
    },
    {
        id: 'tipos-ulcera',
        title: 'Tipos de Úlcera',
        category: 'evaluation',
        description: 'Clasificación diferencial y protocolo de tratamiento para úlceras vasculares',
        features: ['Diferencial', 'Tratamiento', 'Imágenes'],
        icon: 'fas fa-search',
        badge: 'Evaluación'
    },
    {
        id: 'cuestionario-varices',
        title: 'Cuestionario Várices',
        category: 'questionnaires',
        description: 'Evaluación clínica estructurada de várices con scoring automático y recomendaciones',
        features: ['Síntomas', 'Calidad Vida', 'Structured'],
        icon: 'fas fa-clipboard-list',
        badge: 'Cuestionarios'
    },
    {
        id: 'score-fragilidad',
        title: 'Score Fragilidad',
        category: 'scores',
        description: 'Valoración de fragilidad perioperatoria con estratificación de riesgo quirúrgico',
        features: ['Perioperatorio', 'Riesgo', 'Geriátrico'],
        icon: 'fas fa-user-injured',
        badge: 'Puntuaciones'
    },
    {
        id: 'stent-may-turner',
        title: 'Stent May-Turner',
        category: 'tools',
        description: 'Protocolo completo para el tratamiento del síndrome de compresión de May-Turner',
        features: ['Endovascular', 'Protocolo', 'Técnica'],
        icon: 'fas fa-expand-arrows-alt',
        badge: 'Herramientas'
    },
    {
        id: 'vasculitis-general',
        title: 'Vasculitis General',
        category: 'evaluation',
        description: 'Diagnóstico integral de vasculitis con algoritmos, criterios y clasificación actualizada',
        features: ['Diagnóstico', 'Criterios', 'Actualizado'],
        icon: 'fas fa-fire',
        badge: 'Evaluación'
    },
    {
        id: 'score-sangrado',
        title: 'Score Sangrado',
        category: 'scores',
        description: 'Evaluación del riesgo hemorrágico con múltiples escalas validadas y recomendaciones',
        features: ['HAS-BLED', 'CRUSADE', 'Múltiple'],
        icon: 'fas fa-tint',
        badge: 'Puntuaciones'
    },
    {
        id: 'cuestionario-varices-VVSymQ',
        title: 'VVSymQ',
        category: 'questionnaires',
        description: 'Venous VQoL Symptoms Questionnaire para evaluación específica de calidad de vida',
        features: ['Calidad Vida', 'Validado', 'Específico'],
        icon: 'fas fa-clipboard-check',
        badge: 'Cuestionarios'
    },
    {
        id: 'linfedema-recursos-esp',
        title: 'Linfedema Recursos',
        category: 'tools',
        description: 'Herramientas especializadas para el manejo integral del linfedema',
        features: ['Diagnóstico', 'Tratamiento', 'Recursos'],
        icon: 'fas fa-hand-holding-water',
        badge: 'Herramientas'
    },
    {
        id: 'sele-aposito-cura',
        title: 'Selección Apósitos',
        category: 'tools',
        description: 'Guía para la selección óptima de apósitos según tipo de herida y fase de curación',
        features: ['Guía', 'Selección', 'Tratamiento'],
        icon: 'fas fa-band-aid',
        badge: 'Herramientas'
    },
    {
        id: 'indice-raynolds',
        title: 'Índice Reynolds',
        category: 'scores',
        description: 'Predicción del riesgo cardiovascular en población específica con factores ajustados',
        features: ['Predicción', 'Cardiovascular', 'Ajustado'],
        icon: 'fas fa-chart-bar',
        badge: 'Puntuaciones'
    },
    {
        id: 'cap-func-met',
        title: 'Capacidad Funcional',
        category: 'evaluation',
        description: 'Evaluación de la capacidad funcional metabólica para estratificación preoperatoria',
        features: ['Preoperatorio', 'Funcional', 'Estratificación'],
        icon: 'fas fa-running',
        badge: 'Evaluación'
    },
    {
        id: 'vasculitis',
        title: 'Vasculitis Específica',
        category: 'evaluation',
        description: 'Herramientas diagnósticas específicas para diferentes tipos de vasculitis',
        features: ['Específico', 'Diagnóstico', 'Tipos'],
        icon: 'fas fa-virus',
        badge: 'Evaluación'
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderModules();
});

// Application Initialization
function initializeApp() {
    allModules = moduleData;
    console.log('VENA Platform initialized successfully');
    console.log(`Loaded ${allModules.length} modules`);
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize smooth scroll behavior
    initializeSmoothScroll();
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            handleFilterChange(e.target.dataset.filter);
        });
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreModules);
    }
    
    // Navigation links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Search functionality
    setupSearchFunctionality();
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    const isOpen = navList.classList.contains('mobile-open');
    
    if (isOpen) {
        navList.classList.remove('mobile-open');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navList.classList.add('mobile-open');
        mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Filter Handling
function handleFilterChange(filter) {
    currentFilter = filter;
    visibleModules = 12;
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Render filtered modules
    renderModules();
    
    // Analytics tracking
    trackEvent('filter_change', { filter: filter });
}

// Module Rendering
function renderModules() {
    if (!modulesGrid) return;
    
    const filteredModules = currentFilter === 'all' 
        ? allModules 
        : allModules.filter(module => module.category === currentFilter);
    
    const modulesToShow = filteredModules.slice(0, visibleModules);
    
    // Clear existing modules
    modulesGrid.innerHTML = '';
    
    // Render modules with animation
    modulesToShow.forEach((module, index) => {
        const moduleElement = createModuleCard(module);
        moduleElement.style.animationDelay = `${index * 0.1}s`;
        modulesGrid.appendChild(moduleElement);
    });
    
    // Update load more button
    updateLoadMoreButton(filteredModules.length);
}

// Create Module Card
function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.dataset.category = module.category;
    
    const iconClass = getCategoryIconClass(module.category);
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon ${module.category}">
                <i class="${module.icon}"></i>
            </div>
            <div class="card-header-text">
                <h3>${module.title}</h3>
                <span class="card-badge">${module.badge}</span>
            </div>
        </div>
        <p class="card-description">${module.description}</p>
        <div class="card-features">
            ${module.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>
        <button class="card-btn" onclick="openModule('${module.id}')">
            <i class="fas fa-external-link-alt"></i>
            Abrir Módulo
        </button>
    `;
    
    return card;
}

// Get Category Icon Class
function getCategoryIconClass(category) {
    const iconMap = {
        'evaluation': 'evaluation',
        'scores': 'scores',
        'tools': 'tools',
        'questionnaires': 'questionnaires'
    };
    return iconMap[category] || 'tools';
}

// Load More Modules
function loadMoreModules() {
    visibleModules += 6;
    renderModules();
    
    // Scroll to new modules
    setTimeout(() => {
        const newModules = document.querySelectorAll('.module-card');
        if (newModules.length > 0) {
            newModules[Math.max(0, visibleModules - 6)].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 300);
    
    trackEvent('load_more_modules', { visible_modules: visibleModules });
}

// Update Load More Button
function updateLoadMoreButton(totalModules) {
    if (!loadMoreBtn) return;
    
    if (visibleModules >= totalModules) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
        const remaining = totalModules - visibleModules;
        loadMoreBtn.innerHTML = `
            <i class="fas fa-plus"></i>
            Ver ${remaining} Módulos Más
        `;
    }
}

// Open Module
function openModule(moduleId) {
    const moduleUrl = `./${moduleId}/index.html`;
    
    // Try to open in new tab first, fallback to same window
    try {
        const newWindow = window.open(moduleUrl, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Popup blocked, fallback to same window
            window.location.href = moduleUrl;
        }
    } catch (error) {
        // Fallback to same window
        window.location.href = moduleUrl;
    }
    
    // Analytics tracking
    trackEvent('module_opened', { module_id: moduleId });
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Smooth Scroll Initialization
function initializeSmoothScroll() {
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Search Functionality
function setupSearchFunctionality() {
    // Create search input if it doesn't exist
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input 
                type="text" 
                id="moduleSearch" 
                class="search-input" 
                placeholder="Buscar módulos..."
                autocomplete="off"
            >
            <button class="search-clear" id="searchClear" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="search-results" id="searchResults" style="display: none;"></div>
    `;
    
    // Insert search before modules section
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
        const filterNav = modulesSection.querySelector('.filter-nav');
        if (filterNav) {
            filterNav.parentNode.insertBefore(searchContainer, filterNav);
        }
    }
    
    // Setup search event listeners
    const searchInput = document.getElementById('moduleSearch');
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('search-active');
        });
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                searchContainer.classList.remove('search-active');
                searchResults.style.display = 'none';
            }, 200);
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', clearSearch);
    }
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');
    
    // Show/hide clear button
    if (searchClear) {
        searchClear.style.display = query ? 'flex' : 'none';
    }
    
    if (query.length < 2) {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        return;
    }
    
    // Filter modules based on search
    const filteredModules = allModules.filter(module => 
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.features.some(feature => feature.toLowerCase().includes(query)) ||
        module.badge.toLowerCase().includes(query)
    );
    
    // Display search results
    displaySearchResults(filteredModules, query);
    
    // Analytics tracking
    trackEvent('search_performed', { query: query, results_count: filteredModules.length });
}

// Display Search Results
function displaySearchResults(modules, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (modules.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No se encontraron módulos para "${query}"</p>
            </div>
        `;
    } else {
        const resultsHTML = modules.slice(0, 5).map(module => `
            <div class="search-result-item" onclick="openModule('${module.id}')">
                <div class="search-result-icon ${module.category}">
                    <i class="${module.icon}"></i>
                </div>
                <div class="search-result-content">
                    <h4>${highlightText(module.title, query)}</h4>
                    <p>${highlightText(module.description.substring(0, 80) + '...', query)}</p>
                    <span class="search-result-badge">${module.badge}</span>
                </div>
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
        
        if (modules.length > 5) {
            searchResults.innerHTML += `
                <div class="search-show-all">
                    <button onclick="showAllSearchResults('${query}')" class="search-show-all-btn">
                        Ver todos los ${modules.length} resultados
                    </button>
                </div>
            `;
        }
    }
    
    searchResults.style.display = 'block';
}

// Highlight Search Text
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Clear Search
function clearSearch() {
    const searchInput = document.getElementById('moduleSearch');
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    if (searchResults) searchResults.style.display = 'none';
    
    searchInput.focus();
}

// Show All Search Results
function showAllSearchResults(query) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    // Filter modules and update view
    const filteredModules = allModules.filter(module => 
        module.title.toLowerCase().includes(query.toLowerCase()) ||
        module.description.toLowerCase().includes(query.toLowerCase()) ||
        module.features.some(feature => feature.toLowerCase().includes(query.toLowerCase())) ||
        module.badge.toLowerCase().includes(query.toLowerCase())
    );
    
    // Update modules grid
    allModules = filteredModules;
    currentFilter = 'all';
    visibleModules = filteredModules.length;
    renderModules();
    
    // Scroll to modules
    document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
}

// Utility Functions
function scrollToModules() {
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
        modulesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openDocumentation() {
    window.open('#', '_blank');
    trackEvent('documentation_opened');
}

// Analytics Tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    
    // Here you would integrate with your preferred analytics service
    // Examples: Google Analytics, Mixpanel, PostHog, etc.
    
    // Example Google Analytics 4 implementation:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Application Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Theme Management (for future dark mode support)
function initializeThemeManager() {
    const savedTheme = localStorage.getItem('vena-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Export functions for global access
window.VENA = {
    openModule,
    scrollToModules,
    openDocumentation,
    handleFilterChange,
    trackEvent
};

// Initialize theme on load
initializeThemeManager();