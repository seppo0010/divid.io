var Preprocessor = require('preprocessor');
var walk = require('walk');
var fs = require('node-fs');
var path = require('path');

var rm = function() {
    var hasError = false;
    var walker = walk.walk('build');

    walker.on('file', function(root, fileStats, next) {
        // console.info('deleting file', path.join(root, fileStats.name));
        fs.unlink(path.join(root, fileStats.name), next);
    });
    walker.on('directory', function(root, fileStats, next) {
        // console.info('deleting dir', path.join(root, fileStats.name));
        fs.rmdir(path.join(root, fileStats.name), function(err) {
            if (err && !hasError) {
                hasError = true;
                rm();
            }
            next();
        });
    });
    walker.on('end', function() {
        if (!hasError) {
            build();
        }
    });
};
rm();

function build() {
    [
        {name: 'browser', options: {BROWSER: true}},
        {name: 'server', options: {SERVER: true}}
    ].forEach(function(params) {
        ['sample', 'lib'].forEach(function(dir) {
            var walker = walk.walk(dir);

            walker.on('file', function(root, fileStats, next) {
                fs.readFile(path.join(root, fileStats.name), function(err, data) {
                    var p = path.join('build', params.name, root, fileStats.name);
                    fs.mkdir(path.dirname(p), 0777, true, function(err) {
                        // console.info('writing file', p);
                        var pp = new Preprocessor(data, path.dirname(p));
                        fs.writeFile(p, pp.process(params.options), next);
                    });
                });
            });
        });
    });
}
