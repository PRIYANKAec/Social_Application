const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../MiddleWare/jwtHash');

const createOfficial = require('../../Controller/Official/createOfficial');
const signInOfficial = require('../../Controller/Official/signIn');
const updateOfficial = require('../../Controller/Official/updateOfficial');
const deleteOfficial = require('../../Controller/Official/deleteOfficial');

router.post('/register/official', createOfficial);

router.get('/signIn/official',signInOfficial);

router.put('/update/official/:GovernmentId', authenticateToken, updateOfficial);
router.delete('/delete/official/:GovernmentId', authenticateToken, deleteOfficial)

module.exports= router;