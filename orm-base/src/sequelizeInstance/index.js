const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'employees',
  'root', // username
  'root', // password
  {
    host: '127.0.0.1', // localhost
    port: 3306,
    dialect: 'mysql'
  }
)

// Importación de modelos
const DepartmentModel = require('./models/department')(sequelize, Sequelize.DataTypes)
const EmployeeModel = require('./models/employee')(sequelize, Sequelize.DataTypes)
const DeptEmpModel = require('./models/dept_emp')(sequelize, Sequelize.DataTypes)

// Asociaciones entre modelos
DepartmentModel.belongsToMany(EmployeeModel, {
  through: DeptEmpModel, foreignKey: 'dept_no'
});
EmployeeModel.belongsToMany(DepartmentModel, {
  through: DeptEmpModel, foreignKey: 'emp_no'
});

module.exports = sequelize