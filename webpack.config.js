'use strict'

const webpack = require('webpack')

let plugins = undefined
let devtool = 'eval-cheap-module-source-map'

if(process.env.NODE_ENV == 'production') {
    plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        })]
    devtool = undefined
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },

    babel: {
        presets: ['es2015', 'stage-0', 'es2015-native-modules']
    },

    devtool,
    cache: true,
    plugins
}