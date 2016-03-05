var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cssbeautify = require('gulp-cssbeautify');
var gulpCopy = require('gulp-copy');
var del = require('del');
var inject = require('gulp-inject');
var wait = require('gulp-wait');
var angularFilesort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var gulpNgConfig = require('gulp-ng-config');
var eventStream = require('event-stream');

var srcPaths = {
  index: 'src/index.html',
  config: 'src/js/config.json',
  templates: ['src/**/*.html', '!src/index.html'],
  js: ['src/**/*.js'],
  scss: ['src/**/*.scss'],
};

var buildPath = 'www';

gulp.task('dev', ['clean', 'config-dev', 'js', 'scss', 'templates-dev'], function(cb) {
  var target = gulp.src(srcPaths.index);

  var appJs = gulp.src([buildPath + '/**/*.js', '!' + buildPath + '/vendor/**']).pipe(angularFilesort());
  var appCss = gulp.src([buildPath + '/**/*.css', '!' + buildPath + '/vendor/**'], {
    read: false
  });

  return target
    .pipe(inject(appCss, {
      removeTags: true,
      ignorePath: 'www',
      addRootSlash: false,
      addPrefix: 'http://localhost:8080'
    }))
    .pipe(inject(appJs, {
      removeTags: true,
      ignorePath: 'www',
      addRootSlash: false,
      addPrefix: 'http://localhost:8080'
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('prod', ['clean', 'config-prod', 'templates-prod', 'alljs', 'allscss'], function(cb) {
  var target = gulp.src(srcPaths.index);

  var appJs = gulp.src([buildPath + '/**/*.js', '!' + buildPath + '/vendor/**']).pipe(angularFilesort());
  var appCss = gulp.src([buildPath + '/**/*.css', '!' + buildPath + '/vendor/**'], {
    read: false
  });

  return target
    .pipe(inject(appCss, {
      removeTags: true,
      addRootSlash: false,
      ignorePath: 'www'
    }))
    .pipe(inject(appJs, {
      removeTags: true,
      addRootSlash: false,
      ignorePath: 'www'
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('js', function(cb) {
  return gulp.src(srcPaths.js)
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath));
});

gulp.task('config-dev', function(cb) {
  return gulp.src(srcPaths.config)
    .pipe(gulpNgConfig('abc-bubbles.config', {
      environment: 'dev',
      wrap: true
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('config-prod', function(cb) {
  return gulp.src(srcPaths.config)
    .pipe(gulpNgConfig('abc-bubbles.config', {
      environment: 'prod',
      wrap: true
    }))
    .pipe(uglify())
    .pipe(rename('config.min.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('alljs', function(cb) {
  // var allJs = gulp.src(srcPaths.js);
  // return eventStream.merge(templates, config, allJs)
  return gulp.src(srcPaths.js)
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath));
});

gulp.task('allscss', function(cb) {
  return gulp.src(srcPaths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({}))
    .pipe(concat('app.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(buildPath));
});

gulp.task('scss', function(cb) {
  return gulp.src(srcPaths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({}))
    .pipe(concat('app.css'))
    .pipe(cssbeautify())
    .pipe(gulp.dest(buildPath));
});

gulp.task('templates-dev', function(cb) {
  return gulp.src(srcPaths.templates)
    .pipe(templateCache({
      module: 'abc-bubbles.templates',
      // root: 'templates/',
      moduleSystem: 'IIFE',
      standalone: true
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('templates-prod', function(cb) {
  return gulp.src(srcPaths.templates)
    .pipe(templateCache({
      module: 'abc-bubbles.templates',
      // root: 'templates/',
      moduleSystem: 'IIFE',
      standalone: true
    }))
    .pipe(uglify())
    .pipe(rename('templates.min.js'))
    .pipe(gulp.dest(buildPath));
});


gulp.task('clean', function() {
  del.sync([buildPath + '/**', '!' + buildPath, '!' + buildPath + '/fonts/**', '!' + buildPath + '/vendor/**', '!' + buildPath + '/images/**', ], {
    force: true
  });
});


gulp.task('watch', function() {

  gulp.watch(srcPaths.js, function(e) {
    setTimeout(function() {
      gulp.run('dev');
    }, 500);
  });
  gulp.watch(srcPaths.scss, function(e) {
    setTimeout(function() {
      gulp.run('dev');
    }, 500);
  });
  gulp.watch(srcPaths.templates, function(e) {
    setTimeout(function() {
      gulp.run('dev');
    }, 500);
  });
  gulp.watch(srcPaths.index, function(e) {
    setTimeout(function() {
      gulp.run('dev');
    }, 500);
  });

  // gulp.watch(srcPaths.scss, watchOptions, ['dev']);
  // gulp.watch(srcPaths.templates, watchOptions, ['dev']);
  // gulp.watch(srcPaths.index, watchOptions, ['dev']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'build-dev']);