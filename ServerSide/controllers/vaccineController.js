const Vaccine = require('../models/vaccine') // Check why not capital V
const Client = require('../models/Client')//
const expressAsync = require('express-async-handler')
const bcryptjs = require('bcrypt');
const mongoose = require('mongoose');

const getVaccines = expressAsync(async (req, res) => {
    const vaccines = await Vaccine.find().lean() // Get all vaccine from MongoDB 
    if(!vaccines?.length) {
        return res.status(400).json({message: "No vaccines Found"})
    }
    // Add client ID and client name to each vaccine before sending the response 
    const vaccineWithClient = await Promise.all(vaccines.map(async (vaccine) => {
        const client = await Client.findById(vaccine.client).lean().exec()
        return { ...vaccine, clientID: client.clientID,  clientName: client.clientName}
    }))

    res.json(vaccineWithClient)
});

const createVaccine = expressAsync(async (req, res) => {
    const { date, name, client } = req.body;
    console.log(client)    
     // If the require fields not exsit
    if (!date || !name || !client ) { 
        return res.status(400).json({ message:'All fields are required'})
    }
    const clientRef = await Client.findById(client).exec()
    if(clientRef) {
        console.log("ggod")
        console.log(clientRef)
        // return res.status(409).json({ message: 'Duplicate user-name' })
    }
    const numberOfClients = clientRef.nunOfVaccine
    if (numberOfClients >= 4) {
        return res.status(400).json({ message: 'Client already has 4 vaccines' });
    }
    // A check if it is not the same date in the fron-end side.
    clientRef.nunOfVaccine = numberOfClients+1; 
    const updatedCliebts = await clientRef.save();
    
    // Create a new vaccine object
    const vaccineObject = {date, name, client}

    console.log(vaccineObject);
    // Create and store new vaccine
    const vaccine = await Vaccine.create(vaccineObject)
    console.log("3");
    if (vaccine) {
        return res.status(201).json({ message: `New vaccine of  ${name} at ${date}created` })
    } else {
        return res.status(400).json({ message: 'Failed to create vaccine' })
    }
    
})

const updateVaccine = expressAsync(async (req, res) => {
    const {id, date, name, client } = req.body;
    if(!id) {
        return res.status(400).json({ message:'You must enter id of vaccine'})
    }
    const vaccine = await Vaccine.findById(id).exec()
    vaccine.name = name
    vaccine.date = date
    const updatedVac = await vaccine.save()
    res.json({message: `Vaccine of updated`})
})

const deleteVaccine = expressAsync(async (req, res) => {
    const { id } = req.body;
    
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Vaccine ID required' })
    }

    // Confirm vaccine exists to delete 
    const vac = await Vaccine.findById(id).exec()

    if (!vac) {
        return res.status(400).json({ message: 'Vaccine not found' })
    }

    const result = await vac.deleteOne()

    const reply = `Vaccine deleted`
    res.json(reply)
});

module.exports = {
    getVaccines,
    createVaccine,
    updateVaccine,
    deleteVaccine
}