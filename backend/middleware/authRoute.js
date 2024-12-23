const user = require('../models/accountschema');


const authRoute = async (req, res, next) => {
    try{
        const user_name = req.cookies.username;
        if(!user_name){
            return res.status(401).json({message: "Login First"});
        }

        const user_db= await user.findOne({username: user_name});
        if(!user_db){
            return res.status(401).json({message: "User Not Found"});
        }

        req.user = user_db;
        next();
    }

    catch(error){
        return res.status(500).json({message: "Server Error"});
    }
}


module.exports = authRoute;