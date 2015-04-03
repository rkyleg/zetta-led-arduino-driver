
var zetta = require('zetta');
var Led = require('./lib/index');
var app = require('./apps/starter');

zetta()
  .use(Led, 13,12)
//  .use(app)
  .listen(1337);

