const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HelloPlugin = require('./webpack_plugin/hello-plugin.js')


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: path.relative(__dirname, 'public/index.html')}),
        new HelloPlugin({name: 'HelloPlugin'}),
    ],
    module: {
        rules: [
            {test: /\.css$/, use: 'css-loader'}
        ]
    }
}