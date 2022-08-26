
module.exports = {
  // el process.env es para poderlo setear desde variables de entorno
  api:{
    port: process.env.API_PORT || 3000
  },
  jwt:{
    secret: process.env.JWT_SECRET || 'secretParaToken'
  }
}