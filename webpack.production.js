const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: {
            import: './src/index.ts',
            dependOn: 'shared'
        },
        shared: 'pixi.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Gamefactory Game"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" },
                { from: "template/text", to: "text" },
                { from: "template/configs", to: "configs" },
                { from: "template/css", to: "css" }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
                extensions: ['.ts']
            })
        ]
    },
    output: {
        filename: '[name].application.js',
        path: path.resolve(__dirname, 'production-dist')
    }
};
