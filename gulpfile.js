var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),

  source = './src/',
  dest = './build/';

function html() {
  return gulp.src(dest + '**/*.html');
}

function styles() {
  return gulp.src(source + '**/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest(dest))
}

function watch() {
  gulp.watch(source + 'css/**/*.css', styles).on('change', browserSync.reload);
  gulp.watch(source + 'index.html', html).on('change', browserSync.reload);
}

function server() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: dest,
    },
  });

  gulp.watch(source + 'css/**/*.css', styles).on('change', browserSync.reload);
  gulp.watch(dest + 'index.html', html).on('change', browserSync.reload);
}

var build = gulp.series(gulp.parallel(styles, html), server, watch);

gulp.task('default', build);
