var gulp = require('gulp'),
    react = require('gulp-react'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack'),
    browserify = require('browserify'),
    browser_sync = require( 'browser-sync' ).create(),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    requirejs = require('gulp-requirejs'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify');

/* 
 * Resources:
 * http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var paths = {
  HTML: ['views/index.ejs','views/error.ejs', 'views/login.ejs', 'views/register.ejs'],
  //ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS_BUILD_DEST: ['public/js', 'public/components'],
  JS_SOURCE: ['src/js/*.js', 'src/components/*.js'],
  CSS_SOURCE: ['src/css/*'],
  CSS_BUILD_DEST: ['./public/stylesheets'],
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

/*------------------------SASS---------------------------------*/
gulp.task('sass', function() {
  gulp.src(paths.CSS_SOURCE)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.CSS_BUILD_DEST[0]));
});

gulp.task('watch_sass', function() {
  gulp.watch(paths.CSS_SOURCE, ['sass']);
});

/*------------------------SASS---------------------------------*/

/*------------------------JS+REACT----------------------------*/
//Transforms ES6 and React JSX syntax to vanilla JS
gulp.task('transform_jsx', function() {
    return browserify({ 
      entries: ['src/js/login.js'],
      transform: [reactify]
    })
        .bundle()
        .pipe(source('login.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('compile_js', function() {
  gulp.watch(paths.JS_SOURCE, ['transform_jsx']);
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


gulp.task('default', ['watch_sass', 'compile_js', 'browser-sync']);