// archivo para crear token

const config = require('../config');
// libreria para crear tokens
const jwt = require('jsonwebtoken')
// traemo la funcion que regresa los errores
const error = require('../utils/error')

const secret = config.jwt.secret

// funcion para firmar el token utilizando jwt, le pasamos la data de un user y un secret
function sign(data){
  return jwt.sign(data, secret)
}

function verify(token){
  // hago un try catch para que no se rompa el codigo en caso de que los tokens sean diferentes
  try{
    // verificamos el token de jwt, con nuestro token y el secreto
    return jwt.verify(token, secret)
  }
  catch(error){
    throw new Error(error.message)
  }
}
// este es el objeto que contiene funciones llamado desde components/user/secure
const check = {
  // 
  own: function(req, owner){
    const decoded = decodeHeader(req)
    console.log(decoded)

    // comprobar si es o no propio
    if(decoded.id !==  owner){
      // esta es nuestra clase creada para regresar nuevos errores
      throw error('No tienes permiso para esta Accion', 401)
        }
  }
}

// funcion para obtener el token, recibe la autorizacion
function getToken(auth){
  // si viene un header
  if(!auth){
    throw new Error('No viene token')
  }
  // en token reemplazamos el 'Bearer ', por un espacio vacio
  let token = auth.replace('Bearer ', '')

  // en caso de que no encuentre el texto
  if(auth.indexOf('Bearer ') === -1){
    throw new Error('Formato invalido')
  }
  
  return token
}

// funcion para decodificar el token
function decodeHeader(req){
  // autorizacion que queremos validar
  const authorization = req.headers.authorization || ''
  // obtener el token desde la cabecera
  const token = getToken(authorization)
  // funcion que verifica que el token sea valido
  const decoded = verify(token)

  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  check
}