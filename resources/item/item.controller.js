const { crudControllers } = require('../../utils/crud');
const { Item } = require('./item.model');

module.exports = crudControllers(Item);