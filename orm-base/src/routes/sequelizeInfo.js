const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

// Ver el estado de conexión con el motor de base de datos
router.get('/estado', function(req, res) {
  sequelizeInstance.authenticate()
  .then(function() {
    res.status(200).json({ connection: 'ok' })
  })
  .catch(function(err) {
      res.status(500).json(err)
  })
})

// Ver las tablas disponibles en nuestra base de datos
router.get('/ver_tablas', function(req, res) {
  sequelizeInstance.query('SHOW TABLES')
  .then(function([results, metadata]) {
    const tables = results.map(item => item['Tables_in_employees'])
    
    res.status(200).json({ results: tables })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Ver la estructura de una tabla en particular
router.get('/ver_tablas/:tabla', function(req, res) {
  const table = req.params.table

  sequelizeInstance.query(`DESCRIBE ${table}`)
  .then(function([results, metadata]) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Sincronizar todos los modelos
router.get('/sincronizar', function(req, res) {
  sequelizeInstance.sync()
  .then(function() {
    res.status(200).json({ sincronización: 'OK'})
  })
})

// MIGRATIONS
// - configurar config.json
// - setear NODE_ENV=development
// - sequelize-cli db:migrate

// - sequelize-cli migration:generate --name migr_1
// ---add model attribute
// - 

// - view https://github.com/flexxnn/sequelize-auto-migrations



module.exports = router;