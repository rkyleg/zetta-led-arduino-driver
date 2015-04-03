var Scout = require('zetta-scout');
var util = require('util');
var LED = require('./led');
var five = require('johnny-five');

var LedScout  = module.exports = function() {
    this.pins = Array.prototype.slice.call(arguments)[0];
    Scout.call(this);
};

util.inherits(LedScout, Scout);
//
LedScout.prototype.init = function(next) {
  var self = this;
  var board = new five.Board({repl: false});
  board.on('ready', function(){
      self.pins.forEach(function(pin){
        var led = new five.Led({id: pin.name, pin: pin.pin});
        self.discover(LED, led);
      });
  });
  next();
};
