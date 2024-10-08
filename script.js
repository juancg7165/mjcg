// Ejemplo de script para el slider
let currentSlide = 0;
const slides = document.querySelectorAll('.jpg-slider li'); // Selecciona todas las imágenes del slider
const totalSlides = slides.length;

// Función para mostrar el slide actual
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none'; // Muestra solo el slide actual
    });
}

// Función para avanzar al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Avanza al siguiente slide
    showSlide(currentSlide);
}

// Inicia el slider mostrando el primer slide
showSlide(currentSlide);

// Cambia de slide cada 3 segundos
setInterval(nextSlide, 3000);
