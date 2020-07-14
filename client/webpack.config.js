const path = require('path'); // 노드모듈 중 절대경로를 정하기 위해 path 모듈을 가져옴
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 개발 모드로 진행
  entry: {
    main: './src/app.js' // 시작점 설정
  },
  output: { // 여러개의 모듈을 하나로 만들어서 저장시킬 위치 정하기
    path: path.resolve('./dist'), // 절대 경로 설정(./폴더이름설정)
    filename: '[name].js'// 파일명(name변수는 entry에서 설정한 키값(=main)이 들어오게된다.
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/, // png 파일에 대한 정규표현식
        use: [{
          loader: 'file-loader', // 설치한 file-loader 설정
          options: {
            name: '[name].[ext]?[hash]' // 결과물의 이름을 해시값이 아닌 파일명으로 생성하기
                                        // [원본파일의 이름]과 [확장자명] 을 변수로 담음
          //   publicPath: '../dist' // 이미지 호출시 ./dist 경로 자동설정
          }
        }]
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html' // 인자로 템플릿 파일
  }),
  new CleanWebpackPlugin(),
]
};