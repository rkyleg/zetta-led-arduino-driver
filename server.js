
var zetta = require('zetta');
var Led = require('./lib/index');
var app = require('./apps/starter');

zetta()
  .use(Led, 13,14)
//  .use(app)
  .listen(1337);

