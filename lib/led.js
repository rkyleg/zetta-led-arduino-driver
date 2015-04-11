var Device = require('zetta-device');
var util = require('util');
var five = require('johnny-five');

var LED = module.exports = function(led) {
  Device.call(this);
  this._led = led;
  this._board = led.board;
};
util.inherits(LED, Device);

LED.prototype.init = function(config) {
  var self = this;
  config
  .name(self._led.id)
  .type('led')
  .state('off')
  .when('off', { allow: ['turnOn', 'toggle', 'blink']})
  .when('on', { allow: ['turnOff', 'toggle', 'blink'] })
  .when('toggle', {allow: ['*']})
  .when('blink', {allow: ['*']})
  .map('turnOn', this.turnOn)
  .map('turnOff', this.turnOff)
  .map('toggle', this.toggle)
  .map('blink', this.blink); 
};

LED.prototype.turnOn = function(cb){
    this._led.on();
    this.state = 'on';
    cb();
};

LED.prototype.turnOff = function(cb){
    this._led.off();
    this.state = 'off';
    cb();
};

LED.prototype.toggle = function(cb){
    if(this.state === 'off'){    
        this._led.toggle();
        this.state = 'off';
    }
    else if(this.state === 'on'){
        this._led.toggle();
        this.state = 'on';
    }
    else
        this._led.stop().off();
    cb();
};

LED.prototype.blink = function(cb){
    this._led.blink();
    this.state = 'blink';
    cb();
};
