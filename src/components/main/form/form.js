// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import onChange from 'on-change';
import i18next from 'i18next';
import { isEmpty } from 'lodash';
import uniqueId from 'lodash/uniqueId';
import result from '../result/result.js';
import layout from './renderers/layout.js';
import renderErrors from './renderers/errors.js';
import validate from './modules/validator.js';
import rssParser from './modules/rss-parser.js';

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'error':
      elements.loader.setAttribute('hidden', 'true');
      elements.field.removeAttribute('disabled');
      elements.submitButton.removeAttribute('disabled');
      elements.field.classList.add('is-invalid');
      elements.successBlock.style.display = 'none';
      elements.errorBlock.style.display = 'block';
      break;

    case 'sending':
      elements.loader.removeAttribute('hidden');
      elements.submitButton.setAttribute('disabled', 'true');
      elements.field.setAttribute('disabled', 'true');
      elements.field.classList.remove('is-invalid');
      break;

    case 'success':
      elements.successBlock.style.display = 'block';
      elements.loader.setAttribute('hidden', 'true');
      elements.field.removeAttribute('disabled');
      elements.submitButton.removeAttribute('disabled');
      elements.successBlock.textContent = i18next.t('form.success');
      elements.field.value = '';
      elements.field.focus();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const watchedState = (elements) => (path, value) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, value);
      break;

    case 'form.valid':
      elements.field.classList.remove('is-invalid');
      elements.errorBlock.style.display = 'none';
      break;

    case 'form.errors':
      renderErrors(elements, value);
      break;

    case 'urls':
      break;

    default:
      throw new Error(`Unknown state path: ${path}`);
  }
};

const form = (globalState, dataContainer, resultContainer) => {
  const formElement = document.createElement('form');
  const inputLabel = document.createElement('label');
  const input = document.createElement('input');
  const errorBlock = document.createElement('p');
  const successBlock = document.createElement('p');
  const submitButton = document.createElement('button');
  const loader = document.createElement('span');

  formElement.append(inputLabel, input, errorBlock, successBlock, submitButton);
  dataContainer.append(formElement);

  const elements = {
    form: formElement,
    field: input,
    inputLabel,
    errorBlock,
    successBlock,
    submitButton,
    loader,
  };

  const state = onChange(globalState, watchedState(elements));

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = formElement.elements.url.value;
    state.form.errors = validate(url, state.urls);
    state.form.valid = isEmpty(state.form.errors);
    state.form.processState = isEmpty(state.form.errors) ? 'sending' : 'error';

    if (state.form.valid) {
      const parser = rssParser(url);
      parser
        .then((data) => {
          const rss = data.querySelectorAll('rss');
          if (rss.length > 0) {
            const urlId = uniqueId();
            state.urls.push({ id: urlId, url });
            result(state, data, urlId, resultContainer);
            state.form.processState = 'success';
            return;
          }
          state.form.processState = 'error';
          state.form.errors = i18next.t('form.errors.invalidRSS');
        })
        .catch((error) => {
          state.form.processState = 'error';
          state.form.errors = i18next.t('form.errors.network');
          console.log(error);
        });
    }
  });

  layout(state, elements);
};

export default form;
