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
const rsync = require('gulp-rsync');


const distRoot = 'dist';
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
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js')
    // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist/js'))
});

// Gulp task to minify HTML files
gulp.task('pages', () => {
    return gulp.src(['./src/**/*.html'])
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

// Clean output directory

gulp.task('copy', () => {
    return gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts'))

});

gulp.task('clean', () => del(['dist']));


// Gulp task to minify all files
gulp.task('default', ['clean'], () => {
    runSequence(
        'copy',
        'images',
        'styles',
        'scripts',
        'pages'
    );
});

gulp.task('deploy', () => {

    // Dirs and Files to sync
    const rsyncPaths = ['dist'];

    // Default options for rsync
    const rsyncConf = {
        progress: true,
        incremental: true,
        relative: true,
        emptyDirectories: true,
        recursive: true,
        clean: true,
        chmod: 'ugo=rwX',
        exclude: [],
    };

    rsyncConf.hostname = 'shell.srcf.net'; // hostname
    rsyncConf.username = 'ar899'; // ssh username
    rsyncConf.destination = 'indiasoc/out'; // path where uploaded files go

    // Use gulp-rsync to sync the files
    return gulp.src(rsyncPaths)
        .pipe(rsync(rsyncConf));
});
