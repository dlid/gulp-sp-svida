# gulp-sp-svida

This is a simple packaging of sp-svida (soon to be released properly).


 * A simple plugin to wrap sp-svida functionality within a gulp task
 * Includes sp-svida executables, dlls and requirements

## sp-svida

sp-svida is a command line utility to install a package of SiteAssets (image, scripts and stylesheets) in a SharePoint On-Prem environment. It will add, update and delete files - and will also add, update and delete the CustomActions that include the on the SiteCollection or the SPWebs.

Return later for more details when this is more tested.

## Installation

To install using npm:

```javascript
npm install gulp-sp-svida --save
```

## Usage

```javascript
var svida = require('gulp-sp-svida');

gulp.task('install-production', function() {
 return gulp.src('prod.sp-svida')
 .pipe(svida.install());
});

gulp.task('install-production-preview', function() {
 return gulp.src('prod.sp-svida')
 .pipe(svida.install({ preview : true ));
});

gulp.task('uninstall-production', function() {
 return gulp.src('prod.sp-svida')
 .pipe(svida.uninstall());
});

gulp.task('uninstall-production-preview', function() {
 return gulp.src('prod.sp-svida')
 .pipe(svida.uninstall({ preview : true ));
});

```

