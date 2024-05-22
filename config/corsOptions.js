// Importing the originsAllowed module
const originsAllowed = require('./originsAllowed');

// Configuring CORS options
const corsOptions = {
    // Setting the origin check function
    origin: (origin, callback) => {
        // Checking if the provided origin is in the allowed origins list or if it's not provided
        if (originsAllowed.indexOf(origin) !== -1 || !origin) { // Only in the array will be able
            // If origin is allowed or not provided, pass null as the error and true as the second argument
            callback(null, true);
        } else {
            // If origin is not allowed, pass an error as the first argument
            callback(new Error('Not allowed by CORS'));
        }
    },    
    credentials: true, // Allowing credentials
    // not 204 becouse there are device who not handle that
    optionsSuccessStatus: 200 // Setting the success status code for preflight requests
};

// Exporting CORS options for use in other modules
module.exports = corsOptions
