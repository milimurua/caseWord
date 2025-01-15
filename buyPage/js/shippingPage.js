window.onload = function() {
    const accountLink = document.getElementById('account-link');
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    if (cookies.email) {
        accountLink.href = "/userPage/profile/Index.html";
    } else {
        accountLink.href = "/userPage/logIn/Index.html";
    }

    // Recuperar el total del precio del carrito desde localStorage
    const totalPrecio = localStorage.getItem("totalPrecio");
    if (totalPrecio) {
    document.getElementById("precio").innerText = `$${totalPrecio}`;
    document.getElementById("precio-final").innerText = `$${totalPrecio}`;
}
};

document.addEventListener('DOMContentLoaded', function() {
    const calculateShippingButton = document.getElementById('calculate-shipping');
        
    if (calculateShippingButton) {
        calculateShippingButton.addEventListener('click', function(event) {
            event.preventDefault();
            const postalCode = document.getElementById('codigo-postal').value;
            const shippingData = {
                "postalcode" : [
                    { "id": 1, "codigo_postal": 5500, "nombre": "Mendoza (Capital)", "precio": 500 },
                    { "id": 2, "codigo_postal": 5501, "nombre": "Godoy Cruz", "precio": 600 },
                    { "id": 3, "codigo_postal": 5521, "nombre": "Guaymallén", "precio": 650 },
                    { "id": 4, "codigo_postal": 5539, "nombre": "Las Heras", "precio": 700 },
                    { "id": 5, "codigo_postal": 5507, "nombre": "Luján de Cuyo", "precio": 750 },
                    { "id": 6, "codigo_postal": 5515, "nombre": "Maipú", "precio": 700 },
                    { "id": 7, "codigo_postal": 5570, "nombre": "San Martín", "precio": 850 },
                    { "id": 8, "codigo_postal": 5560, "nombre": "Tunuyán", "precio": 900 },
                    { "id": 9, "codigo_postal": 5561, "nombre": "Tupungato", "precio": 950 },
                    { "id": 10, "codigo_postal": 5577, "nombre": "Rivadavia", "precio": 800 },
                    { "id": 11, "codigo_postal": 5600, "nombre": "San Rafael", "precio": 1000 },
                    { "id": 12, "codigo_postal": 5620, "nombre": "General Alvear", "precio": 1050 },
                    { "id": 13, "codigo_postal": 5613, "nombre": "Malargüe", "precio": 1100 },
                    { "id": 14, "codigo_postal": 5533, "nombre": "Lavalle", "precio": 750 },
                    { "id": 15, "codigo_postal": 5596, "nombre": "Santa Rosa", "precio": 850 },
                    { "id": 16, "codigo_postal": 5594, "nombre": "La Paz", "precio": 900 }
                    ]
                };
            
                const shippingInfo = shippingData.postalcode.find(item => item.codigo_postal == postalCode);
                let totalPrice = parseFloat(localStorage.getItem("totalPrecio") || 0); // Obtener el precio base del producto
    
                if (shippingInfo) {
                    const shippingPrice = shippingInfo.precio;
                    const finalPrice = totalPrice + shippingPrice;
    
                    // Actualizar el precio final en localStorage
                    localStorage.setItem("totalPrecio", finalPrice.toFixed(2));
    
                    // Actualizar elementos en la página según sea necesario
                    document.getElementById('envio').textContent = `$${shippingPrice.toFixed(2)}`;
                    document.getElementById('precio-final').textContent = `$${finalPrice.toFixed(2)}`;
                } else {
                    // No se encontró información de envío para el código postal dado
                    document.getElementById('envio').textContent = 'No disponible';
                    document.getElementById('precio-final').textContent = `$${totalPrice.toFixed(2)}`;
                }
            });
        } else {
            console.error('Element with ID "calculate-shipping" not found.');
        }
});