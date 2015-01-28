var models = require('./index');

// whitelist methods
var methods = {
    get: models.get,
};

module.exports = function(socket) {
    socket.on('socketio-driver', function(params) {
        if (methods[params.func]) {
            methods[params.func](params.params, function(obj) {
                socket.emit(params.func + params.call, obj);
            });
        }
    });
};
