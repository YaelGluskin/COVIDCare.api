const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the userController module which contains CRUD operations for users
const clientController = require('../controllers/clientController');
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT) // Apply JWT verification middleware to all routes

router.route('/') // Define routes for CRUD operations on clients
    .get(clientController.getClients)     // GET request to retrieve all clients
    .post(clientController.createClient)  // POST request to create a new client
    .patch(clientController.updateClient) // PATCH request to update an existing client
    .delete(clientController.deleteClient) // DELETE request to delete an existing client

// Exporting the router to be used in other modules
module.exports = router
