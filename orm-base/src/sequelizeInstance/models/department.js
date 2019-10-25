'use strict'

module.exports = function(sequelize, DataTypes) {
  // creación de modelo departamento
  const Department = sequelize.define('Department', {
    dept_no: { type: DataTypes.STRING(4), allowNull: false, primaryKey: true },
    dept_name: { type: DataTypes.STRING(40), allowNull: false }
  }, {
    sequelize,
    tableName: 'departments',
    timestamps: false
  })

  return Department
}