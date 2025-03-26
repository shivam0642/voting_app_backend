const userModel = require("../model/userModel")
const JWT = require("jsonwebtoken")

module.exports = async (req,resp,next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if(!token)
        {
            return resp.status(401).send({
                status: false,
                message:"No token provided"
            })
        }

        //verify token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
              
        const user = await userModel.findById(decoded.id)

        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        if(user.role !== "admin") 
        {
            return resp.status(400).send({
                success:false,
                message:"You are not authorized to access this page"
            })  
        }

        else{
            next();
        }
    } catch (error) {
        console.log(error); 
        resp.status(500).send({
            status: false,
            message:"Un-Authorized access",
            error:error.message
        })
    }
}
