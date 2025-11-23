document.addEventListener('DOMContentLoaded', () => {
    const videoInput = document.getElementById('video-input');
    const videoPlayer = document.getElementById('video-preview');
    const noVideoMsg = document.getElementById('no-video-msg');
    const btnProcess = document.getElementById('btn-process');

    // 1. Manejo de selección de archivo
    videoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoPlayer.src = fileURL;
            
            // Mostrar video, ocultar mensaje gris
            videoPlayer.style.display = 'block';
            noVideoMsg.style.display = 'none';
        }
    });

    // 2. Botón Procesar
    btnProcess.addEventListener('click', () => {
        // Validación: ¿Hay video?
        if (!videoPlayer.src || videoPlayer.style.display === 'none') {
            alert('Por favor, selecciona un video primero.');
            return;
        }

        // Simulación de procesamiento
        // Aquí luego conectarás con tu backend real
        console.log("Enviando video a procesar...");

        // REDIRECCIÓN:
        window.location.href = '../results/results.html'; 
    });
});