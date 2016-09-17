// server.js
// where your node app starts
//var CONFIG_FILE = "./.hyperweb_aws_credentials.json";
// init project
var config = {}; 
if(process.env.fbClientEmail) {
      config.project_id = process.env.fbProjectId;
      config.client_email = process.env.fbClientEmail;
      config.private_key = process.env.fbPrivateKey; 
} else {
      config = require('./private.js').config; 
}

var rootRef = require('./firebaseInit.js').init(config); 

var services = {
  ref : rootRef

};

var bookstore = require('./bookstore.js')(services); 

const book = require('./book.js').book; 
const query = require('./queryBook.js').makeQuery; 

var allQuery = query();

var newBook = book("Austen, Jane", "Sense & Sensibility");

var bookcache = {}; 




var express = require('express'); 
var app = express();

//var H = require("hyperweb");
///var ds = H.blastOff();
//var datastore = require("./datastore").sync;
//datastore.initializeApp(ds);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
}); 

app.get("/books", function (request, response) {
  bookstore.findBook(allQuery, response.send, console.log); 
});

app.get("/signin", function(request, response){
  response.sendFile(__dirname + "/views/signin.html");
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/books", function(request, response){
  ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

  var incomingTitle = request.query.title;
  var incomingTags = request.query.tags; 
  books.addOrUpdate(
     books.filter(b => b.title == incomingTitle)
    ,book(incomingTitle, incomingTags));
  response.sendStatus(200);
});

// TODO fix datastore.set()
// Simple in-memory store for now
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
