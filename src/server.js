import express from 'express';
import morgan from 'morgan';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`); // process.cwd()는 현재 작업 디렉토리

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // Form 형식을 이해할 수 있도록 변형 시켜 줌.

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;
