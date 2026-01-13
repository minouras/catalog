export class headerScroll {
  // loadedFlag: boolean;
  // loadingElm: HTMLElement | null;
  // loadedImg: number;
  // imgLength: number;
  // progressElm: HTMLElement | null;
  // progressCurrent: number;
  // timer: number;
  // ofiTarget: HTMLCollection;
  isRunning: boolean;

  static root: HTMLElement | null = document.querySelector('html');
  static header: HTMLElement | null = document.getElementById('js-header');
  static headerTrg: HTMLElement | null = document.getElementById('js-header-trg');
  static headerTrgPos = 0;
  static headerTrgClientRect = 0;
  static scrollPos = 0;
  static offset = 0;

  constructor() {
    this.isRunning = false;
    // this.root = document.querySelector('html');
    this.bindEvent();
  }

  bindEvent(): void {
    window.addEventListener(
      'scroll',
      (): void => {
        if (!this.isRunning) {
          window.requestAnimationFrame(() => {
            this.isRunning = false;
            headerScroll.scrollPos = window.scrollY;
            this.checkSiteScrolled();
            this.toggleHeaderState();
          });
          this.isRunning = true;
        }
      },
      false,
    );
  }

  checkSiteScrolled(): void {
    // 下方向にスクロールしているとき
    if (headerScroll.scrollPos > headerScroll.offset) {
      if (headerScroll.root !== null) {
        if (headerScroll.root.classList.contains('site-scroll-up')) {
          headerScroll.root.classList.remove('site-scroll-up');
          headerScroll.root.classList.add('site-scroll-down');
        } else if (!headerScroll.root.classList.contains('site-scroll-down')) {
          headerScroll.root.classList.add('site-scroll-down');
        }
      }
      // 上方向にスクロールしているとき
    } else {
      if (headerScroll.root !== null) {
        if (headerScroll.root.classList.contains('site-scroll-down')) {
          headerScroll.root.classList.remove('site-scroll-down');
          headerScroll.root.classList.add('site-scroll-up');
        } else if (!headerScroll.root.classList.contains('site-scroll-up')) {
          headerScroll.root.classList.add('site-scroll-up');
        }
      }
    }
    headerScroll.offset = headerScroll.scrollPos;
  }

  toggleHeaderState(): void {
    if (headerScroll.headerTrg !== null) {
      headerScroll.headerTrgClientRect = headerScroll.headerTrg.getBoundingClientRect().top;
      headerScroll.headerTrgPos = headerScroll.scrollPos + headerScroll.headerTrgClientRect;
    } else {
      headerScroll.headerTrgPos = 0;
    }
    if (headerScroll.root !== null && headerScroll.header !== null) {
      if (headerScroll.scrollPos > headerScroll.headerTrgPos) {
        if (!headerScroll.header.classList.contains('is-fixed')) {
          headerScroll.header.classList.add('is-fixed');
          setTimeout(function () {
            if (headerScroll.root !== null) {
              headerScroll.root.classList.add('header-is-fixed');
            }
          }, 500);
        }
      } else {
        if (headerScroll.header.classList.contains('is-fixed')) {
          headerScroll.header.classList.remove('is-fixed');
          headerScroll.root.classList.remove('header-is-fixed');
        }
      }
    }
  }
}
