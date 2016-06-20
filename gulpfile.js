var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

gulp.task("pack",function () {
	gulp.src("./src/css/[^_]*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("dist/css"));

    gulp.src("./src/image/*")
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest("dist/image"));
});