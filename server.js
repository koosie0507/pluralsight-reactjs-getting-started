var express = require('express');
var path = require('path');
var logger = require('morgan');
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use('/', routes);

if(app.get('env') === 'development') {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

var server = app.listen(8000, function() {
    console.log('Listening on port 8000');
});