'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const imageResize = require('gulp-image-resize');


// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Gulp task to minify CSS files
gulp.task('styles', () => {
    return gulp.src('./src/css/**/*.css')
        // Auto-prefix css styles for cross browser compatibility
        .pipe(newer('./dist/css'))
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
        }))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js')
        // Minify the file
        .pipe(newer('./dist/js'))
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist/js'))
});

// Gulp task to minify HTML files
gulp.task('pages', () => {
    return gulp.src(['./src/**/*.html'])
        .pipe(newer('./dist/'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', () => {
    return gulp.src(['./src/img/**/*'])
        .pipe(newer('./dist/img'))
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('crop-committee',  function() {

    return gulp.src(['./src/img/committee/orig/*'])
//        .pipe(newer('./src/img/committee'))
        .pipe(imageResize({
            width: "720",
            height: "720",
            gravity: "North",
            upscale: true,
            crop: true,
            cover: true
        }))
        .pipe(gulp.dest('./src/img/committee'));
})

gulp.task('restore-committee', () => {
    gulp.src(['./src/img/committee/orig/*'])
    .pipe(gulp.dest('./src/img/committee'))
})

// copy all the other files, e.g. .htaccess, cgi, etc.
gulp.task('copy', () => {
    gulp.src(['./src/**/*',
            '!./src/*.html',
            './src/*',
            './src/.*',
            '!./',
            '!./src/css/**/*',
            '!./src/js/**/*',
            '!./src/img/**/*'
        ])
        .pipe(gulp.dest('./dist'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));


// Gulp task to minify all files
gulp.task('default', () => {
    runSequence(
        'copy',
        'crop-committee',
        'images',
        'styles',
        'scripts',
        'pages',
    );
});

//Use npm run (deploy_prod | deploy_staging) to deploy