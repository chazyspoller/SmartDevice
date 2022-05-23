export class Forms {
  constructor(form) {
    this.form = form;

    this.phoneField = form.querySelector('input[type="tel"]');
    this.nameField = form.querySelector('input[type="text"]');
    this.questionField = form.querySelector('textarea');

    this.isStorageSupport = true;
    this.storagePhone = '';
    this.storageQuestion = '';
    this.storageName = '';

    this.activatePhoneMask = this.activatePhoneMask.bind(this);
    this.activateFormValid = this.activateFormValid.bind(this);
    this.checkPhoneMask = this.checkPhoneMask.bind(this);
    this.checkNameField = this.checkNameField.bind(this);
    this.useLocalStorage = this.useLocalStorage.bind(this);
    this.activateLocalStorage = this.activateLocalStorage.bind(this);

    this.init();
  }

  init() {
    if (this.phoneField) {
      this.activatePhoneMask();
    }
    this.activateLocalStorage();
    this.activateFormValid();
  }

  checkPhoneMask(evt) {
    const el = evt.target;
    const clearVal = el.dataset.phoneClear;
    const pattern = el.dataset.phonePattern;
    const martixDef = '+7 (___) ___-__-__';
    const matrix = pattern ? pattern : martixDef;
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = evt.target.value.replace(/\D/g, '');

    if (clearVal !== 'false' && evt.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        evt.target.value = '';
        evt.target.classList.add('input--error');
        return;
      }
    }

    if (def.length >= val.length) {
      val = def;
    }

    evt.target.value = matrix.replace(/./g, function (char) {
      if ((/[_\d]/).test(char) && i < val.length) {
        evt.target.classList.remove('input--error');
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      }
      return char;
    });
  }

  activatePhoneMask() {
    for (let ev of ['input', 'blur', 'focus']) {
      this.phoneField.addEventListener(ev, this.checkPhoneMask);
    }
  }

  activateLocalStorage() {
    try {
      if (this.phoneField) {
        this.storagePhone = localStorage.getItem(`${this.phoneField.getAttribute('id')}`);
      }
      if (this.questionField) {
        this.storageQuestion = localStorage.getItem(`${this.questionField.getAttribute('id')}`);
      }
      if (this.nameField) {
        this.storageName = localStorage.getItem(`${this.nameField.getAttribute('id')}`);
      }
    } catch (err) {
      this.isStorageSupport = false;
    }
  }

  checkNameField(evt) {
    if (evt.target.value === '') {
      evt.target.classList.add('input--error');
    } else {
      evt.target.classList.remove('input--error');
    }
  }

  useLocalStorage() {
    if (this.isStorageSupport) {
      if (this.phoneField) {
        localStorage.setItem(`${this.phoneField.getAttribute('id')}`, this.phoneField.value);
      }
      if (this.nameField) {
        localStorage.setItem(`${this.nameField.getAttribute('id')}`, this.nameField.value);
      }
      if (this.questionField) {
        localStorage.setItem(`${this.questionField.getAttribute('id')}`, this.questionField.value);
      }
    }
  }

  activateFormValid() {
    if (!this.form) {
      return;
    }

    if (this.storagePhone && this.phoneField) {
      this.phoneField.value = this.storagePhone;
    } else {
      this.phoneField.value = '';
    }
    if (this.storageName && this.nameField) {
      this.nameField.value = this.storageName;
    }
    if (this.storageQuestion && this.questionField) {
      this.questionField.value = this.storageQuestion;
    }

    if (this.nameField) {
      this.nameField.addEventListener('input', this.checkNameField);
    }

    this.form.addEventListener('submit', this.useLocalStorage);
  }
}
