var zetta = require('zetta');
var Led = require('./index');
var app = require('./apps/starter');

zetta()
  .use(Led, 13,14)
//  .use(app)
  .listen(1337);
