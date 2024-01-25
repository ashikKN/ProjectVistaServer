const multer = require('multer')


const storage = multer.diskStorage({
    // The destination function determines the directory where uploaded files will be stored on the server.
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // The filename function is responsible for determining the name of the uploaded file.
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callback(null,'true')
    }else{
        callback(null,false)
        return callback(new Error("Only jpeg,jpg,png files are allowed !!!"))
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig