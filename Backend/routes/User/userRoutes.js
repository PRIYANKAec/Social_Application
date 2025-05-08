const express = require('express');
const router = express.Router();

const createUser = require('../../Controller/User/createUser');
const signIn = require('../../Controller/User/signIn');
const { authenticateToken } = require('../../MiddleWare/jwtHash');

router.post('/create/register', createUser);
router.get('/user/signIn', authenticateToken, signIn);

module.exports = router;