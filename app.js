(function(){

  "use strict";
  /**
   * Module dependencies.
   */

  var express       = require('express'),
     routeList      = require('./routes'),
     user           = require('./routes/user'),
     passport       = require("passport"),
     GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
     http           = require('http'),
     path           = require('path'),
     _              = require("underscore"),
     conf           = require('nconf').argv().env().file({file: __dirname + '/config.json'});

  var app = express();

  // all environments
  app.set('port', conf.get("PORT"));
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express["static"](path.join(__dirname, 'public')));

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }
  _.each(routeList.routes, function(route){
    var methods = route[3] || ["get"];

    methods.forEach(function(method){
      var params = [];

      if (route[2]){
        params.push(function(req, res, next){
          req._conf = conf;
          next();
        });
      }

      app[method](route[0], params, route[1]);
    });
  });

  // setup the oauth strategy
  passport.use(new GoogleStrategy({
    clientID: conf.get("google:clientId"),
    clientSecret: conf.get("google:clientSecret"),
    callbackURL: conf.get("host") + "/googlecallback"
  }, function(token, tokenSecret, profile, done){
    var user = {
      profile: profile,
      token: token
    };
    return done(null, user);
    }
  ));

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}());
