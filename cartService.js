const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("fundas"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("fundas",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    actualizarTotales();
    cantidadProductoFinal = 1;
  }
  
  else {
    const indiceProducto = memoria.findIndex(funda => funda.id === producto.id);
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        nuevaMemoria.push(nuevoProducto);
        cantidadProductoFinal = 1;
    } else {
        nuevaMemoria[indiceProducto].cantidad++;
        cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("fundas", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    actualizarTotales();
}

  console.log('Producto agregado al carrito:', producto);
  verificarCarrito();
  return cantidadProductoFinal;

}


function verificarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('fundas')) || [];
    console.log('Verificando carrito:', carrito);

    if (carrito.length === 0) {
        document.getElementById('carrito-vacio').style.display = 'block';
        document.getElementById('totalesContainer').style.display = 'none';
    } else {
        document.getElementById('carrito-vacio').style.display = 'none';
        document.getElementById('totalesContainer').style.display = 'block';
    }
}

function actualizarEnlaceCuenta() {
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
}

document.addEventListener('DOMContentLoaded', function() {
    verificarCarrito();
    actualizarEnlaceCuenta();
});

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("fundas"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(funda => funda.id === producto.id)
  let nuevaMemoria = memoria;

  if (indiceProducto !== -1) {
    nuevaMemoria[indiceProducto].cantidad--;
    let cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;

    if (cantidadProductoFinal === 0) {
      nuevaMemoria.splice(indiceProducto, 1);
      // Actualizar el DOM para remover el producto del carrito
      actualizarVistaCarrito(producto.id);
    }

    localStorage.setItem("fundas", JSON.stringify(nuevaMemoria));
    console.log(Object.keys(nuevaMemoria).length);
    if (Object.keys(nuevaMemoria).length == 0) {
      verificarCarrito(); 
    }
    actualizarNumeroCarrito();
    actualizarTotales();
    
    return cantidadProductoFinal;
  }

  return 0; // Retornar 0 si no se encuentra el producto (esto es opcional)
}

function actualizarVistaCarrito(productoId) {
  const productoElemento = document.querySelector(`.tarjeta-producto[data-id="${productoId}"]`);
  if (productoElemento) {
    productoElemento.remove();
  }
}


/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("fundas"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("fundas"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;

    // Guarda el total en localStorage
  localStorage.setItem("totalPrecio", precio);
  console.log("Total precio guardado en localStorage:", precio);
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("fundas");
  actualizarNumeroCarrito();
  actualizarTotales();
}


actualizarNumeroCarrito();
actualizarTotales();