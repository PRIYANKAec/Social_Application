const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../MiddleWare/jwtHash');

const createUser = require('../../Controller/User/createUser');
const signIn = require('../../Controller/User/signIn');
const updateUser = require('../../Controller/User/updateUser');

router.post('/create/register', createUser);
router.get('/user/signIn', signIn);

router.put('/user/update', authenticateToken, updateUser);

module.exports = router;