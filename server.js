var express = require('express'),
  app = express(),
  pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000, function() {
  console.log('example app listening on port 3000');
});
