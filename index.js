var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

wss.on("connection", function(ws) {
  /*var id = setInterval(function() {
    ws.send(JSON.stringify("U r connected"), function() {  })
  }, 4000)*/

  console.log("websocket connection open")

  ws.on('message', function(message) {
    console.log('received:', message);
    //ws.send(JSON.stringify("Msg received at server"), function() {  });
    wss.broadcast(JSON.stringify("Msg received at server"), function() {  });
  });

  ws.on("close", function() {
    console.log("websocket connection close");
    //clearInterval(id)
  })

})

