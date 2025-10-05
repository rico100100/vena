// Reynolds Number Calculator and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeCalculator();
    initializeNavigation();
    initializeTooltips();
    
    // MathJax configuration for formula rendering
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});

// Reynolds Number Calculator
function initializeCalculator() {
    const densityInput = document.getElementById('density');
    const velocityInput = document.getElementById('velocity');
    const diameterInput = document.getElementById('diameter');
    const viscosityInput = document.getElementById('viscosity');
    
    const reynoldsValueDisplay = document.getElementById('reynolds-value');
    const flowTypeDisplay = document.getElementById('flow-type');
    const clinicalTextDisplay = document.getElementById('clinical-text');
    
    // Default calculation on load
    calculateReynolds();
    
    // Add event listeners for real-time calculation
    [densityInput, velocityInput, diameterInput, viscosityInput].forEach(input => {
        if (input) {
            input.addEventListener('input', calculateReynolds);
            input.addEventListener('change', calculateReynolds);
        }
    });
    
    function calculateReynolds() {
        try {
            // Get input values
            const density = parseFloat(densityInput.value) || 1050; // kg/m³
            const velocity = parseFloat(velocityInput.value) || 30; // cm/s -> convert to m/s
            const diameter = parseFloat(diameterInput.value) || 5.0; // mm -> convert to m
            const viscosity = parseFloat(viscosityInput.value) || 3.5; // mPa·s -> convert to Pa·s
            
            // Validate inputs
            if (density <= 0 || velocity < 0 || diameter <= 0 || viscosity <= 0) {
                throw new Error('Los valores deben ser positivos');
            }
            
            // Convert units
            const velocityMs = velocity / 100; // cm/s to m/s
            const diameterM = diameter / 1000; // mm to m
            const viscosityPas = viscosity / 1000; // mPa·s to Pa·s
            
            // Calculate Reynolds number: Re = ρ * v * D / μ
            const reynolds = (density * velocityMs * diameterM) / viscosityPas;
            
            // Update display
            updateReynoldsDisplay(reynolds);
            
        } catch (error) {
            console.error('Error en el cálculo:', error);
            reynoldsValueDisplay.textContent = 'Error';
            flowTypeDisplay.textContent = 'Error';
            clinicalTextDisplay.textContent = 'Por favor, verifique los valores ingresados.';
        }
    }
    
    function updateReynoldsDisplay(reynolds) {
        // Update Reynolds number display
        reynoldsValueDisplay.textContent = Math.round(reynolds);
        
        // Determine flow type and clinical interpretation
        const flowInfo = getFlowTypeInfo(reynolds);
        
        // Update flow type display
        flowTypeDisplay.textContent = flowInfo.type;
        flowTypeDisplay.className = `result-value ${flowInfo.className}`;
        
        // Update clinical interpretation
        clinicalTextDisplay.textContent = flowInfo.interpretation;
    }
    
    function getFlowTypeInfo(reynolds) {
        if (reynolds < 2000) {
            return {
                type: 'Laminar',
                className: 'flow-laminar',
                interpretation: 'Flujo estable y ordenado en capas paralelas. Condiciones normales para la mayoría de vasos sanguíneos. Pérdidas de presión predecibles según la ley de Poiseuille. No se esperan soplos cardíacos. Distribución uniforme del oxígeno y nutrientes. Menor estrés de cizallamiento en el endotelio vascular.'
            };
        } else if (reynolds >= 2000 && reynolds <= 4000) {
            return {
                type: 'Transición',
                className: 'flow-transition',
                interpretation: 'Flujo inestable que puede alternar entre patrones laminares y turbulentos. Zona crítica que requiere evaluación clínica cuidadosa. Posibles soplos intermitentes o de baja intensidad. Considerar factores como geometría vascular, pulsatilidad y condiciones patológicas locales. Monitorización con Doppler recomendada.'
            };
        } else {
            return {
                type: 'Turbulento',
                className: 'flow-turbulent',
                interpretation: 'Flujo caótico con formación de remolinos y mezcla completa. Pérdidas de presión significativamente elevadas. Soplos cardíacos audibles de intensidad proporcional al grado de turbulencia. Mayor estrés de cizallamiento puede contribuir a disfunción endotelial y aterogénesis. Requiere evaluación cardiológica especializada.'
            };
        }
    }
}

// Smooth Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation link
                updateActiveNavLink(this);
                
                // Add highlight effect to target section
                highlightSection(targetElement);
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function highlightSection(section) {
    // Add temporary highlight class
    section.classList.add('section-highlight');
    
    // Remove highlight after animation
    setTimeout(() => {
        section.classList.remove('section-highlight');
    }, 2000);
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Tooltip System for Technical Terms
function initializeTooltips() {
    const technicalTerms = {
        'Reynolds': 'Número adimensional que predice el régimen de flujo en función de las fuerzas inerciales vs. viscosas',
        'Poiseuille': 'Ley que describe el flujo laminar en tubos cilíndricos, válida para Re < 2000',
        'Doppler': 'Técnica de ultrasonido que mide la velocidad del flujo sanguíneo',
        'Hematocrito': 'Porcentaje del volumen sanguíneo ocupado por eritrocitos',
        'Viscosidad': 'Resistencia de un fluido a la deformación por esfuerzo cortante',
        'Turbulencia': 'Régimen de flujo caracterizado por fluctuaciones caóticas de velocidad',
        'Estenosis': 'Estrechez anormal de un vaso sanguíneo o válvula cardíaca',
        'Aterogénesis': 'Proceso de formación de placas ateroscleróticas en las arterias'
    };
    
    // Create tooltip elements for technical terms
    Object.keys(technicalTerms).forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        const sections = document.querySelectorAll('.section p, .section li');
        
        sections.forEach(element => {
            if (element.innerHTML.match(regex)) {
                element.innerHTML = element.innerHTML.replace(regex, 
                    `<span class="tooltip-term" data-tooltip="${technicalTerms[term]}">$&</span>`
                );
            }
        });
    });
    
    // Add tooltip functionality
    const tooltipTerms = document.querySelectorAll('.tooltip-term');
    let currentTooltip = null;
    
    tooltipTerms.forEach(term => {
        term.addEventListener('mouseenter', showTooltip);
        term.addEventListener('mouseleave', hideTooltip);
        term.addEventListener('click', toggleTooltip);
    });
    
    function showTooltip(e) {
        if (currentTooltip) {
            hideTooltip();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        currentTooltip = tooltip;
        
        // Animate tooltip
        requestAnimationFrame(() => {
            tooltip.classList.add('tooltip-visible');
        });
    }
    
    function hideTooltip() {
        if (currentTooltip) {
            currentTooltip.classList.remove('tooltip-visible');
            setTimeout(() => {
                if (currentTooltip && currentTooltip.parentNode) {
                    currentTooltip.parentNode.removeChild(currentTooltip);
                }
                currentTooltip = null;
            }, 300);
        }
    }
    
    function toggleTooltip(e) {
        e.preventDefault();
        if (currentTooltip) {
            hideTooltip();
        } else {
            showTooltip(e);
        }
    }
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced Table Interactions
function initializeTableInteractions() {
    const tables = document.querySelectorAll('.clinical-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('click', function() {
                // Highlight selected row
                rows.forEach(r => r.classList.remove('selected'));
                this.classList.add('selected');
                
                // Extract data from the row for calculator
                const cells = this.querySelectorAll('td');
                if (cells.length >= 4) {
                    const diameter = parseFloat(cells[1].textContent) || 0;
                    const velocity = parseFloat(cells[2].textContent) || 0;
                    
                    // Update calculator with selected values
                    updateCalculatorWithRowData(diameter, velocity);
                }
            });
        });
    });
}

function updateCalculatorWithRowData(diameter, velocity) {
    const diameterInput = document.getElementById('diameter');
    const velocityInput = document.getElementById('velocity');
    
    if (diameterInput && velocityInput) {
        diameterInput.value = diameter;
        velocityInput.value = velocity;
        
        // Trigger calculation update
        const event = new Event('input', { bubbles: true });
        diameterInput.dispatchEvent(event);
        
        // Smooth scroll to calculator
        const calculatorSection = document.getElementById('calculadora');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Form Validation for Calculator Inputs
function validateCalculatorInputs() {
    const inputs = document.querySelectorAll('.calculator-inputs input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearValidationError(this);
        });
    });
}

function validateInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.getAttribute('min')) || 0;
    const max = parseFloat(input.getAttribute('max')) || Infinity;
    
    let isValid = true;
    let errorMessage = '';
    
    if (isNaN(value)) {
        isValid = false;
        errorMessage = 'Debe ingresar un número válido';
    } else if (value < min) {
        isValid = false;
        errorMessage = `El valor debe ser mayor o igual a ${min}`;
    } else if (value > max) {
        isValid = false;
        errorMessage = `El valor debe ser menor o igual a ${max}`;
    }
    
    if (!isValid) {
        showValidationError(input, errorMessage);
    } else {
        clearValidationError(input);
    }
    
    return isValid;
}

function showValidationError(input, message) {
    clearValidationError(input);
    
    input.classList.add('input-error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

function clearValidationError(input) {
    input.classList.remove('input-error');
    
    const existingError = input.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.parentNode.removeChild(existingError);
    }
}

// Preset Values for Quick Testing
function addCalculatorPresets() {
    const calculatorContainer = document.querySelector('.calculator-inputs');
    
    if (calculatorContainer) {
        const presetContainer = document.createElement('div');
        presetContainer.className = 'preset-container';
        presetContainer.innerHTML = `
            <h4>Valores Predeterminados</h4>
            <div class="preset-buttons">
                <button class="preset-btn" data-preset="aorta-rest">Aorta en Reposo</button>
                <button class="preset-btn" data-preset="aorta-exercise">Aorta en Ejercicio</button>
                <button class="preset-btn" data-preset="carotid">Carótida Común</button>
                <button class="preset-btn" data-preset="stenosis">Estenosis Severa</button>
                <button class="preset-btn" data-preset="coronary">Arteria Coronaria</button>
            </div>
        `;
        
        calculatorContainer.appendChild(presetContainer);
        
        const presets = {
            'aorta-rest': { diameter: 25, velocity: 25, density: 1050, viscosity: 3.5 },
            'aorta-exercise': { diameter: 25, velocity: 60, density: 1050, viscosity: 3.5 },
            'carotid': { diameter: 7, velocity: 40, density: 1050, viscosity: 3.5 },
            'stenosis': { diameter: 5, velocity: 180, density: 1050, viscosity: 3.5 },
            'coronary': { diameter: 3, velocity: 20, density: 1050, viscosity: 3.5 }
        };
        
        // Add event listeners to preset buttons
        const presetButtons = presetContainer.querySelectorAll('.preset-btn');
        presetButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const presetName = this.getAttribute('data-preset');
                const presetValues = presets[presetName];
                
                if (presetValues) {
                    document.getElementById('diameter').value = presetValues.diameter;
                    document.getElementById('velocity').value = presetValues.velocity;
                    document.getElementById('density').value = presetValues.density;
                    document.getElementById('viscosity').value = presetValues.viscosity;
                    
                    // Trigger calculation
                    const event = new Event('input', { bubbles: true });
                    document.getElementById('diameter').dispatchEvent(event);
                    
                    // Highlight active preset
                    presetButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure all elements are rendered
    setTimeout(() => {
        initializeTableInteractions();
        validateCalculatorInputs();
        addCalculatorPresets();
    }, 100);
});

// Add CSS for additional interactive elements
const additionalStyles = `
    .tooltip {
        position: absolute;
        background-color: var(--text-dark);
        color: white;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        z-index: 1000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        max-width: 250px;
        text-align: center;
        box-shadow: var(--shadow-lg);
    }
    
    .tooltip-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .tooltip-term {
        cursor: help;
        border-bottom: 1px dotted var(--primary-blue);
        color: var(--primary-blue);
        font-weight: 500;
    }
    
    .tooltip-term:hover {
        background-color: rgba(46, 134, 171, 0.1);
        border-radius: var(--radius-sm);
        padding: 0 2px;
    }
    
    .section-highlight {
        animation: sectionHighlight 2s ease-in-out;
    }
    
    @keyframes sectionHighlight {
        0% { background-color: var(--white); }
        50% { background-color: rgba(46, 134, 171, 0.1); }
        100% { background-color: var(--white); }
    }
    
    .nav-link.active {
        background-color: rgba(255, 255, 255, 0.3);
        font-weight: 600;
    }
    
    .clinical-table tbody tr.selected {
        background-color: var(--light-blue) !important;
        font-weight: 500;
    }
    
    .clinical-table tbody tr {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .input-error {
        border-color: var(--accent-red) !important;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
    }
    
    .validation-error {
        color: var(--accent-red);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
        font-weight: 500;
    }
    
    .preset-container {
        margin-top: var(--spacing-xl);
        padding-top: var(--spacing-lg);
        border-top: 2px solid var(--light-blue);
    }
    
    .preset-container h4 {
        color: var(--primary-blue);
        margin-bottom: var(--spacing-md);
        text-align: center;
    }
    
    .preset-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        justify-content: center;
    }
    
    .preset-btn {
        background-color: var(--very-light-blue);
        border: 1px solid var(--light-blue);
        color: var(--primary-blue);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-size: var(--font-size-sm);
        transition: all 0.3s ease;
        font-weight: 500;
    }
    
    .preset-btn:hover {
        background-color: var(--light-blue);
        transform: translateY(-2px);
    }
    
    .preset-btn.active {
        background-color: var(--primary-blue);
        color: white;
    }
    
    @media (max-width: 768px) {
        .preset-buttons {
            flex-direction: column;
        }
        
        .preset-btn {
            width: 100%;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);