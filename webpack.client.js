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
        title: 'Insurance Management',
        favicon: path.resolve(__dirname, 'src/frontend/public/assets/favicon.ico')
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
