var moment = require('moment-timezone');
var config = require('../config');
var CryptoJS = require("crypto-js");
var async  = require('async');
var config = require('../config');

module.exports = {
    getCurrentTime,
}

function getIntData(arrRange,initData){
    var ret = {};
    var start = arrRange[0];
    var end = arrRange[1];
    var subStr = initData.substring(start,end);
    if (subStr === '') {
        return null;
    }
    var diff = arrRange[2];
    if (diff === 'epc') {
        /*parseEPC(subStr, null, function(err, parsed){
            if (err) {
                return null;
            }
            return parsed;
        })*/
        return subStr;
    } else if (diff==='signhex') {
       return parseSignHex(subStr);
    } else {
        var data = parseInt(subStr, 16);
        // example :
        // diff = "data/100"
        // data = 2000
        // eval(diff) = 2000/100 = 20
        var result = eval(diff)
        return Number(result.toFixed(2));
    }
}

function convertTime(dateStr) {
    //method 1 - use convert function
    //var d = new Date();
    var d = new Date(dateStr);
    var d_ts = d.getTime(); //Date.parse('2017-09-12 00:00:00'); //get time stamp
    // console.log("showSize :"+ d);
    // console.log("showPos d_ts : " + d_ts);
    return d_ts;
}

function getType(p) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
}

function getCurrentTime() {
    var now = moment.utc();
    return now.tz(config.timezone).format('YYYY/MM/DD HH:mm:ss');
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function parseSignHex(hex) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
}
 
 function getISODate() {
    var d = new Date();
    d.setTime(d.getTime() + ( -d.getTimezoneOffset()*60*1000));
    return d;
 }