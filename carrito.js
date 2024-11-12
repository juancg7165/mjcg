function agregarAlCarrito(nombreProducto, precioProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalPrecio = 0; 
    listaCarrito.innerHTML = ""; 

    if (carrito.length === 1) {
        // Mostrar el único artículo en el carrito
        let producto = carrito[0];
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(0);
        item.appendChild(botonEliminar);
        
        listaCarrito.appendChild(item);
    } else if (carrito.length > 1) {
        // Mostrar "..." cuando hay más de un artículo
        let item = document.createElement("li");
        item.textContent = "(...)";
        listaCarrito.appendChild(item);
    }

    // Añadir el botón "Ver compra" en todos los casos cuando el carrito no está vacío
    if (carrito.length > 0) {
        let botonVerCompra = document.createElement("button");
        botonVerCompra.textContent = "Ver compra";
        botonVerCompra.onclick = () => window.location.href = "compra.html";
        listaCarrito.appendChild(botonVerCompra);
    }

    // Calcular y mostrar el total del carrito
    carrito.forEach(producto => {
        totalPrecio += producto.precio;
    });
    document.getElementById("total-precio").textContent = totalPrecio;

    // Actualizar el título del carrito y la visibilidad
    document.querySelector("h2").textContent = `Carrito (${carrito.length})`;
    document.getElementById("carrito-contenido").style.display = carrito.length > 0 ? "block" : "none";
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

document.querySelector("h2").onclick = function() {
    let contenido = document.getElementById("carrito-contenido");
    contenido.style.display = contenido.style.display === "none" ? "block" : "none";
}

window.onload = actualizarCarrito;
