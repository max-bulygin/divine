var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin');

var reload = browserSync.reload;

gulp.task('scripts', function (cb) {
    pump([
            gulp.src('assets/dev/js/*.js'),
            include(),
            concat('app.min.js'),
            uglify(),
            gulp.dest('assets/build/js'),
            gulp.dest('assets/.tmp/js')
        ],
        cb
    );
});

gulp.task('styles', function () {
    return gulp.src('assets/dev/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 100 versions']
        }))
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/.tmp/css/'))
        .pipe(gulp.dest('assets/build/css/'));
});

// SVG sprites
gulp.task('svgstore', function () {
    return gulp.src('assets/dev/img/icons/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('assets/dev/img'));
});

gulp.task('serve', ['scripts', 'styles', 'svgstore'], function() {
    browserSync({
        notify: false,
        logPrefix: 'serve:dev',
        server: ['assets/.tmp', 'assets/dev', 'views/pages'],
        port: 3000
    });

    gulp.watch(['views/pages/*.html'], reload);
    gulp.watch(['assets/dev/sass/**/*'], ['styles', reload]);
    gulp.watch(['assets/dev/js/**/*.js'], ['scripts', reload]);
    gulp.watch(['assets/dev/img/**/*'], ['svgstore', reload]);
});
