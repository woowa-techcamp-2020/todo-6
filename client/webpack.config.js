const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: {
        main: './scripts/app.js',
        login: './scripts/login.js',

    },
    output: {
        path: path.resolve('../server/src/public/scripts'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        publicPath: '../image',

                    },
                }],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // entry
            filename: '../../views/index.html', // output(main.js 기준)
            excludeChunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            template: './login.html', // entry
            filename: '../../views/login.html', // output(main.js 기준)
            chunks: ['login'],
        }),
        new CleanWebpackPlugin(),
    ],
};
