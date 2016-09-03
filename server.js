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

// Get data by type??
app.get('/data', function(req, res){
  var conString = process.env.DATABASE_URL || null;
  var client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) throw err;
    client.query('SELECT * FROM interactive', function(err, result) {
      if (err) throw err;
      client.end(function (err) {
        if (err) throw err;
      });
      console.log({results: result.rows});
      res.send(result.rows);
    });
  });
});

app.get('*', function(req, res) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('example app listening on ' + port);
});
