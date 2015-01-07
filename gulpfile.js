var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var out = require('gulp-out');

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

gulp.task('compress', function() {
  gulp.src('index.js')
      .pipe(browserify())
      .pipe(uglify())
      .pipe(out('./dist/bundle.min{extension}'));
});

gulp.task('watch', function(){
  gulp.watch(['index.js', 'lib/*.js'], ['browserify']);
});

gulp.task('watch-build', function(){
  gulp.watch(['index.js', 'lib/*.js'], ['browserify', 'compress']);
});

gulp.task('dev', ['webserver', 'watch']);

gulp.task('build', ['browserify', 'compress']);
