var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    connect = require('gulp-connect'),
    node;

//Look at http://code.tutsplus.com/tutorials/gulp-as-a-development-web-server--cms-20903
//https://github.com/osscafe/gulp-cheatsheet


//This doesn't work?
gulp.task('serve', function() {
  if (node) {
    console.log('task killed'); //this is happening, but changes aren't being reflected on da server
    node.kill('SIGKILL');
  }

  node = spawn('node', ["./bin/www"]);

  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});


gulp.task('livereload', function() {
  gulp.watch('app.js', ['serve']);
});

gulp.task('default', ['serve']);