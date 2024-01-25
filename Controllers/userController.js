const users = require("../Models/userSchema");
const jwt = require('jsonwebtoken')

// logic to resolve register
exports.register = async(req,res)=>{
    console.log('INSIDE REGISTER CONTROLLER FUNCTION');
    const {username,email,password} = req.body
   try{ 
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Already existing account")
    }else{
        // creating an object for Model-user
        const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
        // store to MongoDB
        await newUser.save()
        res.status(200).json(newUser)
    }
  }catch(err){
    res.status(401).json(`Register API failed ,Error:${err}`)
  }
}

// Logic to resolve Login
exports.login = async(req,res)=>{
  console.log('INSIDE LOGIN FUNCTION')
  const {email,password} = req.body
  try{
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      // generating token using sign function in jwt
      const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
      res.status(200).json({
        existingUser,
        token
      })
    }else{
      res.status(404).json(`Incorrect Email/Password`)
    }
  }catch(err){
    res.status(401).json(`Login API Failed ,Error :${err}`)
  }
}

// edit user 
exports.editUser = async(req,res)=>{

  const userId = req.payload
  const {username,email,password,linkedin,profile} = req.body
  const uploadImage = req.file?req.file.filename:profile
  try{
      const updatedUser = await users.findByIdAndUpdate({_id:userId},{
      username,email,password,github,linkedin,profile:uploadImage},{new:true})
      await updatedUser.save()
      res.status(200).json(updatedUser)

  }catch(err){
    res.status(401).json(err)
  }
}