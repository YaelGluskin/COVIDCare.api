const mongoose = require('mongoose') // Importing the Mongoose library

// Asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connecting to the MongoDB database using the DATABASE_URI environment variable
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDB connected successfully"); // Log message indicating successful connection
    } catch (err) {
        // Catching and logging any errors that occur during the connection process
        console.error("MongoDB connection error:", err);
    }
};

// Exporting the connectDB function to be used in other modules
module.exports = connectDB;
