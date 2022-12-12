const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => { //로그인정보가 있는지 확인하는 거까지가 전략이다. 로그인정보를 세션에 저장하는 것은 그 다음 serializeUser에서 한다,
  passport.use(new localStrategy({
    usernameField: 'id', //req.body.id
    passwordField: 'pw', //req.body.pw
  }, async (id, pw, done) => {
    try {
      const exUser = await User.findOne({where: {id}});
      if(exUser) {
        const result = await bcrypt.compare(pw, exUser.pw);
        if(result){
          done(null, exUser);
        } else {
          done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        done(null, false, {message: '가입되지 않은 회원입니다.'});
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }))
}