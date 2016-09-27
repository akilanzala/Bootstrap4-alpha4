var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var usemin = require('gulp-usemin');
var browserSync = require('browser-sync').create();
var plumber = require("gulp-plumber");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dev/",
            index: "index.html"
        }
    });
});

gulp.task("sass", function() {
    gulp.src("dev/scss/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("dev/css"))
});

gulp.task('cssmin', function () {
  gulp.src('dev/css/style.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dev/css/'));
});

gulp.task("js", function() {
    gulp.src(["dev/js/**/*.js","!dev/js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("dev/js/min"))
});

gulp.task('usemin', function() {
     gulp.src('dev/**/*.html')
        .pipe(usemin({
            js:[uglify()]
        }))
        .pipe(gulp.dest('dev/js/'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task("default",['browser-sync'], function() {
    gulp.watch("dev/**/*.html", ['bs-reload']);
    gulp.watch("dev/**/*.css", ['bs-reload']);
    gulp.watch(["dev/js/**/*.js","!dev/js/min/**/*.js"],["js"]);
    gulp.watch("dev/scss/**/*.scss",["sass"]);
    gulp.watch('dev/css/*.css', ['cssmin']);
});