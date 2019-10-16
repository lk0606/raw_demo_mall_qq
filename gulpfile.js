

var gulp=require('gulp');

gulp.task("copy-file",function(){
    gulp.src(
        [
        "F:\\desktop\\lk\\mall.qq/**/*","!F:\\desktop\\lk\\mall.qq/node_modules","!F:\\desktop\\lk\\mall.qq/素材","!F:\\desktop\\lk\\mall.qq/gulpfile.js","!F:\\desktop\\lk\\mall.qq/package.json","!F:\\desktop\\lk\\mall.qq/*.png","!F:\\desktop\\lk\\mall.qq/*.psd"
        ,"!F:\\desktop\\lk\\mall.qq/download"
        ,"!F:\\desktop\\lk\\mall.qq/font_8"
        ,"!F:\\desktop\\lk\\mall.qq/lk"
        ]
    )
    .pipe(gulp.dest('D:\\phpStudy\\WWW\\lk\\mall.qq'));
});

// //-------------less----据说能优化-----------
// var less=require('gulp-less');

// gulp.task('testLess',function(){
//     gulp.src('src/less/index.less')
//     .pipe(less())
//     .pipe(gulp.dest('src/css'));
// });
// gulp.task('default',['testLess']);
//-----------------watch---服务器更新------------
gulp.task("watch",function(){
    gulp.watch(["*.html","css/*.css","js/*.js","php/*.php","data/*","font/*","*.json","*.js","*.php"],["copy-file"]);
}) 
gulp.task("build",["copy-file"],function(){
    console.log("ojbk")
});