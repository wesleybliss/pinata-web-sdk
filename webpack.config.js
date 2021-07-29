const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')

const libraryName = 'pinata-sdk'
const isProduction = process.env.NODE_ENV === 'production'

let mode = 'development'
let outputFile = `${libraryName}.js`

if (isProduction) {
    mode = 'production'
    outputFile = `${libraryName}.min.js`
}

console.info('\n*************************************************')
console.info(`Building for ${mode}, ${outputFile}`)
console.info('*************************************************\n')

const config = {
    mode: mode,
    entry: [path.resolve(__dirname, '/src/index.js')],
    devtool: isProduction ? false : 'inline-source-map',
    output: {
        path: path.join(__dirname, '/lib'),
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
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        process.env.PROFILE && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src'),
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new JsonMinimizerPlugin(),
        ],
        splitChunks: false,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
}

module.exports = config
