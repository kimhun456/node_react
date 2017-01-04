'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoDB use schema alternative the TABLE in RDBS
var Schema = _mongoose2.default.Schema;

// define Account Scehma
var Account = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

Account.methods.generateHash = function (password) {
    return _bcryptjs2.default.hashSync(password, 8);
};

Account.methods.validateHash = function (password) {
    return _bcryptjs2.default.compareSync(password, this.password);
};

/*
Schema 와 Model 의 차이는, Schema 는 그냥 데이터의 ‘틀’ 일 뿐이구요,
Model 은, 실제 데이터베이스에 접근 할 수 있게 해주는 클래스입니다
*/

// exprot the mongoose model
exports.default = _mongoose2.default.model('account', Account);