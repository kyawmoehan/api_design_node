const { crudControllers } = require('../../utils/crud');
const { List } = require('./list.model');

module.exports = crudControllers(List);