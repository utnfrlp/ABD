const express = require('express')
const router = express.Router()

// Responde el mensaje enviado como parámetro
router.get('/:mensaje', function(req, res) {
  var mensaje = req.params.mensaje

  res.status(200).json({
    mensaje: mensaje
  })
})

// Responde 'OK'
router.get('/', function(req, res) {
  res.status(200).json({
    mensaje: 'OK'
  })
})

// Responde 'No encontrado
router.get('*', function(req, res) {
  res.status(404).json({
    mensaje: 'No encontrado'
  })
})

module.exports = router;