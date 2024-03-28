const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the diseaseController module which contains CRUD operations for diseases
const diseaseController = require('../controllers/diseaseController');
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT) // Apply JWT verification middleware to all routes

router.route('/') // Define routes for CRUD operations on diseases
    .get(diseaseController.getdiseases)     // GET request to retrieve all diseases
    .post(diseaseController.createdisease)  // POST request to create a new disease
    .patch(diseaseController.updatedisease) // PATCH request to update an existing disease
    .delete(diseaseController.deletedisease) // DELETE request to delete an existing disease

// Exporting the router to be used in other modules
module.exports = router
