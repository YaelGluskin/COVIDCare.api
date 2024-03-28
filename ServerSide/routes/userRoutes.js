const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the userController module which contains CRUD operations for users
const userController = require('../controllers/userController');
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT) // Apply JWT verification middleware to all routes

router.route('/') // Define routes for CRUD operations on users
    .get(userController.getUsers)     // GET request to retrieve all users
    .post(userController.createUser)  // POST request to create a new user
    .patch(userController.updateUser) // PATCH request to update an existing user
    .delete(userController.deleteUser) // DELETE request to delete an existing user

// Exporting the router to be used in other modules
module.exports = router
