const express = require('express');
const createUser = require('../../Controller/User/createUser');

const router = express.Router();

router.post('/create/register', createUser);

module.exports = router;