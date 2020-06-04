const { Router } = require('express');
const controllers = require('./item.controller');

const router = Router();

// /api/item
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

module.exports = router;