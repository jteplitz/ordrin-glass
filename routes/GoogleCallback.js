(function(){
  "use strict";

  var _              = require("underscore"),
      passport       = require("passport"),
      request        = require("../app/request"),
    
      handler, dispatch,
      handleGet, registerLocationUpdates;


  handleGet = function(req, res, next){
    return passport.authenticate("google", {}, function(err, user){
      registerLocationUpdates(user.token, function(err){
        if (err){
          return next(405);
        }

        return res.json({
          msg: "You should be good to go"
        });
      });
    })(req, res, next);
  };

  registerLocationUpdates = function(token, cb){
    var headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    };
    var data = {
      callbackUrl: "https://ordrin-glass.herokuapp.com/location",
      collection: "locations"
    };
    request.makeRequest("https://googleapis.com", "/mirror/v1/subscriptions", "POST", data, headers, function(err, data){
      console.log("done", err, data);
      return cb(err);
    });
  };

  dispatch = {GET: handleGet};
  handler  = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }
    return next(405);
  };

  module.exports = handler;
}());
