var mongoose = require('mongoose');
var Category = require('../modals/category-modal');
var common = require('../common');

exports.save = function(req, res, next) {
    var payload = req.body;
    if(payload._id) {
        Category.findByIdAndUpdate(payload._id, payload)
        .then(function(result){
            return res.status(200).json({
                message: "Category updated successfully"
            });
        })
        .catch(function(err){
            res.status(500).json({
                error: err
            });
        });
    } else {
        Category.insertMany(payload)
        .then(function(){
            res.status(200).json({
                message: "Category created successfully"
            });
        })
        .catch(function(error){
            return  res.status(500).json({
                error: error
            });
        });
    }
};

exports.getAll = function(req, res, next) {
    var condition = {};
    if(!common.isAdmin(req)) {
        condition = {"isActive": true};
    }

    Category.find(condition)
    .populate('parent')
    .then(function(docs){
        return res.status(200).json(docs);
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};

exports.get = function(req, res, next) {
    var categoryId = req.params.categoryId;
    Category.findById(categoryId)
    .populate('parent')
    .then(function(docs){
        return res.status(200).json(docs);
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};

exports.delete = function(req, res, next) {
    var categoryId = req.params.categoryId;
    Category.findByIdAndUpdate(categoryId, { "isActive": false })
    .then(function(result){
        return res.status(200).json({
            message: "Category deleted successfully"
        });
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};