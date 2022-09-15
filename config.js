
module.exports = {
  // el process.env es para poderlo setear desde variables de entorno
  api:{
    port: process.env.API_PORT || 3000
  },
  jwt:{
    secret: process.env.JWT_SECRET || 'secretParaToken'
  },
  mysql:{
    // url de servidor 
    host: process.env.MYSQL_HOST || '',
    // usuario de mysql
    user: process.env.MYSQL_USER || '',
    // password de mysql
    password: process.env.MYSQL_PASSWORD || '',
    // base de datos
    database: process.env.MYSQL_DATABASE || ''
  }
}