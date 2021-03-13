
let project_folder = "production";
let source_folder = "src";
let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/"
	},
	src: { 
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/sass/*.sass",
		js: source_folder + "/js/",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf"
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/sass/**/",
		js: source_folder  + "/js/**/",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}	

let {src, dest} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create();
	fileinclude = require('gulp-file-include');
	del = require('del');
	sass = require('gulp-sass');

function browserSync(params) {
		browsersync.init({
			server:{
				baseDir: "./"+ project_folder + "/"
			},
			port:3000,
			notify:false
		})
}

function html(){
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function watchFiles(params){ 
	gulp.watch([path.watch.html],html);
	gulp.watch([path.watch.css],html);
}

function clean(params){ 
	return del(path.clean);
}

function css(params){ 
	return src(path.src.css)
		.pipe(
			sass({
				pretty:true
			}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

let build = gulp.series(clean,gulp.parallel(css,html));
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
