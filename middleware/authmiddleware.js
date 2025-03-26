const JWT = require('jsonwebtoken')

module.exports = async (req,resp,next) => {
    try {
        const authHeader = req.headers["authorization"]
        if(!authHeader)
        {
            return resp.status(401).send({
                success:false,
                message:'Auth header is missing'
            })
        }
    
        const token = authHeader.split(' ')[1];
        if(!token)
        {
            return resp.status(404).send({
                success:false,
                message:'Token is missing'
            })
        }
    
         const decoded = JWT.verify(token,process.env.JWT_SECRET);
         req.user = {id: decoded.id}
         next();

    } catch (error) {
       console.log(error);
        resp.status(500).send({
            success:false,
            message:"Please provide auth token"
        })
    }
}