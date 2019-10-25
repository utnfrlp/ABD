const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

const Employee = sequelizeInstance.models.Employee
const Department = sequelizeInstance.models.Department

// Responde con el listado de empleados
router.get('/', function(req, res) {
  Employee.findAll({
    limit: 30 // opcional
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Responde con el empleado de "emp_no" enviado como parámetro
router.get('/:emp_no', function(req, res) {
  const emp_no = req.params.emp_no;
  
  Employee.findAll({
    where: { emp_no: emp_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Responde con el empleado de "emp_no" enviado como parámetro,
// y los departamentos a los que pertenece.
// También trae información de la tabla intermedia "DeptEmp"
router.get('/:emp_no/departments', function(req, res) {
  const emp_no = req.params.emp_no;
  
  Employee.findAll({
    where: { emp_no: emp_no },
    include: [{
      model: Department,
      // para traer sólo ciertos atributos de la tabla intermedia se utiliza el atributo 'through'
      // through: {attributes: ['from_date']}
    }]
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Crea un nuevo empleado
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

// Actualiza un empleado existente
router.put('/', function(req, res) {
  const body = req.body;
  const emp_no = body.emp_no;

  Employee.update(body, {
    where: { emp_no: emp_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Elimina el empleado de "emp_no" enviado como parámetro
router.delete('/:emp_no', function(req, res) {
  const emp_no = req.params.emp_no;
  
  Employee.destroy({
    where: { emp_no: emp_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

module.exports = router;