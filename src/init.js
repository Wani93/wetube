import 'regenerator-runtime'; // babel로 낮은 버전의 JS 변환 시 async, await 대체하기 위해 필요.
import 'dotenv/config'; // 환경 변수 로드를 위해 항상 제일 먼저 import 해야한다.
import './db'; // db.js 파일을 import 하기 때문에 db.js 코드가 자동적으로 실행 됨.
import './models/Video';
import './models/User';
import app from './server';

const PORT = 4000;

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
