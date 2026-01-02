document.addEventListener('DOMContentLoaded', () => {

    // Video Data configuration
    const modules = [
        {
            id: 'm1',
            title: 'Bienvenida al Protocolo',
            lessons: [
                {
                    id: 'l1',
                    title: 'Comienza Aquí: Entendiendo la DE',
                    // Video: "Erectile Dysfunction | Causes and Treatment" by Centro Médico ABC
                    // Source: Spanish Medical Channel
                    youtubeId: 'dhXlNfAgdEE',
                    description: 'Una visión médica y holística sobre las verdaderas causas detrás de los problemas de erección. No estás solo en esto.',
                    type: 'video'
                }
            ]
        },
        {
            id: 'm2',
            title: 'Módulo 1: Fundamentos',
            lessons: [
                {
                    id: 'l2',
                    title: 'Anatomía y Ejercicios Kegel',
                    // Video: "Fortalecer el suelo pélvico masculino" (HARTMANN España)
                    youtubeId: 'Xk_B7y8eE3Q',
                    description: 'Clase magistral sobre cómo fortalecer el suelo pélvico para mejorar la potencia.',
                    type: 'video'
                },
                {
                    id: 'l3',
                    title: 'Nutrición Potenciadora',
                    // Video: "Potencia tu Erección de forma natural" (Nitric Oxide topic)
                    youtubeId: 'V5H6sC60OU',
                    description: 'Descubre los alimentos que aumentan el Óxido Nítrico naturalmente.',
                    type: 'video'
                }
            ]
        },
        {
            id: 'm3',
            title: 'Módulo 2: Ejercicios Prácticos',
            lessons: [
                {
                    id: 'l4',
                    title: 'Rutina Diaria de Kegel',
                    // Video: "EJERCICIOS DE KEGEL PARA HOMBRES" (WonderFit Spain)
                    youtubeId: 'VnJvI623FfE',
                    description: 'Una rutina práctica y guiada para realizar todos los días.',
                    type: 'video'
                },
                {
                    id: 'l5',
                    title: 'Tratamientos Médicos',
                    // Video: "Tratamiento de la disfunción eréctil" (PortalCLÍNIC)
                    youtubeId: 'sP6e-82WdTM',
                    description: 'Opciones de tratamientos médicos explicadas por expertos.',
                    type: 'video'
                }
            ]
        }
    ];

    const articleContent = {
        title: 'EL PROTOCOLO DE ORO: Bicarbonato de Sodio',
        html: `
            <h3>Introducción</h3>
            <p>El bicarbonato de sodio es un compuesto natural que, utilizado correctamente, puede ayudar a alcalinizar el cuerpo y potenciar la producción natural de Óxido Nítrico, el gas responsable de la vasodilatación necesaria para una erección firme.</p>
            
            <div class="warning-box">
                <strong>⚠️ ADVERTENCIA MÉDICA</strong>
                <p>No realices este protocolo si sufres de hipertensión severa, problemas renales o gastritis crónica. Consulta siempre a tu médico antes de iniciar. Dosis máxima diaria: 6g.</p>
            </div>

            <div class="highlight-box">
                <h4>🧪 La Mezcla Maestra</h4>
                <p>1/4 de cucharadita de Bicarbonato de Sodio (grado alimenticio) + 200ml de agua tibia.</p>
            </div>

            <h3>El Protocolo Paso a Paso</h3>
            <ol>
                <li><strong>La Toma Matutina (El Despertar):</strong> Bebe la mezcla en ayunas, estrictamente 30 minutos antes de tu primera comida. Esto prepara el ambiente alcalino para el día.</li>
                <li><strong>La Toma Nocturna (Manteinimiento):</strong> Bebe una segunda dosis 2 horas antes de dormir (y al menos 2 horas después de tu cena). Esto ayuda a la oxigenación nocturna.</li>
            </ol>

            <h3>El Ciclo 5x2</h3>
            <p>Para evitar que el cuerpo se acostumbre o se alcalinice en exceso, utilizaremos un ciclo:</p>
            <ul>
                <li><strong>Días ON:</strong> Realiza el protocolo por 5 días seguidos (ej. Lunes a Viernes).</li>
                <li><strong>Días OFF:</strong> Descansa completamente por 2 días (ej. Sábado y Domingo).</li>
            </ul>
            
            <h3>Consejos Adicionales</h3>
            <p>Combina este protocolo con los ejercicios de Kegel del Módulo 2 para potenciar los resultados hasta un 200%. Mantente hidratado durante todo el día.</p>
        `
    };

    // --- DOM Elements ---
    const moduleListEl = document.getElementById('module-list');
    const contentDisplayEl = document.getElementById('content-display');
    const breadcrumbModuleEl = document.getElementById('breadcrumb-module');
    const breadcrumbLessonEl = document.getElementById('breadcrumb-lesson');

    // Templates
    const videoTemplate = document.getElementById('video-template');
    const articleTemplate = document.getElementById('article-template');

    // State
    let activeLessonId = 'l1'; // Default start
    let currentYoutubeId = '';

    // --- init ---
    function init() {
        renderSidebar();
        loadLesson(activeLessonId); // Load first lesson by default
        setupEventListeners();
    }

    // --- Rendering ---
    function renderSidebar() {
        moduleListEl.innerHTML = '';

        modules.forEach(mod => {
            const modLi = document.createElement('li');
            modLi.innerHTML = `<div class="nav-section-title">${mod.title}</div>`;
            moduleListEl.appendChild(modLi);

            mod.lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.setAttribute('data-id', lesson.id);
                li.setAttribute('data-module', mod.title);

                // Active state check
                if (lesson.id === activeLessonId) li.classList.add('active');

                li.innerHTML = `
                    <a href="#" class="nav-link">
                        <i class="ph ph-play-circle"></i>
                        <span>${lesson.title}</span>
                    </a>
                `;

                li.addEventListener('click', (e) => {
                    e.preventDefault();
                    setActiveItem(lesson.id);
                    loadLesson(lesson.id);
                });

                moduleListEl.appendChild(li);
            });
        });
    }

    function setActiveItem(id) {
        // Remove active from all
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        // Add to current

        // Check if it's a special item (like bicarbonate) or regular lesson
        const specialItem = document.querySelector(`.nav-item[data-id="${id}"]`);
        if (specialItem) specialItem.classList.add('active');

        activeLessonId = id;
    }

    // --- Loading Content ---
    function loadLesson(lessonId) {
        // Find lesson data
        let lesson = null;
        let pModule = null;

        for (const m of modules) {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) {
                lesson = found;
                pModule = m;
                break;
            }
        }

        if (lesson) {
            // Update Breadcrumbs
            breadcrumbModuleEl.textContent = pModule.title;
            breadcrumbLessonEl.textContent = lesson.title;

            // Render Video Template
            contentDisplayEl.innerHTML = '';
            const clone = videoTemplate.content.cloneNode(true);

            clone.querySelector('.lesson-title').textContent = lesson.title;
            clone.querySelector('.lesson-description').textContent = lesson.description;
            clone.querySelector('.video-msg').textContent = `Haga clic para cargar el video: ${lesson.title}`;

            // Setup Video Click
            const placeholder = clone.querySelector('.video-placeholder-professional');
            const videoId = lesson.youtubeId; // Get real ID

            placeholder.addEventListener('click', () => {
                // Clear previous content
                placeholder.innerHTML = '';

                // Construct iframe
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '100%');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', 'true');

                placeholder.appendChild(iframe);
            });

            contentDisplayEl.appendChild(clone);
        }
    }

    function loadArticle() {
        breadcrumbModuleEl.textContent = 'Extras';
        breadcrumbLessonEl.textContent = 'Truco del Bicarbonato';

        contentDisplayEl.innerHTML = '';
        const clone = articleTemplate.content.cloneNode(true);

        clone.querySelector('.article-title').textContent = articleContent.title;
        clone.querySelector('.article-body').innerHTML = articleContent.html;

        contentDisplayEl.appendChild(clone);
    }

    // --- Navigation (Special Items) ---
    function setupEventListeners() {
        // Bicarbonate Link
        const bicarbLink = document.querySelector('.nav-item[data-id="bicarbonato"]');
        if (bicarbLink) {
            bicarbLink.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveItem('bicarbonato');
                loadArticle();
            });
        }

        // Mobile Toggle
        const toggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        if (toggle) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                // Simple logic for sidebar transform
                if (sidebar.classList.contains('open')) {
                    sidebar.style.transform = 'translateX(100%)';
                } else {
                    sidebar.style.transform = 'translateX(0)';
                }
            });
        }
    }

    // Init
    init();

});
