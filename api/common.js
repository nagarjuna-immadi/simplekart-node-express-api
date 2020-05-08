var jwt = require("jsonwebtoken");

exports.isAdmin = function(req) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var userData = jwt.verify(token, process.env.JWT_KEY);
        if(userData.roles.indexOf('admin') !== -1){
            return true;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }
};