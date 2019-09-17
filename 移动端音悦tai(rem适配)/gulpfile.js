var gulp = require('gulp')
var $ = require('gulp-load-plugins')()//打包加载gulp插件
// var concat = require('gulp-concat') //合并文件
// var uglify = require('gulp-uglify') //压缩js
// var rename = require('gulp-rename') //重命名
// var less = require('gulp-less') //转换less为css
// var cleanCss = require('gulp-clean-css')//压缩css
// var htmlMin = require('gulp-htmlmin') //压缩html
// var livereload = require('gulp-livereload');//自动编译


//注册合并压缩js的任务
gulp.task('js',function () {
    return gulp.src('src/js/*.js')  //读取js文件
        .pipe($.concat('build.js')) //合并js
        .pipe($.uglify()) //压缩文件
        .pipe($.rename({suffix:'.min'}))//重命名
        .pipe(gulp.dest('dist/js/'))
        .pipe($.livereload())//实时加载

});
//注册转换less为css的任务
gulp.task('less',function () {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css/'))   //不用重命名，gulp会自动重名会与之前less文件一样的名字
        .pipe($.livereload())//实时加载
});

//注册转换合并压缩css的任务
gulp.task('css',gulp.series('less',function () {  //gulp3 中可以这样写gulp.task('css',['less'] ,function ()，但是gulp4不行
    return gulp.src('src/css/*.css')
        .pipe($.concat('build.css')) //合并
        .pipe($.cleanCss({compatibility: 'ie8'})) //压缩   可以配置兼容到ie8
        .pipe($.rename({suffix: '.min'})) //重命名
        .pipe(gulp.dest('dist/css/')) //输出
        .pipe($.livereload())//实时加载
}));

// gulp.series：按照顺序执行
// gulp.parallel：可以并行计算

//注册压缩html的任务
gulp.task('html',function () {
    return gulp.src('src/index.html')
        // .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
        .pipe($.livereload())//实时加载
});

//注册默认任务
gulp.task('default',gulp.parallel('less','css','js','html'));

//注册监视的任务--->半自动
gulp.task('watch',gulp.parallel('default'), function () {
    //开启监视
    $.livereload.listen();
    //确认监视的目标并且绑定相应的任务
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css']);
});
