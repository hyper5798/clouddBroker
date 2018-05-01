var config = require('../config');
var mosca = require('mosca')
var util = require('./util.js');
var isAuth = config.auth
var server = null
var debug = true;

/* var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
}; */

var moscaSettings = {
  port: config.mqttPort,
  /*backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }*/
};

console.log('MQTT BROKER--------------------------------');
console.log('Broker port : ' + moscaSettings.port);
console.log('Broker start time : ' + util.getCurrentTime());
console.log('debug : ' + debug);
console.log('isAuth : ' + isAuth);
console.log('MQTT BROKER--------------------------------');

var Mqttsv = function(){
  server = new mosca.Server(moscaSettings);
  server.on('ready', setup);
  // Accepts the connection if the username and password are valid
  var authenticate = function(client, username, password, callback) {
    var authorized = (username === 'gemtek' && password.toString() === 'gemtek12345');
    if (authorized) client.user = username;
    callback(null, authorized);
  }

  // In this case the client authorized as alice can publish to /users/alice taking
  // the username from the topic and verifing it is the same of the authorized user
  var authorizePublish = function(client, topic, payload, callback) {
      
    console.log('authorizePublish--------' + util.getCurrentTime());
    console.log(' ' +  client.user);
    console.log('topic : ' +  topic);
    console.log('authorizePublish payload : ' +  payload.toString('utf8'));
      
  }

  var authorizeForward = function(client, packet, callback) {
      console.log('*************** ' + util.getCurrentTime() + ' authorizeForward ***************');
      // console.log('user : ' +  client.user);
      // console.log('payload : ' +  packet.payload.toString('utf8'));
      // example topic : GIOT-GW/DL/00001C497BC0C094  
  }

  // In this case the client authorized as alice can subscribe to /users/alice taking
  // the username from the topic and verifing it is the same of the authorized user
  var authorizeSubscribe = function(client, topic, callback) {
    callback(null, client.user == topic.split('/')[1]);
  }

  //消息發布後觸發

  server.on('published', function (packet, client) {
      console.log('------------------------------------------------------------------------');
      console.log(util.getCurrentTime() + ' Published topic: ', packet.topic);
      console.log("payload:\n", packet.payload.toString());
  });
  //客戶端連接後觸發
  server.on('clientConnected', function(client) {
    console.log(util.getCurrentTime() + ' Client Connected ');
    console.log('Client id:' + client.id);
    console.log('-----------------------------------------------------------------------');
  });

  //客戶端斷開連接後觸發
  server.on('clientDisconnected' , function(client) {
    console.log(util.getCurrentTime() + ' Client Disconnected');
    console.log('Client id:', client.id);
    console.log('-----------------------------------------------------------------------');
  });

  // when client return puback,
  // server.on('delivered', function(packet, client){
  //  console.log(util.getCurrentTime() + ' Client delivered');
  //  console.log(packet.payload.toString());
  //  console.log('-----------------------------------------------------------------------');
  // });
  // MQTT服務端準備完成後觸發
  function setup() {
    if (isAuth) {
      console.log('*****************************************');
      console.log('*         User auth flow excute         *');
      console.log('*****************************************');
      server.authenticate = authenticate;
    } else {
      console.log('*****************************************');
      console.log('*         User auth flow no excute      *');
      console.log('*****************************************');
    }

    if (debug === false) {
      console.log('*****************************************');
      console.log('*         check gw flow excute          *');
      console.log('*****************************************');
      server.authorizePublish = authorizePublish;
    } else {
      console.log('*****************************************');
      console.log('*         check gw flow no excute       *');
      console.log('*****************************************');
    }
    // server.authorizeForward = authorizeForward;
    // server.authorizeSubscribe = authorizeSubscribe;
    console.log('Mosca server is up and running')
  }
}

module.exports = new Mqttsv();

Mqttsv.prototype.getServer = function(){
    return server;
}