define(function() {
    var calls = 0;
    return {
        get: function(id, callback) {
            var call = calls++;
            socket.emit('socketio-driver', {
                call: call,
                func: 'get',
                params: {id: id},
            });
            socket.on('get' + call, function(obj) {
                callback(obj);
                socket.off('get' + call);
            });
        }
    };
});
