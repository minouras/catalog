// npm swiper で swiperをインストールする

// import Swiper from 'swiper';
// import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// スライダー
// export const nameSwipe = () => {
//   return new Swiper('.className', {
//     modules: [Pagination, Navigation],
//     slidesPerView: 1.3,
//     centeredSlides: true,
//     loop: false,
//     speed: 700,
//     breakpoints: {
//       768: {
//         slidesPerView: 5,
//         spaceBetween: 0,
//         centeredSlides: false,
//       },
//     },
//     pagination: {
//       el: '.c-swiper-namePagenation',
//     },
//     navigation: {
//       nextEl: '.c-swiper-nameButton-next',
//       prevEl: '.c-swiper-nameButton-prev',
//     },
//   });
// };

// スライダー
// export const nameSwipe = () => {
//   return new Swiper('.className', {
//     modules: [Pagination, Navigation],
//     slidesPerView: 1.3,
//     centeredSlides: true,
//     loop: false,
//     speed: 700,
//     breakpoints: {
//       768: {
//         slidesPerView: 5,
//         spaceBetween: 0,
//         centeredSlides: false,
//       },
//     },
//     pagination: {
//       el: '.c-swiper-namePagenation',
//     },
//     navigation: {
//       nextEl: '.c-swiper-nameButton-next',
//       prevEl: '.c-swiper-nameButton-prev',
//     },
//   });
// };

// 特殊なスライダー
// export const initHeroSwiper = () => {
//   // メインスライダー
//   const kvSwiper = new Swiper('.js-kvSwiper', {
//     modules: [Autoplay, EffectFade, Pagination, Navigation],
//     effect: 'fade',
//     loop: true,
//     speed: 700,
//     autoplay: {
//       delay: 6000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: '.c-swiper-kvPagenation',
//     },
//     navigation: {
//       nextEl: '.c-swiper-kvButton-next',
//       prevEl: '.c-swiper-kvButton-prev',
//     },
//   });
//   // // 連動テキスト
//   const kvTxtSwiper = new Swiper('.js-kvTxtSwiper', {
//     modules: [EffectFade],
//     effect: 'fade',
//     speed: 700,
//     allowTouchMove: false,
//     fadeEffect: {
//       crossFade: true,
//     },
//   });

//   // kvSwiperがスライドしたときにkvTxtSwiperも同じスライドに移動
//   kvSwiper.on('slideChange', () => {
//     kvTxtSwiper.slideTo(kvSwiper.realIndex);
//   });

//   // 初期表示を揃えるために最初のスライドに合わせる
//   kvTxtSwiper.slideTo(kvSwiper.realIndex);

//   return { kvSwiper, kvTxtSwiper };
// };
