const appMiddleware = (req,res,next)=>{
    console.log('INSIDE APPLICATION SPECIFIC MIDDLEWARE');
    next()
}

module.exports = appMiddleware 