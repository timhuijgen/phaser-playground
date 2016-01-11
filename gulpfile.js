/**
 * Imports
 */

var gulp             = require('gulp'),
    gutil            = require('gulp-util'),
    nodemon          = require('gulp-nodemon'),
    plumber          = require('gulp-plumber'),
    sass             = require('gulp-sass'),
    sourcemaps       = require('gulp-sourcemaps'),
    autoprefix       = require('gulp-autoprefixer'),
    htmlreplace      = require('gulp-html-replace'),
    imagemin         = require('gulp-imagemin'),
    concat           = require('gulp-concat'),
    uglify           = require('gulp-uglify'),

    webpack          = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('./webpack.config.js'),
    browserSync      = require('browser-sync'),

    routes           = require('./routes');
var path             = require('path');

var PRODUCTION = false,
    testUri    = 'localhost',
    testPort   = 3001;


gulp.task('production', function()
{
    PRODUCTION = true;
});

/**
 * Server Tasks
 */

gulp.task('server:dev', function()
{
    nodemon({
        script:  'server/src/Server.js',
        ignore:  [ 'server/**/*.log' ],
        watch:   [ 'server/src/**/*.*', 'server/config/*.*' ],
        args:    [ ...process.argv.slice(3) ],
        execMap: {
            js: "node --harmony --harmony_default_parameters --harmony_modules"
        },
        env:     {'NODE_ENV': 'development'}
    });

});

/**
 * Client tasks
 */

gulp.task('client:_build', function()
{
    var config = webpackConfig.production;
    webpack(config, function( err, stats )
    {
        if( err ) {
            throw new gutil.PluginError('build:client', err);
        }
        gutil.log('[build:client]', stats.toString({colors: true}));
    });
});

gulp.task('client:watch', function()
{
    var config = webpackConfig.development;
    new webpackDevServer(webpack(config), {
        contentBase:        routes.HTML_DEST,
        publicPath:         config.output.publicPath,
        stats:              {colors: true},
        noInfo:             true,
        historyApiFallback: true,
        hot:                true,
        inline:             true
    }).listen(testPort, testUri, function( err )
    {
        if( err ) {
            throw new gutil.PluginError('watch:client', err);
        }
        gutil.log('[webpack-dev-server]', 'Dev server running on ' + testUri + ':' + testPort);
    });
});

// Run browsersync before the webpackDevServer or browsersync will start on another port
gulp.task('browsersync', function()
{
    browserSync.init({
        proxy:  {
            target: testUri + ':' + testPort,
            ws:     true
        },
        notify: false,
        open:   false
    });
});

gulp.task('place_css', function()
{
    gulp.src(routes.SASS_FILES)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefix([ "last 1 version", "> 1%", "ie 8" ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(routes.CSS_DEST))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch_sass', function()
{
    gulp.watch(routes.SASS_FILES, [ 'place_css' ]);
});

gulp.task('place_images', function()
{
    gulp.src(routes.IMAGE_DIR)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.IMAGE_DEST));
});

gulp.task('watch_images', function()
{
    gulp.watch(routes.IMAGE_DIR, [ 'place_images' ]);
});

gulp.task('place_fonts', function()
{
    gulp.src(routes.FONTS_DIR)
        .pipe(gulp.dest(routes.FONTS_DEST));
});

gulp.task('place_assets', function()
{
    gulp.src(routes.ASSETS_DIR)
        .pipe(gulp.dest(routes.ASSETS_DEST));
});

gulp.task('watch_assets', function()
{
    gulp.watch(routes.ASSETS_DIR, [ 'place_assets' ]);
});

gulp.task('place_lib', function()
{
    if( PRODUCTION ) {
        gulp.src(routes.JS_SRC)
            .pipe(concat(routes.LIB_OUT_MIN))
            .pipe(uglify())
            .pipe(gulp.dest(routes.LIB_DEST));
    }
    else {
        gulp.src(routes.JS_SRC)
            .pipe(sourcemaps.init())
            .pipe(concat(routes.LIB_OUT))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(routes.LIB_DEST))
            .pipe(browserSync.reload({stream: true}));
    }
});

gulp.task('watch_lib', function()
{
    gulp.watch(routes.JS_SRC, [ 'place_lib' ]);
});

gulp.task('place_html', function()
{
    var app_location = (PRODUCTION) ? routes.APP_PUBLIC_SRC : routes.APP_OUT;
    var lib_location = (PRODUCTION) ? routes.LIB_PUBLIC_SRC_MIN : routes.LIB_PUBLIC_SRC;

    gulp.src(routes.HTML_SRC)
        .pipe(htmlreplace({
            'lib': lib_location,
            'app': app_location
        }))
        .pipe(gulp.dest(routes.HTML_DEST))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch_html', function()
{
    gulp.watch(routes.HTML_SRC, [ 'place_html' ]);
});


gulp.task('resources:build', [ 'place_html', 'place_lib', 'place_css', 'place_fonts', 'place_images', 'place_assets' ]);
gulp.task('resources:watch', [ 'watch_html', 'watch_lib', 'watch_sass', 'watch_images', 'watch_assets' ]);

gulp.task('client:build', [ 'client' ]);
gulp.task('client', [ 'production', 'resources:build', 'client:_build' ]);
gulp.task('client:dev', [ 'browsersync', 'resources:build', 'resources:watch', 'client:watch' ]);