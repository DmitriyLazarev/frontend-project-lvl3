import * as yup from 'yup';
import i18next from 'i18next';
import { isUndefined } from 'lodash';

const validate = (value, urls) => {
  const schema = yup.string()
    .matches(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z\d@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z\d@:%_+.~#?&/=]*)/,
      i18next.t('form.errors.wrongUrl'),
    )
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
