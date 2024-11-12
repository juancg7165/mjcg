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
    let totalPrecio = 0;
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button onclick="sumarCantidad(${index})">+</button>
            <button onclick="restarCantidad(${index})">-</button>
        `;

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);

        listaCarrito.appendChild(item);

        totalPrecio += producto.precio * producto.cantidad;
    });

    document.getElementById("total-precio").textContent = `Total: $${totalPrecio}`;
    document.getElementById("ver-compra-btn").style.display = carrito.length > 0 ? "block" : "none";
    document.getElementById("carrito-contenedor").style.display = carrito.length > 0 ? "block" : "none";
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
let verCompraBtn = document.getElementById("ver-compra-btn");
verCompraBtn.style.display = carrito.length > 0 ? "block" : "none";
verCompraBtn.onclick = () => window.location.href = "compra.html";

window.onload = actualizarCarrito;
