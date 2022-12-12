const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/join', async (req, res, next) => { // 회원가입
  const {id, nickName, pw} = req.body;

  try {
    const exUser = await User.findOne({where: {id}});
    if(exUser) {
      return res.redirect('join?error=exist');
    }
    const hash = await bcrypt.hash(pw, 12);
    await User.create({
      id,
      nickName,
      pw: hash
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
})


router.post('login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); //미들웨어 내에 미들웨어
})

router.get('logout', (req, res) => {
  req.logout(); //세션쿠키지움
  req.session.destroy(); //세션자체파괴?
  res.redirect('/');
})


module.exports = router;