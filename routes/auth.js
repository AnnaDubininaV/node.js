const express = require('express');

const authComtroller = require('../controllers/auth');

const router = express.Router();

router.get('/login', authComtroller.getLogin);

router.post('/login', authComtroller.postLogin);

router.post('/logout', authComtroller.postLogout);

module.exports = router;
