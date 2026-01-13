export class SetGnav {
  gnavItem: HTMLCollection | undefined;
  static root: HTMLElement | null = document.querySelector('html');
  static gnav: HTMLElement | null = document.getElementById('js-gnav');
  static trg: HTMLElement | null = document.getElementById('js-gnav-trg');
  static targets: (HTMLElement | Element)[] = [];

  constructor() {
    if (SetGnav.gnav) {
      this.gnavItem = SetGnav.gnav.getElementsByClassName('js-gnav__item');
      if (this.gnavItem.length) {
        SetGnav.targets = [...this.gnavItem];
      }
      if (SetGnav.trg !== null) {
        SetGnav.targets.push(SetGnav.trg);
      }
    }
    this.bindEvent();
    this.bindCustomEvent();
  }

  bindCustomEvent(): void {
    // @ts-ignore
    window.addEventListener('smoothScrollStart', this.handleSmoothScrollStart.bind(this));
  }

  handleSmoothScrollStart(e: CustomEvent): void {
    this.closeGnav();
  }

  closeGnav(): void {
    if (SetGnav.root) {
      SetGnav.root.classList.remove('is-locked', 'gnav-is-active');
    }
    if (SetGnav.trg && SetGnav.trg instanceof HTMLElement) {
      SetGnav.trg.classList.remove('is-active');
    }
    if (SetGnav.gnav !== null) {
      SetGnav.gnav.classList.remove('is-active');
    }
  }

  bindEvent(): void {
    if (SetGnav.targets.length) {
      for (const target of SetGnav.targets) {
        new ToggleGnav(target, 'is-active');
      }
    }
  }
}

class ToggleGnav {
  element: HTMLElement | Element;
  className: string;

  constructor(element: HTMLElement | Element, className: string) {
    this.element = element;
    this.className = className;
    this.handleClick();
  }

  handleClick(): void {
    if (this.element === null) {
      return;
    }
    this.element.addEventListener(
      'click',
      (): void => {
        if (this.isGnavItem()) {
          this.deactivate();
        } else if (this.isActive()) {
          this.deactivate();
        } else {
          this.activate();
        }
      },
      false,
    );
  }

  isGnavItem(): boolean {
    if (this.element === null) {
      return false;
    }
    return this.element.classList.contains('js-gnav__item');
  }

  isActive(): boolean {
    if (this.element === null) {
      return false;
    }
    return this.element.classList.contains(this.className);
  }

  activate(): void {
    if (SetGnav.root) {
      SetGnav.root.classList.add('is-locked', 'gnav-is-active');
    }
    if (this.element && this.element instanceof HTMLElement) {
      this.element.classList.add(this.className);
    }
    if (SetGnav.gnav !== null) {
      SetGnav.gnav.classList.add(this.className);
    }
  }

  deactivate(): void {
    if (SetGnav.root) {
      SetGnav.root.classList.remove('is-locked', 'gnav-is-active');
    }
    if (this.element && this.element instanceof HTMLElement) {
      this.element.classList.remove(this.className);
    }
    if (SetGnav.trg && SetGnav.trg instanceof HTMLElement) {
      SetGnav.trg.classList.remove(this.className);
    }
    if (SetGnav.gnav !== null) {
      SetGnav.gnav.classList.remove(this.className);
    }
  }
}
