const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// creating router object 
const router = new express.Router()

// register 
// Define a route handling a POST request to '/user/register'
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add-project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// getUserProjects
router.get('/user/all-project',jwtMiddleware,projectController.allUserProjects)

// getAllProjects
router.get('/project/all',jwtMiddleware,projectController.getallProjects)

// getHomeProjects
router.get('/projects/home-projects',projectController.gethomeProjects)

// editProjects
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

// deleteProject
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

// updateUser
router.put('/user/edit',jwtMiddleware,multerConfig.single('profileImage'),userController.editUser)

// exporting roter
module.exports = router