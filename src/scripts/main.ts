import { headerScroll } from './components/headerScroll';
import { inviewScroll } from './components/inviewScroll';
import { Loading } from './components/loading';
import { SetGnav } from './components/setGnav';
import { SmoothScroll } from './components/SmoothScroll';
// 任意のモジュール
import { letterAnimation } from './components/letterAnimation';


// loading.ts
document.addEventListener('DOMContentLoaded', () => {
  new Loading();
  new SetGnav();
  new headerScroll();
  // ※注意事項を読むこと
  SmoothScroll.init();
  inviewScroll();
});

letterAnimation('.u-animation-jsLetter');
