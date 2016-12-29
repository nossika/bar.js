const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('package_js', () => {
    gulp.src('bar.js')
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(concat('bar.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/..'));
});

gulp.watch(['bar.js'], ['package_js']);

gulp.task('default', ['package_js'], () => {
    console.log('done');
});

process.on('uncaughtException', function(err) {
    console.log('uncaughtException: ' , err.stack);
});