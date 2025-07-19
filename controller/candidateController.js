const candidateModel = require("../model/candidateModel");
const userModel = require("../model/userModel");

//GET ALL CANDIDATE ROUTER
const getAllCandidateController = async (req, resp) => {
    try {
        const candidates = await candidateModel.find();
        console.log("Candidates:", candidates);
        
        if(candidates.length === 0)
        {
            return resp.status(404).send({
                success:false,
                message:"No Candidates Found"
            })
        }

        resp.status(200).send({
            success:true,
            totalCount: candidates.length,
            data:candidates
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in Get all Cadidate API",
            error:error.message
        })
    }
}

//INSERT CANDIDATE CONTROLLER
const insertCandidateController = async (req,resp) => {
    try {
        const {name,party,age,votes,email,totalVotes} = req.body
        if(!name || !party || !age || !email)
        {
            return resp.status(500).send({
                success:false,
                message:"Please enter all fields"
            })
        }

       const existing =  await candidateModel.findOne({email})
       if(existing)
       {
        resp.status(403).send({
            success:false,
            message:"Candidate is already registered"
        })
       }

       const candidate = await candidateModel.create({
        name,
        party,
        age,
        votes,
        email,
        totalVotes
       })

       resp.status(200).send({
        success:true,
        message:"Candidate created successfully",
       })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success:false,
            message:"Error in Insert Candidate API",
        })
    }
}

//REMOVE CANDIDATE CONTROLLER
const removeCandidateController = async (req,resp) => {
    try {

        const id = req.params.id

        if(!id)
        {
            return resp.status(203).send({
                success:false,
                message:"Please enter candidate id"
            })
        }

        const candidate = await candidateModel.findByIdAndDelete({_id:id})

        if(!candidate)
        {
            return resp.status(404).send({
                success:false,
                message:"Candidate not found"
            })
        }
        resp.status(200).send({
            success:false,
            message:"Candidate deleted successfully"
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Remove Candidate API",
        })
    }
}

//UPDATE CANDIDATE CONTROLLER
const updateCandidateController = async (req,resp) => {
    try {
        const id = req.params.id

        if(!id)
        {
           return resp.status(203).send({
                success:false,
                message:"Please provide candidate Id"
            })
        }

        const user = await candidateModel.findById({_id:id})

        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:"No candidate found"
            })
        }

        const {name,party,age,email} = req.body

        if(name) user.name = name;
        if(party) user.party = party
        if(age) user.age = age
        if(email) user.email = email

        await user.save()

        resp.status(200).send({
            success:true,
            message:"Candidate updated successfully"
        })

        
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Update Candidate API",
            error:error.message
        })
    }
}


module.exports = {getAllCandidateController , insertCandidateController , removeCandidateController , updateCandidateController}