function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    let productoExistente = carrito.find(item => item.nombre === nombreProducto && item.imagen === imagenProducto);

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

        let img = document.createElement("img");
        img.src = producto.imagen; 

        item.appendChild(img); 
        item.appendChild(document.createTextNode(`${producto.nombre} (${producto.cantidad}) - $${producto.precio * producto.cantidad}`));

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);

        let botonMenos = document.createElement("button");
        botonMenos.textContent = "-";
        botonMenos.onclick = () => cambiarCantidad(index, -1);
        
        let botonMas = document.createElement("button");
        botonMas.textContent = "+";
        botonMas.onclick = () => cambiarCantidad(index, 1);
        
        item.appendChild(botonMenos);
        item.appendChild(botonMas);

        listaCarrito.appendChild(item);

        totalPrecio += producto.precio * producto.cantidad;
    });

    document.getElementById("total-precio").textContent = `Total: $${totalPrecio}`;

    document.querySelector("h2").textContent = `Carrito (${carrito.length})`;

    document.getElementById("carrito-contenido").style.display = carrito.length > 0 ? "block" : "none";
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito[index];

    if (producto.cantidad + cambio > 0) {
        producto.cantidad += cambio;
    } else {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

document.querySelector("h2").onclick = function() {
    let contenido = document.getElementById("carrito-contenido");
    contenido.style.display = contenido.style.display === "none" ? "block" : "none";
}

window.onload = actualizarCarrito;
