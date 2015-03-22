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
  .when('off', { allow: ['turnOn', 'toggle']})
  .when('on', { allow: ['turnOff', 'toggle'] })
  .when('toggle', {allow: ['*']})
  .when('blink', {allow: ['*']})
  .map('turnOn', this.turnOn)
  .map('turnOff', this.turnOff)
  .map('toggle', this.toggle)
  .map('blink', this.blink);
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

LED.prototype.toggle = function(cb){
    var self = this;
    if(this.state === 'off'){    
        this.led.toggle();
        this.state = 'off';
    }
    else if(this.state === 'on'){
        this.led.toggle();
        this.state = 'on';
    }
    else
        this.led.stop().off();
    cb();
};

LED.prototype.blink = function(cb){
    var self = this;
    this.led.blink();
    this.state = 'blink';
    cb();
};
