import './db'; // db.js 파일을 import 하기 때문에 db.js 코드가 자동적으로 실행 됨.
import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const PORT = 4000;
const app = express();

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`); // process.cwd()는 현재 작업 디렉토리

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // Form 형식을 이해할 수 있도록 변형 시켜 줌.

app.use('/', globalRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
