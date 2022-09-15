
const response = require('./response')

// define todo lo que pasa cuando le llega un error
function errors(err, req,res,next){
  console.error('error', err)

  const message = err.message || 'Error interno'
  // en caso de que no venga un status lo seteamos
  const status = err.statusCode || 500

  // respondemos a la peticion con el error
  response.error(req,res,message, status)
}

module.exports = errors