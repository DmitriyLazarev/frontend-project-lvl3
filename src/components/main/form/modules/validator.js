import * as yup from 'yup';
import i18next from 'i18next';
import { isUndefined } from 'lodash';

const validate = (value, urls) => {
  const schema = yup.string()
    .url(i18next.t('form.errors.wrongUrl'))
    .test('isIncluded', i18next.t('form.errors.isIncluded'), (v) => isUndefined(urls.find((url) => url.url === v)))
    .required(i18next.t('form.errors.required'));

  try {
    schema.validateSync(value, { abortEarly: false });
    return {};
  } catch (e) {
    return e;
  }
};

export default validate;
