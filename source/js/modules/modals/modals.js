import {ScrollLock} from '../../utils/scroll-lock';
import {FocusLock} from '../../utils/focus-lock';

export class Modals {
  constructor(settings = {}) {
    this.scrollLock = new ScrollLock();
    this.focusLock = new FocusLock();

    this.modalOpenElements = document.querySelectorAll('[data-open-modal]');
    this.focusField = document.querySelector('[data-open-focus]');
    this.openedModalElement = null;
    this.modalName = null;
    this.enableScrolling = true;
    this.settingKey = 'default';

    this.settings = settings;
    this.preventDefault = this.settings[this.settingKey].preventDefault;
    this.lockFocus = this.settings[this.settingKey].lockFocus;
    this.startFocus = this.settings[this.settingKey].startFocus;
    this.focusBack = this.settings[this.settingKey].focusBack;
    this.eventTimeout = this.settings[this.settingKey].eventTimeout;
    this.openCallback = this.settings[this.settingKey].openCallback;
    this.closeCallback = this.settings[this.settingKey].closeCallback;

    this.documentKeydownHandler = this.documentKeydownHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.modalClickHandler = this.modalClickHandler.bind(this);

    this.init();
  }

  init() {
    if (this.modalOpenElements.length) {
      document.addEventListener('click', this.documentClickHandler);
    }
  }

  setSettings(settingKey = this.settingKey) {
    if (!this.settings[settingKey]) {
      return;
    }

    this.preventDefault =
      typeof this.settings[settingKey].preventDefault === 'boolean'
        ? this.settings[settingKey].preventDefault
        : this.settings[this.settingKey].preventDefault;
    this.lockFocus =
      typeof this.settings[settingKey].lockFocus === 'boolean'
        ? this.settings[settingKey].lockFocus
        : this.settings[this.settingKey].lockFocus;
    this.startFocus =
      typeof this.settings[settingKey].startFocus === 'boolean'
        ? this.settings[settingKey].startFocus
        : this.settings[this.settingKey].startFocus;
    this.focusBack =
      typeof this.settings[settingKey].lockFocus === 'boolean'
        ? this.settings[settingKey].focusBack
        : this.settings[this.settingKey].focusBack;
    this.eventTimeout =
      typeof this.settings[settingKey].eventTimeout === 'number'
        ? this.settings[settingKey].eventTimeout
        : this.settings[this.settingKey].eventTimeout;
    this.openCallback = this.settings[settingKey].openCallback || this.settings[this.settingKey].openCallback;
    this.closeCallback = this.settings[settingKey].closeCallback || this.settings[this.settingKey].closeCallback;
  }

  documentClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-open-modal]')) {
      return;
    }

    evt.preventDefault();

    this.modalName = target.closest('[data-open-modal]').dataset.openModal;

    if (!this.modalName) {
      return;
    }

    this.open();
  }

  documentKeydownHandler(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      evt.preventDefault();
      this.close(document.querySelector('.modal.is-active').dataset.modal);
    }
  }

  modalClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-close-modal]')) {
      return;
    }

    this.close(target.closest('[data-modal]').dataset.modal);
  }

  addListeners(modal) {
    modal.addEventListener('click', this.modalClickHandler);
    document.addEventListener('keydown', this.documentKeydownHandler);
  }

  removeListeners(modal) {
    modal.removeEventListener('click', this.modalClickHandler);
    document.removeEventListener('keydown', this.documentKeydownHandler);
  }

  open(modalName = this.modalName) {
    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    if (!modal || modal.classList.contains('is-active')) {
      return;
    }

    document.removeEventListener('click', this.documentClickHandler);

    this.openedModalElement = document.querySelector('.modal.is-active');

    if (this.openedModalElement) {
      this.enableScrolling = false;
      this.close(this.openedModalElement.dataset.modal);
    }

    this.setSettings(modalName);
    modal.classList.add('is-active');

    if (this.focusField && modal.classList.contains('is-active')) {
      setTimeout(() => {
        this.focusField.focus();
      }, 200);
    }

    if (!this.openedModalElement) {
      this.scrollLock.disableScrolling();
    }

    if (this.openCallback) {
      this.openCallback();
    }

    if (this.lockFocus) {
      this.focusLock.lock('.modal.is-active', this.startFocus);
    }

    setTimeout(() => {
      this.addListeners(modal);
      document.addEventListener('click', this.documentClickHandler);
    }, this.eventTimeout);
  }

  close(modalName = this.modalName) {
    const modal = document.querySelector(`[data-modal="${modalName}"]`);
    document.removeEventListener('click', this.documentClickHandler);

    if (!modal || !modal.classList.contains('is-active')) {
      return;
    }

    if (this.lockFocus) {
      this.focusLock.unlock(this.focusBack);
    }

    modal.classList.remove('is-active');
    this.removeListeners(modal);

    if (this.closeCallback) {
      this.closeCallback();
    }

    if (this.enableScrolling) {
      setTimeout(() => {
        this.scrollLock.enableScrolling();
      }, this.eventTimeout);
    }

    setTimeout(() => {
      document.addEventListener('click', this.documentClickHandler);
    }, this.eventTimeout);

    this.setSettings('default');
    this.enableScrolling = true;
  }
}
