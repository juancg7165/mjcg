function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1, imagen: imagenProducto });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    let totalPrecio = 0;

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button onclick="sumarCantidad(${index})">+</button>
            <button onclick="restarCantidad(${index})">-</button>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;

        listaCarrito.appendChild(item);
        totalPrecio += producto.precio * producto.cantidad;
    });

    document.getElementById("total-precio").textContent = `Total: $${totalPrecio}`;
    let verCompraBtn = document.getElementById("ver-compra-btn");
    verCompraBtn.style.display = carrito.length > 0 ? "block" : "none";
    verCompraBtn.onclick = () => window.location.href = "compra.html";
    document.getElementById("carrito-contenedor").style.display = carrito.length > 0 ? "block" : "none";

    document.querySelector("h2").textContent = carrito.length === 1 ? 
        `Carrito (1) - ${carrito[0].nombre} - $${carrito[0].precio}` :
        `Carrito (${carrito.length}) - (...)`;
}

function sumarCantidad(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function restarCantidad(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
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

document.addEventListener("DOMContentLoaded", actualizarCarrito);
window.onload = actualizarCarrito;
