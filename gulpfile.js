var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
maps = require('gulp-sourcemaps'),
mamp = require('gulp-mamp'),
browsersync = require('browser-sync').create(),
del = require('del');

/* compiling the sass and autoprefix */

gulp.task('compileSass', function() {
    return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(rename('blog-style.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});


/* move images across */

gulp.task('moveImgs', function() {
    return gulp.src('imgs/**')
    .pipe(gulp.dest('dist/imgs'));
});

/* move images across */

gulp.task('moveHTML', function() {
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

/* run browsersync */

gulp.task('browserSync', function() {
    browsersync.init( {
        server: {
            baseDir: "dist",
            directory:true
        }
    });

    gulp.watch("scss/*.scss", ['compileSass']);
    gulp.watch("*.html", ['moveHTML']);
    gulp.watch("imgs/**", ['moveImgs']);
    gulp.watch(["dist/**/*.*"]).on('change', browsersync.reload);

});

/* setting up a clean */

gulp.task('clean', function(){
    del(['dist'], {force: true});
});

/* gulp commands */

gulp.task('serve',['browserSync']);

gulp.task("build", ["compileSass", "moveImgs"], function() {
    return gulp.src(['*.html'])
            .pipe(gulp.dest('dist'));
});

/* gulp default */

gulp.task("default", ["clean", "build"], function(){
    gulp.start("serve");
});


