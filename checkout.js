document.addEventListener("DOMContentLoaded", function() {
    const listaCompra = document.getElementById("lista-compra");
    const totalCompra = document.getElementById("total-precio");
    const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrecio = 0;
    let mensajeCompra = "Hola, me gustaría comprar:";

    carrito.forEach(producto => {
        let item = document.createElement("li");
    
        let img = document.createElement("img");
        img.src = producto.imagen; 
    
        let nombre = document.createElement("span");
        nombre.textContent = producto.nombre;
    
        let precio = document.createElement("span");
        precio.textContent = ` - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`;
    
        item.appendChild(img);
        item.appendChild(nombre);
        item.appendChild(precio);
        listaCompra.appendChild(item);
    
        totalPrecio += producto.precio * producto.cantidad;  
        mensajeCompra += ` ${producto.nombre} (x${producto.cantidad}) por $${producto.precio * producto.cantidad},`;
    });
    
    totalCompra.textContent = `Total: $${totalPrecio}`;

    document.getElementById('descargarPedido').addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const pedidoCustom = JSON.parse(localStorage.getItem('pedido')) || null;
    
        const pedidoCompleto = {
            fecha: new Date().toLocaleString(),
            productos: carrito.map(p => ({
                nombre: p.nombre,
                precio: p.precio,
                cantidad: p.cantidad,
                imagen: p.imagen  }))
        };
    
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pedidoCompleto, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "pedido.json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    });

    finalizarCompraBtn.addEventListener("click", function() {
        localStorage.removeItem("carrito"); //limpiar el carrito previo a mandarme a wsp
        const urlWhatsApp = `https://wa.me/5491144209603?text=${encodeURIComponent(mensajeCompra + " Total: $" + totalPrecio)}`;
        window.location.href = urlWhatsApp;
    });
});
