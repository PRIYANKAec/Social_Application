const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../MiddleWare/jwtHash');

const createUser = require('../../Controller/User/createUser');
const signIn = require('../../Controller/User/signIn');
const updateUser = require('../../Controller/User/updateUser');
const deleteUser = require('../../Controller/User/deleteUser');

router.post('/register/user', createUser);
router.get('/signIn/user', signIn);

router.put('/update/user', authenticateToken, updateUser);

router.delete('/delete/user', authenticateToken, deleteUser);

module.exports = router;