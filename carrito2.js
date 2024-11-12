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
    verCompraBtn.onclick = () => window.location.href = "compra.html";

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
