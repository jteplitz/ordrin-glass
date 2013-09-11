(function(){
  "use strict";

  var routes = {
    Root:           require("./Root.js"),
    GoogleCallback: require("./GoogleCallback"),
    LocationUpdate: require("./LocationUpdate")
  };

  var routeList = [
    ["/",               routes.Root,           0, ["get"]],
    ["/googlecallback", routes.GoogleCallback, 0, ["get"]],

    ["/location",       routes.LocationUpdate, 0, ["get"]]
  ];

  exports.routes = routeList;
}());
