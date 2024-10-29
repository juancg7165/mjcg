// carrito.js

// Función para agregar al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalPrecio = 0; // Variable para calcular el total
    listaCarrito.innerHTML = ""; // Limpia la lista antes de actualizar

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);
        listaCarrito.appendChild(item);

        // Acumula el precio para el total
        totalPrecio += producto.precio;
    });

    // Actualiza el total en el HTML
    document.getElementById("total-precio").textContent = totalPrecio;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Llama a actualizarCarrito al cargar la página para mostrar los elementos guardados
window.onload = actualizarCarrito;
