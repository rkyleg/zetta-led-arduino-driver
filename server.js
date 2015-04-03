
var zetta = require('zetta');
var Led = require('./lib/index');
var app = require('./apps/starter');

//could retrieve from database
var pinObjects = [{"name": "greenLed", "pin": 13}, {"name": "redLed", "pin":  12}];

zetta()
  .use(Led, pinObjects)
//  .use(app)
  .listen(1337);

