"use strict";

const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const imageResize = require("gulp-image-resize");

// Gulp task to minify CSS files
gulp.task("styles", (done) => {
  gulp
    .src("./src/css/**/*.css")
    // Auto-prefix css styles for cross browser compatibility
    .pipe(newer("./dist/css"))
    .pipe(autoprefixer({}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest("./dist/css"));
  done();
});

// Gulp task to minify JavaScript files
gulp.task("scripts", (done) => {
  gulp
    .src("./src/js/**/*.js")
    // Minify the file
    .pipe(newer("./dist/js"))
    .pipe(uglify())
    // Output
    .pipe(gulp.dest("./dist/js"));
  done();
});

// Gulp task to minify HTML files
gulp.task("pages", (done) => {
  gulp
    .src(["./src/**/*.html"])
    .pipe(newer("./dist/"))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("images", (done) => {
  gulp
    .src(["./src/img/**/*"])
    .pipe(newer("./dist/img"))
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
      })
    )
    .pipe(gulp.dest("./dist/img"));
  done();
});

gulp.task("crop-committee", (done) => {
  gulp
    .src(["./src/img/committee/orig/*"])
    //        .pipe(newer('./src/img/committee'))
    .pipe(
      imageResize({
        width: "720",
        height: "720",
        gravity: "North",
        upscale: true,
        crop: true,
        cover: true,
      })
    )
    .pipe(gulp.dest("./src/img/committee"));
  done();
});

gulp.task("restore-committee", (done) => {
  gulp
    .src(["./src/img/committee/orig/*"])
    .pipe(gulp.dest("./src/img/committee"));
  done();
});

// copy all the other files, e.g. .htaccess, cgi, etc.
gulp.task("copy", (done) => {
  gulp
    .src([
      "./src/**/*",
      "!./src/*.html",
      "./src/*",
      "./src/.*",
      "!./",
      "!./src/css/**/*",
      "!./src/js/**/*",
      "!./src/img/**/*",
    ])
    .pipe(gulp.dest("./dist"));
  done();
});

// Clean output directory
gulp.task("clean", () => del(["dist"]));

// Gulp task to minify all files
gulp.task(
  "default",
  gulp.series(
    "copy",
    "crop-committee",
    "images",
    "styles",
    "scripts",
    "pages",
    (done) => {
      done();
    }
  )
);

//Use npm run (deploy_prod | deploy_staging) to deploy
