const db = {
  'user': [
    // el usuario debe ser string para evitar errores, al parsear el body o los datos
      { id: '1', name: 'Teban' },
  ],
};

// la forma mas sencilla para que las funciones en components/user/controller regresen una promesa, es volver asyncronas las funciones de store
async function list(tabla) {
  return db[tabla] ||[]
}

async function get(tabla, id) {
  // debe ser funcion asyncrona,
  let col = await list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
      db[tabla] = [];
  }

  db[tabla].push(data);

  console.log(db);
}

async function remove(tabla, id) {
  return true;
}

// funcion para implementar el query que llega en auth/controller, recibe la tabla y la query
async function query(table, q){
  // esperamos por la tabla de la DB
  let col = await list(table);
  let keys = Object.keys(q)
  let key = keys[0]
  // filtramos todo lo que viene dentro de nuestros items y comparamos si el userName (keys[0]) es igual a nuestro userName
  return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};