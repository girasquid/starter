var gulp        = require('gulp')
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    path        = require('path'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    changed     = require('gulp-changed'),
    prettify    = require('gulp-html-prettify'),
    w3cjs       = require('gulp-w3cjs'),
    rename      = require('gulp-rename'),
    gutil       = require('gulp-util'),
    minifyCSS   = require('gulp-minify-css'),
    gulpFilter  = require('gulp-filter'),
    expect      = require('gulp-expect-file'),
    gulpsync    = require('gulp-sync')(gulp),
    sourcemaps  = require('gulp-sourcemaps'),
    PluginError = gutil.PluginError;

// LiveReload port. Change it only if there's a conflict
var lvr_port = 35729;

