const userModel = require('../model/userModel');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');


//REGISTER CONTROLLER
const userRegisterController = async (req,resp) => {
    try {
        const {name,age,aadharCardNumber,mobile,email,address,role,password,isVoted} = req.body
        if(!name || !age || !aadharCardNumber || !mobile || !email || !address || !password )
        {
            resp.status(500).send({
                success:false,
                message : 'Please provide all fields'
            })
        }

        const existing = await userModel.findOne({email})
        if(existing)
        {
            resp.status(500).send({
                success:false,
                message:'User already exists'
            })
        }
        //password hashing
        var salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await userModel.create({
            name,
            age,
            aadharCardNumber,
            mobile,
            email,
            address,
            role,
            password:hashedPassword,
            isVoted
        })

        resp.status(200).send({
            success:true,
            message:'User registered sucessfully',
            user
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
         success:false,
         message:'Error in User register api',
         error:error.message
        })
    }
} 

//LOGIN USER
const userLoginController = async (req,resp) =>{
     try {
        const {email,password} = req.body
        if(!email || !password)
        {
            return resp.status(500).send({
                success:false,
                message:'Please provide email and password'
            })
        }

        const user = await userModel.findOne({email})
        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:'No user found with this email id'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return resp.status(404).send({
                success:false,
                message:'Please enter correct password'
            })
        }

        const token = JWT.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        return resp.status(200).send({
            success:true,
            message:'User Login Successfull',
            token
        })
     } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'Error in User Login api',
            error:error.message
        })
     }
}



module.exports = {userRegisterController,userLoginController}