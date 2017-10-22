var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
    'bower_compontents/bootstrap/scss/bootstrap'
];

gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('assets/css'));
});
gulp.task('default', ['sass'], function() {
    gulp.watch(['assets/scss/**/*.scss'], ['sass']);
});
