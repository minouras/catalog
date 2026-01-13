// 絶対パスで指定したアンカーには反応しないので注意

export class SmoothScroll {
  target: HTMLAnchorElement;
  startPositionX: number;
  startPositionY: number;
  endPositionX: number;
  endPositionY: number;
  startTime: number;
  animationId: number;
  duration: number;

  constructor(target: HTMLAnchorElement) {
    this.target = target;
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.endPositionX = 0;
    this.endPositionY = 0;
    this.startTime = 0;
    this.animationId = 0;
    this.duration = 700;

    this.bindEvent();
  }

  bindEvent(): void {
    this.target.addEventListener(
      'click',
      (e: MouseEvent): void => {
        if (!(e.target instanceof HTMLElement)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();

        const eventTarget: HTMLElement = e.target as HTMLElement;
        let clickedTarget: HTMLElement | null = null;

        if (!(eventTarget instanceof HTMLAnchorElement)) {
          clickedTarget = eventTarget.closest('a[href^="#"]');
        } else {
          clickedTarget = eventTarget;
        }

        if (clickedTarget === null) {
          return;
        }

        let targetY: number;
        if (clickedTarget.classList.contains('js-go-to-top')) {
          targetY = 0;
        } else {
          const destinationElmId: string | null = clickedTarget.getAttribute('href');
          if (destinationElmId === null || destinationElmId === '#') {
            return;
          }

          const destinationElm: HTMLElement | null = document.getElementById(
            destinationElmId.replace('#', ''),
          );
          if (destinationElm === null) {
            return;
          }

          const documentHeight: number = document.body.clientHeight;

          if (destinationElm.offsetTop + window.innerHeight > documentHeight) {
            targetY = documentHeight - window.innerHeight;
          } else {
            targetY = destinationElm.getBoundingClientRect().top + window.scrollY;
          }
        }

        const customEvent = new CustomEvent('smoothScrollStart', {
          detail: { targetY },
        });
        window.dispatchEvent(customEvent);

        this.exeScroll(targetY);
      },
      false,
    );
  }

  getEasing(num: number): number {
    return 1 - Math.pow(1 - num, 4);
  }

  animation(): void {
    const progress: number = Math.min(1, (performance.now() - this.startTime) / this.duration);
    const scrollValX: number =
      this.startPositionX + (this.endPositionX - this.startPositionX) * this.getEasing(progress);
    const scrollValY: number =
      this.startPositionY + (this.endPositionY - this.startPositionY) * this.getEasing(progress);

    window.scrollTo(scrollValX, scrollValY);

    if (progress < 1) {
      this.animationId = requestAnimationFrame(() => {
        this.animation();
      });
    }
  }

  cancelScroll(): void {
    window.cancelAnimationFrame(this.animationId);
  }

  exeScroll(destinationY: number, destinationX?: number): void {
    this.startPositionX = window.scrollX;
    this.startPositionY = window.scrollY;
    this.endPositionX = destinationX != null ? destinationX : window.scrollX;
    this.endPositionY = destinationY != null ? destinationY - 100 : window.scrollY;
    this.startTime = performance.now();
    this.animation();
  }

  static init(): void {
    const targets: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    if (targets.length) {
      for (let i = 0; i < targets.length; i++) {
        new SmoothScroll(targets[i]);
      }
    }
  }
}
