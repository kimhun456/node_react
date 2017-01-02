'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongoDB server');
});
_mongoose2.default.connect('mongodb://localhost/codelab');

var devPort = 4000;
var app = (0, _express2.default)();
var port = 3000;

// 미들웨어를 적용하는 부분.
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.use((0, _expressSession2.default)({
    secret: 'Codelab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.get('/hello', function (req, res) {
    return res.send('Hello CodeLab');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var config = require('../webpack.dev.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);

    devServer.listen(devPort, function () {
        console.log('WebpackDevServer is listening on port', devPort);
    });
}