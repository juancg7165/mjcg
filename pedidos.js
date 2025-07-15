document.getElementById('archivoPedidos').addEventListener('change', async (event) => {
    const files = event.target.files;
    const listaPedidos = document.getElementById('lista-pedidos');
    const resumen = {};
    let totalVenta = 0;

    listaPedidos.innerHTML = '';
    
    for (const file of files) {
        const text = await file.text();
        const pedido = JSON.parse(text);

        // Crear tabla para pedido
        const tabla = document.createElement('table');
        tabla.className = 'tabla-pedido';

        // Encabezado con fecha
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th colspan="4">Pedido del ${pedido.fecha || 'Sin fecha'}</th></tr>
                           <tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr>`;
        tabla.appendChild(thead);

        // Cuerpo de la tabla con productos
        const tbody = document.createElement('tbody');
        (pedido.productos || []).forEach(p => {
            const cantidad = Number(p.cantidad || 1);
            const precio = Number(p.precio || 0);
            const subtotal = cantidad * precio;

            // Acumular resumen
            if (!resumen[p.nombre]) {
                resumen[p.nombre] = { cantidad: 0, total: 0 };
            }
            resumen[p.nombre].cantidad += cantidad;
            resumen[p.nombre].total += subtotal;

            // Sumar al total general
            totalVenta += subtotal;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" style="max-width: 50px; vertical-align: middle;"> ` : ''}
        ${p.nombre}
    </td>
    <td>${cantidad}</td>
    <td>$${precio.toFixed(2)}</td>
    <td>$${subtotal.toFixed(2)}</td>
`;
            tbody.appendChild(fila);
        });
        tabla.appendChild(tbody);

        const pedidoDiv = document.createElement('div');
pedidoDiv.className = 'pedido-container';
pedidoDiv.appendChild(tabla);
listaPedidos.appendChild(pedidoDiv);
    }

    // Mostrar resumen en tabla
    const resumenContainer = document.getElementById('resumen');
    resumenContainer.innerHTML = '';

    const tablaResumen = document.createElement('table');
    tablaResumen.className = 'tabla-resumen';

    tablaResumen.innerHTML = `
        <thead>
            <tr><th>Producto</th><th>Cantidad Total</th><th>Total</th></tr>
        </thead>
    `;

    const tbodyResumen = document.createElement('tbody');
    Object.entries(resumen).forEach(([producto, datos]) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto}</td>
            <td>${datos.cantidad}</td>
            <td>$${datos.total.toFixed(2)}</td>
        `;
        tbodyResumen.appendChild(fila);
    });
    tablaResumen.appendChild(tbodyResumen);
    resumenContainer.appendChild(tablaResumen);

    // Mostrar total general
    let totalDiv = document.getElementById('total-venta');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.id = 'total-venta';
        resumenContainer.parentElement.appendChild(totalDiv);
    }
    totalDiv.textContent = `Total de la venta: $${totalVenta.toFixed(2)}`;
});
