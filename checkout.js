document.addEventListener("DOMContentLoaded", function() {
    const listaCompra = document.getElementById("lista-compra");
    const totalCompra = document.getElementById("total-precio");
    const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrecio = 0;
    let mensajeCompra = "Hola, me gustaría comprar:";

    carrito.forEach(producto => {
        // Crear elementos para el nombre, precio y foto del producto
        let item = document.createElement("li");
    
        let img = document.createElement("img");
        img.src = producto.imagen; // URL de la imagen almacenada en el carrito
    
        let nombre = document.createElement("span");
        nombre.textContent = producto.nombre;
    
        let precio = document.createElement("span");
        precio.textContent = ` - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`;
    
        // Añadir imagen, nombre y precio al item
        item.appendChild(img);
        item.appendChild(nombre);
        item.appendChild(precio);
        listaCompra.appendChild(item);
    
        totalPrecio += producto.precio * producto.cantidad;  // Calcular total según cantidad
        mensajeCompra += ` ${producto.nombre} (x${producto.cantidad}) por $${producto.precio * producto.cantidad},`;
    });
    
    totalCompra.textContent = `Total: $${totalPrecio}`;

    finalizarCompraBtn.addEventListener("click", function() {
        localStorage.removeItem("carrito"); //limpiar el carrito previo a mandarme a wsp
        const urlWhatsApp = `https://wa.me/5491144209603?text=${encodeURIComponent(mensajeCompra + " Total: $" + totalPrecio)}`;
        window.location.href = urlWhatsApp;
    });
});
