
module.exports = {
  // el process.env es para poderlo setear desde variables de entorno
  api:{
    port: process.env.API_PORT || 3000
  }
}