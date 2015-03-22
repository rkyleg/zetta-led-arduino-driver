var Device = require('zetta-device');
var util = require('util');
var five = require('johnny-five');

var LED = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin;
  //use name arduino because 'board' is an internal variable used by Zetta, and using it will cause a circular loop in JSON.stringify() operations
};
util.inherits(LED, Device);

LED.prototype.init = function(config) {
  var self = this;
  config
  .name('LED')
  .type('ardled')
  .state('off')
  .when('off', { allow: ['turnOn']})
  .when('on', { allow: ['turnOff'] })
  .map('turnOn', this.turnOn)
  .map('turnOff', this.turnOff);
  this.arduino = new five.Board();
  this.arduino.on('ready', function(){
    self.led = new five.Led(self.pin);
  });
};

LED.prototype.turnOn = function(cb){
    var self = this;
    this.led.on();
    this.state = 'on';

    cb();
};

LED.prototype.turnOff = function(cb){
    var self = this;
    this.led.off();
    this.state = 'off';
    cb();
};
