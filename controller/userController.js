const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs')
const candidateModel = require("../model/candidateModel");
const jwt = require('jsonwebtoken');

//GET USER
const getUserController = async (req,resp) => {
   try {
      const id = req.params.id
      if(!id)
      {
         resp.status(500).send({
            success:false,
            message:'Please provide user id'
         })
      }
      const user = await userModel.findOne({_id:id})
      if(!user)
      {
         resp.status(404).send({
            success:false,
            message:'User not found'
         })
      }
      resp.status(200).send({
         sucess:true,
         message:'User found sucessfully',
         user
      })
   } catch (error) {
      console.log(error);
      resp.status(500).send({
         success:false,
         message:'Error in get user api',
         error:error.message
      })
   }
}

//UPDATE PASSWORD CONTROLLER
const updatePasswordController = async (req,resp) => {
   try {
      const user = await userModel.findById({_id:req.params.id})
      
      if(!user)
      {
         return resp.status(404).send({
            success:false,
            message:'User not found'
         })
      }

      const {oldPassword,newPassword} = req.body
      if(!oldPassword || !newPassword)
      {
         resp.status.send({
            success:false,
            message:'Please provide old password and new password'
         })
      }

      const isMatch = await bcrypt.compare(oldPassword,user.password)
      if(!isMatch)
      {
         return resp.status(500).send({
            success:false,
            message:'Old password does not match'
         })
      }

      var salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword,salt)

      const updatedPassword = await userModel.findByIdAndUpdate({password:hashedPassword})

      resp.status(200).send({
         success:true,
         message:'Password updated successfully'
      })
      

   } catch (error) {
      console.log(error);
      resp.status(500).send({
         success:false,
         message:'Error in Update password api',
         error:error.message
      })
   }
}

//UPDATE USER CONTROLLER
const updateUserController = async (req,resp) =>{
   try {
      const user = await userModel.findOne({_id:req.params.id})
      if(!user)
      {
         return resp.status(404).send({
            success:false,
            message:'User is not Available'
         })
      }

      const {name,address,age} = req.body
      if(name) user.name = name
      if(address) user.address = address
      if(age) user.age = age

      await user.save()
      resp.status(200).send({
         success:true,
         message:'User updated successfully'
      })
   } catch (error) {
      console.log(error);
      resp.status(500).send({
         success:false,
         message:'Error in Update User api',
         error:error.message
      })
   }
}

//DELETE USER CONTROLLER
const deleteUserController = async (req,resp) =>{
   try {
      const user = await userModel.findOne({_id:req.params.id})
      if(!user)
      {
         return resp.status(404).send({
            success:false,
            message:'User is not Available'
         })
      }
      await userModel.findByIdAndDelete(req.params.id)
     resp.status(200).send({
         success:true,
         message:'User deleted successfully'
      })
   } catch (error) {
      console.error(error);
      resp.status(500).send({
         success:false,
         message:'error in delete user api',
         error:error.message
      })
   }
}

//VOTE USER CONTROLLER
const voteUserController = async (req,resp) => {
    try {
      const candidateId  = req.body.candidateId
      const userId = req.user.id

      const candidate = await candidateModel.findById(candidateId)
      if(!candidate)
      {
         return resp.status(404).send({
            success:false,
            message:'No Candidate found',
         })
      }

      const user = await userModel.findOne({_id : userId})

      if(!user)
      {
         return resp.status(404).send({
            sucess:false,
            message: ' You are not registered to vote'
         })
      }

      if(user.isVoted)
      {
         return resp.status(403).send({
            success:false,
            message:'You Have already voted',
         })
      }

      //Update vote count 
      candidate.votes.push({user:userId,votedAt:new Date() })
      candidate.totalVotes = candidate.totalVotes+1;
      await candidate.save();
      
      //Update User Voting Status
      user.isVoted = true;
      await user.save();

      resp.status(200).send({
         success:true,
         message: `Vote Recorded for the user ${user.name} for Candidate ${candidate.name}`,
      })

    } catch (error) {
      console.log(error);
      resp.status(500).send({
         success:false,
         message:'Error in Vote User Api',
         error:error.message
      })
    }
}


module.exports = {getUserController,updatePasswordController,updateUserController,deleteUserController,voteUserController}