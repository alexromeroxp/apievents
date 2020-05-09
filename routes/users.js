const {Router} = require ('express');
const userController = require ('../controllers/users');
const authenticateController =require('../controllers/authenticate');

const router= Router();
router.post('',userController.createUser);

router.post('/login', authenticateController.authenticate);

module.exports= router;

