const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/user/network');
const auth = require('./components/user/auth/network')
const errors = require('../network/errors')

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

// ROUTER
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// es importante que se coloque al final, ya que si bota algun error en user o auth, este no pasaria por errors, arrojando el error de forma normal, pero lo que queremos hacer con este archivo es que no se le de la ruta que han seguido los errores al cliente
app.use(errors)

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});