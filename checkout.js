document.addEventListener("DOMContentLoaded", function() {
    const listaCompra = document.getElementById("lista-compra");
    const totalCompra = document.getElementById("total-precio");
    const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrecio = 0;
    let mensajeCompra = "Hola, quisiera comprar:";

    carrito.forEach(producto => {
        // Crear elementos para el nombre, precio y foto del producto
        let item = document.createElement("li");
        let img = document.createElement("img");
        img.src = producto.imagen; // Asegúrate de almacenar la URL de la imagen en el carrito

        let nombre = document.createElement("span");
        nombre.textContent = producto.nombre;

        let precio = document.createElement("span");
        precio.textContent = ` - $${producto.precio}`;

        // Añadir imagen, nombre y precio al item
        item.appendChild(img);
        item.appendChild(nombre);
        item.appendChild(precio);
        listaCompra.appendChild(item);

        totalPrecio += producto.precio;
        mensajeCompra += ` ${producto.nombre} por $${producto.precio},`;
    });

    totalCompra.textContent = totalPrecio;

    finalizarCompraBtn.addEventListener("click", function() {
        const urlWhatsApp = `https://wa.me/5491144209603?text=${encodeURIComponent(mensajeCompra + " Total: $" + totalPrecio)}`;
        window.location.href = urlWhatsApp;
    });
});
