var path    = require('path'),
    webpack = require('webpack'),
    routes  = require('./routes'),
    argv    = require('yargs').argv;

function parseArgv()
{
    var args = {};
    for( var key in argv ) {
        if( argv.hasOwnProperty(key) ) {
            args[ key ] = JSON.stringify(argv[ key ]);
        }
    }
    return args;
}


var options = {
    production: {
        entry:   {
            app: routes.APP_ENTRY
        },
        output:  {
            path:       routes.APP_DEST,
            filename:   routes.APP_MIN_OUT,
            publicPath: '/'
        },
        resolve: {
            modulesDirectories: [ 'node_modules' ],
            extensions:         [ '', '.js', '.jsx' ]
        },
        module:  {
            loaders: [
                {
                    test:    /\.jsx?$/,
                    loader:  'babel',
                    include: path.join(__dirname + routes.APP_DIR),
                    query:   {
                        presets: [ 'es2015' ]
                    }
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                    argv:     argv
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ]
    },

    development: {
        entry:   [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/dev-server',
            routes.APP_ENTRY
        ],
        output:  {
            path:       routes.APP_VIRTUAL_DIR,
            filename:   routes.APP_OUT,
            publicPath: '/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                    argv:     parseArgv()
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        resolve: {
            modulesDirectories: [ 'node_modules' ],
            extensions:         [ '', '.js', '.jsx' ]
        },
        module:  {
            loaders: [
                {
                    test:    /\.jsx?$/,
                    loader:  'babel',
                    include: path.join(__dirname + routes.APP_DIR),
                    query:   {
                        presets: [ 'es2015' ]
                    }
                }
            ]
        }
    }
};

module.exports = options;