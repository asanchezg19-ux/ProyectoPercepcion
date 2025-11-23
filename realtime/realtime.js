document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.querySelector('.camera-feed');
    const detectedSignElement = document.querySelector('.detected-sign');
    const translationOutput = document.querySelector('.translation-output');
    const startDetectionBtn = document.getElementById('startDetection');
    const stopDetectionBtn = document.getElementById('stopDetection');
    const clearTextBtn = document.getElementById('clearText');
    const goBackBtn = document.getElementById('goBack');

    let videoStream; // Para almacenar la transmisión de la cámara
    let detectionInterval; // Para el intervalo de detección (simulado)

    // --- Funciones de Interfaz ---

    function updateDetectedSign(sign) {
        detectedSignElement.textContent = `Seña detectada: ${sign}`;
    }

    function appendTranslation(text) {
        translationOutput.innerHTML += `${text} `;
        translationOutput.scrollTop = translationOutput.scrollHeight; // Desplazar al final
    }

    function clearTranslation() {
        translationOutput.textContent = '';
        updateDetectedSign('—');
    }

    // --- Lógica de la Cámara ---

    async function startCamera() {
        try {
            // Solicitar acceso a la cámara
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoStream = stream;

            // Crear un elemento de video y asignarle el stream
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            videoElement.playsInline = true; // Importante para iOS

            // Reemplazar el placeholder con el video de la cámara
            cameraFeed.innerHTML = ''; // Limpiar el contenido actual
            cameraFeed.appendChild(videoElement);

            // Asegurar que el video se ajuste
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover'; // Asegura que el video llene el contenedor
            videoElement.style.borderRadius = '5px';

            console.log("Cámara iniciada.");
        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
            cameraFeed.innerHTML = '<p style="color: red;">Error: No se pudo acceder a la cámara. Asegúrate de haber dado permiso.</p>';
        }
    }

    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
            cameraFeed.innerHTML = '<img src="https://via.placeholder.com/400x250?text=Webcam+Feed" alt="Webcam Feed" class="webcam-placeholder">';
            console.log("Cámara detenida.");
        }
    }

    // --- Lógica de Detección (Simulada) ---

    function startDetection() {
        // Detener la detección si ya está corriendo
        stopDetection();
        clearTranslation();
        startCamera(); // Iniciar la cámara al iniciar la detección

        // Simulación de detección de señas cada 2 segundos
        let signs = ['Hola', 'Gracias', 'Por favor', 'Sí', 'No', 'Ayuda'];
        let translationWords = ['Hello', 'Thank you', 'Please', 'Yes', 'No', 'Help'];
        let signIndex = 0;

        detectionInterval = setInterval(() => {
            const currentSign = signs[signIndex % signs.length];
            const currentTranslation = translationWords[signIndex % translationWords.length];

            updateDetectedSign(currentSign);
            appendTranslation(currentTranslation);

            signIndex++;
        }, 2000); // Detecta una nueva seña cada 2 segundos

        console.log("Detección iniciada.");
        startDetectionBtn.disabled = true;
        stopDetectionBtn.disabled = false;
    }

    function stopDetection() {
        if (detectionInterval) {
            clearInterval(detectionInterval);
            detectionInterval = null;
            console.log("Detección detenida.");
        }
        stopCamera(); // Detener la cámara al detener la detección
        startDetectionBtn.disabled = false;
        stopDetectionBtn.disabled = true;
    }

    // --- Event Listeners ---

    startDetectionBtn.addEventListener('click', startDetection);
    stopDetectionBtn.addEventListener('click', stopDetection);
    clearTextBtn.addEventListener('click', clearTranslation);

    goBackBtn.addEventListener('click', () => {
        stopDetection(); // Asegúrate de detener todo antes de volver
        window.location.href = '../home/index.html'; // Ajusta la ruta a tu página de inicio si es diferente
    });

    // Deshabilitar el botón de detener al inicio
    stopDetectionBtn.disabled = true;

    // Puedes iniciar la cámara automáticamente o esperar a que el usuario haga clic en "Iniciar detección"
    // startCamera();
});

// Función de ejemplo de utils.js (si existiera)
// function logMessage(message) {
//     console.log(`[UTIL] ${message}`);
// }