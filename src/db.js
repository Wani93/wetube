import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB');
const handleError = (error) => console.log('DB Error', error);

db.on('error', handleError); // error 이벤트가 발생하면 여러번 발생해도 실행 됨.
db.once('open', handleOpen); // open 이벤트 시 한번만 발생
