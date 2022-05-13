// @ts-check
/* eslint-disable no-param-reassign, no-console  */

const renderValidForm = (elements) => {
  elements.field.classList.remove('is-invalid');
  elements.errorBlock.textContent = '';
};

export default renderValidForm;
