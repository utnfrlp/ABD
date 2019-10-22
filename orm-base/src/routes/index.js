module.exports = function(app) {
  app.use('/sequelize', require('./sequelizeInfo'));
  app.use('/departments', require('./department'));
  app.use('/employees', require('./employee'));

  app.use('/', require('./base'));
}