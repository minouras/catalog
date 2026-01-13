export function inviewScroll(): void {
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.js-inview');

    // 表示領域の上端と下端の位置
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    elements.forEach((element: Element) => {
      // 要素の位置を取得
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementBottom = elementTop + (element as HTMLElement).clientHeight;

      // 要素が表示領域内に入ってきたらクラスを追加
      if (elementTop < viewportBottom && elementBottom > viewportTop) {
        (element as HTMLElement).classList.add('in-view');
      }
    });
  });
}
