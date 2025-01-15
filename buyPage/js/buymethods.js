const mp = new MercadoPago('', {//Agregar el usuario de la api
    locale: "es-AR",
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el precio final almacenado en localStorage
    const finalPrice = localStorage.getItem('totalPrecio');
    
    // Actualizar el elemento en el DOM con el precio final al cargar la página
    document.getElementById("precio-final").textContent = `$${finalPrice || '0.00'}`; // Asegurar que el valor predeterminado sea '0.00' si no hay precio final

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", async () => {
            try {
                const orderData = {
                    title: document.getElementById("name").textContent,
                    quantity: 1,
                    price: parseFloat(finalPrice), // Convertir el precio final a número flotante si es necesario
                };

                const response = await fetch("http://localhost:3000/create_preference", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                const preference = await response.json();
                console.log(preference);
                createCheckoutButton(preference.id);

                // No es necesario actualizar #precio-final aquí, ya que ya está actualizado al cargar la página
            } catch (err) {
                console.log(err);
            }
        });
    } else {
        console.error('Element with ID "checkout-btn" not found.');
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };

    renderComponent();
};