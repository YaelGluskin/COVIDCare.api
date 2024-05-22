const Client = require('../models/Client')
const Vaccine = require('../models/Vaccine') // For delete related vaccines
const Disease = require('../models/Disease') 
const expressAsync = require('express-async-handler')

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
    const { clientName, clientLastName, clientID, email, cellPhoneNumber, telephoneNumber, address, birthDate } = req.body

    // Check if all required fields are provided
    if (!clientName || !clientLastName ||  !clientID || !email || !cellPhoneNumber || !telephoneNumber || !address || !birthDate) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate clientID (assuming clientID should be unique)
    const duplicateClientID = await Client.findOne({ clientID }).lean().exec()
    if (duplicateClientID) {
        return res.status(409).json({ message: 'Duplicate clientID' })
    }

    // Create a new client object
    const clientObject = { clientName, clientLastName, clientID, email, cellPhoneNumber, telephoneNumber, address, birthDate }

    
    // Create and store new client
    const client = await Client.create(clientObject)
    if (client) {
        return res.status(201).json({ message: `New client ${clientName} ${clientLastName}created` })
    } else {
        return res.status(400).json({ message: 'Failed to create client' })
    }
});

const updateClient = expressAsync(async (req, res) => {
    //const { id, clientName, clientLastName, clientID, email, cellPhoneNumber, telephoneNumber, address } = req.body;
    const { id, clientID, birthDate, ...updateFields } = req.body;
    // Confirm data
    if (!id || !clientID) {
        return res.status(400).json({ message: 'Both _id and clientID are required for updating a client' });
    }
    
    // Does the client exist to update?
    const client = await Client.findById(id).exec();

    if (!client) {
        return res.status(400).json({ message: 'Client Not Found' });
    }
    // if(client.birthDate !== birthDate || client.clientID !== clientID) {
    //     return res.status(400).json({ message: 'You can\'t update a birth date or id' });
    // }
    // Update the client details (excluding clientID and birthDate)
    for (const [key, value] of Object.entries(updateFields)) {
        if (client[key] !== undefined) {
            client[key] = value;
        }
    }

    // Save the updated client
    const updatedClient = await client.save();
    res.json({ message: `${updatedClient.clientName} updated` });

});

const deleteClient = expressAsync(async (req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({ message: 'Client ID Required' })
    }
    // There is no assighned ckients to client

    // Check if ckient exict
    const client = await Client.findById(id).exec()
    if(!client){
        return req.status(400).json({message:'client Not Found'})
    }

    // ADD

    // Find all vaccines associated with the client
    const vaccines = await Vaccine.find({ client: id });

    // Delete all vaccines associated with the client
    await Promise.all(vaccines.map(async (vaccine) => { // Asynchronously delete all vaccines associated with the client.
      await Vaccine.findByIdAndDelete(vaccine.id);
    }));

    // Find the disease associated with the client
    const disease = await Disease.findOne({ client: id });

    if (disease) {
      // Delete the disease
      await Disease.findByIdAndDelete(disease.id);
    }

    //
    
    const result = await client.deleteOne()
    
    const reply = `clientname ${result.clientName} with ID ${result._id} deleted`
    res.json(reply)
});

module.exports = {
    getClients,
    createClient,
    updateClient,
    deleteClient
}
