// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import * as yup from 'yup';
import onChange from 'on-change';
import { isArray, isEmpty } from 'lodash';

const renderer = (state, elements) => {
  elements.form.classList.add('rss-form', 'text-body');

  const name = 'rss-link';
  elements.field.setAttribute('type', 'url');
  elements.field.setAttribute('name', name);
  elements.field.setAttribute('id', name);
  elements.field.setAttribute('autocomplete', 'off');
  elements.field.setAttribute('autofocus', 'true');
  elements.field.setAttribute('required', 'true');
  elements.field.setAttribute('placeholder', 'https://example.com/example.rss');
  elements.field.classList.add('form-control', 'w-100', 'form-control-lg');
  elements.field.focus();

  elements.inputLabel.setAttribute('for', name);
  elements.inputLabel.classList.add('text-white', 'mb-2');
  elements.inputLabel.textContent = 'Ссылка RSS';

  elements.errorBlock.classList.add('feedback', 'mb-0', 'mt-2', 'text-danger', 'small');

  elements.submitButton.setAttribute('type', 'submit');
  elements.submitButton.setAttribute('disabled', 'true');
  elements.submitButton.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5', 'mt-4');
  elements.submitButton.textContent = 'Добавить';
};

const validate = (value, values) => {
  const schema = yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Ссылка должна быть валидным URL.',
    )
    .test('Уже есть', 'RSS уже существует.', (v) => !values.includes(v))
    .required('Поле должно быть заполнено.');
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
  elements.field.classList.add('is-valid');
  elements.field.classList.remove('is-invalid');
  elements.errorBlock.textContent = '';
};

const watchedState = (elements) => (path, value) => {
  switch (path) {
    case 'valid':
      elements.submitButton.disabled = !value;
      renderValidForm(elements);
      break;

    case 'errors':
      renderErrors(elements, value);
      break;

    case 'field':
      break;

    default:
      throw new Error(`Unknown state path: ${path}`);
  }
};

const form = (dataContainer) => {
  const formContainer = document.createElement('form');
  const inputLabel = document.createElement('label');
  const input = document.createElement('input');
  const errorBlock = document.createElement('p');
  const submitButton = document.createElement('button');

  formContainer.append(inputLabel, input, errorBlock, submitButton);
  dataContainer.append(formContainer);

  const elements = {
    form: formContainer,
    field: input,
    inputLabel,
    errorBlock,
    submitButton,
  };

  const state = onChange({
    processState: 'filling',
    errors: {},
    valid: true,
    field: '',
    values: [],
  }, watchedState(elements));

  input.addEventListener('input', (e) => {
    const { value } = e.target;
    state.field = value;
    state.errors = validate(state.field, state.values);
    state.valid = isEmpty(state.errors);
  });

  renderer(state, elements);
};

export default form;
