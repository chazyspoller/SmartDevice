import {iosChecker} from './ios-checker';

export class ScrollLock {
  constructor() {
    this._iosChecker = iosChecker;
    this._lockClass = this._iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this._fixedBlockElements = document.querySelectorAll('[data-fix-block]');
    this._sections = document.querySelectorAll('[data-block]');
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  disableScrolling() {
    if (this._getScrollbarWidth()) {
      this._sections.forEach((section) => {
        const sectionPaddingRight = getComputedStyle(section).paddingRight;
        const sectionBackImageExist = getComputedStyle(section).backgroundImage !== 'none';

        if (!sectionBackImageExist) {
          section.style.paddingRight = `${parseInt(sectionPaddingRight, 10) + this._getScrollbarWidth()}px`;
        } else {
          section.style.backgroundSize = `calc(100% - ${this._getScrollbarWidth()}px) 100%`;
          section.style.paddingRight = `${parseInt(sectionPaddingRight, 10) + this._getScrollbarWidth()}px`;
        }
      });
      this._fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${this._getScrollbarWidth()}px`;
      });
    }
    document.body.classList.add(this._lockClass);
  }

  enableScrolling() {
    document.body.classList.remove(this._lockClass);
    this._sections.forEach((section) => {
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
    this._fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
  }
}

window.scrollLock = new ScrollLock();
