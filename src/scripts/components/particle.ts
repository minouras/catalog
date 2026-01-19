import { tsParticles } from '@tsparticles/engine'; // パッケージ名変更
import { loadFull } from 'tsparticles'; // これで全機能読み込み
import type { ISourceOptions } from '@tsparticles/engine';

const OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  detectRetina: true,
  fpsLimit: 60,

  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        width: 1200, // area の代わりに width を使用
        height: 1080, // 必要に応じて指定
      },
    },
    color: { value: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2'] },
    shape: {
      type: 'polygon',
      options: {
        polygon: { sides: 6 },
      },
    },
    opacity: { value: 0.85 },
    size: { value: { min: 8, max: 26 } },
    move: {
      enable: true,
      speed: 1.1,
      random: true,
      outModes: { default: 'out' },
    },
  },

  interactivity: {
    detectsOn: 'window',
    resize: true, // events の外、interactivity 直下に移動
    events: {
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      repulse: { distance: 140, duration: 0.25 },
    },
  },
};

let engineLoaded = false;

/**
 * data-particles を持つ要素すべてにパーティクルをマウントする
 * - 何度呼んでも二重に作らない
 * - 描画先要素のサイズ(=親の高さ)に追従
 */
export async function initParticles() {
  const targets = document.querySelectorAll<HTMLElement>('[data-particles]');
  if (targets.length === 0) return;

  if (!engineLoaded) {
    // v3では tsParticles インスタンスを直接渡して初期化する
    await loadFull(tsParticles);
    engineLoaded = true;
  }

  for (const el of targets) {
    if (el.dataset.particlesMounted === '1') continue;
    el.dataset.particlesMounted = '1';

    if (!el.id) el.id = `pt-${Math.random().toString(16).slice(2)}`;

    // v3の引数形式：(id, options)
    // または (options) のみで el.id を自動参照
    await tsParticles.load({
      id: el.id,
      options: OPTIONS,
    });
  }
}
