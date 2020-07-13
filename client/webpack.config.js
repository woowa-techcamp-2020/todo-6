const path = require('path'); // 노드모듈 중 절대경로를 정하기 위해 path 모듈을 가져옴

module.exports = {
  mode: 'development', // 개발 모드로 진행
  entry: {
    main: './src/app.js' // 시작점 설정
  },
  output: { // 여러개의 모듈을 하나로 만들어서 저장시킬 위치 정하기
    path: path.resolve('./dist'), // 절대 경로 설정(./폴더이름설정)
    filename: '[name].js'// 파일명(name변수는 entry에서 설정한 키값(=main)이 들어오게된다.
  }
};