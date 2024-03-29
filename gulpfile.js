var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();

gulp.task('sass', async function(){
  gulp.src(['scss/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream())
   .pipe(notify(" SASS Compiled \n Your CSS files are ready sir."))
});

gulp.task('sass:watch', function(){
  gulp.watch(['scss/*.scss'], gulp.series('sass'));
});

gulp.task('browser-sync', function() {
  browserSync.init(["css/*.css", "*.html"], {
    server: {
      baseDir: "./"
    }
  })
});


gulp.task('watch', gulp.series('sass', gulp.parallel('sass:watch', 'browser-sync')));

gulp.task('default', gulp.series('watch'));