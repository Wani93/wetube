const path = require('path');

module.exports = {
  entry: './src/client/js/main.js', // 웹팩에 적용할 파일 (엔트리 포인트)
  mode: 'development', // development: 개발 모드(패키징 시 좀 더 보기 좋은 코드로 변환) production: 완성 모드(압축한 코드로 변환)
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'assets', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
