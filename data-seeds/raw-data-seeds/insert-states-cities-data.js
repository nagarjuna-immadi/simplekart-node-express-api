var mongoose = require('mongoose');
var fs = require("fs");

var State = require('../../api/modals/state-modal');
var City = require('../../api/modals/city-modal');

mongoose.connect("mongodb://localhost:27017/simplekart");

mongoose.connection.on('open', function(){
    console.log("Database connected");
});

mongoose.connection.on('error', function(error){
    console.log("Failed to connect database");
    console.log(error);
});

function readJsonFile(file, encoding){
    var filepath = __dirname + '/' + file;
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

var states = readJsonFile('states.json');
var cities = readJsonFile('cities.json');

function insertCities() {
    State.find()
        .then(statesData => {
            var stateIds = {};
            statesData.forEach(state => {
                stateIds[state.name] = state._id;
            });
            var citiesPayload = [];
            cities.forEach(city => {
                citiesPayload.push({ name:city.name, state: stateIds[city.state]});
            });
            City.insertMany(citiesPayload)
                .then(result => {
                    console.log('Cities data inserted');
                    process.exit();
                })
                .catch(err => {
                    console.log(err);
                    console.log("Failed to insert cities");
                    process.exit();
                });
        })
        .catch(err => {
            console.log(err);
            console.log("Failed to insert cities");
            process.exit();
        });
}

State.insertMany(states)
    .then(insertedStates => {
        console.log('States data inserted');
        insertCities();
    })
    .catch(err => {
        console.log(err);
        console.log("Failed to insert states");
        process.exit();
    });
