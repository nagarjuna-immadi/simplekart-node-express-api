var app = require("./app");
var http = require("http");

var server = http.createServer(app);

var port = process.env.PORT || 4000;

server.listen(port, function(){
    console.log("Server running on port "+port);
});