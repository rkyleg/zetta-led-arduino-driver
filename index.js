var Scout = require('zetta-scout');
var util = require('util');
var LED = require('./led');

var LedScout  = module.exports = function() {
    this.pins = Array.prototype.slice.call(arguments);
    Scout.call(this);
};

util.inherits(LedScout, Scout);

LedScout.prototype.init = function(next) {
  var self = this;
  this.pins.forEach(function(pin){
  var query = self.server.where({type: 'led', pin:pin});
    self.server.find(query, function(err, results) {
        if(results[0]){
            self.provision(results[0], LED, pin);
        }
        else
            self.discover(LED, pin);
    });
 });
  next();
};
