// CONFIGURACIÓN VISUAL
const root = document.documentElement;
const moodTitle = document.getElementById('moodTitle');
const activityText = document.getElementById('activityText');
const statusBadge = document.querySelector('.status-badge');

// Los 3 estados del bot (Color, Nombre, Texto de Actividad)
const STATES = [
    {
        color: '#00f3ff', // Cyan (Chill)
        name: 'CHILL',
        activity: 'ESTABLE'
    },
    {
        color: '#ff4d00', // Naranja (Hype)
        name: 'HYPE',
        activity: 'ALTA'
    },
    {
        color: '#ff0000', // Rojo (Strict)
        name: 'STRICT',
        activity: 'CRÍTICA'
    }
];

let currentIndex = 0;

function cycleMood() {
    // 1. Obtener el estado actual
    const state = STATES[currentIndex];

    // 2. Aplicar Color (CSS Variable)
    // Gracias a la transición en el CSS, esto hará un efecto de "barrido"
    root.style.setProperty('--primary', state.color);

    // 3. Cambiar Textos
    moodTitle.innerText = state.name;
    activityText.innerText = state.activity;
    
    // 4. Cambiar color del Badge
    statusBadge.style.borderColor = state.color;
    statusBadge.style.color = state.color;
    statusBadge.querySelector('.dot').style.backgroundColor = state.color;
    statusBadge.querySelector('.dot').style.boxShadow = `0 0 10px ${state.color}`;

    // 5. Preparar el siguiente (Ciclo infinito 0 -> 1 -> 2 -> 0)
    currentIndex = (currentIndex + 1) % STATES.length;
}

// Iniciar el ciclo
// Se ejecuta inmediatamente y luego cada 3000ms (3 segundos)
cycleMood();
setInterval(cycleMood, 3000);

console.log('Modo Simulación Visual: ACTIVADO');