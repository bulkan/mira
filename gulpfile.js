var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

gulp.task('browserify', function(){
  gulp.src('index.js')
      .pipe(browserify())
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('./dist'));
});


gulp.task('webserver', function() {
  connect.server({
    port: 9966
  });
});

gulp.task('watch', function(){
  gulp.watch('index.js',  ['default']);
});

gulp.task('default', ['browserify', 'watch']);

gulp.task('dev', ['default', 'webserver']);
