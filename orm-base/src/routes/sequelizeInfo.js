const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

router.get('/status', function(req, res) {
  sequelizeInstance.authenticate()
  .then(function() {
    res.status(200).json({ connection: 'ok' })
  })
  .catch(function(err) {
      res.status(500).json(err)
  })
})

router.get('/show_tables', function(req, res) {
  sequelizeInstance.query('SHOW TABLES')
  .then(function([results, metadata]) {
    const tables = results.map(item => item['Tables_in_employees'])
    
    res.status(200).json({ results: tables })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

router.get('/show_tables/:table', function(req, res) {
  const table = req.params.table

  sequelizeInstance.query(`DESCRIBE ${table}`)
  .then(function([results, metadata]) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

module.exports = router;