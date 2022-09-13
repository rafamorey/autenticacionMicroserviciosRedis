const express = require ('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

router.post('/logIn', function(req, res){
  controller.logIn(req.body.userName, req.body.password)
    .then(token => {
      response.success(req,res,token,200)
    })
    .catch(err =>{
      response.error(req, res, 'informacion invalida', 400)
    })
}) 

module.exports = router
