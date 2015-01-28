// #ifdef BROWSER
define(['models/socketio-client'], function(driver) {
// #endif
// #ifdef SERVER
var driver = require('./redis-driver');
// #endif

var models = {
    get: function(id, callback) {
        driver.get(id, callback);
    }
};
// #ifdef SERVER
module.exports = models;
// #endif
// #ifdef BROWSER
return models;
});
// #endif
