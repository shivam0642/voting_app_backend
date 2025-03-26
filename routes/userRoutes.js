const express = require('express')
const { getUserController, updatePasswordController, updateUserController, deleteUserController, voteUserController } = require('../controller/userController')
const authmiddleware = require('../middleware/authmiddleware')



const router = express.Router()

//GET USER ROUTES
router.get('/getUser/:id',getUserController)

//UPDATE PASSWORD
router.put('/updatePassword/:id',authmiddleware,updatePasswordController)

//UPDATE USER
router.put('/updateUser/:id',authmiddleware,updateUserController)

//DELETE USER
router.delete('/deleteUser/:id',authmiddleware,deleteUserController)

//VOTE ROUTER
router.post('/vote',authmiddleware,voteUserController)

module.exports = router
