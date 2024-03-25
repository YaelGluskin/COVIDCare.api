const Disease = require('../models/Disease') // Check why not capital V
const Client = require('../models/Client')//
const expressAsync = require('express-async-handler')
const bcryptjs = require('bcrypt');
const mongoose = require('mongoose');

const getdiseases = expressAsync(async (req, res) => {

});

const createdisease = expressAsync(async (req, res) => {
    
});

const updatedisease = expressAsync(async (req, res) => {
    
});

const deletedisease = expressAsync(async (req, res) => {
    
});

module.exports = {
    getdiseases,
    createdisease,
    updatedisease,
    deletedisease
}