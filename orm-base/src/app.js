const express = require('express')

// Configurations
const port = 3000

// Setup Express server
const app = express()
app.set('port', port)
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// API routes
require('./routes')(app);

// Start Express server
app.listen(port, function() {
  return console.log(`✓ Express server listening on port ${port}`)
})