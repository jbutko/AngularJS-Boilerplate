/**
 * @author  Jozef Butko
 * @date    March 2015
 *
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The following build process consists of these steps:
 * 1. clean _build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. copy all HTML files into $templateCache
 * 5. build index.html and change base tag into _build folder
 * 6. copy fonts
 * 7. show build folder size
 * 
 */
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var filter          = require('gulp-filter');
var uglify          = require('gulp-uglify');
var minifyCSS       = require('gulp-minify-css');
var minifyHTML      = require('gulp-minify-html');
var del             = require('del'); // delete files
var concat          = require('gulp-concat');
var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var notify          = require('gulp-notify');
var changed         = require('gulp-changed');
var usemin          = require('gulp-usemin');
var rev             = require('gulp-rev');// append revision numbers at the end of filename: https://github.com/sindresorhus/gulp-rev
var size            = require('gulp-size');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var uncss           = require('gulp-uncss');
var htmlreplace     = require('gulp-html-replace');
var runSequence     = require('run-sequence');
var templateCache   = require('gulp-angular-templatecache');


// optimize images
gulp.task('images', function () {
    return gulp.src('./images/*')
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()]
        // }))
        .pipe(changed('./_build/images'))
        .pipe(imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        }))
        .pipe(gulp.dest('./_build/images'));
});

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
    var opts = {
      comments: true,
      spare:true,
      conditionals: true
    };

  gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./_build/'));
});

// Copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
    gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe(changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/'
    }
  }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    // here we use a globbing pattern to match everything inside the `build` folder
    './_build/'
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  gulp.src('./js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./_build/'));
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }))
        .on('error', notify.onError({
          title: 'SASS Failed',
          message: 'Error(s) occurred during compile!'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles'))
        .pipe(reload({stream: true}))
        .pipe(notify({ message: 'Styles task complete' }));
});

// SASS Build task
gulp.task('sass:build', function() {
  var s = size();

  return gulp.src('styles/style.scss')
    .pipe(sass({
      style: 'compact'
    }))
    .pipe(autoprefixer('last 3 version'))
    .pipe(uncss({
      html: ['./index.html', './views/**/*.html', './components/**/*.html'],
      ignore: [
        '.index',
        '.slick',
        /\.owl+/,
        /\.owl-next/,
        /\.owl-prev/
      ]
    }))
    .pipe(minifyCSS({
      keepBreaks: true,
      aggressiveMerging: false,
      advanced: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('_build/css'))
    .pipe(s)
    .pipe(notify({
      onLast: true,
      message: function() {
        return 'Total CSS size ' + s.prettySize;
      }
    }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html build
// script/css concatenation
gulp.task('usemin', function () {
  return gulp.src('./index.html')
      // add templates path
      .pipe(htmlreplace({
        'templates': '<script type="text/javascript" src="js/templates.js"></script>'
      }))
      .pipe(usemin({
        css: [ minifyCSS(), 'concat' ],
        //html: [minifyHTML({empty: true})],
        js: [ uglify(), rev() ]
      }))
      .pipe(gulp.dest('./_build/'));
});

/*
 * make templateCache out of all HTML files
 */
gulp.task('templates', function() {
  return gulp.src([
    './**/*.html',
    '!bower_components/**/*.*',
    '!node_modules/**/*.*',
    '!_build/**/*.*'
    ])
    .pipe(templateCache({
      module: 'boilerplate'
    }))
    .pipe(gulp.dest('_build/js'));
});

/**
 * Reload all Browsers
 */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/**
 * Count build foulder size
 */
gulp.task('build:size', function () {
  var s = size();

  return gulp.src('./_build/**/*.*')
    .pipe(s)
    .pipe(notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
});

// Default task to be run with `gulp`
// This default task will run BrowserSync & then use Gulp to watch files.
// When a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'sass', 'minify-css'], function () {
    gulp.watch('styles/*.css', function (file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch('*.html', ['bs-reload']);
    gulp.watch('views/*.html', ['bs-reload']);
    gulp.watch('app/*.js', ['bs-reload']);
    gulp.watch('js/*.js', ['bs-reload']);
    gulp.watch('components/**/*.js', ['bs-reload']);
    gulp.watch('styles/**/*.scss', ['sass', 'minify-css']);
});

/**
 * Build Task:
 * 1. clean _build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. copy all HTML files into $templateCache
 * 5. build index.html and change base tag into _build folder
 * 6. copy fonts
 * 7. show build folder size
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'templates',
    'usemin',
    'fonts',
    'build:size',
    callback);
});

