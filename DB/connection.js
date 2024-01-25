
// importing mongoose to file
const mongoose = require('mongoose')

// get connection string from process.env
const connectionString = process.env.DATABASE

// connect mongodb with node using mongoose 'connect' method - return a promise
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Successfully Connected to ProjectVista Server");
}).catch((err)=>{
    console.log(`MongoDB connection failed error is ${err}`);
})

