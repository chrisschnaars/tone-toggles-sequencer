'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
var autoprefixer = require("autoprefixer");
var babel = require('gulp-babel');
var browserSync = require("browser-sync").create();
var concat = require('gulp-concat');
var cssnano = require("cssnano");
var del = require("del");
var htmlValidator = require('gulp-w3c-html-validator');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var newer = require("gulp-newer");
var postcss = require("gulp-postcss");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var terser = require('gulp-terser');
var uglify = require('gulp-uglify');

// FILE PATHS
var paths = {
  html: {
    src: './app/*.html',
    tmp: 'tmp/',
    dist: './dist/'
  },
  styles: {
    src: './app/scss/**/*.scss',
    tmp: './tmp/css/',
    dist: './dist/css/'
  },
  scripts: {
    src: './app/scripts/**/*.js',
    tmp: './tmp/js/',
    dist: 'dist/js/'
  },
  assets: {
    src: './app/assets/**/*',
    tmp: './tmp/assets/',
    dist: './dist/assets/'
  }
};


// CLEAN ASSETS
function clean() {
  return del([
    paths.styles.tmp,
    paths.scripts.tmp,
    paths.assets.tmp,
    paths.styles.dist,
    paths.scripts.dist,
    paths.assets.dist
  ]);
}

// HTML
function html() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(htmlValidator())
      .pipe(htmlValidator.reporter())
      .pipe(gulp.dest(paths.html.tmp))
      .pipe(gulp.dest(paths.html.dist))

      // RELOAD SERVER
      .pipe(browserSync.stream())
  );
}

// OPTIMIZE IMAGES
function images() {
  return gulp
    .src(paths.assets.src)
    .pipe(newer(paths.assets.tmp))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.assets.tmp))
    .pipe(gulp.dest(paths.assets.dist))
}

// PROCESS SCSS TO CSS
function style() {
  return (
      gulp
        // GET STYLES
        .src(paths.styles.src)

        // INITIALIZE SOURCE MAP
        .pipe(sourcemaps.init())

        // PROCESS SOURCE FILES INTO CSS
        .pipe(sass())
        .on("error", sass.logError)

        // WRITE SOURCE MAP
        .pipe(sourcemaps.write())

        // ADD CSS FILE TO TMP FOLDER
        .pipe(gulp.dest(paths.styles.tmp))

        // ADD MINIMIZED FILE TO DIST
        // .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dist))

        // RELOAD SERVER
        .pipe(browserSync.stream())
  );
}

// CONCAT JAVASCRIPT FILES
function scripts() {
  return (
    gulp
      // GET FILES
      .src([
        './app/scripts/main.js',
        './app/scripts/interaction.js',
        './app/scripts/wavetable.js',
        './app/scripts/tone-settings.js',
        './app/scripts/beat-settings.js',
        './app/scripts/tone-toggles.js',
        './app/scripts/audio.js'
      ])

      // INITIALIZE SOURCEMAPS
      .pipe(sourcemaps.init())

      // CONCATENATE
      .pipe(babel({presets: ["@babel/preset-env"]}))
      .pipe(concat('main.js'))

      // WRITE SOURCEMAP
      .pipe(sourcemaps.write())

      // ADD TO TMP FOLDER
      .pipe(gulp.dest(paths.scripts.tmp))

      // MINIMIZE AND ADD TO DIST
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dist))

      // RELOAD SERVER
      .pipe(browserSync.stream())
  );
}

// JS LINTER
function scriptsLint() {
  return (
    gulp
      // GET FILES
      .src(paths.scripts.src)

      // LINT
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
    );
}

// WATCH FOR CHANGES
function watch() {
  // INITIALIZE BROWSER
  browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: './tmp'
        }
    });
    // WATCH TASKS
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.assets.src, images)
}

// COMPLEX TASKS
var build = gulp.series(clean, gulp.parallel(html, style, scripts, images));
var develop = gulp.series(build, watch);
// Don't forget to expose the task!

// EXPOSED TASKS
exports.style = style;
exports.jslint = scriptsLint;
exports.watch = watch;
exports.build = build;
exports.default = develop;
