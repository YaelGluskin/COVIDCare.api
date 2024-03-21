// Import required modules
const { format } = require('date-fns'); // Importing date formatting function from date-fns
const { v4: uuid } = require('uuid'); // Importing UUID generation function from uuid
const fs = require('fs'); // Importing file system module
const fsPromises = require('fs').promises; // Importing promises version of file system module
const path = require('path'); // Importing path module for file paths manipulation

// Function to log events to a file asynchronously
const logEvents = async (message, logFileName) => {
    // Get current date and time and format it
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    // Generate a UUID for the log entry
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // Check if the logs directory exists, if not, create it
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // Append the log entry to the log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err); // Log any errors that occur during the process
    }
};

// Middleware function to log requests
const logger = (req, res, next) => {
    // Log the request method, URL, and origin header
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    // Log the request method and path to the console
    console.log(`${req.method} ${req.path}`);
    next(); // Call the next middleware function
};

// Export the logEvents and logger functions
module.exports = { logEvents, logger };
