// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    experiments: {
      topLevelAwait: true
    },
    externals: [ webpackNodeExternals() ],
    target: 'node',
    mode: 'production'
};
