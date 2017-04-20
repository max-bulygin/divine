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
    cheerio = require('gulp-cheerio'),
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
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('assets/dev/img'));
});

gulp.task('serve', ['scripts', 'styles', 'svgstore'], function() {
    browserSync({
        notify: false,
        logPrefix: 'serve:dev',
        server: ['assets/.tmp', 'assets/dev', 'views/pages', 'assets/dev/third-party'],
        port: 3000
    });

    gulp.watch(['views/pages/*.html'], reload);
    gulp.watch(['assets/dev/sass/**/*'], ['styles', reload]);
    gulp.watch(['assets/dev/js/**/*.js'], ['scripts', reload]);
    gulp.watch(['assets/dev/img/**/*'], ['svgstore', reload]);
});

gulp.task('copy:html', function () {
    return gulp.src('views/pages/*.html')
        .pipe(gulp.dest('docs/'))
});

gulp.task('copy:img', function () {
    return gulp.src('assets/dev/img/*.*')
        .pipe(gulp.dest('docs/img/'))
});

gulp.task('copy:video', function () {
    return gulp.src('assets/dev/video/*.*')
        .pipe(gulp.dest('docs/video'))
});

gulp.task('copy:js', function () {
    return gulp.src('assets/build/js/*.*')
        .pipe(gulp.dest('docs/js'))
});

gulp.task('copy:css', function () {
    return gulp.src('assets/build/css/*.*')
        .pipe(gulp.dest('docs/css'))
});

gulp.task('copy:fonts', function () {
    return gulp.src('assets/dev/fonts/**/*.*')
        .pipe(gulp.dest('docs/fonts'))
});

gulp.task('build:demo', ['copy:html', 'copy:img', 'copy:video', 'copy:js', 'copy:css', 'copy:fonts']);
