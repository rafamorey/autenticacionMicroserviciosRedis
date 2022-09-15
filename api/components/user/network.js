// aqui vamos a tener toda la parte de red de nuestro componente user

const express = require('express');
const secure = require('./secure')

const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
// route para verificar si el owner puede actualizar
router.put('/', secure('update'), upsert);

// Internal functions
function list(req, res, next) {
    // respondemos la promesa de llamar a controller.list, que a su vez llama a store.list, la cual es asyncorna
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
    
}
// usamos next, ya que viene como atributo en todos los middleware de express, y al incorporarlo aqui nos permite gestionar los errores de forma automatica, sin necesidad de gestionarlos en cada ruta.
function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
    
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
    
}

module.exports = router;