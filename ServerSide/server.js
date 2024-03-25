require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
// Mongodb connection
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const{ logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)
connectDB()
// The logger wull be before everything else
app.use(logger)
app.use(cors(corsOptions)) // avoid other origins requests resources from our API
// Receive and parse json data
app.use(express.json())
// Receive and parse cookies
app.use(cookieParser())
// Navigate to the public
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/clients', require('./routes/clientRoutes'))
app.use('/vaccines', require('./routes/vacRoutes'))
// Handle the pages who dont find
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){ // What type of respond to sent
        res.sendFile(path.join(__dirname, 'views', '404.html'))
       
    } // For a jason request that wasent routed properly
    else if(req.accepts('jason')) {
        res.json({message: 'Not Found'})
    } else { // Edge case
        res.type('txt').send('Not Found')
        }
})
app.use(errorHandler)

mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB V')
    app.listen(PORT, () => console.log(`Srever runnng on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
    // add mongo errors
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
