var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var userData = jwt.verify(token, process.env.JWT_KEY);
        if(userData.roles.indexOf('admin') !== -1){
            req.userData = userData;
            next();
        } else {
            return res.status(401).json({
                message: "User not Authorized to perform action"
            }); 
        }        
    } catch(error) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
};