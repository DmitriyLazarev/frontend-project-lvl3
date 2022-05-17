// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import { isArray, isObject } from 'lodash';

const renderErrors = (elements, errors) => {
  let errorText = '';
  if (!isObject(errors)) {
    errorText = errors;
  } else if (isArray(errors.errors)) {
    errorText = errors.errors.join(' ');
  } else {
    errorText = errors.message;
  }
  elements.errorBlock.textContent = errorText;
};

export default renderErrors;
