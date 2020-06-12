var config = {};

config.port = 8001;

//Authentication
config.auth = true;
config.username = '';
config.password = '';

//Zone
config.timezone = 'Asia/Taipei';
//Debug
config.debug = true;
config.isLocalDB = true;
//Server
config.server = 'http://localhost:'+ config.port + '/';

//MQTT
config.mqttPort = 1883;

module.exports = config;