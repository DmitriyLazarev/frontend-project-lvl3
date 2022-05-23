import { Modal } from 'bootstrap';
import i18next from 'i18next';
import onChange from 'on-change';
import {
  isEmpty, isUndefined,
} from 'lodash';
import uniqueId from 'lodash/uniqueId.js';
import * as yup from 'yup';
import ru from './locales/ru.js';
import parseRSS, { fetchRSS } from './parser-rss.js';
import { resultRenderer, errorsRenderer, modalRenderer } from './renderers.js';
import checkUpdates from './check-updates.js';

const validate = (value, urls) => {
  const schema = yup.string()
    .url('form.errors.wrongUrl')
    .test('isIncluded', 'form.errors.isIncluded', (v) => isUndefined(urls.find((url) => url.url === v)))
    .required('form.errors.required');

  try {
    schema.validateSync(value, { abortEarly: false });
    return {};
  } catch (e) {
    return e;
  }
};

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

const watchedState = (globalState, elements) => {
  const state = onChange(globalState, (path, value) => {
    switch (path) {
      case 'form.processState':
        handleProcessState(elements, value);
        break;

      case 'form.valid':
        elements.field.classList.remove('is-invalid');
        elements.errorBlock.style.display = 'none';
        break;

      case 'form.errors':
        errorsRenderer(elements, value);
        break;

      case 'urls':
      case 'feeds':
        break;

      case 'posts':
      case 'readPosts':
        resultRenderer(state, elements.resultContainer);
        break;

      case 'activePostId':
        modalRenderer(value, state);
        break;

      default:
        throw new Error(`Unknown state path: ${path}`);
    }
  });

  return state;
};

export default () => {
  const elements = {
    formElement: document.querySelector('.rss-form'),
    field: document.querySelector('.rss-input'),
    inputLabel: document.querySelector('.rss-input-label'),
    errorBlock: document.querySelector('.feedback-error'),
    successBlock: document.querySelector('.feedback-success'),
    submitButton: document.querySelector('.submit-button'),
    loader: document.querySelector('.submit-button-loader'),
    resultContainer: document.querySelector('.result-container'),
    modalTitle: document.querySelector('#modal_title'),
    modalContent: document.querySelector('#modal_body'),
    modalLink: document.querySelector('#modal_link'),
    modalClose: document.querySelector('#modal_close'),
  };

  const getErrorType = (error) => {
    if (error.isParsingError) {
      return 'form.errors.invalidRSS';
    } if (error.isAxiosError) {
      return 'form.errors.network';
    }
    return 'Unknown Error';
  };

  const globalState = {
    form: {
      processState: 'filling',
      errors: {},
      valid: true,
    },
    urls: [],
    feeds: [],
    posts: [],
    readPosts: [],
    activePostId: null,
  };

  i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => {
    Array.from(document.querySelectorAll('.toast'))
      .forEach((toastNode) => new Modal(toastNode));

    const state = watchedState(globalState, elements);
    const { formElement } = elements;

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = formElement.elements.url.value;
      state.form.errors = validate(url, state.urls);
      state.form.valid = isEmpty(state.form.errors);
      state.form.processState = isEmpty(state.form.errors) ? 'sending' : 'error';

      if (state.form.valid) {
        fetchRSS(url)
          .then((data) => parseRSS(data.data.contents))
          .then((data) => {
            state.form.processState = 'success';
            const urlId = uniqueId();
            state.urls.push({ id: urlId, url });
            const [feed, posts] = data;
            state.feeds.unshift({ urlId, ...feed });
            state.posts.unshift({ urlId, posts });

            const delay = 5000;
            setTimeout(function timer() {
              checkUpdates(state)
                .then(() => setTimeout(timer, delay))
                .catch((timeoutError) => console.log(timeoutError));
            }, delay);
          })
          .catch((error) => {
            state.form.processState = 'error';
            state.form.errors = getErrorType(error);
            console.log(error);
          });
      }
    });
  });
};
