// CONFIGURACIÓN DE SUPABASE
// ⚠️ PEGA AQUÍ TUS CREDENCIALES REALES DEL .ENV
const SUPABASE_URL = 'https://oyjuqkelpblmifmegoiv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95anVxa2VscGJsbWlmbWVnb2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MDM3MzUsImV4cCI6MjA4MDM3OTczNX0.np-WzT_4zp074VKL6jWF783PYe-jb82SJmYe2Yq6OOg';

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// Referencias al HTML
const statusText = document.getElementById('statusText');
const statusBadge = document.getElementById('statusBadge');
const activityVal = document.getElementById('activityVal');
const moodVal = document.getElementById('moodVal');
const root = document.documentElement; 

// Colores del Mood
const MOOD_COLORS = {
    chill: '#00f3ff', // Cian
    hype: '#ff4d00',  // Naranja
    strict: '#ff0000' // Rojo
};

// Función que actualiza la pantalla
function updateUI(data) {
    if (!data) return;

    const mood = data.current_mood || 'chill';
    const score = data.activity_score || 0;
    const color = MOOD_COLORS[mood] || MOOD_COLORS.chill;

    // Actualizar Textos
    statusText.innerText = 'ONLINE';
    moodVal.innerText = mood.toUpperCase();
    activityVal.innerText = score + '%';
    
    // Cambiar color principal de la web (Variables CSS)
    root.style.setProperty('--primary', color);
    
    // Cambiar borde del badge
    statusBadge.style.borderColor = color;
    statusBadge.style.color = color;
    statusBadge.querySelector('.dot').style.backgroundColor = color;
    statusBadge.querySelector('.dot').style.boxShadow = `0 0 10px ${color}`;
}

// 1. Carga Inicial (Busca la red global)
async function init() {
    console.log('Iniciando conexión a Titan Network...');
    
    // Buscamos la fila GLOBAL_NETWORK que creamos en SQL
    const { data, error } = await client
        .from('ServerPulse')
        .select('*')
        .eq('guild_id', 'GLOBAL_NETWORK')
        .single();

    if (data) {
        updateUI(data);
    } else {
        console.warn('Esperando datos de la red...');
        statusText.innerText = 'ESPERANDO SEÑAL...';
    }
}

// 2. Escuchar cambios en tiempo real
const channel = client
    .channel('landing-page-global')
    .on(
        'postgres_changes', 
        { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'ServerPulse',
            filter: 'guild_id=eq.GLOBAL_NETWORK' // Solo escucha la red global
        }, 
        (payload) => {
            console.log('⚡ Actualización recibida:', payload.new);
            updateUI(payload.new);
        }
    )
    .subscribe();

// Arrancar
init();