import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';
import { localsMiddleware } from './middlewares';

const app = express();

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`); // process.cwd()는 현재 작업 디렉토리

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // Form 형식을 이해할 수 있도록 변형 시켜 줌.
app.use(express.json()); // 서버에서 string으로 받은 데이터를 json으로 변환해주는 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, // false값이면 세션을 수정할 때만 DB에 저장하고 쿠키를 넘겨 줌
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // DB URL을 문자열 그대로 저장하는 것은 보안 위협 요소가 된다. ∴ .env에 환경변수를 따로 저장(이 파일은 gitignore시킴)
  }),
);

app.use(flash());
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads')); // 클라이언트에서 /uploads 경로로 갔을때 uploads 폴더를 보여주도록 허용
app.use('/static', express.static('assets'));

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);

export default app;
