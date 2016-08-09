var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var needle = require('needle');


app.set('port', (process.env.PORT || 5000));

app.use('/lab8', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/lab8', function(request, response) {
  response.sendFile(__dirname + '/public/lab8.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/redline.json', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");

	needle.get('http://developer.mbta.com/lib/rthr/red.json', function(error, res) {
		
	  	if (!error && res.statusCode == 200) {
	  		jsondata = res.body;
			response.set('Content-Type', 'text/plain');
			response.send(jsondata);
	  	}
	  	else
	  		jsondata = "error: " + error + " status: " + res.statusCode;
	  		response.set('Content-Type', 'application/json');
			response.send(jsondata);
	});
	
});


