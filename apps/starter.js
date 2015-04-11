module.exports = function testApp(server) {
  
  // add query params in the where object like so:
  // var starterDeviceQuery = server.where({type: 'led'});
  var ledDeviceQuery = server.where({type: 'led'});
  
  server.observe([ledDeviceQuery], function(ledDevice){
    console.log(ledDevice.streams);
    ledDevice.streams.state.on('data', function(data){
        console.log(data);
    });
//    setInterval(function(){
//      starterDevice.call('do', './example/apps/starter_app.js is running', function() {});
//    }, 1000);
//      starterDevice.turnOn();
  });
  
}
