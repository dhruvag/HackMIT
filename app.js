var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT || 3000);

var path = require('path');
app.set('views', __dirname + 'public');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio Credentials 
var accountSid = 'AC72016383be9f931c93aa652b48e308ba'; 
var authToken = 'f0735535ecf34dbad72f7ce50eff0e77'; 
 
//require the Twilio module and create a REST twilio client 
var twilio = require('twilio')(accountSid, authToken); 

app.post('/', function(req, res) {
  var answer = req.body.Body;
  console.log(answer);
  processAnswer(answer);
  //console.log('got request.');
});

app.get('/', function(req, res) {
  res.render('index');
});
 
function processAnswer(answer) {
  sendQuestion('2. Yo no hablo espanol.');
}

function sendQuestion(question) {
  twilio.sendMessage({  
    to: '+17148555951', 
    from: '+16692366110',  
    body: question 
  }, function(err, responseData) { 
    //console.log(message.sid); 
    //console.log(responseData);
  });
}

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port %d', server.address().port);
});