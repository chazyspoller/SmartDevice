import {Forms} from './forms';

let forms;

const initForms = () => {
  forms = document.querySelectorAll('.main-form');

  if (forms.length) {
    forms.forEach((form) => {
      forms = new Forms(form);
    });
  }

  window.forms = forms;
};

export {forms, initForms};
