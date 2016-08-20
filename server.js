// server.js
// where your node app starts
//var CONFIG_FILE = "./.hyperweb_aws_credentials.json";
// init project
var express = require('express');
var firebase = require("firebase");


firebase.initializeApp({
  serviceAccount : {
    projectId: process.env.fbProjectId,
    clientEmail: process.env.fbClientEmail,
    privateKey: process.env.fbPrivateKey
  },
  databaseURL:"https://ancientfirefly-af546.firebaseio.com/" //https://ancientfirefly-af546.firebaseio.com/
});
var db = firebase.database();
var ref = db.ref('/ancientfirefly-af546');

ref.once("value", function(snapshot) {
  console.log(snapshot.val()); 
});

ref.child('diditwork').set({test : 'test'}, 
function(e){console.log(e);})
 
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

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
  response.send(books.getCurrent());
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

const book = (title, tags) => {
  var t = title;
  var tgs = tags; 
  return {
    title : t,
    tags : tgs
  };
  
};
// TODO fix datastore.set()
// Simple in-memory store for now
var books = {
  datacache :[
    book("Pride and Prejudice", "required"),
    book("The Long Dark Tea-Time of the Soul", "humorous, irreverent")
  ],
  push: function(book) {
    datacache.push(book);
  //  datastore.set("books", datacache);
  },
  filter: function(predicate){
    return datacache.filter(predicate);
  },
  addOrUpdate: function(oldBook, newBook){
    var ix = oldBook ? datacache.indexOf(oldBook) : -1;
    if(ix >= 0){
      
      datacache[ix] = newBook;
    }
    else {
      datacache.push(newBook);
    }
    
  // datastore.set("books", datacache);
  },
  getCurrent : function() {
    return datacache; 
  }
};

var datacache = [
    book("Pride and Prejudice", "required"),
    book("The Long Dark Tea-Time of the Soul", "humorous, irreverent")
  ];
  


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});