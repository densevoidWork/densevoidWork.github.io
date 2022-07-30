const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

exports.default = function() {
    // You can use a single task
    //watch('src/*.css', css);
    // Or a composed task
    //watch('src/*.js', series(clean, javascript));

    return src('js/*.js')
    .pipe(concat('main.js'))
    //.pipe(uglify())
    .pipe(dest('output/'));
  };