'use strict'

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define('Employee', {
    emp_no: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    birth_date: { type: DataTypes.DATE, allowNull: false },
    first_name: { type: DataTypes.STRING(14), allowNull: false },
    last_name: { type: DataTypes.STRING(16), allowNull: false },
    gender: { type: DataTypes.ENUM('M', 'F'), allowNull: false },
    hire_date: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false
  })

  return Employee
}