document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos del DOM
    const btnDownload = document.getElementById('btn-download');
    const translationText = document.getElementById('translation-text');
    const videoElement = document.getElementById('result-video');
    const placeholder = document.getElementById('video-placeholder');

    // SIMULACIÓN: Cargar un video de ejemplo (ya que no tenemos backend aún)
    // En el futuro, aquí leerías la respuesta del servidor.
    // Por ahora, ocultamos el placeholder y mostramos un "video" dummy si quisieras,
    // o dejamos el placeholder si no hay video real.
    
    // Si quisieras probar con un video real, descomenta esto:
    // videoElement.src = "../assets/video_prueba.mp4"; 
    // placeholder.style.display = "none";

    
    // --- FUNCIONALIDAD: DESCARGAR TXT ---
    btnDownload.addEventListener('click', () => {
        // 1. Obtener el texto
        const textToSave = translationText.innerText;
        
        // 2. Crear un objeto Blob (como un archivo en memoria)
        const blob = new Blob([textToSave], { type: 'text/plain' });
        
        // 3. Crear una URL para ese archivo
        const url = URL.createObjectURL(blob);
        
        // 4. Crear un enlace temporal invisible para hacer clic
        const a = document.createElement('a');
        a.href = url;
        a.download = 'traduccion_señas.txt'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        
        // 5. Limpieza
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

});