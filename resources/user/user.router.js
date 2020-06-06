const { Router } = require('express');
const { me, updateMe } = require('./user.controller');

const router = Router();

router.get('/', me);
router.put('/', updateMe);

module.exports = router;