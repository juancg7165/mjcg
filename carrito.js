function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificamos si el artículo ya existe en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        // Si existe, incrementamos la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, lo agregamos con una cantidad de 1
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1, imagen: imagenProducto });
    }

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}


function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalPrecio = 0;
    listaCarrito.innerHTML = ""; 

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);
        listaCarrito.appendChild(item);
        totalPrecio += producto.precio;
    });

    document.getElementById("total-precio").textContent = `Total: $${totalPrecio}`;

    let verCompraBtn = document.getElementById("ver-compra-btn");
    verCompraBtn.style.display = carrito.length > 0 ? "block" : "none";
    verCompraBtn.onclick = () => window.location.href = "../compra.html";

    document.getElementById("carrito-contenedor").style.display = carrito.length > 0 ? "block" : "none";

    document.querySelector("h2").textContent = carrito.length === 1 ? 
        `Carrito (1) - ${carrito[0].nombre} - $${carrito[0].precio}` :
        `Carrito (${carrito.length}) - (...)`;
}

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

window.onload = actualizarCarrito;
