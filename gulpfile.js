"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    combineMq = require("gulp-combine-mq"),
    csscomb = require("gulp-csscomb"),
    csso = require("gulp-csso"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    livereload = require("gulp-livereload"),
    clean = require("gulp-clean"),
    runSequence = require("run-sequence");

/**
 * Плагин htmlmin добавляет закрывающие теги </source>.
 * Валидатор из-за этого ругается.
 * Пришлось выключить.
 */
gulp.task("html", function() {
  return gulp.src(["source/*.html", "!source/_components-lib.html"])
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
});

gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions", "ie 10"]})
    ]))
    .pipe(combineMq({
        beautify: true
    }))
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
});

gulp.task("script", function() {
  return gulp.src("source/js/*.js")
    .pipe(plumber())
    .pipe(concat("all.js"))
    .pipe(rename("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(livereload());
});

gulp.task("vendors", function() {
  return gulp.src("source/js/vendors/*")
    .pipe(gulp.dest("build/js/vendors"));
});

gulp.task("fonts", function() {
  return gulp.src("source/font/*")
    .pipe(gulp.dest("build/font"));
});

gulp.task("images", function() {
  return gulp.src("source/img/*.{png,jpg,gif,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function() {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("build", function(callback) {
  runSequence("clean",
              ["html", "style", "script", "vendors", "fonts", "images"],
              callback);
});

gulp.task("watch", ["html", "style", "script"], function() {
  livereload.listen();
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/js/*.js", ["script"]);
});

gulp.task("default", function(callback) {
  runSequence("build", "watch", callback);
});
