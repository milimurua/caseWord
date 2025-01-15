// funcion para leer parametros get de la url
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
  let producto = fundas[GetURLParameter('id') - 1];

  const body = document.body;

  // Crear contenedor de la card
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';

  // Crear imagen del producto
  const productImage = document.createElement('img');
  productImage.src = '../productImage/' + producto.id + '.jpg';
  productImage.alt = 'Imagen del producto';
  cardContainer.appendChild(productImage);

  // Crear contenedor de detalles del producto
  const productDetails = document.createElement('div');
  productDetails.className = 'product-details';

  // Título del producto
  const productTitle = document.createElement('h2');
  productTitle.innerText = producto.nombre;
  productDetails.appendChild(productTitle);

  // Descripción del producto
  const productDescription = document.createElement('p');
  productDescription.innerText = producto.descripcion;
  productDetails.appendChild(productDescription);

  // Lista desplegable para modelos
  const modelSelect = document.createElement('select');
  modelSelect.setAttribute("id", "listaModelos");
  const defaultModelOption = document.createElement('option');
  defaultModelOption.value = '';
  defaultModelOption.innerText = 'Selecciona un modelo';
  modelSelect.appendChild(defaultModelOption);
  const models = producto.modelos;
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model;
    option.innerText = model;
    modelSelect.appendChild(option);
  });
  productDetails.appendChild(modelSelect);

  // Lista desplegable para colores
  const colorSelect = document.createElement('select');
  colorSelect.setAttribute("id", "listaColores");
  const defaultColorOption = document.createElement('option');
  defaultColorOption.value = '';
  defaultColorOption.innerText = 'Selecciona un color';
  colorSelect.appendChild(defaultColorOption);
  const colors = producto.colores;
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.innerText = color;
    colorSelect.appendChild(option);
  });
  productDetails.appendChild(colorSelect);

  // Botón para añadir al carrito
  const cartButton = document.createElement('button');
  cartButton.innerText = 'Añadir al Carrito';
  cartButton.disabled = true; // Inicialmente deshabilitado
  cartButton.addEventListener("click", () => {
      const selectedModel = modelSelect.value;
      const selectedColor = colorSelect.value;

      if (selectedModel && selectedColor) {
          producto.modeloSeleccionado = selectedModel;
          producto.colorSeleccionado = selectedColor;
          agregarAlCarrito(producto);
      } else {
          alert('Por favor, seleccione un modelo y un color antes de añadir al carrito.');
      }
  });
  productDetails.appendChild(cartButton);

  // Habilitar el botón solo si ambas opciones están seleccionadas
  const enableButtonIfSelectionsMade = () => {
      if (modelSelect.value && colorSelect.value) {
          cartButton.disabled = false;
      } else {
          cartButton.disabled = true;
      }
  };
  
  modelSelect.addEventListener('change', enableButtonIfSelectionsMade);
  colorSelect.addEventListener('change', enableButtonIfSelectionsMade);

  cardContainer.appendChild(productDetails);
  body.appendChild(cardContainer);
  
});
