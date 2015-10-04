var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');

var bases = {
  app: 'example',
  dist: 'dist/',
};

var paths = {
  scripts: ['src/**/*.js', 'example/**/*.js'],
  templates: ['templates/**/*.html', 'example/**/*.html'],
  libs: ['libs/**/*.js'],
  styles: ['styles/**/*.scss'],
  html: ['index.html', '404.html'],
  images: ['images/**/*.png'],
  extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};


// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    port: 9000,
    server: {
      baseDir: "dist"
    }
  });
});

// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src(bases.dist)
    .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
  gulp.src(paths.scripts, {
      cwd: '.'
    })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel({
      modules: 'ignore'
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(bases.dist + 'scripts/'))
    .pipe(reload({
      stream: true
    }));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
  gulp.src(paths.images, {
      cwd: bases.app
    })
    .pipe(imagemin())
    .pipe(gulp.dest(bases.dist + 'images/'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
  // Copy html
  gulp.src(paths.html, {
      cwd: bases.app
    })
    .pipe(gulp.dest(bases.dist));

  // Copy styles
  gulp.src(paths.styles, {
      cwd: bases.app
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(bases.dist + 'styles'));

  // Copy templates
  gulp.src(paths.templates, {
      cwd: bases.app
    })
    .pipe(gulp.dest(bases.dist + 'templates'));

  // Copy extra html5bp files
  gulp.src(paths.extras, {
      cwd: bases.app
    })
    .pipe(gulp.dest(bases.dist))
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
  gulp.watch(['src/**/*', 'example/**/*'], ['scripts', 'copy']);
});

gulp.task("bower-files", ['clean'], function() {
  return gulp.src(mainBowerFiles(), {
      base: bases.dist + 'vendor'
    })
    .pipe(gulp.dest(bases.dist + 'vendor'));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts', 'imagemin', 'bower-files', 'copy'], function() {
  gulp.start('browser-sync');
  gulp.start('watch');
});
