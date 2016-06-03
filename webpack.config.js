var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve('js'),
    entry: './app',
    output: {
        path: path.resolve('build/'),
        publicPath: '/public/assets/js',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'public'
    },
    module: {
        loaders: [
            { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
            { test: /\.(es6|js)$/, exclude: /node_modules/, loader: 'babel', query: {
                presets: ['es2015']
            }},
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {
                presets: ['react']
            }},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.es6', '.jsx']
    }
};