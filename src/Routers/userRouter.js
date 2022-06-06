const express = require('express');
const { auth } = require('../helpers/auth');
const { deleteUser } = require('../helpers/deleteUser');
const { getUserById } = require('../helpers/getUserById');
const { getUserByToken } = require('../helpers/getUserByToken');
const { logInUser } = require('../helpers/logInUser');
const { logoutUser } = require('../helpers/logoutUser');
const { newToken } = require('../helpers/newToken');
const { signUpUser } = require('../helpers/signUpUser');
const { updateUser } = require('../helpers/updateUser');

const router = express.Router();

router.post('/api/user/sign-up', signUpUser);
router.post('/api/user/log-in', logInUser);
router.post('/api/user/log-out', auth, logoutUser);
router.get('/api/user/new-token', auth, newToken)
router.get('/api/user/get-user-by-token', auth, getUserByToken)
router.get('/api/user/get-user-by-id', auth, getUserById)
router.patch('/api/user/update-user', auth, updateUser);
router.delete('/api/user/delete-user', auth, deleteUser);

module.exports = { userRouter: router };
