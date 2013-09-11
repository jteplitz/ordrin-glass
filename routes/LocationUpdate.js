(function(){
  "use strict";

  var _ = require("underscore"),

      handler, dispatch,
      handleGet;

  handleGet = function(req, res, next){
    console.log("got location update", req.body);
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
