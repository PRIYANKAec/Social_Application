const express = require('express');
const createUser = require('../../Controller/User/createUser');
const signIn = require('../../Controller/User/signIn');
const router = express.Router();

router.post('/create/register', createUser);
router.get('/user/signIn', signIn);

module.exports = router;