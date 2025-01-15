document.addEventListener('DOMContentLoaded', (event) => {
    // Event listener para el botón de "Quitar" en el carrito de compras
    document.querySelectorAll('.btn.text-danger').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            this.closest('.row').remove();
            updateCartTotal();
        });
    });

    // Event listener para la actualización de la cantidad de productos
    document.querySelectorAll('.form-control[type="number"]').forEach(input => {
        input.addEventListener('change', function() {
            updateCartTotal();
        });
    });

    // Actualizar el total del carrito
    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('.row.gy-3.mb-4').forEach(row => {
            const priceElement = row.querySelector('.h6').innerText.replace('$', '');
            const quantityElement = row.querySelector('.form-control[type="number"]').value;
            const price = parseFloat(priceElement);
            const quantity = parseInt(quantityElement);
            total += price * quantity;
        });
        document.querySelector('.card-body .fw-bold').innerText = `$${total}`;
    }

    // Event listener formulario de búsqueda
    document.querySelector('form[role="search"]').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = this.querySelector('input[type="search"]').value;
        window.location.href = `/productPage/filter.html?search=${query}`;
    });

    // Event listener botón de "Aplicar" cupón
    document.querySelector('.btn.btn-light.border').addEventListener('click', function(event) {
        event.preventDefault();
        // Aplicar el cupón
        alert('Cupón aplicado!');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shipping-form');
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        modal.show();
    });
});

// Agrega tu public key
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'es-AR'
});

// Manejar la selección del método de pago
function showForm(formId) {
    document.querySelectorAll('.payment-form').forEach(function(form) {
        form.style.display = 'none';
    });
    document.querySelectorAll('.payment-option').forEach(function(option) {
        option.classList.remove('active');
    });
    document.getElementById(formId).style.display = 'block';
    document.getElementById('option' + formId.split('-')[1]).classList.add('active');
}

// Crear el botón de pago
const checkoutButton = mp.checkout({
    preference: {
        id: 'YOUR_PREFERENCE_ID' // Reemplaza con el ID de tu preferencia de pago
    },
    render: {
        container: '#form-mercado-pago', // Indica el lugar donde se renderizará el botón
        label: 'Pagar con Mercado Pago' // Cambia el texto del botón si es necesario
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    // Función para actualizar el total del carrito
    function actualizarTotalCarrito() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const precio = parseFloat(item.querySelector('.item-price').innerText.replace('$', ''));
            const cantidad = parseInt(item.querySelector('.item-quantity').value);
            total += precio * cantidad;
        });
        document.querySelector('.card-body .fw-bold').innerText = `$${total}`;
    }

    // Función para agregar un artículo al carrito
    function agregarAlCarrito(nombre, precio) {
        const itemExistente = cart.find(item => item.nombre === nombre);
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            cart.push({ nombre, precio, cantidad: 1 });
        }
        actualizarVisualizacionCarrito();
    }

    // Función para actualizar la visualización del carrito en la página de compra
    function actualizarVisualizacionCarrito() {
        const contenedorItemsCarrito = document.getElementById('cart-items-container');
        contenedorItemsCarrito.innerHTML = '';
        cart.forEach(item => {
            const elementoCarrito = document.createElement('div');
            elementoCarrito.classList.add('cart-item', 'row', 'gy-3', 'mb-4');
            elementoCarrito.innerHTML = `
                <div class="col-6">
                    <h6 class="item-name">${item.nombre}</h6>
                </div>
                <div class="col-3">
                    <h6 class="item-price">$${item.precio.toFixed(2)}</h6>
                </div>
                <div class="col-3">
                    <input type="number" class="form-control item-quantity" value="${item.cantidad}" min="1">
                </div>
                <div class="col-12">
                    <button class="btn text-danger">Quitar</button>
                </div>
            `;
            contenedorItemsCarrito.appendChild(elementoCarrito);
        });
        actualizarTotalCarrito();
        agregarEventListenersAItemsCarrito();
    }

    // Agregar event listeners a los elementos del carrito para quitar y actualizar cantidades
    function agregarEventListenersAItemsCarrito() {
        document.querySelectorAll('.btn.text-danger').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const nombreItem = this.closest('.cart-item').querySelector('.item-name').innerText;
                const indiceItem = cart.findIndex(item => item.nombre === nombreItem);
                cart.splice(indiceItem, 1);
                actualizarVisualizacionCarrito();
            });
        });

        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', function() {
                const nombreItem = this.closest('.cart-item').querySelector('.item-name').innerText;
                const item = cart.find(item => item.nombre === nombreItem);
                item.cantidad = parseInt(this.value);
                actualizarTotalCarrito();
            });
        });
    }

    // Event listener para el botón "Agregar al Carrito"
    document.querySelectorAll('.cartButton').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const nombre = this.getAttribute('data-name');
            const precio = parseFloat(this.getAttribute('data-price'));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Event listener para el formulario de búsqueda
    document.querySelector('form[role="search"]').addEventListener('submit', function(event) {
        event.preventDefault();
        const consulta = this.querySelector('input[type="search"]').value;
        window.location.href = `/productPage/filter.html?search=${consulta}`;
    });

    // Event listener para el botón de aplicar cupón
    document.querySelector('.btn.btn-light.border').addEventListener('click', function(event) {
        event.preventDefault();
        alert('¡Cupón aplicado!');
    });

    // Manejar el envío del formulario en el formulario de envío
    const formulario = document.getElementById('shipping-form');
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        modal.show();
    });

    // Inicializar Mercado Pago con tu clave pública
    const mp = new MercadoPago('TU_CLAVE_PUBLICA', {
        locale: 'es-AR'
    });

    // Función para mostrar el formulario de pago basado en el método seleccionado
    function mostrarFormulario(formularioId) {
        document.querySelectorAll('.payment-form').forEach(formulario => {
            formulario.style.display = 'none';
        });
        document.querySelectorAll('.payment-option').forEach(opcion => {
            opcion.classList.remove('active');
        });
        document.getElementById(formularioId).style.display = 'block';
        document.getElementById('option' + formularioId.split('-')[1]).classList.add('active');
    }

    // Crear el botón de pago con Mercado Pago
    const botonPago = mp.checkout({
        preference: {
            id: 'TU_ID_DE_PREFERENCIA' // Reemplaza con tu ID de preferencia de pago
        },
        render: {
            container: '#form-mercado-pago', // Indica dónde renderizar el botón
            label: 'Pagar con Mercado Pago' // Personaliza el texto del botón si es necesario
        }
    });
});