export class Forms {
  constructor(form) {
    this._form = form;

    this._phoneField = form.querySelector('input[type="tel"]');
    this._nameField = form.querySelector('input[type="text"]');
    this._questionField = form.querySelector('textarea');

    this._isStorageSupport = true;
    this._storagePhone = '';
    this._storageQuestion = '';
    this._storageName = '';

    this._activatePhoneMask = this._activatePhoneMask.bind(this);
    this._activateFormValid = this._activateFormValid.bind(this);
    this._checkPhoneMask = this._checkPhoneMask.bind(this);
    this._checkNameField = this._checkNameField.bind(this);
    this._useLocalStorage = this._useLocalStorage.bind(this);
    this._activateLocalStorage = this._activateLocalStorage.bind(this);

    this._init();
  }

  _init() {
    this._activateLocalStorage();
    this._activatePhoneMask();
    this._activateFormValid();
  }

  _checkPhoneMask(evt) {
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

  _activatePhoneMask() {
    for (let ev of ['input', 'blur', 'focus']) {
      this._phoneField.addEventListener(ev, this._checkPhoneMask);
    }
  }

  _activateLocalStorage() {
    try {
      this._storagePhone = localStorage.getItem(`${this._phoneField.getAttribute('id')}`);
      this._storageQuestion = localStorage.getItem(`${this._questionField.getAttribute('id')}`);
      this._storageName = localStorage.getItem(`${this._nameField.getAttribute('id')}`);
    } catch (err) {
      this._isStorageSupport = false;
    }
  }

  _checkNameField(evt) {
    if (evt.target.value === '') {
      evt.target.classList.add('input--error');
    } else {
      evt.target.classList.remove('input--error');
    }
  }

  _useLocalStorage() {
    if (this._isStorageSupport) {
      localStorage.setItem(`${this._nameField.getAttribute('id')}`, this._nameField.value);
      localStorage.setItem(`${this._phoneField.getAttribute('id')}`, this._phoneField.value);
      localStorage.setItem(`${this._questionField.getAttribute('id')}`, this._questionField.value);
    }
  }

  _activateFormValid() {
    if (!this._form) {
      return;
    }

    if (this._storagePhone) {
      this._phoneField.value = this._storagePhone;
    } else {
      this._phoneField.value = '';
    }
    if (this._storageName) {
      this._nameField.value = this._storageName;
    }
    if (this._storageQuestion) {
      this._questionField.value = this._storageQuestion;
    }

    this._nameField.addEventListener('input', this._checkNameField);
    this._form.addEventListener('submit', this._useLocalStorage);
  }
}
