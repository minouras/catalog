export function matchHeight(trgClass: string) {
  // 画面幅が768px以下の場合は処理を終了
  if (window.matchMedia('(max-width: 768px)').matches) {
    return;
  }

  // 対象要素を取得
  const targetElms = document.querySelectorAll<HTMLElement>(trgClass);

  // 各要素の高さをリセットする
  targetElms.forEach((el) => {
    el.style.height = ''; // 高さをクリア
  });

  // 最大の高さを見つける
  let maxHeight = 0;
  targetElms.forEach((el) => {
    const height = el.getBoundingClientRect().height;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // 他の要素の高さを最大の高さに合わせる
  targetElms.forEach((el) => {
    el.style.height = `${maxHeight}px`;
  });
}
