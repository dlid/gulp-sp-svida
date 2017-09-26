var gulp = require('gulp'),
    svida = require('./index.js');


gulp.task('default', function () {
   return gulp.src(['test.sp-svida'])
        .pipe(svida.install());
});

