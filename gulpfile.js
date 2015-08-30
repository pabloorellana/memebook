var gulp  = require('gulp');
var watch = require('gulp-watch');
var bs    = require('browser-sync').create();
var filter = require('gulp-filter');
var path   = require('path');

gulp.task('browser', function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
});

function reloadCallback(file) {
  var filepath = path.relative(__dirname, file.history[0]);
  bs.reload(filepath);
  return true;
}

var reload = filter(reloadCallback);

gulp.task('watch', ['browser'], function() {
  return gulp
    .src(['scripts/**/*', 'index.html'])
    .pipe(watch(['scripts/**/*', 'index.html'], {verbose: true}))
    .pipe(reload);
});

gulp.task('default', ['watch']);
