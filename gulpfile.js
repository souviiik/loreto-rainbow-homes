var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true,
        port: 3000
    });
});

gulp.task('html', function () {
    return gulp.src('client/html/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

gulp.task('css', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'client/scss/*.scss'])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload())
});

gulp.task('images', function () {
    return gulp.src(['client/assets/**/*.*'])
        .pipe(gulp.dest('build/assets'))
        .pipe(connect.reload())
});

gulp.task('js', function () {
    return gulp.src('client/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload())
});

gulp.task('watch', gulp.parallel('html', 'css', 'js'));

gulp.task('default', gulp.parallel(['connect', 'watch', 'html', 'css', 'images', 'js']));
