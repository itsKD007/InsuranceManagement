// Generated using webpack-cli https://github.com/webpack/webpack-cli

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: './src/frontend/index.ts',
    output: {
        path: path.resolve(__dirname, 'build/frontend'),
        filename: 'index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Insurance Management'
      }),
      new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.scss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /favicon\.ico$/i,
                loader: 'file-loader',
                options: { name: 'favicon.ico' }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'production',
    performance: {
      hints: false
    }
};
