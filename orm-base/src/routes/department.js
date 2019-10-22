const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

const Department = sequelizeInstance.models.Department
const Employee = sequelizeInstance.models.Employee

// Get all employees
router.get('/', function(req, res) {
  Department.findAll({
    limit: 30
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Get :id department
router.get('/:id', function(req, res) {
  const id = req.params.id;
  
  Department.findAll({
    where: { dept_no: id }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Get :id department with its employees
router.get('/:id/employees', function(req, res) {
  const id = req.params.id;
  
  Department.findAll({
    where: { dept_no: id },
    include: [{
      model: Employee,
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

// Create a new department
// TODO

// Update a department
// TODO

// Delete a department
// TODO

module.exports = router;