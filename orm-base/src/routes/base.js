const express = require('express')
const router = express.Router()

router.get('/:message', function(req, res) {
  const resJson = {
    url: req.url,
    params: req.params
  }

  res.status(200).json(resJson)
})

router.get('/', function(req, res) {
  const resJson = {
    url: req.url,
    params: req.params
  }

  res.status(200).json(resJson)
})

router.get('*', function(req, res) {
  const resJson = {
    url: req.url
  }

  res.status(404).json(resJson)
})

module.exports = router;