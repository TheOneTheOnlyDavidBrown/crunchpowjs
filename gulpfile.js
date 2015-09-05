var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var bases = {
 app: 'exampleApp/',
 dist: 'dist/',
};

var paths = {
 scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
 libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
 styles: ['styles/**/*.css'],
 html: ['index.html', '404.html'],
 images: ['images/**/*.png'],
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
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
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(sourcemaps.init())
 .pipe(babel({modules:'ignore'}))
 .pipe(uglify())
 .pipe(sourcemaps.write())
 .pipe(concat('app.min.js'))
 .pipe(gulp.dest(bases.dist + 'scripts/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
 gulp.src(paths.images, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'images/'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
 // Copy html
 gulp.src(paths.html, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));

 // Copy styles
 gulp.src(paths.styles, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist + 'styles'));

 // Copy lib scripts, maintaining the original directory structure
 gulp.src(paths.libs, {cwd: 'exampleApp/**'})
 .pipe(gulp.dest(bases.dist));

 // Copy extra html5bp files
 gulp.src(paths.extras, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));
 browserSync.reload();
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('exampleApp/**/*', ['scripts', 'copy']);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts', 'imagemin', 'copy'], function(){
  gulp.start('browser-sync');
  gulp.start('watch');
});
