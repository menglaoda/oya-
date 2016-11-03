var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jsmin = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

//创建task
//目的：编译sass
gulp.task('buildSass',function(){
	//查找sass文件
	gulp.src('./app/sass/*.scss')
	
	//输出未压缩版本
	.pipe(sass({outputStyle:'expanded'}))
	.pipe(gulp.dest('./app/css'))
	
	//把文档流输出到gulp-sass进行编译
	//压缩并改名
	.pipe(sass({outputStyle:'compressed'}))
	.pipe(rename({suffix:'.min'}))
	
	//输出文件
	.pipe(gulp.dest('./app/css'))
});

//监听sass文件修改，自动编译
gulp.task('jtSass',function(){
	//只要sass文件有修改就自动执行buildSass任务
	gulp.watch('./app/sass/*.scss',['buildSass'])
});

//js自动化处理
gulp.task('buildjs',function(){
	gulp.src('./app/js/*.js')
	//合并js
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./dist/js'))
	
	//压缩
	.pipe(jsmin({
		mangle:true
	}))
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/js'))
});

//压缩html文件
gulp.task('buildhtml',function(){
	//匹配所有的html文件，包括子目录下的文件
	gulp.src('./app/**/*.html')
	
	.pipe(htmlmin({
		collapseWhitespace:true
	}))
	.pipe(gulp.dest('./dist/'));
});

//全站编译
gulp.task('default',['buildSass','jtSass','buildjs','buildhtml']);
