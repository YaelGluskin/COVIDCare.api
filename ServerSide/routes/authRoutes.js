const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the userController module which contains CRUD operations for users
const authController = require('../controllers/authController');
const loginLim = require('../middleware/loginLim')

router.route('/') // The root Route, already in /auth
    .post(loginLim, authController.login) // placeholder

router.route('/refresh') // 
    .get(authController.refresh)

router.route('/logout') // 
    .post(authController.logout) // placeholder

module.exports = router