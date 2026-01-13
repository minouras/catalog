import imagesLoaded from 'imagesloaded';
/**
 * Loading クラス
 * ------------------------------------------------------------
 * 特定セレクタに指定した画像だけを対象にして、
 * 進捗バー（#js-progress）で読み込み状況を可視化するローディング演出。
 *
 * ▼ 対象となる画像
 *   - .js-preload … <img><picture> などの画像タグ
 *   - .js-preload-bg … CSS background-image を持つ要素
 *
 * ※ 基本的に確実に見せたいファーストビューの画像に対して付与する想定
 * ※ 動画は対象外。動画がある場合はスクリプトをカスタマイズすること
 * ------------------------------------------------------------
 */

export class Loading {
  loadedFlag: boolean;
  isRunning: boolean;
  root: HTMLElement | null;
  loadingElm: HTMLElement | null;
  loadedImg: number;
  imgLength: number;
  progressElm: HTMLElement | null;
  progressCurrent: number;
  timer: number;

  constructor() {
    this.loadedFlag = false;
    this.isRunning = false;
    this.root = document.querySelector('html');
    this.loadingElm = document.getElementById('js-loading');
    this.progressElm = document.getElementById('js-progress');
    this.loadedImg = 0;
    this.progressCurrent = 0;
    this.timer = 0;

    // ▼ preload対象を限定
    const preloadTargets = document.querySelectorAll('.js-preload, .js-preload-bg');

    // imagesLoaded instance（背景対応）
    const imgLoader = imagesLoaded(preloadTargets, { background: '.js-preload-bg' });
    this.imgLength = imgLoader.images.length;

    this.start(imgLoader);
  }

  start(imgLoader: ReturnType<typeof imagesLoaded>): void {
    if (this.loadingElm) {
      this.timer = window.setInterval(this.monitorProgress.bind(this), 1000 / 50);

      imgLoader.on('progress', () => {
        this.loadedImg++;
      });

      imgLoader.on('always', () => {
        // ローディングがすべて完了
      });
    } else {
      this.clearLoading();
    }
  }

  monitorProgress(): void {
    const progressPer: number = (this.loadedImg / this.imgLength) * 100;
    this.progressCurrent += (progressPer - this.progressCurrent) * 0.1;

    if (this.progressElm) {
      this.progressElm.style.width = `${this.progressCurrent}%`;
    }

    if (this.progressCurrent >= 100) {
      this.clearLoading();
    }

    if (this.progressCurrent > 99.9) {
      this.progressCurrent = 100 + 10;
    }
  }

  clearLoading(): void {
    clearInterval(this.timer);
    if (this.root) {
      this.root.classList.add('is-loaded');
    }
    if (this.loadingElm) {
      this.loadingElm.classList.add('is-loaded');
    }
    this.loadedFlag = true;
  }
}
