var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

var reload = browserSync.reload;

gulp.task('styles', function () {

    return gulp.src('assets/dev/sass/*')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/.tmp/css/'));
});

gulp.task('serve', ['styles'], function() {
    browserSync({
        notify: false,
        logPrefix: 'serve:dev',
        server: ['assets/.tmp', 'assets/dev', 'views/pages'],
        port: 3000
    });

    gulp.watch(['views/pages/*.html'], reload);
    gulp.watch(['assets/dev/sass/**/*'], ['styles', reload]);
    // gulp.watch(['assets/dev/js/**/*.js'], ['scripts', reload]);
    gulp.watch(['assets/dev/images/**/*'], reload);
});
