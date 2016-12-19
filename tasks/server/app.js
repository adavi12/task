var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var pg = require( 'pg' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
var connectionString = 'postgres://localhost:5432/task';
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});


// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// add task
app.post( '/addTask', urlencodedParser, function( req, res ){
  console.log( 'addTask route hit', req.body);
  //assemble object to send
pg.connect(connectionString, function(err, client, done){
  if(err){
    console.log('');
  }else{
    console.log('Connected');
    client.query( 'INSERT INTO task(name, notes) values ($1, $2)', [req.body.name, req.body.notes] );
    done();
    res.send('OK');
  }
});
});

// add task
app.put( '/editTask', urlencodedParser, function( req, res ){
  console.log( 'editTask route hit' );
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Needs to be fixed');
    }else{
      console.log('Connected! edit');
      client.query( 'UPDATE task SET (name, notes) = ($1, $2) WHERE name = ($1)', [req.body.name,req.body.notes] );
      done();
      res.send('good');

    }
});
});
