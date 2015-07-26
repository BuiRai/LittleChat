var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var PORT = 3000;

//var app = express();

app.get("/", function(request, response){
	response.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
	console.log("usuario id: %s", socket.id);

	io.emit("message", "El usuario " + socket.id + " se ha conectado!", "System");

	socket.on("message", function(message){
		//Emit message to all users
		io.emit("message", message, socket.id);
	});

	socket.on("disconnect", function(){
		console.log("Disconnected...")
	});
});

http.listen(PORT, function(){
	console.log('Server started');
})