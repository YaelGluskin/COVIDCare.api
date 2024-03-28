const express = require('express') // Importing the Express module
const router = express.Router() // Creating a router object from the Express Router
// Importing the vaccineController module which contains CRUD operations for vaccines
const vaccineController = require('../controllers/vaccineController');
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT) // Apply JWT verification middleware to all routes

router.route('/') // Define routes for CRUD operations on vaccines
    .get(vaccineController.getVaccines)     // GET request to retrieve all vaccines
    .post(vaccineController.createVaccine)  // POST request to create a new vaccine
    .patch(vaccineController.updateVaccine) // PATCH request to update an existing vaccine
    .delete(vaccineController.deleteVaccine) // DELETE request to delete an existing vaccine

// Exporting the router to be used in other modules
module.exports = router
