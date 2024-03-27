const User = require('../models/User')
const expressAsync = require('express-async-handler')
const bcryptjs = require('bcrypt');


// Function to get all users
const getUsers = expressAsync(async (req, res) => {
    const users = await User.find().select('-password').lean() // Get all users from MongoDB less the users' passwords
    if(!users?.length) {
        return res.status(400).json({message: "No Users Found"})
    }
    res.json(users)
})

// Function to create a new user
const createUser = expressAsync(async (req, res) => {
    const {username, password, roles} = req.body

    // If the require fields not exsit
    if (!username || !password || !Array.isArray(roles) || !roles.length) { 
        return res.status(400).json({ message:'All fields are required'})
    }

    // Check for duplicate username
    const duplicateUser = await User.findOne({username}).lean().exec()
    if(duplicateUser) {
        return res.status(409).json({ message: 'Duplicate user-name' })
    }
    // Hash password 
    const hashedPassword = await bcryptjs.hash(password, 10) // salt rounds
    const userObject = { username, "password": hashedPassword, roles }
    // Create and store new user 
    const user = await User.create(userObject)
    if (user) { // The user got created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

//
const updateUser = expressAsync(async (req, res) => {
    const {id, username, roles, active, password} = req.body

    // Mabey to change it to userName only
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }
    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: 'User Not Found' })
    }
    // Check for duplicate 
    const duplicateUser = await User.findOne({username }).lean().exec()

    // Allow updates to the original user 
    if (duplicateUser && duplicateUser?._id.toString() !== id) { // if the _id that created by MongoDB is not eaqual to the request id, it is duplicate user
        return res.status(409).json({message: 'Duplicate user-name'})
    }
    // Update the details
    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcryptjs.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save() // 
    // For anther problem will handle by the async-handler instead try & catch
    res.json({message: `${updatedUser.username} updated`})
})

//
const deleteUser = expressAsync(async (req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }
    // There is no assighned ckients to user

    // Check if user exict
    const user = await User.findById(id).exec()
    if(!user){
        return req.status(400).json({message:'User Not Found'})
    }
    const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result._id} deleted`
    res.json(reply)

})

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}