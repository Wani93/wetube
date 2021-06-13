const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    // 웹팩에 적용할 파일 (엔트리 포인트)
    main: './src/client/js/main.js',
    videoPlayer: './src/client/js/videoPlayer.js',
  },
  mode: 'development', // development: 개발 모드(패키징 시 좀 더 보기 좋은 코드로 변환) production: 완성 모드(압축한 코드로 변환)
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  output: {
    filename: 'js/[name].js', // 파일 이름을 [name]으로 하면 변수화 하여 각각의 파일이 생김.
    path: path.resolve(__dirname, 'assets'),
    clean: true,
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // 웹팩은 역순으로 실행하는 것에 유의!
      },
    ],
  },
};
