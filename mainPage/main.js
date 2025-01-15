const contenedorTarjetas = document.getElementById("productos-container");

function limpiarContenedor() {
  contenedorTarjetas.innerHTML = ""; // Limpiar contenedor antes de agregar nuevas tarjetas
}

function crearTarjetasProductosInicio(productos) {
  limpiarContenedor(); // Limpiar contenedor antes de agregar nuevas tarjetas
  productos.forEach(producto => {
    const nuevaFunda = document.createElement("div");
    nuevaFunda.classList = "col-md-4 mb-3";
    nuevaFunda.innerHTML = `
      <div class="card h-150" id="cards">
        <img src="../productImage/${producto.id}.jpg" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text precio">$${producto.precio}</p>
          <p class="card-text">${producto.descripcion}</p>
        </div>
        <div class="card-footer">
          <a href="../productPage/compraProducto.html?id=${producto.id}" class="btn btn-primary">Ver</a>
        </div>
      </div>
    `;
    contenedorTarjetas.appendChild(nuevaFunda);
  });
}

function filtrarPorRangoDePrecio() {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  const productosFiltrados = fundas.filter(producto => {
    return producto.precio >= minPrice && producto.precio <= maxPrice;
  });

  crearTarjetasProductosInicio(productosFiltrados);
}

// Inicializar las tarjetas al cargar la página
crearTarjetasProductosInicio(fundas);