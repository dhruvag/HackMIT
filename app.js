
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

var questions = ['Cxu vi volas danci kun min?', 'Mi fartas bone, kaj vi?', 
  'Miaj gepatroj mangxis pomojn en nia domo.'];
var answers = ['Do you want to dance with me?', 'I feel good, and you?', 'My parents ate apples in our house.'];


// Twilio Credentials 
var accountSid = 'AC72016383be9f931c93aa652b48e308ba'; 
var authToken = 'f0735535ecf34dbad72f7ce50eff0e77'; 
 
//require the Twilio module and create a REST twilio client 
var twilio = require('twilio')(accountSid, authToken); 

var i = 0;
var totalScore = (questions.length * 10);
var questionsRemaining = questions.length;
var currentScore = 0;

app.post('/', function(req, res) {
  var answer = req.body.Body.trim();
  console.log(answer);
  if (answer === 'Begin') {
    sendMessage("Welcome to DuolingoText! Your quiz will begin shortly. You will be sent a sentence to translate and after every corrrect translation, your score will increase by 10 points.");
    //TO FINISH: Create a get request that points to http://localhost:5000/get_new_question. Coment it out. Store in a variable called "elements")
    setTimeout(function(){
        beginQuiz();
        //beginDuolingoQuiz(elements);
    }, 3500); 
  } else {
      processAnswer(answer);
      //processDuolingoAnswer();
  }
});

app.post('/beginquiz', function(req, res) {
  sendMessage('Thanks for joining DuolingoText! Text BEGIN to start your quiz.');
});

app.get('/', function(req, res) {
  res.render('index');
});

function processDuolingoAnswer(answer, elements) {
    sendMessage("Correct. Your current score is: " + currentScore + '/' + totalScore + '. There are ' + (response["session_elements"].length-i) + " questions remaining.");
    i++;
}

function beginDuolingoQuiz(elements) {
    i=0;
    element = elements["session_elements"][i];
    sendMessage((i + 1) + ". TRANSLATE: " + elements[i]);
}
                

function processAnswer(answer) {
    currentScore = currentScore + 10;
    sendMessage('Correct. Your current score is: ' + currentScore + '/' + totalScore + '. There are ' + questionsRemaining + ' questions remaining.');
    i++;
    setTimeout(function() {
      if (questionsRemaining !== 0) {
        sendMessage((i + 1) + '. TRANSLATE: ' + questions[i]);
      }
    }, 3500); 
  } else {
    sendMessage('Incorrect. The correct answer is: ' + answers[i] + ' Your current score is: ' + currentScore + '/' + totalScore + '. There are ' + questionsRemaining + ' questions remaining.');
    i++;
    setTimeout(function() {
      if (questionsRemaining !== 0) {
        sendMessage((i + 1) + '. TRANSLATE: ' + questions[i]);
      }
    }, 3500); 
  }
  setTimeout(function() {
    if (questionsRemaining === 0) {
      sendMessage('That\'s it! Your final score is ' + currentScore + '/' + totalScore + '. We hope you enjoyed DuolingoText!');
    }
  }, 3500); 
}

function beginQuiz() {
  i = 0;
  sendMessage((i + 1) + '. TRANSLATE: ' + questions[0]);
}


function sendMessage(question) {
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
