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
    lr              = require('tiny-lr');

var config = {

    less: {
        app: {
            main: ["less/app.less"],
            watch: 'less'
        },
        vendor: {
            main: ["less/vendor.less"],
            watch: 'less'
        },
        dir: 'less',
        dest: "css"
    },

    script: {
        core: {
            source: require('./source/core.json'),
            watch: "vendor/",
            name: "core.js"
        },
        vendor: {
            source: require('./source/vendor.json'),
            watch: "vendor/",
            name: "vendor.js"
        },
        vensite: {
            source: require('./source/vendor_site.json'),
            watch: "vendor/",
            name: "vendor.site.js"
        },
        app: {
            source: require('./source/app.json'),
            watch: "js/src/",
            name: "app.js"
        },
        dest: "js"
    },

    // production mode (see build task)
    //https://www.npmjs.com/package/yargs
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
    return gulp.src(config.script.site.source)
        .pipe(expect(config.script.site.source))
        .pipe(concat(config.script.site.name))
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
            paths: [config.less.app.dir]
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
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(config.scripts.watch,           ['scripts:app']);
  gulp.watch(config.styles.app.watch,        ['styles:app', 'styles:app:rtl']);
  gulp.watch(config.styles.themes.watch,     ['styles:themes']);
  gulp.watch(config.bootstrap.watch,         ['styles:app']); //bootstrap
  gulp.watch(config.templates.pages.watch,   ['templates:pages']);
  gulp.watch(config.templates.views.watch,   ['templates:views']);
  gulp.watch(config.templates.app.watch,     ['templates:app']);

  gulp.watch([

      '../app/**'

  ]).on('change', function(event) {

      livereload.changed( event.path );

  });

});


// default (no minify)
gulp.task('default', gulpsync.sync([
          'styles:app',
          'styles:vendor',
          'scripts:vendor:core',
          //'start'
        ]), function(){
          gutil.log(gutil.colors.green('************************************'));
          gutil.log(gutil.colors.green('*'));
          gutil.log(gutil.colors.green('* All Done You can start editing your code, '));
          gutil.log(gutil.colors.green('*'));
          gutil.log(gutil.colors.green('************************************'));
        });

gulp.task('start',[
          'styles:app',
          'styles:vendor',
          'scripts:vendor:core',
          //'watch'
        ]);


// Error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}