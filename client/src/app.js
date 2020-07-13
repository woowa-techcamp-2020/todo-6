import {sum} from './math'

window.addEventListener('DOMContentLoaded', () => { // DOM 생성 후 실행
  const el = document.querySelector('#app');
  el.innerHTML = `<h1>1 + 2 = ${sum(1,2)}</h1>`
});