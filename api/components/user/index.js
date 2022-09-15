// nor permite hacer toda la exportacion de los controladores

const store = require('../../../store/dummy');
const ctrl = require('./controller');

module.exports = ctrl(store);