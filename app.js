const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session =require('express-session')
 
// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');
const app = express();
 
app.set('port', 8000);
 

app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');


 
sequelize.sync({ alter: true }) //db수정사항 반영 - 기존 데이터랑 안 맞는 경우가 있어서 에러나는 경우가 많다.
//force: false == default 생성까지만? 
//force: true 테이블 지워졌다 다시 생성- 데이터 다 날아감 
//foriegn키가 걸려있으면 테이블이 안지워지는 경우가 있다 이때는 직접 워크벤치에서 삭제
   .then(() => {
      console.log('데이터베이스 연결됨.');
   }).catch((err) => {
      console.error(err);
   });


app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
//app.use(cookieParser());
app.use(session({
   resave:false,
   saveUninitialized: false,
   cookie:{
      httpOnly: true,
      secure: false,
   }
}))
//express-session보다 아래에 위치해야한다.
app.use(passport.initialize())//라우터가기전에 미리 연결 
app.use(passport.session()); 
//로그인 후에 그 다음요청부터 실행되면 deserializeUser실행
//패스포트세션이 쿠키받고 id값을 deserializeUser로 넘겨준다.


const Router = require('./routes')
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');

app.use('/', Router);
app.use('/user', userRouter);
app.use('/auth', authRouter);





 
// 일부러 에러 발생시키기 TEST용
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status = 404;
   next(error);
});
 
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
   // 템플릿 변수 설정
   res.locals.message = err.message; //res.locals는 ejs에서 message라는 변수를 쓰게 해준다.
   //res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체
   res.status(err.status || 500);
   res.render('error'); // 템플릿 엔진을 렌더링 하여 응답
});
 
// 서버 실행
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중');
});