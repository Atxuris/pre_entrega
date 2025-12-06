// Variables de Productos y Contador
const botonesAgregar = document.querySelectorAll('.agregar_carrito');
const contadorCarrito = document.getElementById('contador-carrito');

//Variables del Modal
const iconoCarrito = document.getElementById('icono-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const botonCerrarModal = document.getElementById('cerrar-modal');
const contenedorProductos = document.getElementById('productos-en-carrito');
const carritoVacioMsg = document.getElementById('carrito-vacio-msg');
const carritoTotalSpan = document.getElementById('carrito-total');
const botonVaciar = document.getElementById('vaciar-carrito-btn');

//Carrito
let carrito = JSON.parse(localStorage.getItem('carritoProductos')) || [];

//FUNCIONES

function parsearPrecio(precioTexto) {
    const precioLimpio = precioTexto.replace(' ARS', '').replace('.', '').trim();
    return parseInt(precioLimpio);
}

function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    contadorCarrito.innerText = totalProductos; 
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`"${producto.nombre}" agregado al carrito.`);
}

function eliminarItemIndividual(e) {
    const nombreProducto = e.target.dataset.nombre;
    const index = carrito.findIndex(item => item.nombre === nombreProducto);

    if (index !== -1) {
        if (confirm(`¿Estás seguro de que deseas eliminar "${nombreProducto}" del carrito?`)) {
            carrito.splice(index, 1);
        }

        localStorage.setItem('carritoProductos', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
    }
}

function renderizarCarrito() {
    contenedorProductos.innerHTML = '';

    if (carrito.length === 0) {
        carritoVacioMsg.style.display = 'block';
        carritoTotalSpan.innerText = '0 ARS';
        botonVaciar.disabled = true;
        return;
    }

    carritoVacioMsg.style.display = 'none';
    botonVaciar.disabled = false;

    let totalGlobal = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        totalGlobal += subtotal;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('item-carrito');
        productoDiv.innerHTML = `
            <p>
                **${producto.nombre}** (${producto.cantidad} x ${producto.precio.toLocaleString('es-AR')} ARS)
                - Subtotal: **${subtotal.toLocaleString('es-AR')} ARS**
            </p>
            <button class="eliminar-item" data-nombre="${producto.nombre}">❌</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });

    carritoTotalSpan.innerText = totalGlobal.toLocaleString('es-AR') + ' ARS';

    document.querySelectorAll('.eliminar-item').forEach(boton => {
        boton.addEventListener('click', eliminarItemIndividual);
    });
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
        carrito = [];
        localStorage.removeItem('carritoProductos');
        actualizarContadorCarrito();
        renderizarCarrito();
        alert("El carrito ha sido vaciado.");
    }
}

//Inicializa el contador al cargar la página
actualizarContadorCarrito(); 

//Listener para botones de Agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const cardProducto = e.target.closest('.card-product');

        //obtener nombre, precio, imagen
        const nombreElemento = cardProducto.querySelector('p:nth-child(2)');
        const precioElemento = cardProducto.querySelector('p:nth-child(3)');
        const imagenElemento = cardProducto.querySelector('.img-cards');

        if (nombreElemento && precioElemento && imagenElemento) {
            const nombre = nombreElemento.innerText.trim();
            const precioTexto = precioElemento.innerText.trim();
            
            const producto = {
                nombre: nombre,
                precio: parsearPrecio(precioTexto),
                imagen: imagenElemento.src
            };
            agregarAlCarrito(producto);
        } else {
            console.error("No se pudo encontrar la información completa del producto.");
        }
    });
});

//Manejo del Modal 
iconoCarrito.addEventListener('click', () => {
    renderizarCarrito();

    modalCarrito.style.display = 'block'; 
});

botonCerrarModal.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = 'none';
    }
});

botonVaciar.addEventListener('click', vaciarCarrito);

