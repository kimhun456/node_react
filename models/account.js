import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// mongoDB use schema alternative the TABLE in RDBS
const Schema = mongoose.Schema;

// define Account Scehma
const Account = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

Account.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/*
Schema 와 Model 의 차이는, Schema 는 그냥 데이터의 ‘틀’ 일 뿐이구요,
Model 은, 실제 데이터베이스에 접근 할 수 있게 해주는 클래스입니다
*/
// exprot the mongoose model
export default mongoose.model('account', Account);