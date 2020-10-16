const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
// const image = require('gulp-image');
const fonts = require('gulp-fontmin');
const browserSync = require('browser-sync').create();
const del = require('del');

const paths = {
  styles: {
    src: 'src/css/*.css',
    dest: 'dist/css'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'dist/fonts'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  image: {
    src: 'src/image/*.png',
    dest: 'dist/image'
  }
};

function browser(done){
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
  done();
}

function browserReload(done){
  browserSync.reload();
  done();
}

function buildCSS(){
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
  
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}


function buildHTML() {
  return gulp.src(paths.html.src)
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream())
}

function buildImages() {
  return gulp.src(paths.image.src)
      // .pipe(image())
      .pipe(gulp.dest(paths.image.dest))
      .pipe(browserSync.stream())
}
function buildFonts() {
  return gulp.src(paths.fonts.src)
      .pipe(fonts())
      .pipe(gulp.dest(paths.fonts.dest))
      .pipe(browserSync.stream())
}

function watch(){
  gulp.watch(paths.styles.src, buildCSS);
  gulp.watch(paths.html.src, buildHTML);
  gulp.watch(paths.image.src, buildImages);
  gulp.watch(paths.fonts.src, buildFonts);
  gulp.watch('./src/*.html', gulp.series(browserReload))
}

function clear(){
  return del(['dist']);
}

const build = gulp.series(clear, gulp.parallel(buildCSS, buildHTML, buildImages, buildFonts));

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, build, browser));












































// function defaultTask(cb) {
//     console.log('Gulp works');
//     cb();
//   }
  
//   exports.default = defaultTask;