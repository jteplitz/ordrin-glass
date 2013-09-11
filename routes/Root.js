(function(){
  "use strict";

  var _              = require("underscore"),
      passport       = require("passport"),
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    
      handler, dispatch,
      handleGet;


  handleGet = function(req, res, next){
    console.log("starting auth");
    passport.authenticate("google", {scope: [
      "https://www.googleapis.com/auth/glass.timeline",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]})(req, res, next);
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
