
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
		html: [source_folder + "/blocks/*.html", "!" + source_folder + "/blocks/_*.html"],
		css: source_folder + "/sass/*",
		js: [source_folder + "/js/*.js", "!" + source_folder + "_*.js"],
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/**/*.ttf"
	},
	watch: {
		html: source_folder + "/blocks/**/*.html",
		css: source_folder + "/sass/**/*.sass",
		js: source_folder  + "/js/**/*.js",
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
	autoprefixer = require('gulp-autoprefixer');
	group_media = require('gulp-group-css-media-queries');
	clean_css = require('gulp-clean-css');
	rename = require('gulp-rename');
	imagemin = require('gulp-imagemin');
	//webp = require('gulp-webp');
	//webphtml = require('gulp-webp-html');
	//webpcss = require('gulp-webpcss');
	ttf2woff = require('gulp-ttf2woff');
	ttf2woff2 = require('gulp-ttf2woff2');
	fonter = require('gulp-fonter');
	//fs = require('fs');



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
		//.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function js(){
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images(){
	return src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false}],
			interlaced: 3 //0 to 7
		}))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts(){
	src(path.src.fonts)
	.pipe(ttf2woff())
	.pipe(dest(path.build.fonts))
	return src(path.src.fonts)
	.pipe(ttf2woff2())
	.pipe(dest(path.build.fonts))
}

//function fontStyle(){}

function cb(){}

function watchFiles(params){ 
	gulp.watch([path.watch.html],html);
	gulp.watch([path.watch.css],css);
	gulp.watch([path.watch.js],js);
	gulp.watch([path.watch.img],images);
}

function clean(params){ 
	return del(path.clean);
}
function cleanLite(params){ 
	return del(path.build.css.cleanLite);
}
function css(params){ 
	return src(path.src.css)
		.pipe(sass({pretty:true}))
		.pipe(group_media())//группирую медизапросы
		.pipe(autoprefixer({
				overrideBrowserlist:["last 2 version"],
				cascade:true}))
		//.pipe(webpcss())
		.pipe(dest(path.build.css))//выгрузка не сжатого
		.pipe(clean_css())
		//.pipe(rename({extname: ".min.css"}))
		//.pipe(dest(path.build.css))//выгрузка сжатого
		.pipe(browsersync.stream())
}

gulp.task('otf2ttf',function(){
	return scr([source_folder + '/fonts/*.otf'])
	.pipe(fonter({
		formats:['ttf']
	}))
	.pipe(dest(source_folder + '/fonts/'));
})

//let build = gulp.series(clean,gulp.parallel(js,css,html,images,fonts)); //product
let build = gulp.series(gulp.parallel(js,css,html));//lite-build
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.images=images;
exports.fonts=fonts;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
