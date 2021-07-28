const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

let libraryName = 'pinata-sdk';

let outputFile, mode;

if (env === 'build') {
    mode = 'production';
    outputFile = libraryName + '.min.js';
} else {
    mode = 'development';
    outputFile = libraryName + '.js';
}

const config = {
    mode: mode,
    entry: [/* 'babel-polyfill', */ __dirname + '/src/index.js'],
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
        ]
    },
    target: 'web',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        process.env.PROFILE && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    }
};

module.exports = config;
