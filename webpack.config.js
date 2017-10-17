const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

function isExternal(module) {
    let userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: './bundle.[name].js',
        library: '[name]',
        libraryTarget: "var"
    },
    resolve: {
        modules: [
            "../node_modules",
        ],
        extensions: [
            '.ts',
            '.js',
            '.html',
            '.scss',
        ],
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders'),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: '@angular-devkit/build-optimizer/webpack-loader',
                options: {
                    sourceMap: false
                }
            },
            {
                test: /.ts$/,
                use: [
                    {
                        loader: 'build-optimizer',
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json',
                            transpileOnly: true,
                            silent: true,
                            useCache: true,
                        }
                    },
                    {
                        loader: 'angular2-template-loader',
                    }
                ],
            },
            { test: /\.css$/,  use: 'raw-loader' },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },
            {test: /\.(png|ico|gif)$/, loader: "file-loader?name=bundle.[name].[ext]"}
        ]
    },
    plugins: [
        // Suppressing warnings: 'Critical dependency: the request of a dependency is an expression'
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            'src'
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: "bundle.html",
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"],
            minChunks: isExternal
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["manifest"],
            minChunks: Infinity
        }),
        new PurifyPlugin(),
    ]
};