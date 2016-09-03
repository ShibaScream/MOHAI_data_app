var express = require('express'),
  app = express(),
  pg = require('pg'),
  port = process.env.PORT || 3000;

app.use(express.static('./'));

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

// Get data by type??
// app.get('/data/:type', function(req, res){
//
// });

app.get('*', function(req, res) {
  console.log('New request:', req.url);
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('example app listening on ' + port);
});
