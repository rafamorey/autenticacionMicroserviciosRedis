const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

// funcion para manejar las conexiones a la base de datos
function handleCon() {
    connection = mysql.createConnection(dbconf);
// se intenta conectar, en case de error muestra el error
    connection.connect((err) => {
      // si no comprobamos que hay un error la consola puede mostrar error null.
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });
// conexion activa, en caso de error muestra el error, si el error es 'PROTOCOL_CONNECTION_LOST', intenta conectarse nuevamente
    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

// funcion para retornar la tabla de la base de datos
function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
  return new Promise( (resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
          if (err) return reject(err);
          resolve(data);
      })
  })
}


function insert(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function upsert(table, data) {
  if (data && data.id) {
      return update(table, data);
  } else {
      return insert(table, data);
  }
}

function query(table, query) {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
          if (err) return reject(err);
          resolve(res[0] || null);
      })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
};