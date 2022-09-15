// aqui vamos a tener toda la parte de red de nuestro componente user

const express = require('express');
const secure = require('./secure')

const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Routes
router.get('/', list)
router.post('/follow/id',secure('follow'), follow)
router.get('/:id', get);
router.post('/', upsert);
// route para verificar si el owner puede actualizar
router.put('/', secure('update'), upsert);

// Internal functions
// next es una funcion que viene dentro de todos los middleware de express
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
            // como hemos añadido un middleware, todos los errores que creemos, ya sabemos que lo primero que va a mandar es el error, asi que en el catch en lugar de crear una funcion podemos llamar la funcion next, y asi los errores no tenemos que gestionarlos dentro de la ruta, sino que se generan automaticamente
        .catch(next);
    
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
    
}

function follow(req, res, next){
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next)
}


module.exports = router;