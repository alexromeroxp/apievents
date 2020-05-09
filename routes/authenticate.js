const { Router } = require('express');
const controllers = require('../controllers/authenticate');

const router = Router();
router.post('/login', controllers.authenticate);

module.exports = router;