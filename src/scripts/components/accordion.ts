/* ******************************************************
	
	アコーディオン関数
	引数(トリガーのクラス)
	* 使い方 *
	トリガークラス要素のすぐ下に畳まれた要素を設置
	class="js-accordion-inner"とする

****************************************************** */
export default class Accordion {
  triggers: NodeListOf<HTMLElement>;

  constructor(triggerSelector: string) {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.init();
  }

  init() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.toggleAccordion.bind(this));
    });
  }

  toggleAccordion(event: Event) {
    const trigger = event.currentTarget as HTMLElement;
    const content = trigger.nextElementSibling as HTMLElement;

		trigger.classList.toggle('is-open')

    if (content && content.classList.contains('js-accordion-inner')) {
      content.classList.toggle('is-open');

      if (content.classList.contains('is-open')) {
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        content.style.maxHeight = '0';
      }
    }
  }
}
