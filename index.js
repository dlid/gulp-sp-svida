var through = require('through2'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    extend = require('extend'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-sp-svida',
      EXE_PATH = __dirname + '\\bin\\sp-svida.exe',
      filename = __dirname;
var SPSvidaPlugin = (function () {

    function runSPSvida(options) {

        function doit() {
            return "";
        }

        return through.obj(function (file, encoding, callback) {

            var parameters = [
                    options.action,
                    '/config="' + file.path + '"',
                ],
                child;

            if (options.enterKey && options.enterKey == true) parameters.push("/enterKey");
            if (options.skipUpload && options.skipUpload == true) parameters.push("/skipUpload");
            if (options.skipInject && options.skipInject == true) parameters.push("/skipInject");
            if (options.preview && options.preview == true) parameters.push("/preview");
            if (options.purge && options.purge == true) parameters.push("/purge");

            gutil.log(  EXE_PATH + ' ' + parameters.join(' '));

            child = spawn(EXE_PATH, parameters);

            child.on('exit', function (code, signal) {
                gutil.log('Child process exited with ${code} and signal ${signal}');
                child.kill();
            });

            child.stdout.on('data', (data) => {
                gutil.log(`${data}`);
            });

            child.stderr.on('data', (data) => {
                gutil.log(`child stderr:\n${data}`);
            });

            callback(null, doit(file));
        });
    }

    function install(settings) {
        var options = extend({
            action : 'install',
            enterKey : false,
            skipUpload : false,
            skipInject : false,
            preview : false
        }, settings);
        return runSPSvida(options);
    }

    function uninstall(settings) {
        var options = extend({
            action : 'uninstall',
            enterKey : false,
            skipUpload : false,
            skipInject : false,
            preview : false,
            purge : false
        }, settings);
        return runSPSvida(options);
    }

    return {
        install : install,
        uninstall : uninstall
    }


}());

module.exports = {
    install: SPSvidaPlugin.install,
    uninstall: SPSvidaPlugin.install
};