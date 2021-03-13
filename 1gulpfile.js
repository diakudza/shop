var gulp = require('gulp');

// Подключаем плагины Gulp
var sass = require('gulp-ruby-sass'), // переводит SASS в CSS
   cssnano = require('gulp-cssnano'), // Минимизация CSS
   autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
   imagemin = require('gulp-imagemin'), // Сжатие изображение
   concat = require('gulp-concat'), // Объединение файлов - конкатенация
   uglify = require('gulp-uglify'), // Минимизация javascript
   rename = require('gulp-rename'); // Переименование файлов
   pug = require('gulp-pug-3');
/* ------------ Таски ----------------- */

gulp.task('pug', function buildHTML() {
  return gulp.src('scr/pug/*.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(gulp.dest('production'));
});

// Копирование файлов HTML в папку dist
gulp.task("html", function () {
   return gulp.src("src/*.html")
      .pipe(gulp.dest("production"));
});

// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function () {
   return gulp.src("src/sass/*.sass")
      //.pipe(concat('styles.sass'))
      .pipe(sass())
      /*.pipe(autoprefixer({
         browsers: ('last 2 versions'),
         cascade: false
      }))
      .pipe(cssnano())
      .pipe(rename({ suffix: '.min' }))*/
      .pipe(gulp.dest("production/css"));
});

// Сжимаем картинки
gulp.task('imgs', function () {
   return gulp.src("src/img/*.+(jpg|jpeg|png|gif)")
      .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{ removeViewBox: false }],
         interlaced: true
      }))
      .pipe(gulp.dest("production/img"))
});

// Задача слежения за измененными файлами
gulp.task("watch", function () {
   gulp.watch("src/*.html", ["html"]);
   gulp.watch("src/js/*.js", ["scripts"]);
   gulp.watch("src/sass/*.sass", ["sass"]);
   gulp.watch("src/images/*.+(jpg|jpeg|png|gif)", ["imgs"]);
});

//// Таски ///////////////////////////////////////

//gulp.task('default', gulp.series("html", "sass", "scripts", "imgs", "watch"));
gulp.task('default', gulp.series("pug", "imgs"));