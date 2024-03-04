const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: {
            import: './src/index.ts',
            dependOn: 'shared'
        },
        shared: 'pixi.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "template/index.html",
            title: "Gamefactory Game (Dev build)"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" },
                { from: "template/text", to: "text" },
                { from: "template/configs", to: "configs" },
                { from: "template/css", to: "css" }
            ]
        }),
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
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
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            "buffer": require.resolve("buffer")
        }
    },
    cache: {
        type: 'filesystem'
    }
};
