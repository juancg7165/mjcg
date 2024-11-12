function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el artículo ya existe en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        // Incrementar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Agregar nuevo artículo con cantidad inicial de 1
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1, imagen: imagenProducto });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalPrecio = 0;
    listaCarrito.innerHTML = ""; // Limpiar lista

    

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        
        // Mostrar nombre, precio y cantidad del producto
        item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

        // Botón para reducir cantidad
        let botonRestar = document.createElement("button");
        botonRestar.textContent = "-";
        botonRestar.onclick = () => {
            if (producto.cantidad > 1) {
                producto.cantidad -= 1;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            }
        };
        item.appendChild(botonRestar);

        // Botón para incrementar cantidad
        let botonSumar = document.createElement("button");
        botonSumar.textContent = "+";
        botonSumar.onclick = () => {
            producto.cantidad += 1;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        };
        item.appendChild(botonSumar);

        // Botón para eliminar el producto
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);

        listaCarrito.appendChild(item);

        // Calcular total según cantidad
        totalPrecio += producto.precio * producto.cantidad;
    });

    // Actualizar el total en pantalla
    document.getElementById("total-precio").textContent = `Total: $${totalPrecio}`;

    // Mostrar u ocultar botón "Ver compra"
    let verCompraBtn = document.getElementById("ver-compra-btn");
    verCompraBtn.style.display = carrito.length > 0 ? "block" : "none";
    verCompraBtn.onclick = () => window.location.href = "../compra.html";
    document.getElementById("carrito-contenedor").style.display = carrito.length > 0 ? "block" : "none";

    document.querySelector("h2").textContent = carrito.length === 1 ? 
        `Carrito (1) - ${carrito[0].nombre} - $${carrito[0].precio}` :
        `Carrito (${carrito.length}) - (...)`;
}

// Función para eliminar artículo del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
document.querySelector("h2").onclick = function() {
    let contenido = document.getElementById("carrito-contenedor");
    contenido.style.display = contenido.style.display === "none" ? "block" : "none";
};
document.addEventListener("DOMContentLoaded", actualizarCarrito);

window.onload = actualizarCarrito;
