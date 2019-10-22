const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

const Employee = sequelizeInstance.models.Employee
const Department = sequelizeInstance.models.Department

// Get all employees
router.get('/', function(req, res) {
  Employee.findAll({
    limit: 30
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Get :id employee
router.get('/:id', function(req, res) {
  const id = req.params.id;
  
  Employee.findAll({
    where: { emp_no: id }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Get :id employee with its departments
router.get('/:id/departments', function(req, res) {
  const id = req.params.id;
  
  Employee.findAll({
    where: { emp_no: id },
    include: [{
      model: Department,
      through: {attributes: []}
    }]
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Create a new employee
router.post('/', function(req, res) {
  const body = req.body;
  
  Employee.create(body)
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Update an employee
// TODO

// Delete an employee
// TODO

module.exports = router;