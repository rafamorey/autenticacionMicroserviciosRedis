// archivo para autenticar, la primero es nombrar a la tabla
// exportamos el archivo en forma de function
const table = 'auth'

module.exports = function(injectedStore){
  // a store le mando los datos recibidos, si no hay datos, entonces store es el archivo de la base de datos
  let store = injectedStore
  if(!store){
    store = require('../../../../store/dummy')
  }

  // funcion para crear usuarios, recibo data y le asigno un id
  function upsert(data){
    const authData = {
      id: data.id,
    }
    //si contiene un nombre de usuario lo guardo en authData
    if(data.userName){
      authData.userName = data.userName
    }
    // si contiene password lo guardo
    if(data.password){
      authData.password = data.password
    }
// regresa la promesa de store.upsert, pasandole la table y los datos de authData que son id, name y password
    return store.upsert(table, authData)
  }

  // retorno la funcion
  return {
    upsert
  }
}