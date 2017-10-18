// server.js
// where your node app starts

var compression = require('compression');
var cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// compress our client side content before sending it over the wire
app.use(compression());

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: 'https://trello.com' }));

app.use(cors({
    origin: ["https://trello.com","https://test-trello-pu.glitch.me/"],
    default: "https://trello.com"
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('users', 'Un nouvel utilisateur est la!')
  socket.emit('accueil', 'bienvenu à toi visiteur');
  socket.on('disconnect', function(){
    io.emit('users', 'un utilisateur est partit!');
  });
  socket.on('dataCard', function(data){
    io.emit('dataCardRet', data);
  });
})

// listen for requests :)
var listener = server.listen(process.env.PORT, function () {
  console.info(`Node Version: ${process.version}`);
  console.log('Trello Power-Up Server listening on port ' + listener.address().port);
});