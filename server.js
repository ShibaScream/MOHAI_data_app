var express = require('express'),
  app = express(),
  pg = require('pg'),
  port = process.env.PORT || 3000;

app.use(express.static('./'));

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
});

// app.put()

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
    client.query('SELECT COUNT(DISTINCT visitoranswer.Visitorpollid) "Count", answer.Answertext, answer.country, answer.state, answer.lat, answer.lng, question.Questiontext, poll.Polltext ' +
    	'FROM visitoranswer INNER JOIN question ON visitoranswer.Questionid = question.QuestionID ' +
      	'INNER JOIN answer ON question.Questionid = answer.Questionid AND visitoranswer.Answerid = answer.Answerid ' +
      	'INNER JOIN poll ON poll.Pollid = question.Pollid ' +
      'WHERE poll.Pollid = 7 AND ' +
    	 'question.Questionid = 7005 ' +
      'GROUP BY poll.polltext, question.Questiontext, answer.Answertext, answer.country, answer.state, answer.lat, answer.lng',
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

app.get('*', function(req, res) {
  console.log('New request:', req.url);
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('example app listening on ' + port);
});
