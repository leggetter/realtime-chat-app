var express = require( 'express' );
var Pusher = require( 'pusher' );

var config = require( __dirname + '/config.json' );

var app = express( express.logger() );
app.use( express.bodyParser() );
app.use( express.static( __dirname + config.publicDir ) );

var pusher = new Pusher( config.pusher );

app.get( '/pusher/presence-auth', function( req, res ) {
  var socketId = req.query.socket_id;
  var channel = req.query.channel_name;
  var userId = req.query.user_id;
  var callback = req.query.callback;
  var presenceData = {
    user_id: userId,
    user_info: {
      name: 'Mr Pusher',
      twitter_id: '@pusher'
    }
  };
  var auth = pusher.auth( socketId, channel, presenceData );
  res.send( callback + '(' + JSON.stringify( auth ) + ');' );
} );

var port = process.env.PORT || 5000;
app.listen( port, function() {
	console.log( 'listening on port ' + port );
} ); 