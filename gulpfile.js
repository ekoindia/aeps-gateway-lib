const { src, dest, series, task } = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const header = require('gulp-header');
const pkg = require('./package.json');

const _src = './src/*.js';				// pkg.module;
const _dest = './build';				// pkg.main;
const _dest_src = _dest + '/*.js';

var banner = ['/** <%= pkg.name %> v<%= pkg.version %> */',
	// '/**',
	// ' * <%= pkg.name %> v<%= pkg.version %>',
	// ' * <%= pkg.repository %>',
	// ' * @license <%= pkg.license %>',
	// ' */',
	''].join('\n');


const MINIFY_JS_OPTIONS = {
	//output: {compress:true},
	compress: {
		passes: 3,
		// drop_console: true,				// false = SHOW CONSOLE LOG
		pure_funcs: ['console.debug', console.log],
		dead_code: true,
		drop_debugger: true,
		join_vars: true,
		collapse_vars: true
	},
	mangle: {
		reserved: ['console.debug', console.log],
	},
	ie8: false,
};

// Clean Output Directory
function clean(cb) {
	del.sync([_dest]);
	cb();
};

function copy() {
	return src(_src)
		.pipe(dest(_dest))
		.pipe(size({title: "SOURCE"}));
}

function lint() {
	return src(_src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function compress() {
	return src(_dest_src)
		.pipe(uglify(MINIFY_JS_OPTIONS))
		.pipe(dest(_dest))
		.pipe(size({ title: "BUILD" }));
}

function addBanner() {
	return src(_dest_src)
		.pipe(header(banner, { pkg: pkg }))
		.pipe(dest(_dest))
		.pipe(size({ title: "BUILD WITH BANNER" }));
}


exports.default = series(lint);
exports.build = series(lint, clean, copy, compress, addBanner);