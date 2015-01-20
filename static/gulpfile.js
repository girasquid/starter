var gulp            = require("gulp"),
    plugins         = require('gulp-load-plugins')({ camelize: true }),
    concat          = require('gulp-concat'),
    gutil           = require('gulp-util'),
    sourcemaps      = require('gulp-sourcemaps'),
    minifyCSS       = require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    expect          = require('gulp-expect-file'),
    notify          = require('gulp-notify'),
    gulpsync        = require('gulp-sync')(gulp),
    livereload      = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    watch           = require('gulp-watch');

var config = {

    less: {
        app: {
            main: ["less/app.less"],
            watch: ['less/*.less', 'less/**/*.less', '!less/vendor.less']
        },
        vendor: {
            main: ["less/vendor.less"],
            watch: ['less/*.less', 'less/**/*.less', '!less/app.less']
        },
        dir: 'less',
        dest: "css"
    },

    script: {
        core: {
            source: require('./source/core.json'),
            watch: ["vendor/**/*.js"],
            name: "core.js"
        },
        vendor: {
            source: require('./source/vendor.json'),
            watch: ["vendor/**/*.js"],
            name: "vendor.js"
        },
        vendor_site: {
            source: require('./source/vendor_site.json'),
            watch: "vendor/ga-assets/js/*.js",
            name: "vendor.site.js"
        },
        app: {
            source: require('./source/app.json'),
            watch: "js/src/*.js",
            name: "app.js"
        },
        dest: "js"
    },

    // production mode (see build task)
    // https://www.npmjs.com/package/yargs
    isProduction: false,
    useSourceMaps: false,
    lvr_port: 35729
}

gulp.task('scripts:vendor', function() {
    return gulp.src(config.script.vendor.source)
        .pipe(expect(config.script.vendor.source))
        .pipe(concat(config.script.vendor.name))
        .pipe(gulp.dest(config.script.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(config.script.dest));
});

gulp.task('scripts:vendor:core', function() {
    return gulp.src(config.script.core.source)
        .pipe(expect(config.script.core.source))
        .pipe(concat(config.script.core.name))
        .pipe(gulp.dest(config.script.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(config.script.dest));
});

gulp.task('scripts:vendor:site', function() {
    return gulp.src(config.script.vendor_site.source)
        .pipe(expect(config.script.vendor_site.source))
        .pipe(concat(config.script.vendor_site.name))
        .pipe(gulp.dest(config.script.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(config.script.dest));
});

gulp.task('scripts:app', function() {
    return gulp.src(config.script.app.source)
        .pipe(expect(config.script.app.source))
        .pipe(concat(config.script.app.name))
        .pipe(gulp.dest(config.script.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(config.script.dest));
});


gulp.task("styles:app", function(){
    return gulp.src(config.less.app.main)
        .pipe( config.useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(plugins.less({
            paths: [config.less.dir]
        }))
        .on("error", handleError)
        .pipe(rename({suffix: '.min'}))
        .pipe( config.isProduction ? minifyCSS() : gutil.noop() )
        .pipe( config.useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(config.less.dest));
});

gulp.task("styles:vendor", function(){
    return gulp.src(config.less.vendor.main)
        .pipe( config.useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(plugins.less({
            paths: [config.less.dir]
        }))
        .on("error", handleError)
        .pipe(rename({suffix: '.min'}))
        .pipe( config.isProduction ? minifyCSS() : gutil.noop() )
        .pipe( config.useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(config.less.dest));
});


// Rerun the task when a file changes
// https://www.npmjs.com/package/gulp-watch
gulp.task('watch', function() {
    livereload.listen();

    //gulp.watch(config.script.app.watch,           ['scripts:app']);
    //gulp.watch(config.script.vendor.watch,        ['scripts:vendor']);
    //gulp.watch(config.script.core.watch,          ['scripts:vendor:core']);
    //gulp.watch(config.script.vendor_site.watch,   ['scripts:vendor:site']);

    gulp.watch(config.less.app.watch,             ['styles:app']);
    gulp.watch(config.less.vendor.watch,          ['styles:vendor']);


    gulp.watch([

      '/'

    ]).on('change', function(event) {
        livereload.changed( event.path );
        gutil.log(gutil.colors.cyan(event.path));

    });

});

/*
// build for production (minify)
gulp.task('build', ['prod', 'default']);
gulp.task('prod', function() { isProduction = true; });

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function(){ useSourceMaps = true; });
*/

// default (no minify)
gulp.task('default', gulpsync.sync([
            'styles:app',
            'styles:vendor',
            'scripts:app',
            'scripts:vendor',
            'scripts:vendor:core',
            'scripts:vendor:site',
            'watch'
        ]), function(){

          gutil.log(gutil.colors.cyan('************'));
          gutil.log(gutil.colors.cyan('* All Done *'), 'You can start editing your code, LiveReload will update your browser after any change..');
          gutil.log(gutil.colors.cyan('************'));

        });

gulp.task('start',[
            'styles:app',
            'styles:vendor',
            'scripts:app',
            'scripts:vendor',
            'scripts:vendor:core',
            'scripts:vendor:site',
            'watch'
        ]);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}