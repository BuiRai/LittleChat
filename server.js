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

	var channel = "chanel-a";

	socket.broadcast.emit("message", "El usuario " + socket.id + " se ha conectado!", "System");

	socket.join(channel);

	socket.on("message", function(message){
		/*Sen to all in the channel*/
		io.sockets.in(channel).emit("message", message, socket.id);
	});

	socket.on("disconnect", function(){
		console.log("Disconnected...")
	});

	socket.on("change channel", function(newChannel){
		socket.leave(channel);
		socket.join(newChannel);
		channel = newChannel;
		socket.emit("change channel", newChannel);
	});
});

/*Listen in the port 3000*/
http.listen(PORT, function(){
	console.log('Server started');
})