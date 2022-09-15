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

  // funcion para definir si un usuario esta registrado
  async function logIn(userName, password){
    // definimos donde esta la data y le pasamos una query, le pasamos la tabla, y la query que queremos, es decir le decimos que queremos que el userName se igua al que viene en la data
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

  // funcion para crear usuarios, recibo data y le asigno un id, si hay datos los actualiza, y regresa una funcion a una base de datos que sabemos sera una promesa
  async function upsert(data){
    const authData = {
      // de esta forma el id de nuestros datos de autenticacion = al id del usuario
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