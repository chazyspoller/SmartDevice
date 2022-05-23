import {iosChecker} from './ios-checker';

export class ScrollLock {
  constructor() {
    this.iosChecker = iosChecker;
    this.lockClass = this.iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this.fixedBlockElements = document.querySelectorAll('[data-fix-block]');
    this.sections = document.querySelectorAll('[data-block]');
  }

  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  disableScrolling() {
    if (this.getScrollbarWidth()) {
      this.sections.forEach((section) => {
        const sectionPaddingRight = getComputedStyle(section).paddingRight;
        const sectionBackImageExist = getComputedStyle(section).backgroundImage !== 'none';

        if (!sectionBackImageExist) {
          section.style.paddingRight = `${parseInt(sectionPaddingRight, 10) + this.getScrollbarWidth()}px`;
        } else {
          section.style.backgroundSize = `calc(100% - ${this.getScrollbarWidth()}px) 100%`;
          section.style.paddingRight = `${parseInt(sectionPaddingRight, 10) + this.getScrollbarWidth()}px`;
        }
      });
      this.fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${this.getScrollbarWidth()}px`;
      });
    }
    document.body.classList.add(this.lockClass);
  }

  enableScrolling() {
    document.body.classList.remove(this.lockClass);
    this.sections.forEach((section) => {
      const sectionBackImageExist = getComputedStyle(section).backgroundImage !== 'none';

      if (!sectionBackImageExist) {
        section.style.paddingRight = null;
      } else {
        section.style.backgroundSize = null;
        section.style.backgroundPosition = null;
        section.style.paddingRight = null;
      }
    });
    document.body.style.top = null;
    this.fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
  }
}

window.scrollLock = new ScrollLock();
