const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function updateJs(cb) {
    //src('node_modules/tiny-slider/dist/min/tiny-slider.js')
    src('js/*.js')
    .pipe(concat('main.js'))
    //.pipe(uglify())
    .pipe(dest('../docs/js/'));
    cb();
}

exports.js = updateJs;

exports.jsWatch = function() {
    watch('js/*.js', updateJs);
};