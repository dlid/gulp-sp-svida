var through = require('through2'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    extend = require('extend'),
    PluginError = gutil.PluginError,
    path = require('path');

const PLUGIN_NAME = 'gulp-sp-svida',
      EXE_PATH = __dirname + '\\bin\\sp-svida.exe';

      
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

            var logFilename = path.dirname(file.path) + path.sep + path.basename(file.path) + ".log"; 

            if (options.log === true) 
                parameters.push('/logFile="' + logFilename + '"');

            if (options.enterKey && options.enterKey == true) parameters.push("/enterKey");

            if (options.action == "uninstall" || options.actions == "install") {
                if (options.preview && options.preview == true) parameters.push("/preview");
                if (options.skipUpload && options.skipUpload == true) parameters.push("/skipUpload");
                if (options.skipInject && options.skipInject == true) parameters.push("/skipInject");
            }
            if (options.action == "uninstall") {
                if (options.purge && options.purge == true) parameters.push("/purge");
            }
            if (options.action == "install") {
                if (options.purge && options.purge == true) parameters.push("/force");
            }

            gutil.log(  EXE_PATH + ' ' + parameters.join(' '));

            child = spawn(EXE_PATH, parameters);

            child.on('exit', function (code, signal) {
                gutil.log("Child process exited with code " + code + (signal?" and signal " + signal : ""));
                child.kill();
                callback(null, doit(file));
            });

            child.stdout.on('data', (data) => {
                gutil.log(`${data}`);
            });

            child.stderr.on('data', (data) => {
                gutil.log(`child stderr:\n${data}`);
            });

            
        });
    }

    function install(settings) {
        var options = extend({
            action : 'install',
            enterKey : false,
            skipUpload : false,
            skipInject : false,
            preview : false,
            force : false,
            log : true
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
            purge : false,
            log : true
        }, settings);
        return runSPSvida(options);
    }

    return {
        install : install,
        uninstall : uninstall
    };

}());

module.exports = {
    install: SPSvidaPlugin.install,
    uninstall: SPSvidaPlugin.uninstall
};