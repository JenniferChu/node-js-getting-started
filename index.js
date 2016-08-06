var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var needle = require('needle');

/*
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mbta_db';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});
*/

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

	var jsondata = "Nothing was retrieved";
	needle.get('http://developer.mbta.com/lib/rthr/red.json', function(error, res) {
	  	if (!error && res.statusCode == 200) {
	    		//console.log("[" + res.body + "]");
	  		jsondata = res.body;
	  	}
	});
	/*
	function get_schedule() {
		if (req.readyState == 4 && req.status == 200) {
			jsondata = req.responseText;
		}
	}
	*/
	response.set('Content-Type', 'text/html');
	response.send("<p>" + jsondata + "</p>");
});


