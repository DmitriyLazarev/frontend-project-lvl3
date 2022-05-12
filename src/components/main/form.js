// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import { isArray, isEmpty } from 'lodash';
import rssRenderer from './rssRenderer.js';
import globalState from './state.js';

const renderer = (state, elements) => {
  elements.form.classList.add('rss-form', 'text-body');

  const name = 'url';
  elements.field.setAttribute('type', 'url');
  elements.field.setAttribute('name', name);
  elements.field.setAttribute('id', name);
  elements.field.setAttribute('autocomplete', 'off');
  elements.field.setAttribute('autofocus', 'true');
  elements.field.setAttribute('placeholder', 'https://example.com/example.rss');
  elements.field.classList.add('form-control', 'w-100', 'form-control-lg');
  elements.field.focus();

  elements.inputLabel.setAttribute('for', name);
  elements.inputLabel.classList.add('text-white', 'mb-2');
  elements.inputLabel.textContent = i18next.t('form.inputLabel');

  elements.errorBlock.classList.add('feedback', 'mb-0', 'mt-2', 'text-danger', 'small');

  elements.submitButton.setAttribute('type', 'submit');
  elements.submitButton.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5', 'mt-4');
  elements.submitButton.textContent = i18next.t('form.submitButton');

  elements.loader.classList.add('spinner-border', 'spinner-border-sm', 'me-2');
  elements.loader.setAttribute('role', 'status');
  elements.loader.setAttribute('hidden', 'true');
  elements.loader.setAttribute('aria-hidden', 'true');

  elements.submitButton.prepend(elements.loader);
};

const validate = (value, urls) => {
  const schema = yup.string()
    .matches(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z\d@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z\d@:%_+.~#?&/=]*)/,
      i18next.t('form.errors.wrongUrl'),
    )
    .test('isIncluded', i18next.t('form.errors.isIncluded'), (v) => !urls.includes(v))
    .required(i18next.t('form.errors.required'));
  try {
    schema.validateSync(value, { abortEarly: false });
    return {};
  } catch (e) {
    return e;
  }
};

const renderErrors = (elements, errors) => {
  elements.field.classList.add('is-invalid');
  elements.errorBlock.textContent = isArray(errors.errors) ? errors.errors.join(' ') : errors.message;
};

const renderValidForm = (elements) => {
  elements.field.classList.remove('is-invalid');
  elements.errorBlock.textContent = '';
};

const watchedState = (elements) => (path, value) => {
  switch (path) {
    case 'valid':
      renderValidForm(elements);
      break;

    case 'errors':
      renderErrors(elements, value);
      break;

    case 'field':
    case 'urls':
      break;

    default:
      throw new Error(`Unknown state path: ${path}`);
  }
};

const waitingData = (isDataLoading, elements, error = '') => {
  if (isDataLoading) {
    elements.loader.removeAttribute('hidden');
    elements.submitButton.setAttribute('disabled', 'true');
    elements.field.setAttribute('disabled', 'true');
    elements.field.classList.remove('is-invalid');
  } else {
    elements.loader.setAttribute('hidden', 'true');
    elements.field.removeAttribute('disabled');
    elements.submitButton.removeAttribute('disabled');
    if (error.length === 0) {
      elements.field.value = '';
    } else {
      elements.errorBlock.textContent = error;
    }
    elements.field.focus();
  }
};

const rssParser = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((data) => new DOMParser().parseFromString(data.data.contents, 'text/xml'))
  .then((data) => data)
  .catch((error) => error);

const form = (dataContainer, resultContainer) => {
  const formElement = document.createElement('form');
  const inputLabel = document.createElement('label');
  const input = document.createElement('input');
  const errorBlock = document.createElement('p');
  const submitButton = document.createElement('button');
  const loader = document.createElement('span');

  formElement.append(inputLabel, input, errorBlock, submitButton);
  dataContainer.append(formElement);

  const elements = {
    form: formElement,
    field: input,
    inputLabel,
    errorBlock,
    submitButton,
    loader,
  };

  const state = onChange(globalState, watchedState(elements));

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = formElement.elements.url.value;
    state.field = url;
    state.errors = validate(state.field, state.urls);
    state.valid = isEmpty(state.errors);

    if (state.valid) {
      waitingData(true, elements);
      const parser = rssParser(url, elements, state);
      parser
        .then((data) => {
          const rss = data.querySelectorAll('rss');
          let rssError = '';
          if (rss.length > 0) {
            state.urls.push(url);
            rssRenderer(data, resultContainer);
          } else {
            rssError = i18next.t('form.errors.invalidRSS');
          }
          waitingData(false, elements, rssError);
        })
        .catch((error) => console.log(error));
    }
  });

  renderer(state, elements);
};

export default form;
