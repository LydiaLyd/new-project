"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    combineMq = require("gulp-combine-mq"),
    csscomb = require("gulp-csscomb"),
    csso = require("gulp-csso"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    fileInclude = require("gulp-file-include"),
    imagemin = require("gulp-imagemin"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    livereload = require("gulp-livereload"),
    del = require("del"),
    gulpSequence = require("gulp-sequence");

/**
 * Плагин htmlmin добавляет закрывающие теги </source>.
 * Валидатор из-за этого ругается.
 * Пришлось выключить.
 */
gulp.task("html", function() {
  return gulp.src(["source/*.html", "!source/_components-lib.html"])
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(fileInclude())
    .pipe(gulp.dest("build"))
    .pipe(livereload());
});

gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({browsers: ["last 2 versions", "ie 10"]}))
    .pipe(combineMq({beautify: true}))
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
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
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(livereload());
});

gulp.task("vendor", function() {
  return gulp.src("source/js/vendor/*.js")
    .pipe(plumber())
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("fonts", function() {
  return gulp.src("source/font/*")
    .pipe(gulp.dest("build/font"));
});

gulp.task("images", function() {
  return gulp.src("source/img/*.{png,jpg,gif,svg,ico}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function() {
  return del(["build"]);
});

gulp.task("build", function(callback) {
  gulpSequence("clean", ["html", "style", "script", "vendor", "fonts", "images"], callback);
});

gulp.task("watch", ["html", "style", "script"], function() {
  livereload.listen();
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/js/**/*.js", ["script", "vendor"]);
});

gulp.task("default", function(callback) {
  gulpSequence(["html", "style", "script", "vendor", "fonts"/*, "images"*/], "watch", callback);
});
