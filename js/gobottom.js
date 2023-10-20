document.querySelector('.go-bottom-contenedor').addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
// Escuchar el evento de desplazamiento (scroll)
window.onscroll = function() {
    var goBottomButton = document.querySelector('.go-bottom-contenedor');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 100) {
        goBottomButton.classList.remove('show'); // Ocultar el botón hacia abajo
    } else {
        goBottomButton.classList.add('show'); // Mostrar el botón hacia abajo al volver al comienzo
    }
};
