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

var server;

gulp.task('webserver', function() {
  if (server){
    return;
  }
  server = connect.server({
    port: 9966
  });
});

gulp.task('watch', function(){
  gulp.watch(['index.js', 'lib/*.js'], ['browserify']);
});

gulp.task('dev', ['webserver', 'watch']);
