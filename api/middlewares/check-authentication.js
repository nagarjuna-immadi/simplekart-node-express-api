var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        req.userData = userData;
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
};