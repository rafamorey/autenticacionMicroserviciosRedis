//archivo para crear token de autenticacion, aqui trabajaremos con el controlador como una funcion a la que le insertamos de forma automatica,  lo que queremos que sea nuestro almacenamiento.

// es necesario cambiar el dummy por el archivo mysql o en su defecto el de mongo
const store = require('../../../store/dummy')
const controller = require('./controller')

module.exports = controller(store)