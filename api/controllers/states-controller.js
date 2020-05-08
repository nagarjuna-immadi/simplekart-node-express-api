var State = require("../modals/state-modal");

exports.getAllStates = function(req, res, next) {
    State.find()
    .then(function(docs){
        return res.status(200).json(docs);
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};