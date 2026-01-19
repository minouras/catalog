import type { ISourceOptions } from 'tsparticles-engine';

export const sectionParticlesOptions: ISourceOptions = {
  background: { color: 'transparent' },
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,

  particles: {
    number: { value: 90, density: { enable: true, area: 1200 } },
    color: { value: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2'] },
    shape: { type: 'polygon', options: { polygon: { sides: 6 } } },
    opacity: { value: 0.85 },
    size: { value: { min: 8, max: 26 } },
    move: {
      enable: true,
      speed: 1.1,
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
  },

  interactivity: {
    // 重要：canvas に pointer-events:none を付けても hover が効くようにする
    detectsOn: 'window', //
    events: {
      onHover: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      repulse: { distance: 140, duration: 0.25 },
    },
  },
};
