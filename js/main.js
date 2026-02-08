document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    const btnEntrar = document.getElementById('btn-entrar');

    btnEntrar.addEventListener('click', () => {
        // 1. Iniciamos la música (la interacción del usuario ya es válida)
        playTrack(); 
        
        // 2. Ocultamos el splash
        splash.classList.add('splash-hidden');
        
        // 3. (Opcional) Guardamos en sessionStorage para que si recargan no aparezca de nuevo
        sessionStorage.setItem('splashVisto', 'true');
    });

    // Si ya lo vio en esta sesión, lo ocultamos directo
    if(sessionStorage.getItem('splashVisto') === 'true') {
        splash.style.display = 'none';
    }
});



const playlist = [
    {
        title: "Floricienta - Hay Cuento",
        file: "assets/audio/1-Floricienta-HayCuento.mp3"
    },
    {
        title: "Camilo - Índigo",
        file: "assets/audio/2-Camilo-Indigo.mp3"
    },
    {
        title: "Bruno Mars - Marry You",
        file: "assets/audio/3-BrunoMars-MarryYou.mp3"
    },
    {
        title: "Maria Becerra - Desafiando Destino",
        file: "assets/audio/4-MariaBecerra-DesafiandoDestino.mp3"
    }
];

let currentTrackIndex = 0;
const music = document.getElementById('bg-music');
const playBtn = document.getElementById('music-control');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const musicIcon = document.getElementById('music-icon');

function loadTrack(index) {
    const track = playlist[index];
    music.src = track.file;
    trackTitle.textContent = track.title;
}

function playTrack() {
    music.play();
    musicIcon.textContent = '⏸️';
}

function pauseTrack() {
    music.pause();
    musicIcon.textContent = '▶️';
}

// Evento Play/Pause
playBtn.addEventListener('click', () => {
    if (music.paused) playTrack();
    else pauseTrack();
});

// Evento Siguiente
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

// Evento Anterior
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

// Cargar la primera canción al iniciar
loadTrack(currentTrackIndex);

// Evento para que cuando termine una canción, pase automáticamente a la siguiente
music.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});



function enviarConfirmacion() {
    const nombre = document.getElementById('rsvp-name').value;
    const telefono = "5491126596458"; // Tu número aquí

    if (nombre.trim() === "") {
        alert("Por favor, dinos tu nombre para saber quién eres.");
        return;
    }

    // Formateamos el mensaje para que sea legible
    let mensaje = `¡Hola! Confirmo mi asistencia al Baby Shower de Gio 👶🍯\n\n`;
    mensaje += `*Nombre:* ${nombre}\n`;
    mensaje += `\n¡Nos vemos pronto!`;

    // Codificamos el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Redirigimos a WhatsApp
    window.open(`https://wa.me/${telefono}?text=${mensajeCodificado}`, '_blank');
}

// Variable para controlar que solo se dispare una vez
let musicStarted = false;

function iniciarMusicaAutomaticamente() {
    if (!musicStarted) {
        playTrack(); // Llama a tu función existente
        musicStarted = true;
        // Removemos los listeners para no saturar
        document.removeEventListener('click', iniciarMusicaAutomaticamente);
        document.removeEventListener('scroll', iniciarMusicaAutomaticamente);
        document.removeEventListener('touchstart', iniciarMusicaAutomaticamente);
    }
}

// Escuchamos cualquier interacción inicial del usuario
document.addEventListener('click', iniciarMusicaAutomaticamente);
document.addEventListener('scroll', iniciarMusicaAutomaticamente);
document.addEventListener('touchstart', iniciarMusicaAutomaticamente);