# 🩸 VENA - Plataforma Integral de Cirugía Vascular

**Repositorio de herramientas clínicas especializadas en cirugía vascular y medicina endovascular**

## 📋 Descripción del Proyecto

VENA es una plataforma web integral desarrollada para profesionales de la cirugía vascular que incluye calculadoras médicas, cuestionarios especializados, sistemas de evaluación y guías clínicas basadas en evidencia científica. La plataforma está diseñada para facilitar la toma de decisiones clínicas y mejorar la atención al paciente vascular.

## 🏥 Módulos Especializados

### 🔬 **Evaluación y Diagnóstico**
- **[Aneurismas Venosos](./aneurismas-venosos/)** - Gestión completa de aneurismas venosos raros
- **[Tipos de Úlcera](./tipos-ulcera/)** - Clasificación y tratamiento diferencial
- **[Vasculitis General](./vasculitis-general/)** - Diagnóstico integral de vasculitis
- **[Vasculitis](./vasculitis/)** - Herramientas diagnósticas específicas

### 📊 **Escalas y Puntuaciones**
- **[Score Villalta](./villalta/)** - Evaluación síndrome post-trombótico
- **[VCSS](./vcss/)** - Venous Clinical Severity Score
- **[Score Caprini](./caprini/)** - Evaluación riesgo trombótico
- **[Score Fragilidad](./score-fragilidad/)** - Valoración fragilidad perioperatoria
- **[Score Sangrado](./score-sangrado/)** - Evaluación riesgo hemorrágico
- **[Índice Reynolds](./indice-raynolds/)** - Predicción riesgo cardiovascular

### 🩺 **Herramientas Clínicas**
- **[AngioJet](./angiojet/)** - Sistema completo trombectomía reolítica
- **[TVP](./tvp/)** - Manejo integral trombosis venosa profunda
- **[Stent May-Turner](./stent-may-turner/)** - Tratamiento síndrome compresivo
- **[Capacidad Funcional Metabólica](./cap-func-met/)** - Evaluación preoperatoria

### 📝 **Cuestionarios Especializados**
- **[Cuestionario Várices](./cuestionario-varices/)** - Evaluación clínica várices
- **[VVSymQ](./cuestionario-varices-VVSymQ/)** - Venous VQoL Symptoms Questionnaire
- **[Linfedema Recursos](./linfedema-recursos-esp/)** - Herramientas manejo linfedema
- **[Selección Apósitos](./sele-aposito-cura/)** - Guía tratamiento heridas

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Estilos:** CSS Grid, Flexbox, Responsive Design
- **Funcionalidad:** Vanilla JavaScript, LocalStorage
- **Compatibilidad:** Cross-browser, Mobile-first

## 📱 Características Técnicas

- ✅ **Diseño Responsive** - Optimizado para dispositivos móviles y tablets
- ✅ **Interfaz Intuitiva** - Experiencia de usuario profesional
- ✅ **Cálculos Automáticos** - Algoritmos médicos validados
- ✅ **Almacenamiento Local** - Persistencia de datos del paciente
- ✅ **Modo Offline** - Funcionalidad sin conexión a internet
- ✅ **Exportación PDF** - Reportes clínicos profesionales

## 🚀 Instalación y Uso

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/rico100100/vena.git

# Navegar al directorio
cd vena

# Abrir index.html en navegador
open index.html
```

### Uso Web Directo
Cada módulo puede ejecutarse independientemente abriendo su archivo `index.html` correspondiente.

## 📖 Guía de Navegación

### Estructura de Cada Módulo
```
modulo/
├── index.html          # Interfaz principal
├── style.css          # Estilos específicos
├── app.js             # Lógica JavaScript
└── assets/            # Recursos adicionales
```

### Acceso Rápido
- **Módulos de Evaluación:** Diagnóstico y clasificación
- **Calculadoras:** Puntuaciones y escalas validadas
- **Cuestionarios:** Evaluación sintomática estructurada
- **Guías Clínicas:** Protocolos basados en evidencia

## 🎯 Público Objetivo

- **Cirujanos Vasculares**
- **Especialistas en Medicina Vascular**
- **Residentes de Cirugía**
- **Enfermería Especializada**
- **Estudiantes de Medicina**

## 📊 Evidencia Científica

Todas las calculadoras y algoritmos están basados en:
- Guías clínicas internacionales (ESC, AHA, SVS)
- Meta-análisis y revisiones sistemáticas
- Estudios prospectivos multicéntricos
- Consensos de sociedades científicas

## 🔐 Consideraciones Éticas

- **Confidencialidad:** Los datos no se transmiten externamente
- **Privacidad:** Almacenamiento local únicamente
- **Responsabilidad:** Herramienta de apoyo, no reemplaza criterio clínico
- **Validación:** Siempre verificar resultados con juicio médico

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 🏆 Reconocimientos

Desarrollado por profesionales médicos para profesionales médicos, con el objetivo de mejorar la calidad asistencial en cirugía vascular.

---

**⚠️ Descargo de Responsabilidad:** Esta herramienta está diseñada como apoyo clínico. Siempre consulte las guías clínicas actuales y use su criterio médico profesional para la toma de decisiones.
