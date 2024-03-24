const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the vaccineController module which contains CRUD operations for users
const vaccineController = require('../controllers/vaccineController');


router.route('/') // Define routes for CRUD operations on users
    .get(vaccineController.getVaccines)     // GET request to retrieve all users
    .post(vaccineController.createVaccine)  // POST request to create a new user
    .patch(vaccineController.updateVaccine) // PATCH request to update an existing user
    .delete(vaccineController.deleteVaccine) // DELETE request to delete an existing user

// Exporting the router to be used in other modules
module.exports = router
