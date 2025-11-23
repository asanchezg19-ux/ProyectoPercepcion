document.addEventListener('DOMContentLoaded', () => {
    const btnAbout = document.getElementById('btn-about');

    if (btnAbout) {
        btnAbout.addEventListener('click', (e) => {
            // Esta línea evita que el enlace '#' recargue la página o salte al inicio
            e.preventDefault(); 

            // Aquí tu lógica (por ahora un alert)
            alert('Proyecto de Percepción Computacional - UPAO\n\nIntegrantes:\n- Sanchez Vargas, Adrian Olaf\n- Sanchez Guzman Ana Cristina\n- Mendoza Bacilio, Brayan Daniel\n- Llaure Calipuy, Oscar\n- Vera Romero, Vanesa');
        });
    }
});