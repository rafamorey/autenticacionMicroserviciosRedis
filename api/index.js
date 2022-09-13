const express = require('express');
const bodyParser = require('body-parser');

// libreria para crear documentacion de nuestra api,
// este paquete se encarga de incluir toda la documentacion
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network')
const errors = require('../network/errors')

const app = express();

app.use(bodyParser.json());

// aqui esta nuestro documento de swagger
const swaggerDoc = require('./swagger.json');

// ROUTER
app.use('/api/user', user)
app.use('/api/auth', auth)
// esta linea permite servir la documentacion de nuestra api, la cual esta en swaggerDoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// es importante que se coloque al final, ya que si bota algun error en user o auth, este no pasaria por errors, arrojando el error de forma normal, pero lo que queremos hacer con este archivo es que no se le de la ruta que han seguido los errores al cliente
// lo pasamos como le ultimo middlewares
app.use(errors)

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});