const SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];

export class FocusLock {
  constructor() {
    this.lockedSelector = null;
    this.focusableElements = null;
    this.endElement = null;
    this.selectors = SELECTORS;

    this.documentKeydownHandler = this.documentKeydownHandler.bind(this);
  }

  documentKeydownHandler(evt) {
    const activeElement = document.activeElement;
    if (evt.key === 'Tab') {
      if (!this.focusableElements.length) {
        evt.preventDefault();
        activeElement.blur();
        return;
      }
      if (this.focusableElements.length === 1) {
        evt.preventDefault();
        this.focusableElements[0].focus();
        return;
      }
      if (this.focusableElements.length > 1 && !activeElement.closest(this.lockedSelector)) {
        evt.preventDefault();
        this.focusableElements[0].focus();
        return;
      }
    }
    if (evt.key === 'Tab' && !evt.shiftKey && activeElement === this.focusableElements[this.focusableElements.length - 1]) {
      evt.preventDefault();
      this.focusableElements[0].focus();
    }
    if (evt.key === 'Tab' && evt.shiftKey && activeElement === this.focusableElements[0]) {
      evt.preventDefault();
      this.focusableElements[this.focusableElements.length - 1].focus();
    }
  }

  lock(lockedSelector, startFocus = true) {
    this.unlock();
    this.lockedSelector = lockedSelector;
    const lockedElement = document.querySelector(this.lockedSelector);
    if (!lockedElement) {
      return;
    }
    this.focusableElements = lockedElement.querySelectorAll(this.selectors);
    this.endElement = document.activeElement;
    const startElement = lockedElement.querySelector('[data-focus]') || this.focusableElements[0];
    if (this.endElement) {
      this.endElement.blur();
    }
    if (startElement && startFocus) {
      startElement.focus();
    }
    document.addEventListener('keydown', this.documentKeydownHandler);
  }

  unlock(returnFocus = true) {
    if (this.endElement && returnFocus) {
      this.endElement.focus();
    }
    this.lockedSelector = null;
    this.focusableElements = null;
    this.endElement = null;
    document.removeEventListener('keydown', this.documentKeydownHandler);
  }
}

window.focusLock = new FocusLock();
