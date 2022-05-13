// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import { isArray } from 'lodash';

const renderErrors = (elements, errors) => {
  elements.field.classList.add('is-invalid');
  elements.errorBlock.textContent = isArray(errors.errors) ? errors.errors.join(' ') : errors.message;
};

export default renderErrors;
