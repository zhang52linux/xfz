var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
sass.compiler = require('node-sass');
var connect = require('gulp-connect');//使用connect启动一个Web服务器
var util = require("gulp-util");
var smushit = require('gulp-smushit');


// 便于文件的位置修改时，进行快速修改
var path = {
    'css': './src/css/**/',
    'js': './src/js/**/',
    'image': './src/images/**/',
    'css_dest': './dest/css/',
    'js_dest': './dest/js/',
    'image_dest': './dest/images/',
}

// 压缩图片
gulp.task('image', function () {
    return gulp.src('./src/images/*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest(path.image_dest));
});


// 自动刷新浏览器
gulp.task('connect', function() {
    connect.server({
        // root: './', //当前项目主目录
        port: 8000,
        livereload: true //自动刷新
    });
});


// 处理js文件压缩
gulp.task("js",function () {
   return gulp.src(path.js + '*.js')
               .pipe(uglify())
               .pipe(rename({"suffix":".min"}))
               .pipe(gulp.dest(path.js_dest))
               .pipe(connect.reload());    // .pipe(bs.stream())
});

// 处理sass的任务 
gulp.task('sass', function () {
  return gulp.src(path.css + '*.scss')        //选择源文件
            .pipe(sass().on('error', util.log))  //转化为css文件
            .pipe(cssnano())                          //进行css文件的压缩
            .pipe(rename({"suffix":".min"}))          //修改压缩后的文件名
            .pipe(gulp.dest(path.css_dest))           //选择目标文件
            .pipe(connect.reload());    // .pipe(bs.stream())
});

// 定义一个监听的任务
gulp.task('watch', function () {
   gulp.watch(path.css + '*.scss', gulp.series('sass'));
   gulp.watch(path.js + '*.js', gulp.series('js'));
});


// 执行gulp server开启服务器
gulp.task("default",gulp.series('watch'));





