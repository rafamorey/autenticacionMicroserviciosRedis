// archivo para autenticar, la primero es nombrar a la tabla
// exportamos el archivo en forma de function
const bcrypt = require('bcrypt')
const auth = require('../../../auth')

const table = 'auth'

module.exports = function(injectedStore){
  // a store le mando los datos recibidos, si no hay datos, entonces store es el archivo de la base de datos
  let store = injectedStore
  if(!store){
    store = require('../../../store/dummy')
  }

  async function logIn(userName, password){
    const data = await store.query(table, {userName: userName})
    // esta comparacion nos regresa una promesa
    return bcrypt.compare(password, data.password)
      .then(sonIguales => {

        if(sonIguales === true) {
          // generate token
          return auth.sign(data)
        } else{
          throw new Error('Informacion invalida')
        }
      })
    
  }

  // funcion para crear usuarios, recibo data y le asigno un id
  async function upsert(data){
    const authData = {
      id: data.id,
    }
    //si contiene un nombre de usuario lo guardo en authData
    if(data.userName){
      authData.userName = data.userName
    }
    // si contiene password lo guardo
    if(data.password){ //se usa bcrypt para hashear password, le damos un valor de ejecucion
                        //entre > sea el valor, es mas seguro, pero tarda mas
      authData.password = await bcrypt.hash(data.password, 5)
    }
// regresa la promesa de store.upsert, pasandole la table y los datos de authData que son id, name y password
    return store.upsert(table, authData)
  }

  // retorno la funcion
  return {
    upsert,
    logIn
  }
}