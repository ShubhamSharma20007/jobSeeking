const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const {register,login,logout} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout',isAuth, logout);


module.exports = router;