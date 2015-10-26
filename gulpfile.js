var gulp = require('gulp'),
    react = require('gulp-react'),
    browser_sync = require( 'browser-sync' ).create(),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    node;

/* 
 * Resources:
 * http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var paths = {
  HTML: ['views/index.ejs','views/error.ejs', 'views/login.ejs', 'views/register.ejs'],
  //ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS_BUILD_DEST: ['public/js', 'public/components'],
  JS_SOURCE: ['src/js/*.js', 'src/components/*.js'],
  SERVER: ['app.js', 'routes/*.js'],
  VISUAL: ['./public/**/*.*', './views/*.*'],
  COMPONENTS: ['public/components/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'src',
  DEST: 'dist'
};

var options = {
    server: {
      script: './bin/www', 
      ext: 'js html', 
      env: {'NODE_ENV': 'development' }
  },
    browser_sync: {
        proxy: 'http://localhost:3000'
    }
};

/*------------------------JS+REACT----------------------------*/
//Transforms ES6 and React JSX syntax to vanilla JS
gulp.task('transform_jsx', function() {
  gulp.src(paths.JS_SOURCE[0])
    .pipe(react())
    .pipe(gulp.dest(paths.JS_BUILD_DEST[0]));
  gulp.src(paths.JS_SOURCE[1])
    .pipe(react())
    .pipe(gulp.dest(paths.JS_BUILD_DEST[1]));
});

gulp.task('compile_js', function() {
  gulp.watch(paths.JS, ['transform_jsx']);
});

/*------------------------JS+REACT----------------------------*/

/*------------------------NODE_SERVER----------------------------*/
gulp.task('browser-sync', ['serve'] /* browser sync called as a callback of serve */, function() {
  livereload.reload();
  browser_sync.init({
    proxy: "http://localhost:3000",
        files: paths.VISUAL_SRC,
        browser: "google chrome",
        port: 4000,
  });
});


// run server and restart when necessary
gulp.task('serve', function (callback) {
  livereload.listen();
  var started = false;
  nodemon(options.server)
    .on('start', function() {
      if(!started) {
        callback();
        started = true;
      }
    });
});
/*------------------------NODE_SERVER----------------------------*/


gulp.task('default', ['compile_js', 'browser-sync']);