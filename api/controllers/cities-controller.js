var City = require("../modals/city-modal");

exports.getAllCities = function(req, res, next) {
    City.find()
    .then(function(docs){
        return res.status(200).json(docs);
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};

exports.getCitiesByState = function(req, res, next) {
    var stateId = req.params.stateId;
    City.find({
        state: stateId
    })
    .then(function(docs){
        return res.status(200).json(docs);
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};