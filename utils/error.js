// crearemos un error personalizado con el cual podamos trabajar

// es una clase de error que es una funcion y va a devolver siempre un error nuevo
function error(message, code){
  let e = new Error(message)

  if (code){
    e.statusCode = code
  }

  return e
}

module.exports = error