
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
document.getElementById("total-precio").textContent = totalPrecio;

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
