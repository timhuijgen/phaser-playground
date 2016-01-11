module.exports = {
    /** Resources entry **/
    HTML_SRC:   'resources/html/**/*.html',
    JS_SRC:     'resources/js/**/*.js',
    SASS_DIR:   'resources/sass/',
    SASS_FILES: 'resources/sass/**/*.scss',
    IMAGE_DIR:  'resources/images/**/*.*',
    FONTS_DIR:  'resources/fonts/**/*.*',
    ASSETS_DIR: 'resources/assets/**/*.*',

    /** Resources Destinations **/
    HTML_DEST:   'public/',
    CSS_DEST:    'public/stylesheets/',
    LIB_DEST:    'public/js/build/',
    IMAGE_DEST:  'public/images/',
    FONTS_DEST:  'public/fonts/',
    ASSETS_DEST: 'public/assets/',

    /** App **/
    APP_DIR:         '/client/src',
    APP_DEST:        'public/js/build/',
    APP_ENTRY:       './client/src/boot.js',
    APP_MIN_OUT:     'client.min.js',
    APP_OUT:         'client.js',
    APP_VIRTUAL_DIR: '/client',
    APP_PUBLIC_SRC:  '/js/build/client.js',

    /** Lib **/
    LIB_OUT:            'lib.js',
    LIB_OUT_MIN:        'lib.min.js',
    LIB_PUBLIC_SRC:     '/js/build/lib.js',
    LIB_PUBLIC_SRC_MIN: '/js/build/lib.min.js'
};