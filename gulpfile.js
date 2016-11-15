'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cssImport = require('postcss-import');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
// const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const project = {
  genDest: 'assets',
  genSrc: 'src/assets',
  stylesSrc: 'src/assets/styles/styles.css',
  stylesWatch: 'src/assets/**/*.css',
  imagesSrc: 'src/assets/images/**'
};

gulp.task('clean', () => {
  return del('public');
});

gulp.task('styles', () => {
  const processors = [
    cssImport(),
    cssnext({browsers: ['last 2 version']})
  ];

  return gulp.src(project.stylesSrc, {base: project.genSrc })
    .pipe(plumber())
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(postcss(processors))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(gulpif(!isDevelopment, cssnano()))
    .pipe(gulp.dest(project.genDest));
});

gulp.task('images', () => {
  return gulp.src(project.imagesSrc, {since: gulp.lastRun('images'), base: project.genSrc})
    .pipe(newer('public'))
    .pipe(imagemin())
    .pipe(gulp.dest(project.genDest));
});

// gulp.task('server', () => {
//   browserSync.init({
//     server: project.genDest
//   });
//
//   browserSync.watch(project.servRoot).on('change', browserSync.reload);
// });

gulp.task('watch', () => {
  gulp.watch(project.stylesWatch, gulp.series('styles'));
  gulp.watch(project.imagesSrc, gulp.series('images'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'images')));

gulp.task('default', gulp.series('build', 'watch'));