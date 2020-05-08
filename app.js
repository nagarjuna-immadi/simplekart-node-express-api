var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');

/* Loading Environment Variables */
var environment = require('./environments/environment');
Object.assign(process.env, environment);

var userRoutes = require('./api/routes/user-routes');
var categoryRoutes = require('./api/routes/category-routes');
var statesRoutes = require('./api/routes/state-routes');
var citiesRoutes = require('./api/routes/cities-routes');

app.use(logger(process.env.TYPE));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/simplekart");

mongoose.connection.on('open', function(){
    console.log("Database connected");
});

mongoose.connection.on('error', function(error){
    console.log("Failed to connect database");
    console.log(error);
});

app.get("/", function(req, res, next){
    res.status(200).send("Welcome to Simple Kart API...!");
});

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/states", statesRoutes);
app.use("/cities", citiesRoutes);

module.exports = app;