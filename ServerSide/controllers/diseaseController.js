const Disease = require('../models/Disease') // Check why not capital V
const Client = require('../models/Client')//
const expressAsync = require('express-async-handler')
const bcryptjs = require('bcrypt');
const mongoose = require('mongoose');

const getdiseases = expressAsync(async (req, res) => {
    // Get all disease from MongoDB
    const diseases = await Disease.find().select('datePositive dateRecovery client diseaseClients').lean(); 
    if(!diseases?.length) {
        return res.status(400).json({message: "No diseases Found"})
    }
    // Add client ID and client name to each disease before sending the response 
    const diseaseWithClient = await Promise.all(diseases.map(async (disease) => {
        const client = await Client.findById(disease.client).lean().exec()
        return { ...disease, clientID: client.clientID,  clientName: client.clientName}
    }))

    res.json(diseaseWithClient)
});



const createdisease = expressAsync(async (req, res) => {
    const { datePositive, dateRecovery, client } = req.body;
    if (!datePositive || !client) { 
        return res.status(400).json({ message:'Must enter client and date of positive result' });
    }

    try {
        let disease = await Disease.findOne({ client }).exec();

        if (disease) {
            disease.infected = true;
            await disease.save();
            return res.status(409).json({ message: `A disease was recorded for ${client}` });
        }

        const diseaseObject = { datePositive, dateRecovery, client };
        disease = await Disease.create(diseaseObject);
        
        if (disease) {
            return res.status(201).json({ message: `New disease of ${client} at ${datePositive} created` });
        } else {
            return res.status(400).json({ message: 'Failed to create disease' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


const updatedisease = expressAsync(async (req, res) => {
    const{ id, datePositive, dateRecovery} = req.body
    if(!id){
        return res.status(400).json({ message:'You must enter id of disease'})
    }
    const disease = await Disease.findById(id).exec();
    if (!disease) {
        return res.status(400).json({ message: 'Disease Not Found' });
    }
    if(datePositive) {
        disease.datePositive = datePositive
    }
    disease.dateRecovery = dateRecovery
    const updatedDisease = await disease.save();
    res.json({ message: `Disease updated` });
});

const deletedisease = expressAsync(async (req, res) => {
    const {id, client} = req.body
    if (!id && !client) {
        return res.status(400).json({ message: 'Disease id Required' })
    }
    if(id) {
        const disease = await Disease.findById(id)    
        if (!disease) {
            return res.status(400).json({ message: 'Disease not found' })
        }

        const result = await disease.deleteOne()
    } else {
        const disease = await Disease.findOneAndDelete({client}).exec() 
        if (!disease) {
            return res.status(400).json({ message: 'Disease not found' })
        }

        
    }
    const reply = `Disease deleted`
    res.json(reply)
});

module.exports = {
    getdiseases,
    createdisease,
    updatedisease,
    deletedisease
}