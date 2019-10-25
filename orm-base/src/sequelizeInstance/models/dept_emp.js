'use strict'

module.exports = function(sequelize, type) {
  // creación de modelo departamento-empleado
  const DeptEmp = sequelize.define('DeptEmp', {
    emp_no: { type: type.INTEGER(11), allowNull: false, primaryKey: true },
    dept_no: { type: type.CHAR(4), allowNull: false, primaryKey: true },
    from_date: { type: type.DATE, allowNull: false },
    to_date: { type: type.DATE, allowNull: false }
  }, {
    sequelize,
    tableName: 'dept_emp',
    timestamps: false
  })

  return DeptEmp
}