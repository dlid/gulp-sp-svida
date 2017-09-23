var through = require('through2'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-sp-svida',
    EXE_PATH = __dirname + 'bin\\sp-svida.exe', // bin later
    filename = __dirname;

var SPSvidaPlugin = (function () {


    function preview() {

        //gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));

        function doit() {
            return "";
        }

        return through.obj(function (file, encoding, callback) {


            var parameters = [
                'preview',
                '/config="' + file.path + '"',
                "/enterKey"
                ],
                child;

            child = spawn(EXE_PATH, parameters);

            child.on('exit', function (code, signal) {
                gutil.log('Child process exited with ${code} and signal ${signal}');
            });

            child.stdout.on('data', (data) => {
                gutil.log(`child stdout:\n${data}`);
            });

            child.stderr.on('data', (data) => {
                gutil.log(`child stderr:\n${data}`);
                child.kill();
            });


            gutil.log(EXE_PATH + ' preview /config="' + file.path + '"', 'Really it did', gutil.colors.magenta('123'));


            callback(null, doit(file));
        });


    }

    return {
        preview : preview
    }


}());

module.exports = {
    preview: SPSvidaPlugin.preview
};