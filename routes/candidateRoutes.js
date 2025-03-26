const express = require('express')
const { getAllCandidateController, insertCandidateController, removeCandidateController, updateCandidateController } = require('../controller/candidateController')
const adminMiddleware = require('../middleware/adminMiddleware')



const router = express.Router()

//GET ALL CANDIDATES
router.get('/getCandidates',getAllCandidateController)

//INSERT CANDIDATES (ONLY ADMIN CAN ADD)
router.post('/insertCandidate',adminMiddleware, insertCandidateController)

//REMOVE CANDIDATES (ONLY ADMIN CAN REMOVE)
router.delete('/deleteCandidates/:id',adminMiddleware,removeCandidateController)

// UPDATE CANDIDATES (ONLY ADMINS CAN UPDATE)
router.put('/updateCandidates/:id',adminMiddleware,updateCandidateController)

module.exports = router