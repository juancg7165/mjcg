function agregarAlCarrito(nombreProducto, precioProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Verificamos si el artículo ya existe en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        // Si existe, incrementamos la cantidad y actualizamos el precio total
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, lo agregamos con una cantidad de 1
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
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
        
        // Mostrar nombre y cantidad del artículo
        item.textContent = `${producto.nombre} (${producto.cantidad}) - $${producto.precio * producto.cantidad}`;

        // Botón de eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        item.appendChild(botonEliminar);

        // Botones de + y -
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

// Función para cambiar la cantidad de un artículo
function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito[index];

    if (producto.cantidad + cambio > 0) {
        producto.cantidad += cambio;
    } else {
        // Si la cantidad es 1 o menos, lo eliminamos
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
