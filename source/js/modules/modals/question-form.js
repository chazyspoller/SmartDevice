const form = document.querySelector('.questions__form');
const phoneField = form.querySelector('[data-phone-pattern]');
const questionField = form.querySelector('textarea');
const nameField = form.querySelector('input[type="text"]');

const checkExist = phoneField && questionField && nameField;

let isStorageSupport = true;
let storagePhone = '';
let storageQuestion = '';
let storageName = '';

try {
  storagePhone = localStorage.getItem('user-phone');
  storageQuestion = localStorage.getItem('user-question');
  storageName = localStorage.getItem('user-name');
} catch (err) {
  isStorageSupport = false;
}

const checkPhoneMask = (evt) => {
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

};

const activatePhoneMask = () => {
  for (let ev of ['input', 'blur', 'focus']) {
    phoneField.addEventListener(ev, checkPhoneMask);
  }
};

const checkNameField = () => {
  if (nameField.value === '') {
    nameField.classList.add('input--error');
  } else {
    nameField.classList.remove('input--error');
  }
};

const activateValid = () => {
  if (checkExist) {
    if (storagePhone) {
      phoneField.value = storagePhone;
    } else {
      phoneField.value = '';
    }
    if (storageName) {
      nameField.value = storageName;
    }
    if (storageQuestion) {
      questionField.value = storageQuestion;
    }
  }
};

const useLocalStorage = () => {
  if (isStorageSupport) {
    localStorage.setItem('user-name', nameField.value);
    localStorage.setItem('user-phone', phoneField.value);
    localStorage.setItem('user-question', questionField.value);
  }
};

if (phoneField) {
  document.addEventListener('DOMContentLoaded', activatePhoneMask);
}

const addListenersForForm = () => {
  activateValid();
  nameField.addEventListener('input', checkNameField);
  form.addEventListener('submit', useLocalStorage);
};

addListenersForForm();

export {addListenersForForm};
