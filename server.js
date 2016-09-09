var express = require('express'),
  app = express(),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
});

app.put('/locationupdate', bodyParser.json(), function(req, res) {
  // console.log(req.body);
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) throw err;
    var location;
    if (req.body.country_answer) {
      location = req.body.country_answer;
    } else {
      location = req.body.state_answer;
    }
    client.query('UPDATE answer SET (lat, lng, state, country) = ($1, $2, $3, $4) WHERE answertext = $5 RETURNING answertext, lat, lng, state, country', [req.body.lat, req.body.lng, req.body.state, req.body.country, location],
    function(err, result) {
      if (err) throw err;
      client.end(function (err) {
        if (err) throw err;
      });
      // console.log(result.rows);
    });
  });
  res.sendStatus('200');
  console.log('database updated with location data');
});

// Get data by type??
app.get('/countvisitors', function(req, res){
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) throw err;
    client.query('SELECT COUNT(DISTINCT Visitorpollid) "visitor_count" FROM visitorpoll', function(err, result) {
      if (err) throw err;
      client.end(function (err) {
        if (err) throw err;
      });
      console.log({results: result.rows});
      res.send(result.rows);
    });
  });
});

app.get('/location', function(req, res){
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) throw err;
    client.query('SELECT COUNT(DISTINCT visitoranswer.Visitorpollid) AS "count", ' +
      '(CASE when question.Questionid = 7005 then answer.Answertext end) AS "country_answer", ' +
      '(CASE when question.Questionid = 7004 then answer.Answertext end) AS "state_answer", ' +
      'answer.country, answer.state, answer.lat, answer.lng, question.Questiontext, poll.Polltext ' +
      'FROM visitoranswer INNER JOIN question ON visitoranswer.Questionid = question.QuestionID ' +
      'INNER JOIN answer ON question.Questionid = answer.Questionid AND visitoranswer.Answerid = answer.Answerid ' +
      'INNER JOIN poll ON poll.Pollid = question.Pollid ' +
      'WHERE poll.Pollid = 7 AND question.Questionid = 7005 OR question.Questionid = 7004 ' +
      'GROUP BY poll.polltext, question.Questiontext, question.Questionid, answer.Answertext, answer.country, answer.state, answer.lat, answer.lng;',
      function(err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        // console.log({results: result.rows});
        res.send(result.rows);
      });
  });
});

app.get('/ages', function(req, res){
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) throw err;
    client.query('SELECT COUNT(DISTINCT visitoranswer.Visitorpollid) "Count", answer.Answertext, question.Questiontext, poll.Polltext ' +
    	'FROM visitoranswer INNER JOIN question ON visitoranswer.Questionid = question.QuestionID ' +
      	'INNER JOIN answer ON question.Questionid = answer.Questionid AND visitoranswer.Answerid = answer.Answerid ' +
      	'INNER JOIN poll ON poll.Pollid = question.Pollid ' +
      'WHERE poll.Pollid = 7 AND ' +
    	 'question.Questionid = 7002 ' +
      'GROUP BY poll.polltext, question.Questiontext, answer.Answertext ',
      function(err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        // console.log({results: result.rows});
        res.send(result.rows);
      });
  });
});

app.get('/data/*', function(req, res){
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  var question;

  switch(req.params[0]) {
  case 'age':
    question = 7002;
    break;
  case 'why_come':
    question = 7006;
    break;
  case 'best_ideas':
    question = 7007;
    break;
  case 'vision':
    question = 7008;
    break;
  case 'rain':
    question = 7009;
    break;
  case 'innovation':
    question = 7010;
    break;
  case 'all':
    question = null;
    break;
  }

  console.log('received request for ' + req.params[0] + ', which = ' + question);

  // get a specific question data
  if (question) {
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT COUNT(DISTINCT visitoranswer.Visitorpollid) "Count", answer.Answertext, question.Questiontext, poll.Polltext ' +
      	'FROM visitoranswer INNER JOIN question ON visitoranswer.Questionid = question.QuestionID ' +
        	'INNER JOIN answer ON question.Questionid = answer.Questionid AND visitoranswer.Answerid = answer.Answerid ' +
        	'INNER JOIN poll ON poll.Pollid = question.Pollid ' +
        'WHERE poll.Pollid = 7 AND ' +
      	 'question.Questionid = $1 ' +
        'GROUP BY poll.polltext, question.Questiontext, answer.Answertext ', [question],
        function(err, result) {
          if (err) throw err;
          client.end(function (err) {
            if (err) throw err;
          });
          // console.log({results: result.rows});
          res.send(result.rows);
        });
    });
  // get all question / answer data
  } else {
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT COUNT(DISTINCT visitoranswer.Visitorpollid) "Count", answer.Answertext, question.Questiontext, poll.Polltext ' +
      	'FROM visitoranswer INNER JOIN question ON visitoranswer.Questionid = question.QuestionID ' +
        'INNER JOIN answer ON question.Questionid = answer.Questionid AND visitoranswer.Answerid = answer.Answerid ' +
        'INNER JOIN poll ON poll.Pollid = question.Pollid ' +
        'WHERE poll.Pollid = 7 AND question.Questionid > 7005 ' +
        'GROUP BY poll.polltext, question.Questiontext, answer.Answertext; ',
        function(err, result) {
          if (err) throw err;
          client.end(function (err) {
            if (err) throw err;
          });
          // console.log({results: result.rows});
          res.send(result.rows);
        });
    });
  }
});

app.get('*', function(req, res) {
  console.log('New request:', req.url);
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('example app listening on ' + port);
});
