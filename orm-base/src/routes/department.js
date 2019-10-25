const express = require('express')
const router = express.Router()
const sequelizeInstance = require('../sequelizeInstance')

const Department = sequelizeInstance.models.Department
const Employee = sequelizeInstance.models.Employee

// Responde con el listado de departamentos
router.get('/', function(req, res) {
  Department.findAll({
    limit: 30 // opcional
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Responde con el departamento de "dept_no" enviado como parámetro
router.get('/:dept_no', function(req, res) {
  const dept_no = req.params.dept_no;
  
  Department.findAll({
    where: { dept_no: dept_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Responde con el departamento de "dept_no" enviado como parámetro,
// y los empleados pertenecientes a dicho departamento.
// También trae información de la tabla intermedia "DeptEmp"
router.get('/:dept_no/employees', function(req, res) {
  const dept_no = req.params.dept_no;
  
  Department.findAll({
    where: { dept_no: dept_no },
    include: [{
      model: Employee,
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

// Crea un nuevo departamento
router.post('/', function(req, res) {
  const body = req.body;
  
  Department.create(body)
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Actualiza un departamento existente
router.put('/', function(req, res) {
  const body = req.body;
  const dept_no = body.dept_no;
  
  Department.update(body, {
    where: { dept_no: dept_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

// Elimina el departamento de "dept_no" enviado como parámetro
router.delete('/:dept_no', function(req, res) {
  const dept_no = req.params.dept_no;
  
  Department.destroy({
    where: { dept_no: dept_no }
  })
  .then(function(results) {
    res.status(200).json({ results })
  })
  .catch(function(err) {
    res.status(500).json(err)
  })
})

module.exports = router;