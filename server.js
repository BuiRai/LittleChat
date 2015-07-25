var express = require("express");
var app = express();
var http = require("http").Server(app);
var PORT = 3000;

//var app = express();

app.get("/", function(request, response){
	response.sendFile(__dirname + "/index.html");
});

http.listen(PORT, function(){
	console.log('Server started');
})