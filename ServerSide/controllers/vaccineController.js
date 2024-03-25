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
    res.json(vaccines)
});

const createVaccine = expressAsync(async (req, res) => {
    const { date, name, client } = req.body;
    console.log(client)

    
     // If the require fields not exsit
     if (!date || !name || !client ) { 
        return res.status(400).json({ message:'All fields are required'})
    }

    // const clientRef = await Client.find({client}).lean().exec() // If it id of Mongoo, dont put with {}
    // const clientRef = await Client.findById(client).lean().exec()
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
    else{
        clientRef.nunOfVaccine = numberOfClients+1;
        
    }
    console.log(numberOfClients);
    console.log(clientRef.nunOfVaccine);
    const updatedCliebts = await clientRef.save();
    
    // Create a new client object
    const vaccineObject = {  date, name, client}

    console.log(vaccineObject);
    // Create and store new client
    const vaccine = await Vaccine.create(vaccineObject)
    console.log("3");
    if (vaccine) {
        return res.status(201).json({ message: `New vaccine of  ${name} at ${date}created` })
    } else {
        return res.status(400).json({ message: 'Failed to create vaccine' })
    }
    
})

const updateVaccine = expressAsync(async (req, res) => {
    
    
})

const deleteVaccine = expressAsync(async (req, res) => {
    
});

module.exports = {
    getVaccines,
    createVaccine,
    updateVaccine,
    deleteVaccine
}