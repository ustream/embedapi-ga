var gulp = require('gulp');
var minify = require('gulp-minify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var concat = require('gulp-concat');

gulp.task('jscompress', function() {
    return gulp.src([
            'node_modules/ustream-embedapi/src/ustream-embedapi.js',
            'src/ustreamEmbedGa.js'
    ])
        .pipe(concat('ustreamEmbedGa.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['jscompress'], function() {
    return gulp
        .src('tests/testrunner.html')
        .pipe(mochaPhantomJS());
});

gulp.task('default', ['jscompress']);

gulp.task('build', ['jscompress']);
