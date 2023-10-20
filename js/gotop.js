document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar u ocultar el botón "Ir hacia arriba"
    function toggleGoTopButton() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
        var goTopButton = document.querySelector('.go-top-contenedor');

        if (scrollPosition > 100) {
            goTopButton.classList.add('show');
        } else {
            goTopButton.classList.remove('show');
        }
    }

    // Función para mostrar u ocultar el botón "Ir hacia abajo"
    function toggleGoBottomButton() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
        var goBottomButton = document.querySelector('.go-bottom-contenedor');

        if (scrollPosition < 100) {
            goBottomButton.classList.add('show');
        } else {
            goBottomButton.classList.remove('show');
        }
    }

// Asignar las funciones a los eventos onscroll
window.addEventListener('scroll', function() {
    toggleGoTopButton();
    toggleGoBottomButton();
});

// Evento para ir hacia arriba
document.querySelector('.go-top-contenedor')
    .addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

// Evento para ir hacia abajo
document.querySelector('.go-bottom-contenedor')
    .addEventListener('click', () => {
        var scrollHeight = document.body.scrollHeight;
        var windowHeight = window.innerHeight;
        var scrollableDistance = scrollHeight - windowHeight;

        window.scrollTo({
            top: scrollableDistance,
            behavior: 'smooth'
        });
    });
});