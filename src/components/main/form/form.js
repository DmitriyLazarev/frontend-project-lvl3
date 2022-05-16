// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import onChange from 'on-change';
import i18next from 'i18next';
import { isEmpty } from 'lodash';
import uniqueId from 'lodash/uniqueId';
import result from '../result/result.js';
import globalState from '../common/state.js';
import layout from './renderers/layout.js';
import loadingRender from './renderers/loading.js';
import renderErrors from './renderers/errors.js';
import renderValidForm from './renderers/valid-form.js';
import validate from './modules/validator.js';
import rssParser from './modules/rss-parser.js';

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

const form = (dataContainer, resultContainer) => {
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
    state.field = url;
    state.errors = validate(state.field, state.urls);
    state.valid = isEmpty(state.errors);
    elements.successBlock.textContent = '';

    if (state.valid) {
      loadingRender(true, elements);
      const parser = rssParser(url);
      parser
        .then((data) => {
          const rss = data.querySelectorAll('rss');
          let rssError = '';
          if (rss.length > 0) {
            state.field = '';
            const urlId = uniqueId();
            state.urls.push({ id: urlId, url });
            result(data, urlId, resultContainer);
            elements.successBlock.textContent = i18next.t('form.success');
          } else {
            rssError = i18next.t('form.errors.invalidRSS');
          }
          loadingRender(false, elements, rssError);
        })
        .catch((error) => {
          elements.errorBlock.textContent = i18next.t('form.errors.network');
          console.log(error);
        });
    }
  });

  layout(state, elements);
};

export default form;
