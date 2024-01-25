//router specific middleware for token verification
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('INSIDE JWTMIDDLEWARE');
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token);
   
 try { 
     // verifying token
    const jwtResponse = jwt.verify(token,"supersecretkey12345")
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()
 }catch(err){
    res.send(401).json('Authorization failed!!!Please Login...')
 }
}

module.exports = jwtMiddleware