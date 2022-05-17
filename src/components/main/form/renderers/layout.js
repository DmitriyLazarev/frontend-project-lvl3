// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import i18next from 'i18next';

const layout = (state, elements) => {
  elements.form.classList.add('rss-form', 'text-body');

  const name = 'url';
  elements.field.setAttribute('type', 'url');
  elements.field.setAttribute('name', name);
  elements.field.setAttribute('id', name);
  elements.field.setAttribute('autocomplete', 'off');
  elements.field.setAttribute('aria-label', 'url');
  elements.field.setAttribute('autofocus', 'true');
  elements.field.setAttribute('placeholder', 'https://example.com/example.rss');
  elements.field.classList.add('form-control', 'w-100', 'form-control-lg');
  elements.field.focus();

  elements.inputLabel.setAttribute('for', name);
  elements.inputLabel.classList.add('text-white', 'mb-2');
  elements.inputLabel.textContent = i18next.t('form.inputLabel');

  elements.errorBlock.classList.add('feedback', 'mb-0', 'mt-2', 'text-danger', 'small');
  elements.successBlock.classList.add('feedback', 'mb-0', 'mt-2', 'text-success', 'small');

  elements.submitButton.setAttribute('type', 'submit');
  elements.submitButton.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5', 'mt-4');
  elements.submitButton.textContent = i18next.t('form.submitButton');

  elements.loader.classList.add('spinner-border', 'spinner-border-sm', 'me-2');
  elements.loader.setAttribute('role', 'status');
  elements.loader.setAttribute('hidden', 'true');
  elements.loader.setAttribute('aria-hidden', 'true');

  elements.submitButton.prepend(elements.loader);
};

export default layout;
