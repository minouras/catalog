export function letterAnimation(selector: string): void {
  // 指定されたクラス名またはIDを持つ要素を取得
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`No element found with selector: ${selector}`);
    return;
  }

  // 要素のテキストを1文字ずつspanタグで囲む
  const text = element.textContent || '';
  element.innerHTML = ''; // 要素の内容をクリア
  const spans: HTMLSpanElement[] = [];

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('letter');
    element.appendChild(span);
    spans.push(span);
  });

  // Intersection Observerの設定
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLSpanElement;
          spans.forEach((char, index) => {
            setTimeout(() => {
              char.classList.add('letter-inview');
            }, 50 * index); // 文字ごとに表示する間隔をミリ秒単位で指定
          });
          observer.unobserve(target);
        }
      });
    },
    {
      threshold: 0.1, // 要素が10%表示領域に入ったら発火
    },
  );

  // 各span要素を監視対象に追加
  spans.forEach((span) => observer.observe(span));
}
