/* require - comment/remove as needed - more packages at https://www.npmjs.com/ */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
const clean = require('gulp-clean');
//const ts = require('gulp-typescript');
//const uglify = require('gulp-uglify');
//const concat = require('gulp-concat');
//const maps = require('gulp-sourcemaps');
//const mamp = require('gulp-mamp');

/* compiling the sass and autoprefix */

gulp.task('compileSass', () => {
    return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css'));
  });

/* move images across */

gulp.task('moveImgs', () => {
    return gulp.src('src/imgs/**')
    .pipe(gulp.dest('dist/imgs'));
  });

/* move html across */

gulp.task('moveHTML', () => {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

/* move fonts across */

gulp.task('moveFonts', () => {
    return gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

/* run browsersync */

gulp.task('browserSync', () => {
    browsersync.init( {
      //proxy: "localhost:8080"
      server: {
        baseDir: "dist",
        directory:true
        } 
    });
  
    gulp.watch("src/scss/*.scss", ['compileSass']);
    gulp.watch("src/*.html", ['moveHTML']);
    gulp.watch("src/imgs/**", ['moveImgs']);
    gulp.watch("src/imgs/**", ['moveFonts']);
    gulp.watch(["dist/**/*.*"]).on('change', browsersync.reload);
  
  });


/* clean 'dist' folder */

gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

/* gulp commands */

  gulp.task('serve',['browserSync']);

  gulp.task("build", ["compileSass", "moveFonts", "moveImgs" ,"moveHTML"]);

/* gulp default */

gulp.task("default", ["build"], () => {
    gulp.start("serve");
  });


