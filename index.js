// 'index.js' file is often used as the entry point or main file of the application

// Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
// const appMiddleware = require('./Middlewares/appMiddleware')
require('./DB/connection')

// creates an express application
const pfServer = express()
//cors- it helps in handling and allowing cross-origin HTTP requests from clients.
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 4000 || process.env.PORT

// start the server to listen for incoming requests
pfServer.listen(PORT,()=>{
    console.log(`Project Vista Server started at PORT : ${PORT} and waiting for client requests!!!!`);
})

// http get request resolving to http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Vista Server Started and Waiting for Client Requests !!!</h1>`)
})




