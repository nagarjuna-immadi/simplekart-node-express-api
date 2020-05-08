var mongoose = require("mongoose");
var User = require("../modals/user-modal");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.insert = function (req, res, next) {
    var payload = req.body;
    User.find({ email: payload.email }).then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                error: "Mail exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return  res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: payload.email,
                        password: hash,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        gender: payload.gender,
                        roles: payload.roles ? payload.roles : ['customer'],
                        addresses: payload.addresses ? payload.addresses : [],
                        isActive: (payload.isActive === false || payload.isActive === 'false') ? false : true 
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: "User created"
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
};

exports.login = function (req, res, next) {
    User.find({ email: req.body.email })
    .select({ "roles": 1, "isActive": 1, "_id": 1, "firstName": 1, "lastName": 1, "email": 1, "password": 1 })
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          error: "Authentication failed"
        });
      } else if(!users[0].isActive) {
        return res.status(401).json({
            error: "Your account is inactive. Please contact your administrator"
        });
      }

      var currentUser = users[0].toObject();
      bcrypt.compare(req.body.password, currentUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: "Authentication failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: currentUser.email,
              userId: currentUser._id,
              roles: currentUser.roles
            },
            process.env.JWT_KEY,
            {
              expiresIn: 60 // 60 Seconds. Eg values: 60, "2 days", "10h", "7d", "120" is equal to "120ms"
            }
          );
          delete currentUser.password;
          delete currentUser.email;
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: currentUser
          });
        }
        res.status(401).json({
            error: "Authentication failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });    
};

exports.getUser = function(req, res, next) {
    var userId = req.params.userId;
    User.findById(userId)
        .populate('addresses.state')
        .populate('addresses.city')
        .then(function(docs){
            return res.status(200).json(docs);
        })
        .catch(function(err){
            res.status(500).json({
                error: err
            });
        });
};

exports.getAllUsers = function(req, res, next) {
    var page = parseInt(req.query.page) || 1; 
    var perPage = parseInt(req.query.perPage) || 25;
    var sortBy = req.query.sortBy || 'firstName';
    var sortType = req.query.sortType || 'asc'; // 'asc', 'desc', 'ascending', 'descending'
    var searchTerm = req.query.searchTerm;
    var sortObj = {
        [sortBy]: sortType
    };

    var criteria = {};
    if(searchTerm) {
        criteria = { $text: { $search: searchTerm }}; 
    }

    User.count(criteria, function (err, count) {
        User.find(criteria)
        .select({ "roles": 1, "isActive": 1, "_id": 1, "firstName": 1, "lastName": 1, "email": 1, "gender": 1, "addresses": 1 })
        .populate('addresses.state')
        .populate('addresses.city')
        .limit(perPage)
        .skip(perPage * (page-1))
        .sort(sortObj)
        .then(function(docs){
            return res.status(200).json({
                totalItems: count,
                data: docs
            });
        })
        .catch(function(err){
            res.status(500).json({
                error: err
            });
        });
    });
};

exports.deleteUser = function(req, res, next) {
    var userId = req.params.userId;
    User.findByIdAndUpdate(userId, {"isActive": false})
        .then(function(result){
            return res.status(200).json({
                message: "User deleted successfully"
            });
        })
        .catch(function(err){
            res.status(500).json({
                error: err
            });
        });
};

exports.updateUser = function(req, res, next) {
    var userId = req.params.userId;
    var payload = req.body;
    User.findByIdAndUpdate(userId, payload)
        .then(function(result){
            return res.status(200).json({
                message: "User updated successfully"
            });
        })
        .catch(function(err){
            res.status(500).json({
                error: err
            });
        });
};