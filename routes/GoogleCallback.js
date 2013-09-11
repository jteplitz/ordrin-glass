(function(){
  "use strict";

  var _              = require("underscore"),
      passport       = require("passport"),
    
      handler, dispatch,
      handleGet;


  handleGet = function(req, res, next){
    return passport.authenticate("google", {}, function(err, user){
      return res.json({
        msg: "Authenticated",
        user: user,
        accessToken: user.token
      });
    })(req, res, next);
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
