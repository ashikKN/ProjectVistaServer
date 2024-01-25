const projects = require('../Models/projectSchema')

// addProjects
exports.addProjects = async(req,res)=>{
    console.log("Inside add Project Function");
    const userId = req.payload
    const projectImage = req.file.filename
    const {title,languages,overview,github,website} = req.body
    // console.log(`${title},${languages},${overview},${github},${website} ${projectImage} userId : ${userId}`);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project Already  exists!!!Upload another')
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            // save to mongodb collection
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(`Request failed,Error ${err}`)
    }
}

// all userProjects
exports.allUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
    const userProjects =await projects.find({userId})
    res.status(200).json(userProjects)
    }catch{
        res.status(401).json(err)
    }
}

// all projects
exports.getallProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey , $options:'i'}
    }
   try{
    const allproject = await projects.find(query)
    res.status(200).json(allproject)
    }catch(err){
        res.status(401).json(err)
    }
}

// homeprojects
exports.gethomeProjects = async(req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit project
exports.editProjectController = async(req,res)=>{
    // get project id from url path parameter
    const {id} = req.params
    const userId = req.payload
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage
    
    try{
        // findByIdAndUpdate - mongoose method
        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImage:uploadProjectImage,userId
        },{new:true})
        // save to  mongodb atlas
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch{
        res.status(401).json(err)
    }
}

// delete project
exports.deleteProjectController = async(req,res)=>{
    // get project details
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}