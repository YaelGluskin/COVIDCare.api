const Client = require('../models/Client')
const expressAsync = require('express-async-handler')
const bcryptjs = require('bcrypt');

// Function to get all clients
const getClients = expressAsync(async (req, res) => {
    const clients = await Client.find().lean() // Get all clients from MongoDB 
    if(!clients?.length) {
        return res.status(400).json({message: "No clients Found"})
    }
    res.json(clients)
});

// Function to create a new client
const createClient = expressAsync(async (req, res) => {
    const { clientName, clientID, email, cellPhoneNumber, telephoneNumber, address, birth_date } = req.body

    // Check if all required fields are provided
    if (!clientName || !clientID || !email || !cellPhoneNumber || !telephoneNumber || !address || !birth_date) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate clientID (assuming clientID should be unique)
    const duplicateClientID = await Client.findOne({ clientID }).lean().exec()
    if (duplicateClientID) {
        return res.status(409).json({ message: 'Duplicate clientID' })
    }

    // Create a new client object
    const clientObject = { clientName, clientID, email, cellPhoneNumber, telephoneNumber, address, birth_date }

    
    // Create and store new client
    const client = await Client.create(clientObject)
    if (client) {
        return res.status(201).json({ message: `New client ${clientName} created` })
    } else {
        return res.status(400).json({ message: 'Failed to create client' })
    }
});

const updateClient = expressAsync(async (req, res) => {
    const { id, clientName, clientID, email, cellPhoneNumber, telephoneNumber, address } = req.body;
    
    // Confirm data
    if (!id ) {
        return res.status(400).json({ message: 'All fields except ID and birth date are required' });
    }

    // Does the client exist to update?
    const client = await Client.findById(id).exec();

    if (!client) {
        return res.status(400).json({ message: 'Client Not Found' });
    }

    // Update the details (excluding clientID and birth_date)
    client.clientName = clientName;
    client.email = email;
    client.cellPhoneNumber = cellPhoneNumber;
    client.telephoneNumber = telephoneNumber;
    client.address = address;

    try {
        const updatedClient = await client.save();
        res.json({ message: `${updatedClient.clientName} updated` });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const deleteClient = expressAsync(async (req, res) => {

});

module.exports = {
    getClients,
    createClient,
    updateClient,
    deleteClient
}
