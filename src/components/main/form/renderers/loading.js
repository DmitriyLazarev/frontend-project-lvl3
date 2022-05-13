// @ts-check
/* eslint-disable no-param-reassign, no-console  */

const loadingRender = (isDataLoading, elements, error = '') => {
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

export default loadingRender;
